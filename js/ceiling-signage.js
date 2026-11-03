/* =========================================
   F29: SEÑALÉTICA SUSPENDIDA DEL HALL — AeroCalma
   window.AeroSignage — cargar después de data.js y antes de game.js

   Crea, colgados del techo del hall:
   - Carteles de puertas de embarque (estilo aeroportuario: amarillo sobre negro)
   - Carteles de baños (pictogramas blancos sobre gris carbón)
   - Pantallas FIDS de salidas / llegadas (doble cara, en marco común)

   Las caras usan MeshStandardMaterial con emissiveMap = la propia textura,
   así se ven encendidas aunque estén en sombra. La intensidad emisiva se
   ajusta según el momento del día y el Modo Calma.

   Uso (desde game.js):
     AeroSignage.build(scene);                 // en buildWorld()
     AeroSignage.update(delta);                // en animate() — reloj FIDS
     AeroSignage.setTimeOfDay('day'|'night');  // opcional
     AeroSignage.setCalm(true|false);          // en toggleCalmMode()
   ========================================= */
(function(){
'use strict';

// ── CONFIGURACIÓN ─────────────────────────────────
// Altura del techo del hall (y) y de los carteles. Personas a 1.7 → carteles ≥ 8.
const CEILING_Y = 13;

// Intensidad emisiva por momento del día.
// De día la pantalla compite con el sol → más alta; de noche se baja para
// evitar deslumbramiento y halo excesivo del bloom.
const EMISSIVE_PRESETS = {
  day:   { sign: 0.85, fids: 1.00 },
  night: { sign: 0.55, fids: 0.70 },
};
const CALM_FACTOR = 0.7; // Modo Calma: menos brillo, misma legibilidad

// Colocación. El jugador camina hacia -Z (entrada z≈50 → avión z≈-46).
// La cara "front" mira a +Z (la ve quien avanza); "back" a -Z (quien vuelve).
// Huecos libres medidos en la escena: carteles direccionales (z 44/22/2/-18/-38,
// y≈11), cabeceras de zona (z 35/15/-3/-20/-30, y≈9.5), tablero de salidas (z 36),
// arcos de seguridad (z 6). Si se mueven esos elementos, revisar estas z.
const LAYOUT = {
  gates: [
    { x:-9.5, z: 31, front:{ arrow:'up',   title:'Puertas', sub:'A1–A12 · B1–B15' }, back:{ arrow:'up', title:'Salida', sub:'Check-in · Taxis' } },
    { x:-9.5, z: 12, front:{ arrow:'up',   title:'Puertas', sub:'A1–A12 · B1–B15' }, back:{ arrow:'up', title:'Salida', sub:'Check-in · Taxis' } },
    { x:-9.5, z: -8, front:{ arrow:'up',   title:'Puertas A', sub:'A1 – A12' },     back:{ arrow:'up', title:'Salida', sub:'Seguridad · Check-in' } },
    { x:-9.5, z:-24, front:{ arrow:'up',   title:'Puertas B', sub:'B1 – B15' },     back:{ arrow:'up', title:'Salida', sub:'Seguridad · Check-in' } },
  ],
  restrooms: [
    // "right" para quien mira a -Z = lado +X del hall
    { x: 9.5, z: 31, front:'right', back:'left' },
    { x: 9.5, z: -8, front:'right', back:'left' },
    { x: 9.5, z:-24, front:'up',    back:'up'   },
  ],
  fids: [
    { x: 0, z: 29 },
    { x: 0, z:-11 },
  ],
};

// Llegadas (no existen en data.js). Las salidas salen de FLIGHTS.
const ARRIVALS = [
  { code:'IB6830', from:'Buenos Aires', time:'07:55', belt:'3', status:'ATERRIZADO', color:'#52b788' },
  { code:'LA8064', from:'Santiago',     time:'08:20', belt:'1', status:'EN HORA',    color:'#52b788' },
  { code:'UX0042', from:'Montevideo',   time:'08:45', belt:'2', status:'EN HORA',    color:'#52b788' },
  { code:'AR1132', from:'Córdoba',      time:'09:10', belt:'4', status:'DEMORADO',   color:'#f59e0b' },
  { code:'AV0010', from:'Bogotá',       time:'09:35', belt:'3', status:'EN HORA',    color:'#52b788' },
  { code:'CM0471', from:'Panamá',       time:'10:00', belt:'1', status:'EN HORA',    color:'#52b788' },
];

// ── ESTADO ────────────────────────────────────────
const _signMats = [];   // materiales de carteles (puertas / baños)
const _fidsMats = [];   // materiales de pantallas FIDS
const _fidsScreens = []; // {canvas, ctx, texture, kind}
let _timeOfDay = 'day';
let _calm = false;
let _clockTimer = 0;
let _built = false;

// ── HELPERS ───────────────────────────────────────
function _canvasTex(w, h, draw){
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d'); draw(ctx, w, h);
  const t = new THREE.CanvasTexture(c);
  t.encoding = THREE.sRGBEncoding;
  return { canvas:c, ctx, texture:t };
}

// Material de cara iluminada: color negro + emissiveMap → la textura "emite".
function _faceMat(texture, list){
  const m = new THREE.MeshStandardMaterial({
    color: 0x050505,       // casi sin respuesta difusa: lo que se ve es la emisión
    map: texture,
    emissive: 0xffffff,
    emissiveMap: texture,
    emissiveIntensity: 1,
    roughness: 0.25,       // vidrio/acrílico: algo de reflejo especular del sol
    metalness: 0.0,
  });
  list.push(m);
  return m;
}

const _housingMat = () => new THREE.MeshStandardMaterial({ color:0x1c1f24, roughness:0.45, metalness:0.35 });
const _frameMat   = () => new THREE.MeshStandardMaterial({ color:0xa8acb2, roughness:0.35, metalness:0.6 });
const _cableMat   = () => new THREE.MeshStandardMaterial({ color:0x8a8e94, roughness:0.4,  metalness:0.7 });

// Cables desde la parte superior del cartel hasta el techo.
function _hang(group, topY, halfW, mats){
  const len = CEILING_Y - topY;
  if (len <= 0) return;
  const geo = new THREE.CylinderGeometry(0.015, 0.015, len, 6);
  [-halfW, halfW].forEach(dx => {
    const c = new THREE.Mesh(geo, mats.cable);
    c.position.set(dx, topY + len/2, 0);
    group.add(c);
    // Anclaje al techo
    const a = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 10), mats.frame);
    a.position.set(dx, CEILING_Y - 0.02, 0);
    group.add(a);
  });
}

