/* =========================================
   F25: ASSETS LIB — AeroCalma Reusable Factories
   window.AeroAssets — loaded before game.js
   ========================================= */
(function(){
'use strict';

function _tex(w,h,fn){
  const c=document.createElement('canvas'); c.width=w; c.height=h;
  const ctx=c.getContext('2d'); fn(ctx,c);
  return new THREE.CanvasTexture(c);
}

/* ── makeSign ──────────────────────────────────
 * types: 'directional' | 'gate' | 'floor' | 'pillar'
 * ─────────────────────────────────────────────── */
function makeSign(tipo, texto, opts){
  opts=opts||{};
  const sw=opts.width||2, sh=opts.height||1, depth=opts.depth||0.06;
  const bgCol=opts.bg||0x0a1628;
  const txCol=opts.textColor||0xffffff;
  const emissive=opts.emissive||0x111111;
  const eI=opts.emissiveIntensity||0.35;

  const canvas=_tex(512,256,(ctx)=>{
    ctx.fillStyle='#'+bgCol.toString(16).padStart(6,'0'); ctx.fillRect(0,0,512,256);
    ctx.strokeStyle='#'+(opts.border||0x4a9eff).toString(16).padStart(6,'0');
    ctx.lineWidth=3; ctx.strokeRect(4,4,504,248);
    if(tipo==='directional'||tipo==='gate'){
      const g=ctx.createLinearGradient(0,0,180,0);
      g.addColorStop(0,'#1a3a6c'); g.addColorStop(1,'transparent');
      ctx.fillStyle=g; ctx.fillRect(0,0,180,256);
    }
    if(tipo==='directional'){
      ctx.fillStyle='#'+txCol.toString(16).padStart(6,'0');
      ctx.font='bold 36px Arial'; ctx.textAlign='center';
      ctx.beginPath(); ctx.moveTo(75,128); ctx.lineTo(140,90); ctx.lineTo(140,118); ctx.lineTo(200,118); ctx.lineTo(200,138); ctx.lineTo(140,138); ctx.lineTo(140,166); ctx.closePath(); ctx.fill();
    }
    if(tipo==='gate'){
      ctx.fillStyle='#'+txCol.toString(16).padStart(6,'0'); ctx.font='bold 48px Arial'; ctx.textAlign='center';
      ctx.fillText(texto.substring(0,6),256,100);
      ctx.font='20px Arial'; ctx.fillStyle='#aabbcc'; ctx.fillText('GATE',256,140);
    }
    if(tipo==='floor'){
      ctx.fillStyle='#'+txCol.toString(16).padStart(6,'0'); ctx.font='36px Arial'; ctx.textAlign='center';
      const icon=(texto.indexOf('no')>=0)?'🚫':'🚶';
      ctx.fillText(icon,256,100);
      ctx.font='20px Arial'; ctx.fillStyle='#ccddee'; ctx.fillText(texto,256,180);
    }
    if(tipo==='pillar'||tipo==='tote'){
      ctx.fillStyle='#'+txCol.toString(16).padStart(6,'0'); ctx.font='bold 24px Arial'; ctx.textAlign='center';
      ctx.fillText(texto.substring(0,20),256,130);
      ctx.beginPath(); ctx.arc(256,160,12,0,Math.PI*2); ctx.fillStyle='#'+txCol.toString(16).padStart(6,'0'); ctx.fill();
      ctx.beginPath(); ctx.arc(256,160,6,0,Math.PI*2); ctx.fillStyle='#'+bgCol.toString(16).padStart(6,'0'); ctx.fill();
    }
  });
  const mat=new THREE.MeshLambertMaterial({map:canvas,emissive,emissiveIntensity:eI});
  const m=new THREE.Mesh(mkBox(sw,sh,depth),mat); m.rotation.y=opts.ry||0;
  if(opts.position){ m.position.set(opts.position.x,opts.position.y,opts.position.z); }
  m.castShadow=true; m.receiveShadow=true;
  return m;
}

/* ── makeStorefront ────────────────────────────
 * types: 'cafe' | 'duty-free' | 'kiosk' | 'pharmacy' | 'clothing' | 'souvenir' | 'exchange'
 * ─────────────────────────────────────────────── */
function makeStorefront(marca, tipo, opts){
  opts=opts||{};
  const w=opts.width||4, d=opts.depth||2.2, h=opts.height||4.5;
  const x=opts.x||0, z=opts.z||0;
  const wallCol=opts.wallColor||0x2c1a10;
  const fasciaCol=opts.fasciaColor||0xb06a28;
  const glassCol=0xd0ecff;
  const ry=opts.ry||0;
  const g=new THREE.Group();

  const glassMat=new THREE.MeshStandardMaterial({color:glassCol,transparent:true,opacity:0.17,roughness:0.08,metalness:0.3});
  const frameMat=mkStd(0xc8c8cc,0.28,0.35);
  const glassW=w-0.4, glassH=h-1.0;

  const glass=new THREE.Mesh(mkBox(0.06,glassH,glassW),glassMat);
  glass.position.set(0,h*0.45,0); g.add(glass);

  [-1,1].forEach(s=>{
    const bar=new THREE.Mesh(mkBox(0.08,glassH+0.2,0.06),frameMat);
    bar.position.set(s*(w/2-0.1),h*0.45,0); g.add(bar);
  });
  [0.5,-0.5].forEach(s=>{
    const bar=new THREE.Mesh(mkBox(0.08,0.06,glassW+0.1),frameMat);
    bar.position.set(0,h-0.5,s*(glassW/2)); g.add(bar);
  });

  const interiorMat=mkStd(0x2a2018,0.7,0.02);
  const interior=new THREE.Mesh(mkBox(0.3,glassH*0.6,glassW-0.1),interiorMat);
  interior.position.set(0,h*0.3,(glassW-0.1)/2-0.5); g.add(interior);

  const shelfMat=mkStd(0x4a3a30,0.6,0.03);
  const shelf=new THREE.Mesh(mkBox(0.22,0.04,glassW-0.3),shelfMat);
  shelf.position.set(0,h*0.25,(glassW-0.3)/2-0.5); g.add(shelf);

  const logoTex=_tex(256,128,(ctx)=>{
    ctx.fillStyle='#'+fasciaCol.toString(16).padStart(6,'0'); ctx.fillRect(0,0,256,128);
    ctx.fillStyle='#ffffff'; ctx.font='bold 28px Arial'; ctx.textAlign='center';
    ctx.fillText(marca.substring(0,18),128,70);
  });
  const logoM=new THREE.MeshBasicMaterial({map:logoTex});
  const logo=new THREE.Mesh(mkBox(0.07,0.5,logoTex.image.width/128),logoM);
  logo.position.set(0,h*0.85,glassW/2); g.add(logo);

  let lightCol=0xffcc88; let lightInt=0.6;
  if(tipo==='pharmacy'){ lightCol=0xaaddff; lightInt=0.5; }
  if(tipo==='duty-free'){ lightCol=0xffddaa; lightInt=0.7; }
  if(tipo==='clothing'){ lightCol=0xffeedd; lightInt=0.45; }
  const storeLight=new THREE.PointLight(lightCol,lightInt,8);
  storeLight.position.set(0,h,0); g.add(storeLight);

  const fascia=new THREE.Mesh(mkBox(d+0.4,0.5,glassW+0.1),mkStd(fasciaCol,0.5,0.08));
  fascia.position.set(0,h-0.25,glassW/2+0.05); g.add(fascia);

  const wallMat=mkStd(wallCol,0.72,0.02);
  const sideW=new THREE.Mesh(mkBox(d,h,0.15),wallMat);
  sideW.position.set(-w/2+d/2,h/2,0); g.add(sideW);
  const sideW2=new THREE.Mesh(mkBox(d,h,0.15),wallMat);
  sideW2.position.set(w/2-d/2,h/2,0); g.add(sideW2);

  g.position.set(x,0,z); g.rotation.y=ry;
  g.traverse(c=>{if(c.isMesh){c.castShadow=true;c.receiveShadow=true;}});
  return g;
}

/* ── makeAd ────────────────────────────────────
 * Decorative ad panel with relaxing imagery
 * ─────────────────────────────────────────────── */
function makeAd(texto, colores){
  colores=colores||{bg:0x1a2a3a,accent:0x5ba4d4,text:0xffffff};
  const w=3, h=1.5, depth=0.04;
  const canvas=_tex(512,256,(ctx)=>{
    const bgCol='#'+colores.bg.toString(16).padStart(6,'0');
    const accCol='#'+colores.accent.toString(16).padStart(6,'0');
    const txCol='#'+colores.text.toString(16).padStart(6,'0');
    ctx.fillStyle=bgCol; ctx.fillRect(0,0,512,256);
    const g=ctx.createLinearGradient(0,0,0,256);
    g.addColorStop(0,accCol+'66'); g.addColorStop(1,accCol+'00');
    ctx.fillStyle=g; ctx.fillRect(0,0,512,256);
    ctx.beginPath(); ctx.arc(460,60,35,0,Math.PI*2);
    ctx.fillStyle=accCol+'44'; ctx.fill();
    ctx.beginPath(); ctx.arc(460,60,20,0,Math.PI*2);
    ctx.fillStyle=accCol+'88'; ctx.fill();
    ctx.fillStyle=txCol; ctx.font='bold 30px Arial'; ctx.textAlign='center';
    ctx.fillText(texto.substring(0,25),256,130);
    ctx.strokeStyle=accCol; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(100,160); ctx.lineTo(412,160); ctx.stroke();
    ctx.fillStyle=accCol+'aa'; ctx.beginPath();
    ctx.ellipse(256,210,20,10,0.3,0,Math.PI*2); ctx.fill();
  });
  const mat=new THREE.MeshLambertMaterial({map:canvas,emissive:colores.accent,emissiveIntensity:0.15});
  const m=new THREE.Mesh(mkBox(w,h,depth),mat);
  m.castShadow=true; m.receiveShadow=true;
  return m;
}

/* ── F33: SENDERO DE TRÁNSITO Y DELIMITADORES ─────────────
 * makeGuideStripTexture()  → textura del sendero central del piso
 * makeStanchion()          → poste separador de filas (tensabarrier)
 * makeBarrierBelt(len)     → cinta entre dos postes (a lo largo de Z)
 * makePlanter()            → jardinera baja rectangular con plantas
 * Materiales compartidos: muchas instancias, pocos materiales.
 * ─────────────────────────────────────────────────────── */

// Textura de 1.6 m × 4 m (se repite a lo largo del recorrido).
// Arriba del canvas = hacia adelante (-Z) cuando el plano se acuesta en el piso.
// Contraste bajo a propósito: orienta sin gritar (baja estimulación).
function makeGuideStripTexture(){
  const t=_tex(256,640,(ctx,c)=>{
    const W=c.width,H=c.height;
    // Base apenas más oscura que el granito del piso (#e8ecf0)
    ctx.fillStyle='#cfd6de'; ctx.fillRect(0,0,W,H);
    // Bordes: banda gris-azulada + filete claro (marca el límite del sendero)
    ctx.fillStyle='#aeb8c4'; ctx.fillRect(0,0,14,H); ctx.fillRect(W-14,0,14,H);
    ctx.fillStyle='#e6eaef'; ctx.fillRect(14,0,3,H); ctx.fillRect(W-17,0,3,H);
    // Baldosa direccional: barras longitudinales (como la guía táctil)
    ctx.fillStyle='#c0c8d2';
    [64,104,144,184].forEach(x=>{ ctx.fillRect(x-6,24,12,H-48); });
    // Chevron indicando el sentido de avance
    ctx.fillStyle='rgba(110,132,156,0.75)';
    ctx.beginPath();
    ctx.moveTo(128,250); ctx.lineTo(206,330); ctx.lineTo(176,330); ctx.lineTo(128,282);
    ctx.lineTo(80,330); ctx.lineTo(50,330); ctx.closePath(); ctx.fill();
  });
  t.wrapS=THREE.ClampToEdgeWrapping; t.wrapT=THREE.RepeatWrapping;
  return t;
}

const _guideMats={};
function _gm(key,make){ return _guideMats[key]||(_guideMats[key]=make()); }

// Poste de acero con base pesada, ~0.98 m (altura estándar de tensabarrier)
function makeStanchion(){
  const steel=_gm('steel',()=>new THREE.MeshStandardMaterial({color:0xb8bcc2,roughness:0.28,metalness:0.75}));
  const base =_gm('base', ()=>new THREE.MeshStandardMaterial({color:0x2a2d33,roughness:0.5,metalness:0.4}));
  const g=new THREE.Group();
  const b=new THREE.Mesh(new THREE.CylinderGeometry(0.17,0.19,0.04,18),base); b.position.y=0.02; g.add(b);
  const p=new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,0.92,10),steel); p.position.y=0.5; g.add(p);
  const cap=new THREE.Mesh(new THREE.CylinderGeometry(0.045,0.04,0.06,12),steel); cap.position.y=0.98; g.add(cap);
  g.traverse(c=>{ if(c.isMesh){ c.castShadow=true; c.receiveShadow=true; } });
  return g;
}

