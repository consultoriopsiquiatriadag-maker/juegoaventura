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

window.AeroAssets={makeSign,makeStorefront,makeAd};

})();