// Cartel en caja con dos caras emisivas (front +Z, back -Z).
function _boxSign(w, h, d, frontTex, backTex, mats){
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mats.housing);
  body.castShadow = true;
  g.add(body);
  const faceGeo = new THREE.PlaneGeometry(w - 0.08, h - 0.08);
  const f = new THREE.Mesh(faceGeo, _faceMat(frontTex, _signMats));
  f.position.z = d/2 + 0.002; g.add(f);
  const b = new THREE.Mesh(faceGeo, _faceMat(backTex, _signMats));
  b.position.z = -d/2 - 0.002; b.rotation.y = Math.PI; g.add(b);
  return g;
}

// ── DIBUJO: FLECHAS Y PICTOGRAMAS ─────────────────
function _arrow(ctx, cx, cy, s, dir, col){
  const ang = { up:-Math.PI/2, right:0, down:Math.PI/2, left:Math.PI }[dir] || 0;
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang); ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo( s*0.50, 0);
  ctx.lineTo( 0,     -s*0.45);
  ctx.lineTo( 0,     -s*0.18);
  ctx.lineTo(-s*0.50,-s*0.18);
  ctx.lineTo(-s*0.50, s*0.18);
  ctx.lineTo( 0,      s*0.18);
  ctx.lineTo( 0,      s*0.45);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