// Cinta textil retráctil entre postes, a 0.92 m de altura, orientada en Z
function makeBarrierBelt(len){
  const belt=_gm('belt',()=>new THREE.MeshStandardMaterial({color:0x2c4a6e,roughness:0.8,metalness:0.0}));
  const m=new THREE.Mesh(new THREE.BoxGeometry(0.012,0.05,len),belt);
  m.position.y=0.92; m.castShadow=true;
  return m;
}

// Jardinera baja (1.2 × 0.5 m) con arbustos redondeados: borde "blando" del pasillo
function makePlanter(){
  const box=_gm('planter',()=>new THREE.MeshStandardMaterial({color:0xd8d2c8,roughness:0.7,metalness:0.0}));
  const soil=_gm('soil',  ()=>new THREE.MeshStandardMaterial({color:0x3b2e24,roughness:1.0}));
  const leaf=_gm('leaf',  ()=>new THREE.MeshStandardMaterial({color:0x4a7d45,roughness:0.85}));
  const g=new THREE.Group();
  const body=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.45,1.2),box); body.position.y=0.225; g.add(body);
  const s=new THREE.Mesh(new THREE.BoxGeometry(0.44,0.04,1.14),soil); s.position.y=0.44; g.add(s);
  [-0.38,0,0.38].forEach((dz,i)=>{
    const l=new THREE.Mesh(new THREE.SphereGeometry(0.26,8,6),leaf);
    l.position.set(0,0.6+(i%2)*0.05,dz); l.scale.set(0.9,0.75,1); g.add(l);
  });
  g.traverse(c=>{ if(c.isMesh){ c.castShadow=true; c.receiveShadow=true; } });
  return g;
}

window.AeroAssets={makeSign,makeStorefront,makeAd,makeGuideStripTexture,makeStanchion,makeBarrierBelt,makePlanter};

})();