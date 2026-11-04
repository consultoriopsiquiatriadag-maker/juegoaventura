/* =========================================
   F31: HACES DE LUZ VOLUMÉTRICA — AeroCalma
   window.AeroLightShafts — cargar antes de game.js

   Simula la luz del sol atravesando el aire (polvo en suspensión) desde los
   ventanales laterales del lado soleado hasta el piso.

   Técnica: por cada ventanal se arma un prisma que va desde el rectángulo de
   vidrio hasta su proyección sobre el piso siguiendo la dirección del sol.
   Se dibuja con mezcla aditiva y un shader que:
   - se desvanece a lo largo del haz (más denso junto al vidrio),
   - suaviza los bordes según el ángulo de visión (sin aristas duras),
   - se apaga cerca de la cámara (al caminar dentro del haz no tapa la vista).
   Es geometría estática: no hay costo por cuadro más allá de dibujar 5 prismas.

   Uso (desde game.js):
     AeroLightShafts.build(scene, SUN_DIRECTION);
     AeroLightShafts.setCalm(true|false);
   ========================================= */
(function(){
'use strict';

// ── CONFIGURACIÓN ─────────────────────────────────
// Ventanales del lado soleado (+X). Deben coincidir con buildSidewallWindows():
// x=+17, vidrio de 7.5 × 5.5 centrado en y=5.5.
const WINDOWS = [44, 28, 6, -14, -38].map(z => ({ x: 16.85, z, w: 7.5, h: 5.5, yc: 5.5 }));
const FLOOR_Y = 0.12;
const COLOR = 0xfff1d6;      // luz de sol cálida dispersada en el aire
// Intensidad base. El hall es muy claro: con 0.075 los haces sumaban solo ~+5
// de brillo y no se distinguían; 0.15 se nota sin lavar la imagen.
const OPACITY = 0.15;
const CALM_FACTOR = 0.5;     // Modo Calma: haces más tenues

// ── SHADER ────────────────────────────────────────
const vert = `
  attribute float aFade;          // 0 = junto al vidrio, 1 = sobre el piso
  varying float vFade;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main(){
    vFade = aFade;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vPosW = wp.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }`;

const frag = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vFade;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main(){
    vec3 toCam = cameraPosition - vPosW;
    float dist = length(toCam);
    vec3 v = toCam / dist;
    // Bordes suaves: las caras vistas de canto aportan poco
    float facing = pow(abs(dot(normalize(vNormalW), v)), 1.6);
    // Más denso cerca del ventanal, se disipa hacia el piso
    float along = pow(1.0 - vFade, 1.4) * 0.85 + 0.15 * (1.0 - vFade);
    // No tapar la vista al caminar dentro del haz
    float nearCam = smoothstep(0.8, 4.0, dist);
    float a = uOpacity * facing * along * nearCam;
    // AdditiveBlending = (SRC_ALPHA, ONE): la GPU ya multiplica por a
    gl_FragColor = vec4(uColor, a);
  }`;

// ── GEOMETRÍA ─────────────────────────────────────
// Prisma de 8 vértices: 4 en el vidrio y sus 4 proyecciones sobre el piso.
// Las caras se arman con vértices propios (normales planas por cara).
function _shaftGeometry(win, toSun){
  const dir = toSun.clone().normalize();          // hacia el sol
  const hz = win.w / 2, hy = win.h / 2;
  const top = [
    new THREE.Vector3(win.x, win.yc + hy, win.z - hz),
    new THREE.Vector3(win.x, win.yc + hy, win.z + hz),
    new THREE.Vector3(win.x, win.yc - hy, win.z + hz),
    new THREE.Vector3(win.x, win.yc - hy, win.z - hz),
  ];
  // La luz viaja en -dir: avanzar hasta tocar el piso
  const bot = top.map(p => {
    const s = (p.y - FLOOR_Y) / dir.y;
    return p.clone().addScaledVector(dir, -s);
  });
  // Caras laterales (la del vidrio y la del piso quedan abiertas:
  // la del piso no se ve y la del vidrio ya está cubierta por el ventanal)
  const quads = [
    [top[0], top[1], bot[1], bot[0], 0,0,1,1],
    [top[1], top[2], bot[2], bot[1], 0,0,1,1],
    [top[2], top[3], bot[3], bot[2], 0,0,1,1],
    [top[3], top[0], bot[0], bot[3], 0,0,1,1],
  ];
  const pos = [], fade = [], nrm = [];
  quads.forEach(q => {
    const [a, b, c, d] = q, f = q.slice(4);
    const n = new THREE.Vector3().subVectors(b, a).cross(new THREE.Vector3().subVectors(d, a)).normalize();
    [[a, f[0]], [b, f[1]], [c, f[2]], [a, f[0]], [c, f[2]], [d, f[3]]].forEach(([p, fv]) => {
      pos.push(p.x, p.y, p.z); fade.push(fv); nrm.push(n.x, n.y, n.z);
    });
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal',   new THREE.Float32BufferAttribute(nrm, 3));
  g.setAttribute('aFade',    new THREE.Float32BufferAttribute(fade, 1));
  g.computeBoundingSphere();
  return g;
}

// ── ESTADO / API ──────────────────────────────────
let _mat = null;
let _calm = false;

function build(scene, toSun){
  if (_mat || !toSun) return null;
  // Solo tiene sentido si el sol entra por el lado +X (donde están estos ventanales)
  if (toSun.x <= 0.05 || toSun.y <= 0.05) return null;
  _mat = new THREE.ShaderMaterial({
    uniforms: {
      uColor:   { value: new THREE.Color(COLOR) },
      uOpacity: { value: OPACITY },
    },
    vertexShader: vert,
    fragmentShader: frag,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const group = new THREE.Group();
  group.name = 'lightShafts';
  WINDOWS.forEach(w => {
    const m = new THREE.Mesh(_shaftGeometry(w, toSun), _mat);
    m.renderOrder = 10;           // después de los vidrios transparentes
    m.frustumCulled = true;
    group.add(m);
  });
  scene.add(group);
  _apply();
  return group;
}

function _apply(){
  if (_mat) _mat.uniforms.uOpacity.value = OPACITY * (_calm ? CALM_FACTOR : 1);
}

function setCalm(on){ _calm = !!on; _apply(); }

window.AeroLightShafts = { build, setCalm, WINDOWS };
})();