function _person(ctx, cx, cy, s, female, col){
  ctx.fillStyle = col;
  ctx.beginPath(); ctx.arc(cx, cy - s*0.38, s*0.11, 0, Math.PI*2); ctx.fill();   // cabeza
  if (female){
    ctx.beginPath();                                                             // vestido
    ctx.moveTo(cx - s*0.08, cy - s*0.24); ctx.lineTo(cx + s*0.08, cy - s*0.24);
    ctx.lineTo(cx + s*0.22, cy + s*0.12); ctx.lineTo(cx - s*0.22, cy + s*0.12);
    ctx.closePath(); ctx.fill();
    ctx.fillRect(cx - s*0.09, cy + s*0.12, s*0.06, s*0.32);
    ctx.fillRect(cx + s*0.03, cy + s*0.12, s*0.06, s*0.32);
  } else {
    ctx.fillRect(cx - s*0.14, cy - s*0.24, s*0.28, s*0.36);                       // torso
    ctx.fillRect(cx - s*0.13, cy + s*0.12, s*0.10, s*0.32);                       // piernas
    ctx.fillRect(cx + s*0.03, cy + s*0.12, s*0.10, s*0.32);
  }
  ctx.fillRect(cx - s*0.24, cy - s*0.22, s*0.07, s*0.30);                         // brazos
  ctx.fillRect(cx + s*0.17, cy - s*0.22, s*0.07, s*0.30);
}

function _wheelchair(ctx, cx, cy, s, col){
  ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineWidth = s*0.07; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(cx - s*0.02, cy - s*0.40, s*0.09, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(cx - s*0.05, cy - s*0.26); ctx.lineTo(cx - s*0.05, cy + s*0.02);
  ctx.lineTo(cx + s*0.18, cy + s*0.02); ctx.lineTo(cx + s*0.28, cy + s*0.30); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx - s*0.05, cy + s*0.18, s*0.24, -0.2*Math.PI, 1.15*Math.PI); ctx.stroke();
}

// ── TEXTURAS DE CARTELES ──────────────────────────
const _texCache = {};
function _cached(key, make){ return _texCache[key] || (_texCache[key] = make().texture); }

const YELLOW = '#ffcc00', BLACK = '#111214', WHITE = '#f4f4f0', CHARCOAL = '#2b2f36';

function _gateTex(face){
  return _cached('gate|'+face.arrow+'|'+face.title+'|'+face.sub, () => _canvasTex(1024, 256, (ctx, w, h) => {
    ctx.fillStyle = BLACK; ctx.fillRect(0, 0, w, h);
    _arrow(ctx, 130, h/2, 150, face.arrow, YELLOW);
    // Icono de avión en recuadro (pictograma de embarque)
    ctx.fillStyle = YELLOW; ctx.fillRect(250, 48, 160, 160);
    ctx.fillStyle = BLACK; ctx.font = 'bold 120px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('✈', 330, 132);
    ctx.fillStyle = YELLOW; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.font = 'bold 84px Arial'; ctx.fillText(face.title, 450, 128);
    ctx.font = '52px Arial';      ctx.fillText(face.sub,   452, 205);
  }));
}

function _restroomTex(arrow){
  return _cached('wc|'+arrow, () => _canvasTex(1024, 256, (ctx, w, h) => {
    ctx.fillStyle = CHARCOAL; ctx.fillRect(0, 0, w, h);
    const ax = arrow === 'left' || arrow === 'up' ? 120 : w - 120;
    _arrow(ctx, ax, h/2, 140, arrow, YELLOW);
    const x0 = arrow === 'left' || arrow === 'up' ? 250 : 60;
    _person(ctx, x0 + 70,  h/2 + 10, 200, false, WHITE);
    _person(ctx, x0 + 210, h/2 + 10, 200, true,  WHITE);
    ctx.fillStyle = '#1f6fd1'; ctx.fillRect(x0 + 300, 48, 160, 160);   // azul accesibilidad
    _wheelchair(ctx, x0 + 380, h/2 + 6, 170, WHITE);
    ctx.fillStyle = WHITE; ctx.font = 'bold 72px Arial'; ctx.textAlign = 'left';
    ctx.fillText('Baños', x0 + 490, 120);
    ctx.font = '44px Arial'; ctx.fillStyle = '#c9ced6';
    ctx.fillText('Toilets · WC', x0 + 492, 185);
  }));
}

// ── FIDS ──────────────────────────────────────────
function _clock(){
  const n = new Date();
  return String(n.getHours()).padStart(2,'0') + ':' + String(n.getMinutes()).padStart(2,'0');
}

function _drawFids(scr){
  const ctx = scr.ctx, w = scr.canvas.width, h = scr.canvas.height;
  const dep = scr.kind === 'dep';
  // Fondo azul noche, típico de FIDS
  ctx.fillStyle = '#06132a'; ctx.fillRect(0, 0, w, h);
  // Cabecera
  ctx.fillStyle = dep ? '#f2c200' : '#1fa37a'; ctx.fillRect(0, 0, w, 86);
  ctx.fillStyle = '#06132a'; ctx.font = 'bold 46px Arial'; ctx.textAlign = 'left';
  ctx.fillText(dep ? '✈  SALIDAS · DEPARTURES' : '✈  LLEGADAS · ARRIVALS', 24, 60);
  ctx.textAlign = 'right'; ctx.font = 'bold 44px monospace';
  ctx.fillText(_clock(), w - 24, 60);
  // Columnas
  const cols = dep ? [24, 190, 520, 650, 770] : [24, 190, 520, 650, 770];
  const heads = dep ? ['VUELO','DESTINO','HORA','PUERTA','ESTADO'] : ['VUELO','ORIGEN','HORA','CINTA','ESTADO'];
  ctx.textAlign = 'left'; ctx.fillStyle = '#7fb2ff'; ctx.font = 'bold 26px Arial';
  heads.forEach((t, i) => ctx.fillText(t, cols[i], 124));
  ctx.fillStyle = '#7fb2ff'; ctx.fillRect(16, 136, w - 32, 2);
  // Filas
  const rows = dep
    ? (typeof FLIGHTS !== 'undefined' ? FLIGHTS : []).slice(0, 7).map(f => [f.code, f.dest, f.time, f.gate, f.status, f.statusColor])
    : ARRIVALS.slice(0, 7).map(a => [a.code, a.from, a.time, a.belt, a.status, a.color]);
  rows.forEach((r, i) => {
    const y = 186 + i * 54;
    if (i % 2 === 0){ ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fillRect(16, y - 38, w - 32, 52); }
    ctx.fillStyle = WHITE; ctx.font = '32px monospace';
    for (let c = 0; c < 4; c++) ctx.fillText(r[c], cols[c], y);
    ctx.fillStyle = r[5]; ctx.font = 'bold 28px Arial';
    ctx.fillText(r[4], cols[4], y);
  });
  scr.texture.needsUpdate = true;
}

function _fidsScreen(kind){
  const s = _canvasTex(1024, 576, () => {});
  const scr = { canvas:s.canvas, ctx:s.ctx, texture:s.texture, kind };
  scr.texture.anisotropy = 4;
  _drawFids(scr);
  _fidsScreens.push(scr);
  return scr;
}

// Grupo de 2 monitores 16:9 en un marco común, doble cara.
function _fidsCluster(depScr, arrScr, mats){
  const g = new THREE.Group();
  const SW = 2.9, SH = SW * 9/16, GAP = 0.12, D = 0.14;
  const totalW = SW*2 + GAP + 0.24, totalH = SH + 0.24;
  const frame = new THREE.Mesh(new THREE.BoxGeometry(totalW, totalH, D), mats.housing);
  frame.castShadow = true; g.add(frame);
  // Viga superior de la que cuelga el conjunto
  const rail = new THREE.Mesh(new THREE.BoxGeometry(totalW + 0.2, 0.08, 0.16), mats.frame);
  rail.position.y = totalH/2 + 0.04; g.add(rail);
  const geo = new THREE.PlaneGeometry(SW, SH);
  const depMat = _faceMat(depScr.texture, _fidsMats);
  const arrMat = _faceMat(arrScr.texture, _fidsMats);
  [[-1, depMat], [1, arrMat]].forEach(([side, mat]) => {
    const x = side * (SW/2 + GAP/2);
    const f = new THREE.Mesh(geo, mat); f.position.set(x, 0, D/2 + 0.002); g.add(f);
    // En la cara trasera se invierte el orden para que "Salidas" quede a la izquierda
    const b = new THREE.Mesh(geo, mat); b.position.set(-x, 0, -D/2 - 0.002); b.rotation.y = Math.PI; g.add(b);
  });
  return { group:g, topY: totalH/2 + 0.08, halfW: totalW/2 - 0.3 };
}

// ── API ───────────────────────────────────────────
function build(scene, opts){
  if (_built) return;
  opts = opts || {};
  if (opts.timeOfDay) _timeOfDay = opts.timeOfDay;
  const mats = { housing:_housingMat(), frame:_frameMat(), cable:_cableMat() };
  const root = new THREE.Group(); root.name = 'ceilingSignage';

  // Carteles de puertas de embarque
  LAYOUT.gates.forEach(cfg => {
    const W = 4.2, H = 1.05, D = 0.18, Y = 9.8;
    const s = _boxSign(W, H, D, _gateTex(cfg.front), _gateTex(cfg.back), mats);
    _hang(s, H/2, W/2 - 0.4, mats);
    s.position.set(cfg.x, Y, cfg.z); root.add(s);
  });

  // Carteles de baños
  LAYOUT.restrooms.forEach(cfg => {
    const W = 4.2, H = 1.05, D = 0.18, Y = 9.8;
    const s = _boxSign(W, H, D, _restroomTex(cfg.front), _restroomTex(cfg.back), mats);
    _hang(s, H/2, W/2 - 0.4, mats);
    s.position.set(cfg.x, Y, cfg.z); root.add(s);
  });

  // FIDS: dos texturas compartidas por todos los conjuntos (se redibujan una sola vez)
  const dep = _fidsScreen('dep'), arr = _fidsScreen('arr');
  LAYOUT.fids.forEach(cfg => {
    const c = _fidsCluster(dep, arr, mats);
    _hang(c.group, c.topY, c.halfW, mats);
    c.group.position.set(cfg.x, 9.0, cfg.z); root.add(c.group);
  });

  scene.add(root);
  _built = true;
  _applyIntensity();
  return root;
}

function _applyIntensity(){
  const p = EMISSIVE_PRESETS[_timeOfDay] || EMISSIVE_PRESETS.day;
  const k = _calm ? CALM_FACTOR : 1;
  _signMats.forEach(m => { m.emissiveIntensity = p.sign * k; });
  _fidsMats.forEach(m => { m.emissiveIntensity = p.fids * k; });
}

function setTimeOfDay(mode){
  if (!EMISSIVE_PRESETS[mode]) return;
  _timeOfDay = mode; _applyIntensity();
}

function setCalm(on){ _calm = !!on; _applyIntensity(); }

// Redibuja el reloj de las FIDS cada 30 s (sin parpadeos: baja estimulación).
function update(delta){
  if (!_built) return;
  _clockTimer += delta;
  if (_clockTimer < 30) return;
  _clockTimer = 0;
  _fidsScreens.forEach(_drawFids);
}

window.AeroSignage = { build, update, setTimeOfDay, setCalm, LAYOUT, EMISSIVE_PRESETS };
})();
