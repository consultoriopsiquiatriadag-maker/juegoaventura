/* =========================================
   AEROCALMA – THERAPEUTIC AIRPORT SIMULATOR
   game.js v3.0 – GTA-style Visual Upgrade
   ========================================= */
'use strict';

const ZONE_DATA = [
  { id:'entrance', name:'Entrada al Aeropuerto', emoji:'🚪', subtitle:'El primer paso. El aeropuerto te da la bienvenida.', position:{x:0,z:48}, radius:9, color:0x4a9eff, expect:['Encontrarás señales digitales con vuelos de salida y llegada','Habrá mostradores de información y personal dispuesto a ayudarte','Verás carritos portaequipajes disponibles — muchos son gratuitos','Las puertas son anchas y bien señalizadas con código de colores','Agentes de seguridad en la entrada realizan revisiones rápidas y rutinarias'], health:[{text:'Respira: si sientes el corazón acelerado al entrar, es adrenalina normal. Tu cuerpo se prepara, no hay peligro real.'},{text:'Observa a las personas a tu alrededor: la mayoría está tranquila, concentrada en sus vuelos.'},{text:'Truco de grounding: nombra 5 cosas que puedes ver, 4 que puedes tocar, 3 que escuchas.'}], panic:[{title:'Si sentís agitación al entrar',text:'Pará un momento. Colocá una mano en el pecho, otra en el abdomen. Cuando el ritmo baje, avanzá.'},{title:'Recordá',text:'Podés salir en cualquier momento. El aeropuerto no te atrapa.'}], narration:'Bienvenido al aeropuerto. Acabás de dar el primer paso. Esta entrada es solo el comienzo de una aventura que millones de personas viven cada día. Mirá las señales, sentí el ambiente. Acá empieza tu viaje.', prepare:['Llegá al aeropuerto con 2.5 a 3 horas de anticipación para vuelos internacionales, 2 horas para nacionales.','Buscá la pantalla de salidas (Departures) y confirmá tu terminal y número de vuelo.','Pedí ayuda al personal de información si algo no está claro — están para eso.','Tené el pasaporte o DNI y el código de reserva (QR o papel) a mano desde que entrás.','Los carritos de equipaje suelen ser gratuitos cerca de las puertas de entrada.'] },
  { id:'checkin', name:'Facturación – Check-in', emoji:'🧳', subtitle:'Presenta tu documentación y entrega tu maleta.', position:{x:0,z:28}, radius:9, color:0x8b5cf6, expect:['Mostrarás tu pasaporte o DNI y tu código de reserva','Un agente pesará tu maleta — el límite habitual es 23 kg','Recibirás tu tarjeta de embarque: guárdala bien','Te darán una etiqueta para tu equipaje facturado','El proceso dura entre 3 y 8 minutos por persona'], health:[{text:'Si tenés todo preparado (pasaporte, reserva), este paso es rápido y rutinario.'},{text:'No necesitás memorizar nada. El agente te irá diciendo exactamente qué hacer.'},{text:'Si hay cola larga, practicá respiración profunda mientras esperás.'}], panic:[{title:'Si sentís que no recordás algo',text:'Los agentes están entrenados para ayudarte. No estás solo.'},{title:'Ante el miedo a olvidar',text:'En el aeropuerto hay soluciones para casi todo. Nada es irrecuperable.'}], narration:'Estás en la zona de facturación. Acá entregás tu equipaje y obtenés tu pase de abordar. Mostrá tu documentación al agente, respondé sus preguntas con calma. En pocos minutos, este paso habrá terminado.', prepare:['Llegá con todo preparado: pasaporte/DNI, reserva electrónica o impresa.','El límite habitual de equipaje es 23 kg en bodega. Pesá tu valija antes de salir de casa.','Hacé el check-in online 24-48 horas antes si podés — ahorrás tiempo en el aeropuerto.','Las colas de check-in pueden durar 20-40 minutos. Calculalo en tu llegada.','Si tenés dudas sobre el equipaje de mano, revisá las medidas de la aerolínea por adelantado.'] },
  { id:'security', name:'Control de Seguridad', emoji:'🔍', subtitle:'Un proceso breve que garantiza la seguridad de todos.', position:{x:0,z:8}, radius:9, color:0xf59e0b, expect:['Colocarás tu equipaje de mano y chaqueta en una bandeja','El portátil y líquidos van en bandeja separada','Pasarás por un arco detector de metales','Si el arco suena, un agente hará una revisión rápida','Todo el proceso dura entre 2 y 5 minutos'], health:[{text:'El control puede sentirse invasivo, pero su único propósito es tu protección.'},{text:'Si tenés implantes o dispositivos médicos, informá al agente antes de entrar.'},{text:'Seguí las instrucciones en voz alta del personal — son claras y breves.'}], panic:[{title:'Si el arco detecta algo',text:'No te asustes. Puede ser un botón o unas llaves. El agente te va a indicar qué hacer.'},{title:'Técnica de calma rápida',text:'Inhalá 4 segundos, aguantá 2, exhalá 6 segundos. Repetí 3 veces.'}], narration:'Zona de control de seguridad. Prepará tus pertenencias: sacá el portátil, los líquidos y quitáte el cinturón. Pasá despacio por el arco. En pocos momentos habrás cruzado este punto.', prepare:['Antes de llegar a seguridad, sacá el portátil de la mochila y preparalo en una bandeja separada.','Poné líquidos (< 100 ml) en una bolsa zip transparente de 1 litro — una por persona.','Quitáte el cinturón, reloj y monedas antes de entrar al arco para evitar que suene.','Si llevás medicamentos o implantes, informá al agente antes de pasar por el arco.','El proceso dura entre 2 y 5 minutos. Una vez del otro lado, podés rearmarte con calma.'] },
  { id:'lounge', name:'Sala de Embarque', emoji:'🛋', subtitle:'Tu espacio de espera. Aquí puedes descansar y prepararte.', position:{x:0,z:-10}, radius:9, color:0x10b981, expect:['Encontrarás asientos cómodos, zonas de carga y WiFi gratuito','Habrá tiendas, cafeterías y restaurantes','Las pantallas muestran el estado de tu vuelo','El embarque se anuncia 30–45 minutos antes de la salida','Los vuelos se embarcan por grupos'], health:[{text:'La sala de espera es tu zona segura. Tenés tiempo y nada que hacer excepto esperar.'},{text:'Si tenés ansiedad anticipatoria, distraéte: leé, escuchá música, explorá la tienda.'},{text:'Hidratación: tomá agua antes del vuelo. La hidratación reduce la fatiga y la ansiedad.'}], panic:[{title:'Si la espera se hace larga',text:'Cambiá de actividad cada 15–20 minutos. Caminar por la terminal libera tensión física.'},{title:'Si empiezan pensamientos catastróficos',text:'Los aviones tienen 99.99997% de tasa de llegada segura. Ese número es real.'}], narration:'La sala de embarque. Superaste los controles. Ahora tenés tiempo para vos. Sentáte, descansá, tomá un café. Cuando llegue el momento, escucharás el anuncio de embarque.', prepare:['Anotá el número de tu gate (puerta de embarque) y verificá la pantalla cada 30 minutos — puede cambiar.','El embarque suele anunciarse 40-50 minutos antes de la salida. Esté cerca de tu gate para ese momento.','Hidratate antes de subir al avión: los aviones tienen baja humedad y eso puede aumentar la fatiga.','Llevá algo para entretenerte: podcast, libro, playlist de música tranquila.','Podés comprar agua del otro lado de seguridad si no la trajiste.'] },
  { id:'boarding', name:'Embarque – Acceso al Avión', emoji:'✈', subtitle:'El momento de subir. Ya casi estás en tu asiento.', position:{x:0,z:-28}, radius:9, color:0xef4444, expect:['Un agente escaneará tu tarjeta de embarque','Caminarás por el finger hasta la puerta del avión','Los auxiliares te darán la bienvenida','Encontrarás el número de tu asiento','El equipaje de mano se guarda en los compartimentos superiores'], health:[{text:'El momento de entrar puede generar picos de ansiedad. Enfocate en tareas concretas: guardar la mochila, buscar el asiento.'},{text:'Los auxiliares son profesionales altamente entrenados. No dudés en hablarles.'},{text:'El asiento de ventanilla reduce náuseas. El de pasillo da sensación de control y acceso libre.'}], panic:[{title:'Si sentís el impulso de salir',text:'Es un pensamiento, no una orden. La incomodidad es temporal y va a pasar.'},{title:'Al sentarte',text:'Ponete el cinturón. Sentí el asiento bajo tu cuerpo. Estás físicamente seguro.'}], narration:'Estás embarcando. Mostrá tu tarjeta al agente, seguí el pasillo, encontrá tu asiento. Una vez sentado, ponete el cinturón y relajate.', prepare:['Cuando llamen tu grupo, acercate con el boarding pass (digital o papel) y el documento listo.','Los compartimentos superiores se llenan rápido — al entrar, guardá tu equipaje de mano enseguida.','Si necesitás asistencia especial, pedila en el mostrador antes del embarque.','El asiento de pasillo te da sensación de control y fácil acceso al baño.','Los auxiliares están en la puerta para recibírte — podés decirles si tenés ansiedad al volar.'] },
  { id:'plane', name:'A Bordo del Avión', emoji:'🛫', subtitle:'Despegue, vuelo y llegada. Todo bajo control.', position:{x:0,z:-46}, radius:10, color:0x6366f1, expect:['El safety briefing muestra las salidas de emergencia','El despegue dura entre 2 y 4 minutos','La turbulencia es como baches — incómoda pero completamente segura','A 10.000m el piloto anunciará modo de dispositivos','En vuelos largos habrá servicio de bebidas y comida'], health:[{text:'La turbulencia NUNCA ha derribado un avión moderno. Los aviones soportan fuerzas 3 veces superiores a cualquier turbulencia real.'},{text:'Los sonidos extraños son completamente normales — el tren de aterrizaje, los flaps, la presurización. Los pilotos los esperan.'},{text:'Distracción activa: escuchá un podcast, mirá una película, leé. Tu mente necesita ocupación.'}], panic:[{title:'En caso de turbulencia',text:'Ajustá el cinturón, tomá los apoyabrazos y respirá con la técnica 4-7-8. La turbulencia no es peligrosa.'},{title:'Si el miedo escala',text:'Informá a un auxiliar. Están entrenados para acompañar a pasajeros con ansiedad — es parte de su trabajo.'}], narration:'Estás a bordo. Escuchá el briefing de seguridad. Al despegar, sentirás cómo el suelo se aleja. Respirá. Pronto vas a estar entre las nubes, a 10.000 metros de altura, volando.', prepare:['Cuando estés sentado, ponete el cinturón enseguida — es un gesto concreto que ancla tu cuerpo.','Descargá contenido offline (música, podcast, serie) antes del vuelo. El WiFi en aviones suele ser caro o lento.','Llevá auriculares — reducen el ruido del motor y te ayudan a crear tu propio espacio.','Si esperás sentir ansiedad durante el vuelo, avisale a un auxiliar al subir.','El vuelo promedio en Latinoamérica dura entre 1.5 y 4 horas. Podés descansar, escuchar o mirar por la ventanilla.'] },
  { id:'arrival', name:'Llegada y Recogida de Equipaje', emoji:'🏁', subtitle:'¡Lo lograste! Ahora, el último paso del viaje.', position:{x:0,z:-62}, radius:9, color:0xf97316, expect:['Al aterrizar, el avión rodará hasta la puerta','Sigue las señales hacia Baggage Claim','El carrusel muestra el número de tu vuelo en pantalla','El equipaje tarda entre 15 y 30 minutos','Si tu maleta no aparece, hay un mostrador de Lost & Found'], health:[{text:'¡Lo lograste! Cada vuelo que completás reduce el miedo al siguiente. Tu sistema nervioso ya empezó a adaptarse.'},{text:'Si experimentaste ansiedad durante el viaje, eso es valentía — no debilidad.'},{text:'Anotá cómo te sentís ahora versus cómo creías que te ibas a sentir. La diferencia suele sorprender.'}], panic:[{title:'Si la maleta tarda',text:'El 99.5% de las maletas llegan en el mismo vuelo. Esperá 40 minutos antes de reportarlo.'},{title:'Para el próximo vuelo',text:'Recordá este momento. Lo completaste. Cada vuelo que hacés es una exposición que reduce el miedo.'}], narration:'¡Bienvenido a tu destino! Aterrizaste con éxito. Seguí las señales, recogé tu maleta y dirigite a la salida. El viaje completo fue un éxito.', prepare:['Al aterrizar, esperá a que el avión se detenga completamente antes de levantarte.','Seguí las señales verdes "Baggage Claim" o "Recogida de equipaje" — están en todos los aeropuertos.','El carrusel de tu vuelo está indicado en las pantallas del área de equipajes.','Si tu maleta no llega, reportalo en el mostrador de la aerolínea — suele resolverse el mismo día.','¡Felicitaciones! Ya sos alguien que voló. Recordá este momento para el próximo viaje.'] }
];

const FLIGHTS = [
  { code:'IB3421', dest:'Madrid',    time:'08:15', gate:'A12', status:'EMBARCANDO', statusColor:'#4ecdc4' },
  { code:'VY1892', dest:'Barcelona', time:'08:40', gate:'B07', status:'A TIEMPO',   statusColor:'#52b788' },
  { code:'FR5577', dest:'Roma',      time:'09:05', gate:'C03', status:'A TIEMPO',   statusColor:'#52b788' },
  { code:'LH2234', dest:'Frankfurt', time:'09:20', gate:'A06', status:'RETRASADO',  statusColor:'#f59e0b' },
  { code:'BA0456', dest:'Londres',   time:'09:50', gate:'D15', status:'A TIEMPO',   statusColor:'#52b788' },
  { code:'AF1122', dest:'París',     time:'10:10', gate:'B11', status:'A TIEMPO',   statusColor:'#52b788' },
  { code:'IB7788', dest:'N. York',   time:'10:30', gate:'A02', status:'ABORDANDO',  statusColor:'#4a9eff' },
  { code:'U24433', dest:'Berlín',    time:'11:00', gate:'C08', status:'A TIEMPO',   statusColor:'#52b788' },
];

// ── STATE ──────────────────────────────────────────
let scene, camera, renderer, controls;
let composer; // postprocessing
let isGameActive=false, isPaused=false, currentZoneIndex=-1;
let visitedZones=new Set(), breathCount=0;
let speechSynth=window.speechSynthesis, isSpeaking=false;
let cachedVoices=[];
let breathInterval=null, breathPhaseTimer=null, breathCycles=0;
const movement={forward:false,backward:false,left:false,right:false};
const velocity=new THREE.Vector3();
const clock=new THREE.Clock();
const PLAYER_SPEED=9, PLAYER_HEIGHT=1.68;
let npcs=[], ringMeshes=[], luggageBelt=null;
let flightBoardCanvas, flightBoardCtx, flightBoardTexture;
let boardTimer=0;
let gltfLoader=null, cabinMixers=[];
let ambientLight=null;          // referencia para ciclo de luz ambiental
let gameStartTime=0;            // ms al iniciar recorrido
let menuAnimId=null;            // requestAnimationFrame del canvas del menú
const prefersReducedMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let calmMode=false;             // Modo Calma: estimulación reducida

// ── AMBIENTE SONORO (Fase 5) ──────────────────────
// Apagado por defecto: el recorrido empieza siempre sin audio.
// El usuario lo activa voluntariamente (botón en menú o pausa).
let audioEnabled=false;
let audioCtx=null, ambientMaster=null, musicGainNode=null, hallGainNode=null;
let ambientNodes=null;            // referencias para detener/limpiar al salir
const AMBIENT_MUSIC_BASE=0.05;    // música — volumen bajo, no invasivo
const AMBIENT_HALL_BASE=0.032;    // murmullo de hall — muy tenue
let textScale=1;                // Escala de texto del panel de zona (0.85 – 1.4)
let guidedMode=true;            // true = panel abre automático al entrar a zona
let startAtZone=-1;             // índice de zona para ir directo al iniciar (goToZone)
const DIARY_KEY='aerocalma_diary';
let anxietyPre=-1;              // nivel de ansiedad antes del recorrido (0-10, -1 = no seleccionó)
let anxietyPost=-1;             // nivel de ansiedad al terminar el recorrido

// ── GROUNDING 5-4-3-2-1 ───────────────────────────
let groundingStep=0;
const GROUNDING_STEPS=[
  {num:'5', sense:'👁 Cosas que VÉS',    instruction:'Nombrá mentalmente 5 cosas que podés ver ahora mismo.\nUna ventana, un asiento, una persona, el techo, tus manos…'},
  {num:'4', sense:'✋ Cosas que TOCÁS',  instruction:'Nombrá 4 cosas que podés tocar.\nSentí la textura del asiento, tu ropa, el apoyabrazos, tus propias manos.'},
  {num:'3', sense:'👂 Cosas que ESCUCHÁS',instruction:'Nombrá 3 sonidos que escuchás ahora.\nEl motor, la ventilación, voces lejanas, el silencio mismo.'},
  {num:'2', sense:'👃 Cosas que OLÉS',   instruction:'Nombrá 2 cosas que podés oler.\nEl aire del avión, el aroma de tu ropa, algo en tu bolso o mochila.'},
  {num:'1', sense:'👅 Cosa que SABOREÁS',instruction:'Nombrá 1 cosa que podés saborear.\n¿Tenés algo en la boca? ¿Cómo saboreás el aire de este momento?'}
];

// ── MOBILE ─────────────────────────────────────────
const isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
let mobileYaw = Math.PI;
let mobilePitch = 0;
const joystick  = { active:false, id:null, baseX:0, baseY:0, nx:0, ny:0 };
const lookTouch = { active:false, id:null, lastX:0, lastY:0 };
let rotateLeft=false, rotateRight=false; // botones de rotación móvil

// ── HELPERS ───────────────────────────────────────
// mkMat: PBR MeshStandardMaterial — mejora visual base automática
function mkMat(c,o={}){
  const defaults={ roughness:0.75, metalness:0.0 };
  // Si se pasa emissive, emissiveIntensity, transparent, opacity — se respetan
  return new THREE.MeshStandardMaterial({color:c, ...defaults, ...o});
}
// mkStd: alias explícito con parámetros PBR completos
function mkStd(c,rough=0.75,metal=0.0,opts={}){
  return new THREE.MeshStandardMaterial({color:c,roughness:rough,metalness:metal,...opts});
}
function mkBox(w,h,d){ return new THREE.BoxGeometry(w,h,d); }

function box(x,y,z,w,h,d,col,cast=true,recv=true,matOpts={}){
  const m=new THREE.Mesh(mkBox(w,h,d), matOpts.mat||mkMat(col,matOpts));
  m.position.set(x,y+h/2,z); m.castShadow=cast; m.receiveShadow=recv;
  scene.add(m); return m;
}
function cyl(x,y,z,rt,rb,h,seg,col,cast=true){
  const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg),mkMat(col));
  m.position.set(x,y+h/2,z); m.castShadow=cast; scene.add(m); return m;
}
function tex(w,h,fn){
  const c=document.createElement('canvas'); c.width=w; c.height=h;
  const ctx=c.getContext('2d'); fn(ctx,c);
  return new THREE.CanvasTexture(c);
}
function sign(x,y,z,sw,sh,depth,canvasTex,ry=0,emissive=0x111111){
  const mat=new THREE.MeshLambertMaterial({map:canvasTex,emissive,emissiveIntensity:0.35});
  const m=new THREE.Mesh(mkBox(sw,sh,depth),mat);
  m.position.set(x,y,z); m.rotation.y=ry; scene.add(m); return m;
}

// ── INIT ──────────────────────────────────────────
function init(){
  scene=new THREE.Scene();
  scene.background=new THREE.Color(0x87ceeb);
  scene.fog=new THREE.FogExp2(0xa0c8e8,0.007);

  camera=new THREE.PerspectiveCamera(72,innerWidth/innerHeight,0.1,400);
  camera.position.set(0,PLAYER_HEIGHT,52);

  renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
  renderer.setSize(innerWidth,innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.outputEncoding=THREE.sRGBEncoding;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=0.85;
  document.body.insertBefore(renderer.domElement,document.getElementById('ui-root'));

  controls=new THREE.PointerLockControls(camera,renderer.domElement);
  scene.add(controls.getObject());

  // GLTF Loader
  if(typeof THREE.GLTFLoader !== 'undefined') gltfLoader=new THREE.GLTFLoader();

  setupLighting();
  buildWorld();
  if(!isMobile) spawnNPCs(); // NPCs civiles solo en desktop — mejora performance móvil
  spawnStaffNPCs();
  loadCabinCrew();
  setupPostProcessing();
  setupEvents();
  animate();
  setTimeout(animLoad,200);
}

// ── POST PROCESSING ────────────────────────────────
function setupPostProcessing(){
  // Sin postprocesado en móvil — ahorra GPU y mejora framerate
  if(isMobile){ composer=null; return; }
  if(typeof THREE.EffectComposer==='undefined'){ composer=null; return; }
  composer=new THREE.EffectComposer(renderer);
  const renderPass=new THREE.RenderPass(scene,camera);
  composer.addPass(renderPass);
  // Bloom MUY sutil — solo afecta fuentes de luz puras (LEDs, pantallas)
  // threshold alto = solo píxeles muy brillantes (>0.98) reciben bloom
  const bloomPass=new THREE.UnrealBloomPass(
    new THREE.Vector2(innerWidth,innerHeight),
    0.12,  // strength — casi imperceptible en superficies normales
    0.4,   // radius
    0.98   // threshold — solo luz pura brilla (LEDs, pantallas EFIS)
  );
  composer.addPass(bloomPass);
  // Resize handler del composer — el de camera/renderer está en setupEvents
}

function animLoad(){
  const f=document.getElementById('loading-fill');
  f.style.animation='none'; f.style.width='0%';
  let w=0; const iv=setInterval(()=>{ w+=1.5; f.style.width=Math.min(w,100)+'%';
    if(w>=100){ clearInterval(iv); setTimeout(()=>{ document.getElementById('loading-screen').classList.add('hidden'); document.getElementById('main-menu').classList.remove('hidden'); startMenuAnimation(); updateDiaryDisplay(); },400); }
  },20);
}

// ── LIGHTING ──────────────────────────────────────
function setupLighting(){
  // Ambiente suave con tonos cálidos de aeropuerto moderno
  ambientLight=new THREE.AmbientLight(0xfff0e0,0.28);
  scene.add(ambientLight);

  // Luz solar principal — sombras de alta resolución
  const sun=new THREE.DirectionalLight(0xfffae8,1.1);
  sun.position.set(60,120,50); sun.castShadow=true;
  sun.shadow.mapSize.width=sun.shadow.mapSize.height=isMobile?1024:4096;
  sun.shadow.camera.left=-120; sun.shadow.camera.right=120;
  sun.shadow.camera.top=120; sun.shadow.camera.bottom=-120;
  sun.shadow.camera.far=400; sun.shadow.bias=-0.0005;
  sun.shadow.normalBias=0.02;
  scene.add(sun);

  // HemisphereLight — cielo azul + suelo cálido (reducida para evitar sobrexposición)
  scene.add(new THREE.HemisphereLight(0x9ad5f5,0x9a8060,0.30));

  // Luces de techo del terminal — cálidas, sin saturar
  [-55,-40,-25,-10,5,20,35,50].forEach(z=>{
    [-6,0,6].forEach(x=>{
      const l=new THREE.PointLight(0xfff5e0,0.35,22);
      l.position.set(x,11.5,z); scene.add(l);
    });
  });

  // Luces de acento por zona (colored)
  ZONE_DATA.forEach(z=>{
    const l=new THREE.PointLight(z.color,0.7,12);
    l.position.set(z.position.x,2,z.position.z); scene.add(l);
  });

  // Luces especiales de la cabina del avión
  [-38,-42,-46,-50,-54].forEach(z=>{
    const l=new THREE.PointLight(0xfff5cc,0.5,8);
    l.position.set(0,5.5,z); scene.add(l);
  });

  // Sky atmosférico
  if(typeof THREE.Sky !== 'undefined'){
    const sky=new THREE.Sky();
    sky.scale.setScalar(450);
    scene.add(sky);
    const su=sky.material.uniforms;
    su['turbidity'].value=3;
    su['rayleigh'].value=1.5;
    su['mieCoefficient'].value=0.005;
    su['mieDirectionalG'].value=0.85;
    su['sunPosition'].value.set(0.5,0.3,0.2);
    scene.background=null; // Sky reemplaza el fondo sólido
    scene.fog=new THREE.FogExp2(0xb0d8f0,0.006);
  }
}

// ══════════════════════════════════════════════════
// BUILD WORLD
// ══════════════════════════════════════════════════
function buildWorld(){
  buildGround(); buildShell(); buildFloorTile(); buildCeiling();
  buildWalls(); buildPillars();
  buildEntrance(); buildCheckIn(); buildSecurity();
  buildLounge(); buildBoarding(); buildPlane(); buildArrival();
  buildShops(); buildDirectionSigns(); buildFlightBoard(); // Fase 6: tiendas laterales enriquecidas
  // ── FASE 2: Estructuras base del hall ──────────
  buildTransitionBenches();
  buildInfoPosts();
  buildSidewallWindows();
  buildCorridorEdgeMarkers();
  // ── FASE 3: Puestos funcionales del hall ───────
  buildServicePosts();
  // ───────────────────────────────────────────────
  buildEntranceTarmacView(); // Fase 7: vista de plataforma desde la entrada
  buildExterior(); buildZoneRings();
}

// ─── GROUND ──────────────────────────────────────
function buildGround(){
  const gm=new THREE.Mesh(new THREE.PlaneGeometry(600,600),mkMat(0x5a8a55));
  gm.rotation.x=-Math.PI/2; gm.receiveShadow=true; scene.add(gm);
  const tm=new THREE.Mesh(new THREE.PlaneGeometry(130,320),mkMat(0x555566));
  tm.rotation.x=-Math.PI/2; tm.position.set(0,0.02,-55); scene.add(tm);
  for(let i=0;i<8;i++){ const m=new THREE.Mesh(new THREE.PlaneGeometry(3,12),mkMat(0xffffff)); m.rotation.x=-Math.PI/2; m.position.set(-30+i*8.5,0.04,-90); scene.add(m); }
}

// ─── SHELL ───────────────────────────────────────
function buildShell(){
  box(0,0,-5,40,14,142,0xe0d8cc,false,false);
  const gMat=mkMat(0x88b8d8,{transparent:true,opacity:0.35});
  const glF=new THREE.Mesh(mkBox(40,12,0.4),gMat); glF.position.set(0,7,21); scene.add(glF);
  box(0,12.6,23,44,0.6,10,0xb0a898,false,false);
  box(-20,0,-5,0.5,14,142,0xccc4b8,false,false);
  box(20,0,-5,0.5,14,142,0xccc4b8,false,false);
}

// ─── FLOOR TILE ── Mármol pulido aeropuerto moderno ─
function buildFloorTile(){
  // Textura de mármol blanco + beige con venas
  const t=tex(1024,1024,(ctx)=>{
    // Base de mármol cremoso
    const bg=ctx.createLinearGradient(0,0,1024,1024);
    bg.addColorStop(0,'#ede8e0'); bg.addColorStop(0.5,'#f0ece4'); bg.addColorStop(1,'#e8e2d8');
    ctx.fillStyle=bg; ctx.fillRect(0,0,1024,1024);

    // Venas de mármol — múltiples trazos orgánicos
    const drawVein=(x1,y1,x2,y2,col,w)=>{
      ctx.strokeStyle=col; ctx.lineWidth=w;
      ctx.globalAlpha=0.18+Math.random()*0.12;
      ctx.beginPath(); ctx.moveTo(x1,y1);
      const mx=(x1+x2)/2+(-100+Math.random()*200), my=(y1+y2)/2+(-100+Math.random()*200);
      ctx.quadraticCurveTo(mx,my,x2,y2); ctx.stroke();
      ctx.globalAlpha=1;
    };
    for(let i=0;i<18;i++) drawVein(Math.random()*1024,0,Math.random()*1024,1024,'#c8c0b4',1+Math.random()*2);
    for(let i=0;i<8;i++)  drawVein(0,Math.random()*1024,1024,Math.random()*1024,'#d0c8bc',0.5+Math.random());
    for(let i=0;i<6;i++)  drawVein(Math.random()*1024,0,Math.random()*1024,1024,'#b8b0a4',0.8);

    // Grilla de losas — juntas precisas
    ctx.globalAlpha=1;
    ctx.strokeStyle='#c0b8b0'; ctx.lineWidth=2.5;
    for(let i=0;i<=1024;i+=128){
      ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,1024); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(1024,i); ctx.stroke();
    }
    // Juntas más finas entre losas
    ctx.strokeStyle='#ccc4bc'; ctx.lineWidth=1;
    for(let i=0;i<=1024;i+=64){
      ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,1024); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(1024,i); ctx.stroke();
    }

    // Efecto de reflejo especular simulado
    const spec=ctx.createRadialGradient(512,512,0,512,512,600);
    spec.addColorStop(0,'rgba(255,255,255,0.12)');
    spec.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=spec; ctx.fillRect(0,0,1024,1024);
  });
  t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(8,22);

  const floorMat=new THREE.MeshStandardMaterial({
    map:t, roughness:0.18, metalness:0.08,
    envMapIntensity:0.6
  });
  const fm=new THREE.Mesh(new THREE.PlaneGeometry(38,142),floorMat);
  fm.rotation.x=-Math.PI/2; fm.position.set(0,0.09,-5); fm.receiveShadow=true; scene.add(fm);

  // Capa de reflejo especular encima del piso — efecto mármol pulido
  const reflMat=new THREE.MeshStandardMaterial({
    color:0xffffff, roughness:0.05, metalness:0.12,
    transparent:true, opacity:0.10
  });
  const refl=new THREE.Mesh(new THREE.PlaneGeometry(38,142),reflMat);
  refl.rotation.x=-Math.PI/2; refl.position.set(0,0.10,-5); scene.add(refl);
}

// ─── CEILING ── Techo moderno con luminarias ───────
function buildCeiling(){
  // Textura de techo con paneles acústicos y luminarias
  const t=tex(1024,512,(ctx)=>{
    ctx.fillStyle='#f2ede4'; ctx.fillRect(0,0,1024,512);
    // Paneles acústicos (rectángulos con textura de perforación)
    ctx.fillStyle='#ede8de';
    for(let px=0;px<1024;px+=128) for(let py=0;py<512;py+=128)
      ctx.fillRect(px+4,py+4,120,120);
    // Puntos de perforación acústica
    ctx.fillStyle='rgba(0,0,0,0.06)';
    for(let px=0;px<1024;px+=128) for(let py=0;py<512;py+=128)
      for(let dx=18;dx<120;dx+=12) for(let dy=18;dy<120;dy+=12)
        { ctx.beginPath(); ctx.arc(px+dx,py+dy,1.5,0,Math.PI*2); ctx.fill(); }
    // Vigas de techo
    ctx.strokeStyle='#d8d0c8'; ctx.lineWidth=5;
    [0,256,512,768,1024].forEach(x=>{ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,512); ctx.stroke(); });
    // Luminarias embebidas (rectángulos blancos brillantes)
    ctx.fillStyle='rgba(255,252,240,0.95)';
    [128,384,640,896].forEach(lx=>{ ctx.fillRect(lx-50,196,100,50); });
    ctx.fillStyle='rgba(255,255,220,0.4)';
    [128,384,640,896].forEach(lx=>{ ctx.fillRect(lx-60,185,120,70); });
  });
  t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(5,12);
  const ceilMat=new THREE.MeshStandardMaterial({map:t, roughness:0.75, metalness:0.0});
  const cm=new THREE.Mesh(new THREE.PlaneGeometry(38,142),ceilMat);
  cm.rotation.x=Math.PI/2; cm.position.set(0,13,-5); scene.add(cm);

  // Travesaños de techo con luminaria LED integrada
  [-8,-4,0,4,8].forEach(px=>{
    // Viga
    const beam=new THREE.Mesh(mkBox(1.4,0.22,138),mkStd(0xd0c8bc,0.65,0.05));
    beam.position.set(px,12.9,-5); scene.add(beam);
    // LED strip en cada viga
    const ledMat=mkStd(0xfff8e8,0.1,0,{emissive:0xfff5cc,emissiveIntensity:0.95});
    const led=new THREE.Mesh(mkBox(0.55,0.06,135),ledMat);
    led.position.set(px,12.78,-5); scene.add(led);
  });
  // Claraboyas con vidrio traslúcido
  [20,0,-20,-40].forEach(cz=>{
    const skyGlass=new THREE.Mesh(mkBox(30,0.12,4),mkStd(0xaad8f8,0.05,0.0,{transparent:true,opacity:0.45}));
    skyGlass.position.set(0,13.06,cz); scene.add(skyGlass);
    // Marco de claraboya
    const frame=new THREE.Mesh(mkBox(30.5,0.1,4.5),mkStd(0x888888,0.4,0.3));
    frame.position.set(0,13.05,cz); scene.add(frame);
  });
}

// ─── WALLS ── Paredes modernas con paneles ─────────
function buildWalls(){
  // Textura de pared con paneles de MDF/aluminio
  const t=tex(512,512,(ctx)=>{
    // Base beige claro
    ctx.fillStyle='#f0ece4'; ctx.fillRect(0,0,512,512);
    // Paneles rectangulares con sombra
    for(let py=0;py<512;py+=128){
      ctx.fillStyle='rgba(0,0,0,0.04)'; ctx.fillRect(0,py,512,3);  // junta horizontal
      ctx.fillStyle='rgba(255,255,255,0.06)'; ctx.fillRect(0,py+3,512,2);
    }
    for(let px=0;px<512;px+=256){
      ctx.fillStyle='rgba(0,0,0,0.035)'; ctx.fillRect(px,0,3,512);
      ctx.fillStyle='rgba(255,255,255,0.05)'; ctx.fillRect(px+3,0,2,512);
    }
    // Textura sutil de pared — pequeña variación de tono
    ctx.globalAlpha=0.04;
    for(let i=0;i<60;i++){
      ctx.fillStyle=i%2===0?'#000':'#fff';
      ctx.fillRect(Math.random()*512,Math.random()*512,Math.random()*40+10,Math.random()*2+1);
    }
    ctx.globalAlpha=1;
    // Zócalo inferior (madera oscura)
    ctx.fillStyle='#8a7a64'; ctx.fillRect(0,432,512,80);
    ctx.strokeStyle='#6a5a48'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(0,432); ctx.lineTo(512,432); ctx.stroke();
  });
  t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(3,1.5);
  const wm=new THREE.MeshStandardMaterial({map:t, roughness:0.72, metalness:0.02});

  [-17,17].forEach(wx=>{
    const wall=new THREE.Mesh(mkBox(0.3,13,142),wm);
    wall.position.set(wx,6.5,-5); wall.receiveShadow=true; scene.add(wall);
    // Zócalo de madera en cada pared
    const baseboard=new THREE.Mesh(mkBox(0.35,0.45,140),mkStd(0x7a6a54,0.55,0.05));
    baseboard.position.set(wx,0.23,-5); scene.add(baseboard);
    // Moldura de techo
    const crown=new THREE.Mesh(mkBox(0.35,0.3,140),mkStd(0xd8d0c0,0.6,0.02));
    crown.position.set(wx,13.15,-5); scene.add(crown);
  });
  // Pared del fondo con textura y logo de aeropuerto
  const ew=new THREE.Mesh(mkBox(36,13,0.3),wm); ew.position.set(0,6.5,-73); scene.add(ew);
  const baseBk=new THREE.Mesh(mkBox(36,0.45,0.35),mkStd(0x7a6a54,0.55,0.05));
  baseBk.position.set(0,0.23,-73); scene.add(baseBk);
}

// ─── PILLARS ── Columnas de mármol con iluminación ─
function buildPillars(){
  // Textura mármol para columnas
  const colT=tex(256,512,(ctx)=>{
    const g=ctx.createLinearGradient(0,0,256,0);
    g.addColorStop(0,'#d8d0c8'); g.addColorStop(0.3,'#ece8e2'); g.addColorStop(0.7,'#f0ece6'); g.addColorStop(1,'#d0c8c0');
    ctx.fillStyle=g; ctx.fillRect(0,0,256,512);
    // Venas verticales del mármol
    ctx.globalAlpha=0.14;
    for(let i=0;i<6;i++){
      ctx.strokeStyle='#b8b0a8'; ctx.lineWidth=1+Math.random();
      ctx.beginPath(); ctx.moveTo(Math.random()*256,0); ctx.lineTo(Math.random()*256,512); ctx.stroke();
    }
    ctx.globalAlpha=1;
  });
  colT.wrapS=colT.wrapT=THREE.RepeatWrapping;
  const colMat=new THREE.MeshStandardMaterial({map:colT,roughness:0.3,metalness:0.05});

  [[-14,-10],[14,-10],[-14,12],[14,12],[-14,-32],[14,-32],[-14,-52],[14,-52],[-14,-66],[14,-66]].forEach(([px,pz])=>{
    // Columna principal — mármol
    const col=new THREE.Mesh(new THREE.CylinderGeometry(0.7,0.72,13,12),colMat);
    col.position.set(px,6.5,pz); col.castShadow=true; col.receiveShadow=true; scene.add(col);
    // Base de columna
    const colBase=new THREE.Mesh(new THREE.CylinderGeometry(0.98,1.05,0.4,12),mkStd(0xb0a898,0.5,0.05));
    colBase.position.set(px,0.2,pz); scene.add(colBase);
    // Capitel
    const capital=new THREE.Mesh(new THREE.CylinderGeometry(1.1,0.75,0.6,12),mkStd(0xb8b0a4,0.45,0.05));
    capital.position.set(px,13.1,pz); scene.add(capital);
    // Luz indirecta en la columna
    const colLight=new THREE.PointLight(0xfff8e8,0.3,6);
    colLight.position.set(px,11,pz); scene.add(colLight);
    // Strip LED en base de columna
    const ledRing=new THREE.Mesh(new THREE.TorusGeometry(0.8,0.04,6,20),mkStd(0xfff5cc,0.1,0,{emissive:0xfff0aa,emissiveIntensity:0.6}));
    ledRing.rotation.x=Math.PI/2; ledRing.position.set(px,0.5,pz); scene.add(ledRing);
  });
}

// ─── ZONE RINGS ──────────────────────────────────
function buildZoneRings(){
  ZONE_DATA.forEach((zone,i)=>{
    const rg=new THREE.RingGeometry(4,4.8,64);
    const rm=new THREE.MeshBasicMaterial({color:zone.color,transparent:true,opacity:0.4,side:THREE.DoubleSide});
    const ring=new THREE.Mesh(rg,rm); ring.rotation.x=-Math.PI/2;
    ring.position.set(zone.position.x,0.16,zone.position.z);
    ring.userData={isRing:true}; scene.add(ring); ringMeshes.push(ring);
    const dg=new THREE.CircleGeometry(2,32);
    const dm=new THREE.MeshBasicMaterial({color:zone.color,transparent:true,opacity:0.12,side:THREE.DoubleSide});
    const dot=new THREE.Mesh(dg,dm); dot.rotation.x=-Math.PI/2;
    dot.position.set(zone.position.x,0.17,zone.position.z); scene.add(dot);
  });
}

// ══════════════════════════════════════════════════
// ZONE ENVIRONMENTS
// ══════════════════════════════════════════════════

function zoneHeader(x,z,txt,col){
  const ht=tex(1024,128,(ctx)=>{
    ctx.fillStyle='#0a1628'; ctx.fillRect(0,0,1024,128);
    ctx.fillStyle='#'+col.toString(16).padStart(6,'0');
    ctx.fillRect(0,0,1024,10); ctx.fillRect(0,118,1024,10);
    ctx.fillStyle='#fff'; ctx.font='bold 52px Arial'; ctx.textAlign='center';
    ctx.fillText(txt,512,80);
  });
  sign(x,9.5,z,15,1.5,0.15,ht,0,0x080e1a);
  const al=new THREE.PointLight(col,0.7,10); al.position.set(x,10,z); scene.add(al);
}

// ─── ENTRANCE ────────────────────────────────────
function buildEntrance(){
  const x=0,z=48;
  // Sliding door frames x3
  [-6,0,6].forEach(dx=>{
    box(x+dx,0,z+3,0.25,4.8,3.8,0x607d8b);
    const dm=mkMat(0x88c8e8,{transparent:true,opacity:0.4});
    [-0.95,0.95].forEach(ddx=>{ const d=new THREE.Mesh(mkBox(0.08,4.4,1.5),dm); d.position.set(x+dx+ddx,2.4,z+3); scene.add(d); });
    box(x+dx,4.8,z+3,0.25,0.4,3.9,0x607d8b);
  });
  // Welcome sign
  const wt=tex(1024,256,(ctx)=>{
    ctx.fillStyle='#1a2e42'; ctx.fillRect(0,0,1024,256);
    const g=ctx.createLinearGradient(0,0,1024,0); g.addColorStop(0,'#5ba4d4'); g.addColorStop(1,'#4ecdc4');
    ctx.fillStyle=g; ctx.fillRect(0,0,1024,12); ctx.fillRect(0,244,1024,12);
    ctx.fillStyle='#fff'; ctx.font='bold 76px Arial'; ctx.textAlign='center'; ctx.fillText('✈  AEROPUERTO INTERNACIONAL',512,120);
    ctx.fillStyle='#5ba4d4'; ctx.font='40px Arial'; ctx.fillText('BIENVENIDO · WELCOME · BIENVENUE',512,190);
  });
  sign(x,10,z+2.5,18,3,0.15,wt,0,0x0a1628);
  // Info desk
  box(x,0,z-3,9,1.15,1.9,0x2d4a63); box(x,1.15,z-3,9,0.12,1.9,0x9fb3c8);
  addMonitor(x-2,1.2,z-3.6); addMonitor(x+2,1.2,z-3.6);
  // Luggage carts
  [-11,-9,-7,8,10,12].forEach(dx=>addCart(x+dx,z-1));
  // Plants
  [-15,15].forEach(dx=>{ addPlant(x+dx,z+5); addPlant(x+dx,z-6); });
  // Directory board (right wall)
  const drt=tex(512,768,(ctx)=>{
    ctx.fillStyle='#0d1e30'; ctx.fillRect(0,0,512,768);
    ctx.fillStyle='#4a9eff'; ctx.font='bold 34px Arial'; ctx.textAlign='center'; ctx.fillText('🗺 DIRECTORIO',256,50);
    ctx.strokeStyle='#4a9eff'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(40,65); ctx.lineTo(472,65); ctx.stroke();
    const dirs=[['↑','Check-in','🧳'],['↑','Seguridad','🔍'],['↑','Embarque','✈'],['↓','Llegadas','🏁'],['→','Cafetería','☕'],['→','Duty Free','✨'],['←','Farmacia','💊'],['←','Prensa','📰']];
    dirs.forEach(([arrow,name,icon],i)=>{ ctx.fillStyle='#fff'; ctx.font='28px Arial'; ctx.textAlign='left'; ctx.fillText(`${arrow} ${icon} ${name}`,50,115+i*80); });
  });
  sign(17.5,5.5,z-2,2.5,6,0.12,drt,Math.PI/2,0x080e1a);
}

// ─── CHECK-IN ────────────────────────────────────
function buildCheckIn(){
  const x=0,z=28;
  zoneHeader(x,z+7,'CHECK-IN · FACTURACIÓN',0x8b5cf6);
  // 10 counters in 2 rows
  [-1,1].forEach(side=>{
    for(let i=-2;i<=2;i++){
      const cx=x+i*5.5,cz=z+side*2.8;
      box(cx,0,cz,4.6,1.1,1.6,0x2d4a63);
      box(cx,1.1,cz,4.6,0.12,1.6,0x9fb3c8);
      addMonitor(cx-0.8,1.2,cz-0.6);
      const nt=tex(128,64,(ctx)=>{ ctx.fillStyle='#1a2e42'; ctx.fillRect(0,0,128,64); ctx.fillStyle='#5ba4d4'; ctx.font='bold 36px Arial'; ctx.textAlign='center'; ctx.fillText(`${i<0?'A':'B'}${Math.abs(i)+1}`,64,46); });
      sign(cx,1.75,cz-0.82,0.85,0.55,0.05,nt,0,0x111133);
    }
  });
  // Queue barrier
  for(let i=-12;i<=12;i+=4){ box(x+i,0,z+5.5,0.12,1.1,0.12,0xcc9933); if(i<12) box(x+i+2,0.55,z+5.5,4,0.06,0.06,0xcc9933,false); }
  // Baggage belt
  box(x,0.45,z-5.5,28,0.5,2.4,0x333344);
  luggageBelt=new THREE.Mesh(mkBox(27.5,0.12,2.0),mkMat(0x555588));
  luggageBelt.position.set(x,0.72,z-5.5); scene.add(luggageBelt);
  [0xcc3333,0x3355cc,0x33aa44,0xcc9900,0x993399,0x00aacc,0xcc6633].forEach((c,i)=>addSuitcase(x-12+i*4,0.75,z-5.5,c));
  // Overhead open/closed signs
  for(let i=-2;i<=2;i++){
    const open=i!==0;
    const ot=tex(128,64,(ctx)=>{ ctx.fillStyle=open?'#1a4032':'#4a1a1a'; ctx.fillRect(0,0,128,64); ctx.fillStyle=open?'#52b788':'#ef4444'; ctx.font='bold 28px Arial'; ctx.textAlign='center'; ctx.fillText(open?'ABIERTO':'CERRADO',64,42); });
    sign(x+i*5.5,8.5,z-0.4,1.2,0.45,0.08,ot,0,0x113300);
    box(x+i*5.5,7.5,z-0.4,0.04,2.5,0.04,0x888888,false,false);
  }
  // Big IBERIA/airline logo area (left wall)
  const at=tex(512,256,(ctx)=>{ ctx.fillStyle='#c8102e'; ctx.fillRect(0,0,512,256); ctx.fillStyle='#fff'; ctx.font='bold 80px Arial'; ctx.textAlign='center'; ctx.fillText('IBERIA',256,140); ctx.font='28px Arial'; ctx.fillText('Aerolíneas Españolas',256,200); });
  sign(-17.5,7,z,0.12,3,5,at,Math.PI/2,0x440011);
}

// ─── SECURITY ────────────────────────────────────
function buildSecurity(){
  const x=0,z=8;
  zoneHeader(x,z+7,'CONTROL DE SEGURIDAD  ·  SECURITY  🔍',0xf59e0b);
  // 3 lanes
  [-8,0,8].forEach(dx=>{
    // X-ray machine
    box(x+dx-4.5,0,z,3.8,1.6,5.2,0x374151);
    box(x+dx-4.5,1.6,z,3.4,0.15,4.8,0x4a9eff,false);
    // X-ray screen
    const xt=tex(256,128,(ctx)=>{ ctx.fillStyle='#001a33'; ctx.fillRect(0,0,256,128); ctx.fillStyle='rgba(0,200,255,0.25)'; ctx.fillRect(40,20,40,80); ctx.fillRect(100,30,30,60); ctx.fillStyle='rgba(0,255,100,0.2)'; ctx.fillRect(160,15,60,90); ctx.fillStyle='rgba(255,100,0,0.15)'; ctx.fillRect(200,40,25,50); ctx.fillStyle='#00eeff'; ctx.font='10px monospace'; ctx.fillText('SCAN OK',10,120); });
    sign(x+dx-6.5,1.4,z-1,1.3,0.85,0.05,xt,Math.PI/2,0x002244);
    // Metal detector arch
    box(x+dx,0,z,0.3,3,0.3,0x607d8b); box(x+dx+3.5,0,z,0.3,3,0.3,0x607d8b);
    box(x+dx+1.75,3,z,3.9,0.3,0.3,0x607d8b);
    const ledM=mkMat(0x00cc44,{emissive:0x00aa33,emissiveIntensity:0.9});
    const led=new THREE.Mesh(mkBox(0.2,0.2,0.2),ledM); led.position.set(x+dx+3.6,2.1,z); scene.add(led);
    // Tray table
    box(x+dx+6,0,z,3.2,0.9,1.5,0x607d8b); box(x+dx+6,0.9,z,3,0.12,1.3,0x9fb3c8);
    [-0.7,0.6].forEach(dz=>box(x+dx+6,0.97,z+dz,1.9,0.08,0.55,0x888899));
  });
  // Lane dividers
  [-4,4].forEach(dx=>box(x+dx,0,z,0.15,1.6,14,0x607d8b));
  // Rules board
  const rt=tex(512,512,(ctx)=>{
    ctx.fillStyle='#1a2e42'; ctx.fillRect(0,0,512,512);
    ctx.fillStyle='#f59e0b'; ctx.font='bold 32px Arial'; ctx.textAlign='center'; ctx.fillText('PREPARACIÓN PARA EL CONTROL',256,52);
    ctx.strokeStyle='#f59e0b'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(40,68); ctx.lineTo(472,68); ctx.stroke();
    ['🔵  Saca el portátil de la mochila','🔵  Líquidos en bolsa (100ml c/u)','🔵  Retira cinturón y monedas','🔵  Vacía los bolsillos','🔵  Zapatos en bandeja si es necesario','⚠️   Mantén la calma y sigue instrucciones'].forEach((r,i)=>{ ctx.fillStyle='#fff'; ctx.font='26px Arial'; ctx.textAlign='left'; ctx.fillText(r,50,130+i*62); });
  });
  sign(x+16,5,z,0.12,4,4,rt,Math.PI/2,0x110800);
}

// ─── LOUNGE ──────────────────────────────────────
function buildLounge(){
  const x=0,z=-10;
  zoneHeader(x,z+7,'🛋  SALA DE EMBARQUE  ·  DEPARTURE LOUNGE',0x10b981);
  // Seating
  [[-10,-13],[0,-13],[10,-13],[-10,-9],[10,-9]].forEach(([dx,dz])=>{
    for(let i=0;i<4;i++){
      const sx=x+dx+i*1.45,sz=z+dz;
      box(sx,0,sz,1.25,0.45,1.1,0x374151);
      box(sx,0.45,sz+0.5,1.25,0.95,0.12,0x2d3748);
      box(sx,0.45,sz-0.58,0.1,0.95,0.1,0x888899);
    }
    box(x+dx+2.1,0.85,z+dz,5.8,0.06,0.08,0x555566,false);
  });
  // Big windows with view of tarmac
  [-14,-6,2,10].forEach(dx=>{
    box(x+dx,0,z+6.6,5.8,5.5,0.2,0x1a2e42);
    const wm=mkMat(0x88c8e8,{transparent:true,opacity:0.5});
    const w=new THREE.Mesh(mkBox(5.4,5,0.1),wm); w.position.set(x+dx,5.6,z+6.6); scene.add(w);
    box(x+dx,3,z+6.8,5.8,0.15,0.4,0xd0c8bc);
    // Plane silhouette visible through window
    const wint=tex(256,256,(ctx)=>{ const g=ctx.createLinearGradient(0,0,0,256); g.addColorStop(0,'#87ceeb'); g.addColorStop(1,'#a8d5f0'); ctx.fillStyle=g; ctx.fillRect(0,0,256,256); ctx.fillStyle='#555566'; ctx.fillRect(0,200,256,56); ctx.fillStyle='#e0e0e0'; ctx.beginPath(); ctx.ellipse(200,180,60,18,0,0,Math.PI*2); ctx.fill(); ctx.fillRect(140,162,80,4); });
    sign(x+dx,5.6,z+6.5,5.4,5,0.08,wint,0,0x224466);
  });
  // Plants
  [-16,16].forEach(dx=>{ addPlantLarge(x+dx,z); addPlantLarge(x+dx,z-5); });
  // Vending machines
  addVending(x-16.5,z-2); addVending(x-16.5,z+2);
  // Charging station
  box(x+15.5,0,z-4,1.2,2.2,0.8,0x374151);
  const ct=tex(256,256,(ctx)=>{ ctx.fillStyle='#1a2e42'; ctx.fillRect(0,0,256,256); ctx.fillStyle='#4ecdc4'; ctx.font='bold 32px Arial'; ctx.textAlign='center'; ctx.fillText('⚡ CARGA',128,90); ctx.fillText('FREE WiFi',128,148); ctx.fillStyle='#aaa'; ctx.font='20px Arial'; ctx.fillText('AeroCalma_Free',128,200); });
  sign(x+15.5,1.6,z-4.42,1.0,1.8,0.05,ct,0,0x001122);
  // Central info kiosk
  cyl(x,0,z,0.6,0.8,1.1,12,0x2d4a63);
  const kt=tex(256,512,(ctx)=>{ ctx.fillStyle='#0d1e30'; ctx.fillRect(0,0,256,512); ctx.fillStyle='#10b981'; ctx.font='bold 26px Arial'; ctx.textAlign='center'; ctx.fillText('ℹ INFORMACIÓN',128,50); ['→ Gates A1-A20','→ Gates B1-B15','↑ Restaurantes','↓ Baños / WC','← WiFi: AeroCalma'].forEach((l,i)=>{ ctx.fillStyle='#fff'; ctx.font='22px Arial'; ctx.fillText(l,128,110+i*75); }); });
  sign(x,3,z+4,1.5,3.5,0.05,kt,0,0x001122);
}

// ─── BOARDING ────────────────────────────────────
function buildBoarding(){
  const x=0,z=-28;
  zoneHeader(x,z+8,'✈  EMBARQUE  ·  BOARDING  ·  GATE A7',0xef4444);
  // Gate frame
  box(x,0,z+5,12,6.5,0.4,0x2d4a63);
  const gm=mkMat(0x88c8e8,{transparent:true,opacity:0.4});
  const gd=new THREE.Mesh(mkBox(5,5.8,0.1),gm); gd.position.set(x-2.5,3,z+4.9); scene.add(gd);
  const gd2=new THREE.Mesh(mkBox(5,5.8,0.1),gm.clone()); gd2.position.set(x+2.5,3,z+4.9); scene.add(gd2);
  // Scanner kiosk
  box(x,0,z+3,0.9,1.6,0.55,0x374151);
  const st=tex(128,192,(ctx)=>{ ctx.fillStyle='#0a1628'; ctx.fillRect(0,0,128,192); ctx.fillStyle='#00cc44'; ctx.fillRect(8,8,112,80); ctx.fillStyle='#fff'; ctx.font='bold 14px Arial'; ctx.textAlign='center'; ctx.fillText('BOARDING PASS',64,35); ctx.fillText('SCAN HERE',64,58); ctx.fillStyle='#1a4032'; ctx.fillRect(8,95,112,60); ctx.fillStyle='#4ecdc4'; ctx.font='bold 20px Arial'; ctx.fillText('✓ GATE A7',64,130); ctx.font='14px Arial'; ctx.fillStyle='#888'; ctx.fillText('Madrid · IB3421',64,165); });
  sign(x,1.2,z+2.73,0.75,1.2,0.05,st,0,0x002200);
  // Queue barriers
  for(let i=-4;i<=4;i+=2){ box(x+i,0,z+1,0.12,1.1,0.12,0xcc9933); if(i<4) box(x+i+1,0.55,z+1,2,0.06,0.06,0xcc9933,false); }
  // Gate info screen
  const gt=tex(512,256,(ctx)=>{ ctx.fillStyle='#0a1628'; ctx.fillRect(0,0,512,256); ctx.fillStyle='#4a9eff'; ctx.font='bold 28px Arial'; ctx.textAlign='center'; ctx.fillText('IB 3421 · MADRID',256,48); ctx.strokeStyle='#4a9eff'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(40,62); ctx.lineTo(472,62); ctx.stroke(); ctx.fillStyle='#fff'; ctx.font='22px Arial'; ctx.fillText('Salida · 08:15',256,100); ctx.fillText('Embarque · 07:45',256,135); ctx.fillStyle='#4ecdc4'; ctx.font='bold 36px Arial'; ctx.fillText('✓ EMBARQUE EN CURSO',256,200); });
  sign(x+9,6,z+5,5.5,2.5,0.1,gt,0,0x001122);
  // Finger/jetway
  box(x-8,0,z+8,5.5,3.8,7,0x607d8b,false,false);
  box(x-14,0,z+11,5.5,3.8,13,0x607d8b,false,false);
}

// ─── PLANE ── Cabina realista con cockpit ─────────
function buildPlane(){
  const x=0, z=-46;
  const BW=20, BH=8.5, BD=30; // ancho, alto, largo cabina pasajeros
  zoneHeader(x,z+16,'🛫  INTERIOR DEL AVIÓN  ·  ON BOARD',0x6366f1);

  // ── MATERIALES DE CABINA ──────────────────────────
  const fuselageMat  = mkStd(0xf0ece4, 0.65, 0.0);           // paredes blanco marfil
  const seatFabric   = mkStd(0x2a3d6b, 0.90, 0.0);           // tela asiento azul oscuro
  const seatPlastic  = mkStd(0x1e2d50, 0.55, 0.05);          // plástico asiento
  const armrestMat   = mkStd(0x3a3a3a, 0.45, 0.05);          // apoyabrazos gris
  const binMat       = mkStd(0xe8e4dc, 0.6, 0.02);           // portaequipajes
  const binEdgeMat   = mkStd(0xd0ccc2, 0.5, 0.05);           // bordes portaequipajes
  const carpetMat    = mkStd(0x2a2244, 0.95, 0.0);            // moqueta pasillo
  const windowFrameM = mkStd(0xd0ccc0, 0.5, 0.05);           // marcos ventana
  const cockpitWallM = mkStd(0x1a1e28, 0.6, 0.05);           // paredes cockpit
  const panelMat     = mkStd(0x1a1a22, 0.4, 0.1);            // panel instrumentos

  // ══════════════════════════════════════════════════
  // FUSELAJE — cuerpo principal
  // ══════════════════════════════════════════════════
  const fuse = new THREE.Mesh(mkBox(BW,BH,BD), fuselageMat);
  fuse.position.set(x, BH/2, z); fuse.receiveShadow=true; scene.add(fuse);

  // Bóveda del techo (interior curvado — cilindro cortado)
  const vaultGeo = new THREE.CylinderGeometry(BW*0.52, BW*0.52, BD, 20, 1, true, Math.PI*0.02, Math.PI*0.96);
  const vault = new THREE.Mesh(vaultGeo, fuselageMat);
  vault.rotation.z = Math.PI/2; vault.position.set(x, BH+0.1, z); scene.add(vault);

  // Forro interior lateral (paneles de pared)
  [-BW/2+0.15, BW/2-0.15].forEach(px=>{
    const panel = new THREE.Mesh(mkBox(0.18, BH*0.72, BD-1), mkStd(0xece8e0,0.7,0.0));
    panel.position.set(px, BH*0.45, z); scene.add(panel);
    // Zócalo inferior oscuro
    const base = new THREE.Mesh(mkBox(0.2, 0.35, BD-1), mkStd(0xb8b4ac,0.6,0.0));
    base.position.set(px, 0.3, z); scene.add(base);
  });

  // ══════════════════════════════════════════════════
  // SUELO — moqueta + pasillo duro
  // ══════════════════════════════════════════════════
  // Moqueta lateral (azul marino con patrón)
  const carpetT = tex(256,256,(ctx)=>{
    ctx.fillStyle='#1e1a38'; ctx.fillRect(0,0,256,256);
    ctx.strokeStyle='#2a2650'; ctx.lineWidth=2;
    for(let i=0;i<256;i+=12){ ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,256); ctx.stroke(); }
    ctx.strokeStyle='#22205a'; ctx.lineWidth=1;
    for(let j=0;j<256;j+=8){ ctx.beginPath(); ctx.moveTo(0,j); ctx.lineTo(256,j); ctx.stroke(); }
    // Motivo geométrico sutil
    ctx.fillStyle='rgba(91,164,212,0.08)';
    for(let i=0;i<8;i++) for(let j=0;j<8;j++) ctx.fillRect(i*32+8,j*32+8,16,16);
  });
  carpetT.wrapS=carpetT.wrapT=THREE.RepeatWrapping; carpetT.repeat.set(4,8);
  [-7.5,7.5].forEach(cx=>{
    const cm=new THREE.Mesh(new THREE.PlaneGeometry(7,BD-1),new THREE.MeshStandardMaterial({map:carpetT,roughness:0.95}));
    cm.rotation.x=-Math.PI/2; cm.position.set(x+cx,0.16,z); cm.receiveShadow=true; scene.add(cm);
  });
  // Pasillo central — vinilo gris oscuro con línea amarilla
  const aisleT=tex(128,512,(ctx)=>{
    ctx.fillStyle='#3a3840'; ctx.fillRect(0,0,128,512);
    ctx.strokeStyle='#888840'; ctx.lineWidth=3; ctx.setLineDash([20,15]);
    ctx.beginPath(); ctx.moveTo(64,0); ctx.lineTo(64,512); ctx.stroke();
    ctx.setLineDash([]); ctx.strokeStyle='rgba(255,255,180,0.15)'; ctx.lineWidth=1;
    for(let j=0;j<512;j+=24){ ctx.beginPath(); ctx.moveTo(0,j); ctx.lineTo(128,j); ctx.stroke(); }
  });
  aisleT.wrapS=aisleT.wrapT=THREE.RepeatWrapping; aisleT.repeat.set(1,3);
  const aisle=new THREE.Mesh(new THREE.PlaneGeometry(3.5,BD-1),new THREE.MeshStandardMaterial({map:aisleT,roughness:0.7}));
  aisle.rotation.x=-Math.PI/2; aisle.position.set(x,0.165,z); scene.add(aisle);

  // ══════════════════════════════════════════════════
  // ASIENTOS DE PASAJEROS — economy class detallados
  // ══════════════════════════════════════════════════
  // Textura de tela del asiento (tejido con trama)
  const seatT=tex(128,128,(ctx)=>{
    ctx.fillStyle='#233460'; ctx.fillRect(0,0,128,128);
    ctx.strokeStyle='#1a2850'; ctx.lineWidth=1;
    for(let i=0;i<128;i+=4){ ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,128); ctx.stroke(); }
    for(let j=0;j<128;j+=4){ ctx.beginPath(); ctx.moveTo(0,j); ctx.lineTo(128,j); ctx.stroke(); }
    // Stripes de diseño
    [16,48,80,112].forEach(s=>{ ctx.fillStyle='rgba(91,164,212,0.25)'; ctx.fillRect(s,0,4,128); });
  });
  seatT.wrapS=seatT.wrapT=THREE.RepeatWrapping;
  const seatFabricT=new THREE.MeshStandardMaterial({map:seatT,roughness:0.88,metalness:0.0});

  const buildSeat=(sx,sz)=>{
    const sg=new THREE.Group(); sg.position.set(sx,0,sz);
    // Base del asiento
    const base=new THREE.Mesh(mkBox(0.98,0.12,0.95),armrestMat); base.position.set(0,0.36,0); sg.add(base);
    // Cojín del asiento con tela
    const cushion=new THREE.Mesh(mkBox(0.92,0.13,0.88),seatFabricT);
    cushion.position.set(0,0.43,-0.02); sg.add(cushion);
    // Respaldo con curvatura insinuada
    const back=new THREE.Mesh(mkBox(0.92,1.0,0.11),seatFabricT);
    back.position.set(0,0.98,0.46); back.rotation.x=0.08; sg.add(back);
    // Cabecera acolchada
    const headrest=new THREE.Mesh(mkBox(0.88,0.28,0.10),seatFabricT);
    headrest.position.set(0,1.55,0.44); sg.add(headrest);
    // Almohadillas cabecera
    [-0.28,0.28].forEach(hx=>{
      const hpad=new THREE.Mesh(mkBox(0.25,0.22,0.05),seatFabricT);
      hpad.position.set(hx,1.56,0.47); sg.add(hpad);
    });
    // Apoyabrazos (tubulares)
    [-0.50,0.50].forEach(ax=>{
      const arm=new THREE.Mesh(mkBox(0.07,0.06,0.82),armrestMat);
      arm.position.set(ax,0.57,-0.02); sg.add(arm);
      // Pad de apoyabrazos
      const pad=new THREE.Mesh(mkBox(0.072,0.04,0.50),mkStd(0x2a2a2a,0.6,0.0));
      pad.position.set(ax,0.605,0.10); sg.add(pad);
    });
    // Pata frontal y trasera
    [[0.42,-0.42],[0.42,0.42],[-0.42,-0.42],[-0.42,0.42]].forEach(([lx,lz])=>{
      const leg=new THREE.Mesh(mkBox(0.055,0.38,0.055),mkStd(0xaaaaaa,0.3,0.4));
      leg.position.set(lx,0.19,lz); sg.add(leg);
    });
    // Bolsillo trasero
    const pocket=new THREE.Mesh(mkBox(0.88,0.28,0.04),mkStd(0x1e2a42,0.9,0));
    pocket.position.set(0,0.82,-0.47); sg.add(pocket);
    // Bandeja plegable (plana, cerrada)
    const tray=new THREE.Mesh(mkBox(0.72,0.025,0.52),mkStd(0xd8d4cc,0.5,0.02));
    tray.position.set(0,0.82,-0.44); sg.add(tray);
    // Pantalla de entretenimiento (en la bandeja del asiento de enfrente)
    const screenT=tex(128,96,(ctx)=>{
      ctx.fillStyle='#001830'; ctx.fillRect(0,0,128,96);
      // Mapa de vuelo simplificado
      ctx.strokeStyle='#4a9eff'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(20,50); ctx.bezierCurveTo(50,20,80,70,110,40); ctx.stroke();
      // Avión en ruta
      ctx.fillStyle='#fff'; ctx.font='14px Arial'; ctx.textAlign='center';
      ctx.fillText('✈',68,46);
      ctx.fillStyle='#4ecdc4'; ctx.font='8px Arial';
      ctx.fillText('Madrid → Nueva York',64,85);
      ctx.fillText('Alt: 10.668m | 8h 24min',64,75);
    });
    const screen=new THREE.Mesh(mkBox(0.5,0.36,0.015),new THREE.MeshStandardMaterial({
      map:screenT,emissive:0x001020,emissiveIntensity:0.6,roughness:0.1
    }));
    screen.position.set(0,1.05,-0.52); sg.add(screen);
    sg.traverse(c=>{if(c.isMesh){c.castShadow=true; c.receiveShadow=true;}});
    scene.add(sg);
  };

  // Distribución 3-3 (tipo Boeing 737: izq/pasillo/der)
  const rowsZ=[-11,-7.5,-4,-0.5,3,6.5,10];
  rowsZ.forEach(dz=>{
    // Izquierda: 3 asientos
    [-8.5,-7.3,-6.1].forEach(dx=> buildSeat(x+dx, z+dz));
    // Derecha: 3 asientos
    [6.1,7.3,8.5].forEach(dx=>  buildSeat(x+dx, z+dz));
  });

  // ══════════════════════════════════════════════════
  // PORTAEQUIPAJES SUPERIORES — más realistas
  // ══════════════════════════════════════════════════
  [-8.5,8.5].forEach(bx=>{
    const side=bx<0?-1:1;
    // Cuerpo del portaequipajes
    const bin=new THREE.Mesh(mkBox(3.8,1.35,BD-2),binMat);
    bin.position.set(x+bx,6.5,z); scene.add(bin);
    // Panel frontal inferior (abre hacia abajo)
    const door=new THREE.Mesh(mkBox(3.7,0.1,BD-2.2),binEdgeMat);
    door.position.set(x+bx,5.85,z); scene.add(door);
    // Franja de luz interior del bin (LED)
    const binLight=new THREE.Mesh(mkBox(3.6,0.04,BD-2.4),mkStd(0xfff5e0,0.1,0,{emissive:0xfff8cc,emissiveIntensity:0.5}));
    binLight.position.set(x+bx,5.82,z); scene.add(binLight);
    // Manijas
    for(let mz=z-11;mz<=z+11;mz+=5){
      const handle=new THREE.Mesh(mkBox(0.3,0.06,0.06),mkStd(0x888890,0.3,0.3));
      handle.position.set(x+bx,5.85,mz); scene.add(handle);
    }
    // Maletas visibles en algunos bins abiertos
    [z-9,z-3,z+5].forEach(mz=>{
      const lugColor=[0xcc3333,0x2244aa,0x228833,0xcc8822][Math.floor(Math.random()*4)];
      const suitcase=new THREE.Mesh(mkBox(0.55,0.38,0.28),mkStd(lugColor,0.7,0));
      suitcase.position.set(x+bx*0.7,6.1,mz); scene.add(suitcase);
      // Ruedas insinuadas
      const w1=new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,0.06,8),mkStd(0x111111,0.5,0.1));
      w1.rotation.z=Math.PI/2; w1.position.set(x+bx*0.7,5.95,mz+0.08); scene.add(w1);
    });
  });

  // Centro del techo — compartimentos de PSU (Passenger Service Unit)
  const psuMat=mkStd(0xe0dcd2,0.55,0.02);
  const psu=new THREE.Mesh(mkBox(3.5,0.45,BD-2),psuMat);
  psu.position.set(x,7.4,z); scene.add(psu);
  // Botones de PSU (llamada, luz, ventilación)
  for(let pz=z-11;pz<=z+11;pz+=3.8){
    [0x00aaff,0xffcc00,0x44dd44].forEach((c,ci)=>{
      const btn=new THREE.Mesh(mkBox(0.08,0.04,0.08),mkStd(c,0.3,0.1,{emissive:c,emissiveIntensity:0.3}));
      btn.position.set(x-0.5+ci*0.4,7.19,pz); scene.add(btn);
    });
    // Boquilla de ventilación
    const vent=new THREE.Mesh(new THREE.CylinderGeometry(0.055,0.065,0.06,8),mkStd(0x888898,0.3,0.2));
    vent.position.set(x+0.8,7.18,pz); scene.add(vent);
    // Luz de lectura
    const readLight=new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,0.05,8),mkStd(0xffffcc,0.1,0.1,{emissive:0xffffaa,emissiveIntensity:0.8}));
    readLight.position.set(x-0.8,7.18,pz); scene.add(readLight);
    const rl=new THREE.PointLight(0xfff8cc,0.25,2.5); rl.position.set(x-0.8,7,pz); scene.add(rl);
  }

  // ══════════════════════════════════════════════════
  // VENTANAS OVALADAS — más realistas
  // ══════════════════════════════════════════════════
  const makeWindow=(wx,wy,wz)=>{
    // Vista exterior (cielo + nubes procedural)
    const skyT=tex(128,128,(ctx)=>{
      const g=ctx.createLinearGradient(0,0,0,128);
      g.addColorStop(0,'#4488cc'); g.addColorStop(0.6,'#88bfee'); g.addColorStop(1,'#c8e4f8');
      ctx.fillStyle=g; ctx.fillRect(0,0,128,128);
      // Nubes procedurales
      ctx.fillStyle='rgba(255,255,255,0.85)';
      [[20,30,35,18],[55,20,45,14],[85,40,40,16],[30,70,50,20],[70,60,38,15]].forEach(
        ([cx,cy,rx,ry])=>{ ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2); ctx.fill(); }
      );
      // Borde de la ventana (doble panel)
      ctx.strokeStyle='rgba(0,0,0,0.2)'; ctx.lineWidth=4;
      ctx.beginPath(); ctx.ellipse(64,64,40,50,0,0,Math.PI*2); ctx.stroke();
    });
    // Marco exterior
    const outerFrame=new THREE.Mesh(mkBox(0.25,1.25,1.5),windowFrameM);
    outerFrame.position.set(wx,wy,wz); scene.add(outerFrame);
    // Recorte oval simulado con vidrio
    const glassMat=new THREE.MeshStandardMaterial({
      map:skyT, transparent:true, opacity:0.82,
      roughness:0.05, metalness:0.0, envMapIntensity:0.4
    });
    const glass=new THREE.Mesh(mkBox(0.12,1.05,1.28),glassMat);
    glass.position.set(wx,wy,wz); scene.add(glass);
    // Repisa de ventana
    const sill=new THREE.Mesh(mkBox(0.22,0.06,1.45),mkStd(0xe8e4dc,0.6,0.0));
    sill.position.set(wx,wy-0.6,wz); scene.add(sill);
    // Persiana (enrollada, visible arriba)
    const shade=new THREE.Mesh(mkBox(0.05,0.18,1.32),mkStd(0xf0ece4,0.8,0.0));
    shade.position.set(wx,wy+0.55,wz); scene.add(shade);
  };
  const winRowsZ=[z-10,z-6,z-2,z+2,z+6,z+10];
  winRowsZ.forEach(wz=>{ makeWindow(x-BW/2+0.14,3.2,wz); makeWindow(x+BW/2-0.14,3.2,wz); });

  // ══════════════════════════════════════════════════
  // FRANJA DE LUCES DE SUELO (emergency floor path)
  // ══════════════════════════════════════════════════
  const floorStripMat=mkStd(0x44ff88,0.1,0,{emissive:0x22ee66,emissiveIntensity:0.7,transparent:true,opacity:0.85});
  [-1.75,1.75].forEach(sx=>{
    const strip=new THREE.Mesh(mkBox(0.08,0.04,BD-3),floorStripMat);
    strip.position.set(x+sx,0.19,z); scene.add(strip);
  });

  // Luces de techo del pasillo (LED strip)
  const aisleLight=new THREE.Mesh(mkBox(0.55,0.06,BD-2),mkStd(0xfff9f0,0.1,0,{emissive:0xfff5e0,emissiveIntensity:0.85}));
  aisleLight.position.set(x,BH-0.3,z); scene.add(aisleLight);

  // ══════════════════════════════════════════════════
  // PANTALLA SAFETY MEJORADA
  // ══════════════════════════════════════════════════
  const safetyT=tex(512,300,(ctx)=>{
    const g=ctx.createLinearGradient(0,0,0,300);
    g.addColorStop(0,'#001428'); g.addColorStop(1,'#001e3c');
    ctx.fillStyle=g; ctx.fillRect(0,0,512,300);
    // Borde superior
    ctx.fillStyle='#4a9eff'; ctx.fillRect(0,0,512,5);
    ctx.fillStyle='#fff'; ctx.font='bold 30px Arial'; ctx.textAlign='center';
    ctx.fillText('🛡 SEGURIDAD · SAFETY',256,48);
    ctx.strokeStyle='rgba(74,158,255,0.5)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(40,60); ctx.lineTo(472,60); ctx.stroke();
    const items=[['🚪','Localiza las salidas de emergencia'],['💺','Abroche su cinturón de seguridad'],
                 ['📱','Active el modo avión ahora'],['😮','Máscara primero en ti, luego en menores']];
    items.forEach(([ic,tx],i)=>{
      ctx.fillStyle='rgba(255,255,255,0.12)'; ctx.fillRect(30,75+i*52,452,46);
      ctx.fillStyle='#fff'; ctx.font='24px Arial'; ctx.textAlign='left';
      ctx.fillText(`${ic}  ${tx}`,45,105+i*52);
    });
  });
  sign(x,5.8,z-12,7,3,0.08,safetyT,0,0x001428);
  const safteyLight=new THREE.PointLight(0x3355ff,0.4,5); safteyLight.position.set(x,5.5,z-12); scene.add(safteyLight);

  // ══════════════════════════════════════════════════
  // ESTACIÓN DE TRIPULACIÓN — más elaborada
  // ══════════════════════════════════════════════════
  const crewZ=z+14.5;
  box(x,0,crewZ,7,1.25,2.0,0x2a3545);
  box(x,1.25,crewZ,7,0.1,2.0,0x9aafcc);
  // Jump seats (asientos plegados)
  [-2.5,2.5].forEach(cx=>{
    box(x+cx,0.2,crewZ+0.8,0.7,0.35,0.06,0x1a2535);
    box(x+cx,0.55,crewZ+0.85,0.7,0.7,0.06,0x1a2535);
  });
  // Panel de comunicación de tripulación
  const crewT=tex(256,192,(ctx)=>{
    ctx.fillStyle='#0d1a28'; ctx.fillRect(0,0,256,192);
    ctx.fillStyle='#4a9eff'; ctx.font='bold 16px Arial'; ctx.textAlign='center';
    ctx.fillText('CREW PANEL',128,25);
    [[0x22cc44,'CINTURONES'],[0x2288ff,'ELECTRÓNICA'],[0xff8822,'GALLEY']].forEach(([c,l],i)=>{
      ctx.fillStyle=`#${c.toString(16).padStart(6,'0')}`; ctx.fillRect(20+i*76,45,60,24);
      ctx.fillStyle='#fff'; ctx.font='10px Arial'; ctx.fillText(l,50+i*76,61);
    });
    ctx.fillStyle='#2244aa'; ctx.fillRect(20,85,216,80);
    ctx.fillStyle='#88aaff'; ctx.font='12px Arial'; ctx.textAlign='left';
    ['IB 3421 · MADRID','Alt: 10,668 m','Vel: 872 km/h','Temp. ext: -54°C'].forEach((l,i)=>ctx.fillText(l,30,105+i*16));
  });
  sign(x,1.8,crewZ-1.02,2.5,1.6,0.04,crewT,0,0x001122);

  // Separador de zona de tripulación (cortina)
  const curtainMat=mkStd(0x1a2e42,0.9,0,{transparent:true,opacity:0.85});
  [-3.5,-1.2,1.2,3.5].forEach(cx=>{
    const curtain=new THREE.Mesh(mkBox(2.0,5,0.05),curtainMat);
    curtain.position.set(x+cx,3,crewZ-0.8); scene.add(curtain);
  });

  // ══════════════════════════════════════════════════
  // COCKPIT — zona del piloto completa
  // ══════════════════════════════════════════════════
  buildCockpit(x, z);
}

// ─── COCKPIT ─────────────────────────────────────
function buildCockpit(x, passengerZ){
  const cz=passengerZ+17.5; // delante de la cabina

  // Fuselaje del cockpit
  const ckFuse=new THREE.Mesh(mkBox(18,8,7),mkStd(0x1a1e28,0.6,0.0));
  ckFuse.position.set(x,4,cz); scene.add(ckFuse);

  // Techo del cockpit
  const ckCeil=new THREE.Mesh(mkBox(17.5,0.2,6.8),mkStd(0xe0dcd0,0.7,0.0));
  ckCeil.position.set(x,8.1,cz); scene.add(ckCeil);

  // Suelo del cockpit
  const ckFloor=new THREE.Mesh(mkBox(17.5,0.15,6.8),mkStd(0x2a2830,0.8,0.0));
  ckFloor.position.set(x,0.08,cz); scene.add(ckFloor);

  // Pared divisoria (puerta de cockpit)
  box(x,0,passengerZ+14,18,8,0.35,0x2a3040);
  // Puerta — más pequeña y oscura
  const doorMat=mkStd(0x1a2235,0.5,0.1);
  const door=new THREE.Mesh(mkBox(1.1,5.5,0.38),doorMat);
  door.position.set(x+1.5,2.85,passengerZ+14.1); scene.add(door);
  // Marco de puerta
  const dFrame=new THREE.Mesh(mkBox(1.25,5.7,0.32),mkStd(0x333844,0.4,0.1));
  dFrame.position.set(x+1.5,2.95,passengerZ+14.05); scene.add(dFrame);
  // Mirilla
  const peephole=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,0.5,8),mkStd(0x888890,0.2,0.5));
  peephole.rotation.z=Math.PI/2; peephole.position.set(x+2.1,4.2,passengerZ+14.1); scene.add(peephole);

  // ── WINDSHIELD (parabrisas)
  const windshieldMat=new THREE.MeshStandardMaterial({
    color:0x88bfe8, transparent:true, opacity:0.38,
    roughness:0.05, metalness:0.05
  });
  // Vista exterior desde parabrisas (cielo de día)
  const wsViewT=tex(512,256,(ctx)=>{
    const g=ctx.createLinearGradient(0,0,0,256);
    g.addColorStop(0,'#1a4a88'); g.addColorStop(0.5,'#4488cc');
    g.addColorStop(0.85,'#88bbee'); g.addColorStop(1,'#d8eef8');
    ctx.fillStyle=g; ctx.fillRect(0,0,512,256);
    // Nubes desde la altura de crucero
    ctx.fillStyle='rgba(255,255,255,0.9)';
    [[80,180,90,22],[220,195,110,18],[380,185,80,20],[120,200,60,15],[300,205,70,14]].forEach(
      ([cx,cy,rx,ry])=>{ ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2); ctx.fill(); }
    );
    // Horizonte
    ctx.strokeStyle='rgba(255,255,255,0.3)'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(0,175); ctx.lineTo(512,172); ctx.stroke();
  });
  const wsView=new THREE.Mesh(mkBox(14,3.5,0.1),new THREE.MeshStandardMaterial({map:wsViewT,roughness:0.05}));
  wsView.position.set(x,5.8,cz+3.4); scene.add(wsView);
  // Panel de parabrisas (2 secciones)
  [-4.5,4.5].forEach(px=>{
    const ws=new THREE.Mesh(mkBox(6.5,3.2,0.12),windshieldMat);
    ws.position.set(x+px,5.5,cz+3.3); ws.rotation.x=0.12; scene.add(ws);
    // Marcos del parabrisas
    box(x+px,3.9,cz+3.25,6.7,0.2,0.15,0x1a1e28,false,false);
    box(x+px,7.15,cz+3.2,6.7,0.2,0.15,0x1a1e28,false,false);
  });
  // División central del parabrisas
  box(x,3.9,cz+3.2,0.35,3.5,0.15,0x1a1e28,false,false);

  // ── PANEL DE INSTRUMENTOS (MIP)
  const cockpitPanelMat=mkStd(0x14181e,0.4,0.1);
  // Panel principal
  const mip=new THREE.Mesh(mkBox(16,3.5,1.5),cockpitPanelMat);
  mip.position.set(x,3.5,cz+2.5); mip.rotation.x=-0.15; scene.add(mip);

  // Pantallas de navegación (EFIS)
  const navT=tex(256,256,(ctx)=>{
    ctx.fillStyle='#000a0f'; ctx.fillRect(0,0,256,256);
    // Artificial horizon
    ctx.fillStyle='#1a5599'; ctx.fillRect(0,0,256,128);
    ctx.fillStyle='#5a3a1a'; ctx.fillRect(0,128,256,128);
    // Línea de horizonte
    ctx.strokeStyle='#fff'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(30,128); ctx.lineTo(226,128); ctx.stroke();
    // Marcas de altitud
    ctx.fillStyle='rgba(255,255,255,0.6)'; ctx.font='bold 11px monospace'; ctx.textAlign='right';
    ['10.668m','10.642m','10.616m'].forEach((h,i)=>ctx.fillText(h,248,50+i*28));
    // Cruz central
    ctx.strokeStyle='#ff8800'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(103,128); ctx.lineTo(153,128); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(128,113); ctx.lineTo(128,143); ctx.stroke();
    // Velocidad
    ctx.fillStyle='#22ff44'; ctx.font='bold 20px monospace'; ctx.textAlign='center';
    ctx.fillText('872 km/h',128,220);
    ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font='9px monospace';
    ctx.fillText('AIRSPEED',128,235);
  });
  [[-5.5,3.8,cz+1.9],[5.5,3.8,cz+1.9],[0,3.8,cz+1.85]].forEach(([px,py,pz])=>{
    const scr=new THREE.Mesh(mkBox(2.8,2.0,0.08),new THREE.MeshStandardMaterial({
      map:navT,emissive:0x001a10,emissiveIntensity:0.5,roughness:0.1
    }));
    scr.position.set(px,py,pz); scr.rotation.x=-0.2; scene.add(scr);
    const scrLight=new THREE.PointLight(0x22ff88,0.2,1.5); scrLight.position.set(px,py-0.4,pz-0.2); scene.add(scrLight);
  });

  // Panel central (FCU — Flight Control Unit)
  const fcuT=tex(256,128,(ctx)=>{
    ctx.fillStyle='#0d1118'; ctx.fillRect(0,0,256,128);
    ctx.fillStyle='#1a8822'; ctx.font='bold 14px monospace'; ctx.textAlign='center';
    ctx.fillText('FCU · AUTOPILOT',128,22);
    [['HDG','280'],['ALT','10668'],['SPD','870'],['V/S','0']].forEach(([l,v],i)=>{
      const bx=20+i*58;
      ctx.fillStyle='#0a1a10'; ctx.fillRect(bx,35,52,55);
      ctx.fillStyle='#22ff44'; ctx.font='bold 13px monospace'; ctx.textAlign='center';
      ctx.fillText(v,bx+26,62);
      ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font='8px Arial';
      ctx.fillText(l,bx+26,78);
    });
  });
  const fcu=new THREE.Mesh(mkBox(10,1.2,0.8),new THREE.MeshStandardMaterial({
    map:fcuT,emissive:0x001a08,emissiveIntensity:0.4,roughness:0.2
  }));
  fcu.position.set(x,5.5,cz+1.2); scene.add(fcu);

  // Overhead panel (arriba — interruptores)
  const overheadT=tex(512,256,(ctx)=>{
    ctx.fillStyle='#0f1218'; ctx.fillRect(0,0,512,256);
    const systems=['FUEL','ELEC','HYD','PRESS','FIRE','APU','LIGHTS','AC'];
    systems.forEach((s,i)=>{
      const bx=10+i*62; const active=i!==4;
      ctx.fillStyle=active?'#1a2a18':'#2a1010'; ctx.fillRect(bx,20,54,80);
      ctx.fillStyle=active?'#22dd44':'#dd2222'; ctx.font='bold 9px monospace'; ctx.textAlign='center';
      ctx.fillText(active?'ON':'OFF',bx+27,54);
      ctx.fillStyle='rgba(255,255,255,0.6)'; ctx.font='7px Arial'; ctx.fillText(s,bx+27,95);
      // Luz indicadora
      ctx.fillStyle=active?'#00ff44':'#ff3300';
      ctx.beginPath(); ctx.arc(bx+27,32,5,0,Math.PI*2); ctx.fill();
    });
    ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.font='9px monospace'; ctx.textAlign='left';
    ctx.fillText('BOEING 737-800 · IB3421 · OVERHEAD PANEL',10,240);
  });
  const overhead=new THREE.Mesh(mkBox(16,2.0,1.5),new THREE.MeshStandardMaterial({
    map:overheadT,emissive:0x001808,emissiveIntensity:0.3,roughness:0.3
  }));
  overhead.position.set(x,7.7,cz); overhead.rotation.x=Math.PI/2; scene.add(overhead);
  // Luz ambiental del overhead
  const oLight=new THREE.PointLight(0x22ff44,0.3,4); oLight.position.set(x,7.2,cz); scene.add(oLight);

  // ── ASIENTOS DEL PILOTO
  const pilotSeatMat=mkStd(0x1a1a22,0.6,0.05);
  [-3.5,3.5].forEach(px=>{
    // Base del asiento
    const seatBase=new THREE.Mesh(mkBox(0.85,0.15,0.9),pilotSeatMat);
    seatBase.position.set(x+px,0.5,cz+0.5); scene.add(seatBase);
    // Cojín
    const cushion=new THREE.Mesh(mkBox(0.82,0.15,0.88),mkStd(0x0a0a14,0.7,0));
    cushion.position.set(x+px,0.6,cz+0.5); scene.add(cushion);
    // Respaldo
    const back=new THREE.Mesh(mkBox(0.85,1.15,0.14),pilotSeatMat);
    back.position.set(x+px,1.25,cz+0.95); scene.add(back);
    // Cabecera
    const hrest=new THREE.Mesh(mkBox(0.82,0.3,0.12),pilotSeatMat);
    hrest.position.set(x+px,1.95,cz+0.92); scene.add(hrest);
    // Apoyabrazos
    [-0.44,0.44].forEach(ax=>{
      const arm=new THREE.Mesh(mkBox(0.08,0.06,0.65),mkStd(0x222226,0.4,0.1));
      arm.position.set(x+px+ax,0.73,cz+0.5); scene.add(arm);
    });
    // Pedales
    [-0.2,0.2].forEach(fx=>{
      const pedal=new THREE.Mesh(mkBox(0.18,0.04,0.22),mkStd(0x333338,0.5,0.1));
      pedal.position.set(x+px+fx,0.22,cz+2.8); scene.add(pedal);
    });
  });

  // ── YOKES (columnas de control) — izquierda y derecha
  [-3.5,3.5].forEach(px=>{
    // Columna
    cyl(x+px,0,cz+1.8,0.07,0.07,0.8,8,0x333338);
    // Semicírculo del yoke (forma de U)
    const yokeMat=mkStd(0x2a2a32,0.4,0.1);
    const yokeMain=new THREE.Mesh(mkBox(0.7,0.12,0.06),yokeMat);
    yokeMain.position.set(x+px,0.88,cz+1.8); scene.add(yokeMain);
    [-0.35,0.35].forEach(yx=>{
      const ykArm=new THREE.Mesh(mkBox(0.08,0.28,0.06),yokeMat);
      ykArm.position.set(x+px+yx,0.98,cz+1.8); scene.add(ykArm);
    });
    // Botones en el yoke
    [[0,0x0055ff],[0.3,0x00aa22],[-0.3,0xff4400]].forEach(([bx,c])=>{
      const btn=new THREE.Mesh(mkBox(0.06,0.05,0.04),mkStd(c,0.3,0.1,{emissive:c,emissiveIntensity:0.4}));
      btn.position.set(x+px+bx,0.93,cz+1.77); scene.add(btn);
    });
  });

  // Consola central (throttle quadrant)
  const consoleMat=mkStd(0x111318,0.4,0.1);
  const console_=new THREE.Mesh(mkBox(1.4,1.0,2.5),consoleMat);
  console_.position.set(x,0.8,cz+1.5); scene.add(console_);
  // Palancas de gas (throttle)
  [-0.3,0.3].forEach(tx=>{
    const throttle=new THREE.Mesh(mkBox(0.18,0.6,0.12),mkStd(0x222226,0.3,0.2));
    throttle.position.set(x+tx,1.55,cz+1.2); scene.add(throttle);
    // Grip de la palanca
    const grip=new THREE.Mesh(mkBox(0.22,0.22,0.16),mkStd(0x1a1a22,0.4,0.1));
    grip.position.set(x+tx,1.88,cz+1.22); scene.add(grip);
  });
  // Indicadores de la consola central
  const consoleT=tex(128,256,(ctx)=>{
    ctx.fillStyle='#090c10'; ctx.fillRect(0,0,128,256);
    [['FLAPS','0'],['SPEED BRK','ARM'],['PARK BRK','OFF'],['ENG 1','87%'],['ENG 2','87%']].forEach(([l,v],i)=>{
      ctx.fillStyle='rgba(255,255,255,0.08)'; ctx.fillRect(8,12+i*46,112,40);
      ctx.fillStyle='#22dd44'; ctx.font='bold 12px monospace'; ctx.textAlign='center'; ctx.fillText(v,64,36+i*46);
      ctx.fillStyle='rgba(255,255,255,0.45)'; ctx.font='8px Arial'; ctx.fillText(l,64,48+i*46);
    });
  });
  sign(x,1.35,cz+1.5,1.2,0.9,0.06,consoleT,0,0x001008);

  // ── ILUMINACIÓN del cockpit
  const ckLight1=new THREE.PointLight(0xfff5e8,0.7,6); ckLight1.position.set(x,6.5,cz); scene.add(ckLight1);
  const ckLight2=new THREE.PointLight(0x8855ff,0.2,4); ckLight2.position.set(x,7,cz+2); scene.add(ckLight2);
  // Luces rojas de emergencia
  [-6,6].forEach(px=>{
    const el=new THREE.PointLight(0xff1100,0.15,2.5); el.position.set(x+px,7.5,cz); scene.add(el);
    const elv=new THREE.Mesh(mkBox(0.12,0.12,0.12),mkStd(0xff1100,0.2,0.1,{emissive:0xff0000,emissiveIntensity:0.8}));
    elv.position.set(x+px,7.7,cz); scene.add(elv);
  });
}

// ─── ARRIVAL ─────────────────────────────────────
function buildArrival(){
  const x=0,z=-62;
  zoneHeader(x,z+8,'🏁  LLEGADAS  ·  RECOGIDA DE EQUIPAJE  ·  ARRIVALS',0xf97316);
  // Baggage carousel (torus)
  const tg=new THREE.TorusGeometry(5.5,1.4,8,40);
  const tm=new THREE.Mesh(tg,mkMat(0x374151)); tm.rotation.x=Math.PI/2; tm.position.set(x,0.8,z); scene.add(tm);
  const beltT=new THREE.TorusGeometry(5.5,1.32,8,40);
  const beltM=new THREE.Mesh(beltT,mkMat(0x555588)); beltM.rotation.x=Math.PI/2; beltM.position.set(x,0.82,z); scene.add(beltM);
  luggageBelt=beltM; // animate this
  cyl(x,0,z,0.6,0.7,1.1,16,0x555566);
  // Suitcases on/around carousel
  [0xcc3333,0x3355cc,0x33aa44,0xcc9900,0x993399,0x00aacc,0xcc6633,0x009966].forEach((c,i)=>{
    const angle=(i/8)*Math.PI*2; addSuitcase(x+Math.cos(angle)*5.5,0.78,z+Math.sin(angle)*5.5,c);
  });
  // Claim screens (both sides)
  const clt=tex(512,256,(ctx)=>{ ctx.fillStyle='#0a1628'; ctx.fillRect(0,0,512,256); ctx.fillStyle='#f97316'; ctx.font='bold 24px Arial'; ctx.textAlign='center'; ctx.fillText('RECOGIDA DE EQUIPAJE  ·  BAGGAGE CLAIM',256,38); ctx.strokeStyle='#f97316'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(30,52); ctx.lineTo(482,52); ctx.stroke(); [['IB 3421','Madrid','Cinta 1','✓ EN CINTA','#52b788'],['VY 1892','Barcelona','Cinta 2','✓ EN CINTA','#52b788'],['BA 0456','Londres','Cinta 3','⏳ EN PROCESO','#f59e0b']].forEach(([code,dest,belt,st,sc],i)=>{ ctx.fillStyle=sc; ctx.font='20px Arial'; ctx.textAlign='left'; ctx.fillText(`${code}  ${dest}  ${belt}  ${st}`,40,98+i*55); }); });
  sign(x+13,6,z,0.1,4,8,clt,Math.PI/2,0x111111);
  sign(x-13,6,z,0.1,4,8,clt,-Math.PI/2,0x111111);
  // Exit door
  box(x,0,z-9,12,5.5,0.35,0x374151);
  const em=mkMat(0x88c8e8,{transparent:true,opacity:0.4});
  [-2.5,2.5].forEach(dx=>{ const d=new THREE.Mesh(mkBox(4.5,5,0.1),em); d.position.set(x+dx,2.8,z-8.95); scene.add(d); });
  const ext=tex(256,128,(ctx)=>{ ctx.fillStyle='#006600'; ctx.fillRect(0,0,256,128); ctx.fillStyle='#fff'; ctx.font='bold 40px Arial'; ctx.textAlign='center'; ctx.fillText('🚶 SALIDA · EXIT',128,80); });
  sign(x,5.8,z-9,4,1.5,0.08,ext,0,0x003300);
  // Arrival info screens
  const art=tex(512,256,(ctx)=>{ ctx.fillStyle='#0a1628'; ctx.fillRect(0,0,512,256); ctx.fillStyle='#f97316'; ctx.font='bold 28px Arial'; ctx.textAlign='center'; ctx.fillText('✈ LLEGADAS · ARRIVALS',256,45); ctx.strokeStyle='#f97316'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(40,60); ctx.lineTo(472,60); ctx.stroke(); [['LH2234','Frankfurt','09:20','✓ ATERRIZÓ'],['BA0456','Londres','09:50','✓ ATERRIZÓ'],['AF1122','París','10:10','EN VUELO']].forEach(([code,dest,time,status],i)=>{ ctx.fillStyle=status==='EN VUELO'?'#4a9eff':'#52b788'; ctx.font='22px Arial'; ctx.textAlign='left'; ctx.fillText(`${code}  ${dest}  ${time}  ${status}`,40,105+i*55); }); });
  sign(x,8,z+6,10,4,0.12,art,0,0x111111);
}

// ══════════════════════════════════════════════════
// SHOPS
// ══════════════════════════════════════════════════
// ══════════════════════════════════════════════════
// TIENDAS LATERALES DEL HALL — Fase 6
// Seis locales con identidad visual diferenciada:
//   Cafetería · Kiosco Express · Librería & Prensa
//   Farmacia · Restaurante · Regalos & Souvenirs
// Estructura común via buildShopBase; cada local
// agrega cartelería y props propios.
// ══════════════════════════════════════════════════
function buildShops(){
  buildCafe(-15.5,20);
  buildConvenienceStore(-15.5,-2);
  buildNewsstand(-15.5,-22);
  buildPharmacy(15.5,15);
  buildRestaurant(15.5,-5);
  buildGiftShop(15.5,-23);
}

// ── FACHADA BASE ── pared trasera, laterales, fascia, vidrios, zócalo
// Retorna {inX, h, ry, s} para colocar props de cada local.
function buildShopBase(x,z,width,depth,wallCol,fasciaCol){
  const s=x<0?1:-1;
  const ry=x<0?-Math.PI/2:Math.PI/2;
  const bx=x+s*0.15;
  const inX=x+s*depth*0.52;
  const h=4.2;
  const wm=mkStd(wallCol,0.72,0.02);
  // Pared trasera
  const bw=new THREE.Mesh(mkBox(0.28,h,width),wm);
  bw.position.set(bx,h/2,z); bw.castShadow=true; scene.add(bw);
  // Paredes laterales
  [z-width/2,z+width/2].forEach(sz=>{
    const sw=new THREE.Mesh(mkBox(depth,h,0.22),wm);
    sw.position.set(x+s*depth/2,h/2,sz); sw.castShadow=true; scene.add(sw);
  });
  // Fascia de color del local (proyecta al pasillo)
  const fascia=new THREE.Mesh(mkBox(depth+0.35,0.6,width+0.28),mkStd(fasciaCol,0.5,0.08));
  fascia.position.set(bx+s*(depth/2-0.02),h-0.3,z); scene.add(fascia);
  // Zócalo
  const sk=new THREE.Mesh(mkBox(depth,0.15,width-0.3),mkStd(0xb0a898,0.7,0.03));
  sk.position.set(x+s*depth/2,0.075,z); scene.add(sk);
  // Vitrinas de vidrio (dos paneles con hueco central de entrada)
  const gm=new THREE.MeshStandardMaterial({color:0xd0ecff,transparent:true,opacity:0.17,roughness:0.08,metalness:0.3});
  const pw=(width-2.2)/2;
  [z-width/2+0.15+pw/2,z+width/2-0.15-pw/2].forEach(gz=>{
    const gp=new THREE.Mesh(mkBox(0.08,h-0.82,pw-0.1),gm);
    gp.position.set(x+s*depth,h/2-0.41,gz); scene.add(gp);
  });
  return {inX,h,ry,s};
}

// ── 1. CAFETERÍA ─────────────────────────────────
function buildCafe(x,z){
  const {inX,h,ry,s}=buildShopBase(x,z,8.5,2.2,0x2c1a10,0xb06a28);
  // Mostrador con superficie
  const counter=new THREE.Mesh(mkBox(1.05,1.1,2.5),mkStd(0x3d2b1f,0.6,0.05));
  counter.position.set(inX,0.55,z); scene.add(counter);
  const ctop=new THREE.Mesh(mkBox(1.1,0.07,2.6),mkStd(0x5a3820,0.3,0.2));
  ctop.position.set(inX,1.135,z); scene.add(ctop);
  // Máquina de espresso + tubo de vapor
  cyl(inX,1.13,z-0.62,0.22,0.24,0.8,8,0x888888);
  cyl(inX,1.13,z-0.62,0.14,0.14,0.12,8,0x555555);
  const steam=new THREE.Mesh(mkBox(0.05,0.68,0.05),mkStd(0xdddddd,0.2,0.5));
  steam.position.set(inX+s*0.2,1.57,z-0.62); scene.add(steam);
  // Neón de tienda
  const nm=mkMat(0xf5c57a,{emissive:0xdd9900,emissiveIntensity:0.95});
  const neon=new THREE.Mesh(mkBox(3.6,0.055,0.055),nm);
  neon.position.set(inX,3.52,z); neon.rotation.y=ry; scene.add(neon);
  // Dos mesitas con sillas
  [[z-2.8],[z+2.8]].forEach(([tz])=>{
    box(x+s*1.8,0,tz,0.85,0.72,0.85,0x5d3a1a);
    const mt=new THREE.Mesh(mkBox(0.88,0.05,0.88),mkStd(0xfff8e0,0.35,0.05));
    mt.position.set(x+s*1.8,0.745,tz); scene.add(mt);
    [[-0.55,0],[0.55,0],[0,-0.55],[0,0.55]].forEach(([ddx,ddz])=>box(x+s*1.8+ddx,0,tz+ddz,0.36,0.44,0.36,0x3d2510));
  });
  // Cartel
  const ct=tex(480,220,(ctx)=>{
    ctx.fillStyle='#1e0e04'; ctx.fillRect(0,0,480,220);
    const g=ctx.createLinearGradient(0,170,0,220); g.addColorStop(0,'#9b4f12'); g.addColorStop(1,'#1e0e04');
    ctx.fillStyle=g; ctx.fillRect(0,168,480,52);
    ctx.fillStyle='#f5c57a'; ctx.font='bold 62px Georgia'; ctx.textAlign='center'; ctx.fillText('☕  AeroCafé',240,88);
    ctx.fillStyle='#d4944a'; ctx.font='25px Arial'; ctx.fillText('Espresso · Cappuccino · Pastries',240,140);
    ctx.fillStyle='rgba(255,255,255,0.55)'; ctx.font='19px Arial'; ctx.fillText('Abierto 24h  ·  Open 24h',240,192);
  });
  sign(inX,h-0.15,z,4.0,1.85,0.06,ct,ry,0x110800);
}

// ── 2. KIOSCO / TIENDA EXPRESS ───────────────────
function buildConvenienceStore(x,z){
  const {inX,h,ry,s}=buildShopBase(x,z,9.0,2.2,0x152535,0x1a7a3e);
  // Estantes de snacks y revistas contra la pared trasera
  box(x+s*0.4,0,z,0.55,2.8,8.4,0x1a3050);
  [0.55,1.1,1.75,2.35].forEach(dy=>{
    for(let i=-3;i<=3;i++){
      const cols=[0xee4444,0x44aa66,0xf5a623,0x4488cc,0xcc44aa,0x55ccaa,0xffcc22];
      const cm=new THREE.Mesh(mkBox(0.05,0.48,0.7),mkMat(cols[Math.abs(i+dy*3|0)%7]));
      cm.position.set(x+s*0.68,dy+0.24,z+i*1.1); scene.add(cm);
    }
  });
  // Frigorífico con vidrio emissivo (bebidas)
  const fridge=new THREE.Mesh(mkBox(0.72,2.1,1.2),mkStd(0x0a2840,0.3,0.1));
  fridge.position.set(x+s*0.4,1.05,z+3.8); scene.add(fridge);
  const fgm=new THREE.MeshStandardMaterial({color:0x88ccff,transparent:true,opacity:0.22,roughness:0.1,emissive:0x1a4466,emissiveIntensity:0.45});
  const fg=new THREE.Mesh(mkBox(0.06,1.82,1.0),fgm);
  fg.position.set(x+s*0.8,1.05,z+3.8); scene.add(fg);
  // Mostrador con registradora
  const counter=new THREE.Mesh(mkBox(1.0,1.05,1.8),mkStd(0x1a3050,0.6,0.05));
  counter.position.set(inX,0.525,z+3.2); scene.add(counter);
  const ctop=new THREE.Mesh(mkBox(1.05,0.06,1.85),mkStd(0x2a4870,0.3,0.12));
  ctop.position.set(inX,1.08,z+3.2); scene.add(ctop);
  addMonitor(inX,1.09,z+3.2);
  // Cartel
  const kt=tex(480,220,(ctx)=>{
    ctx.fillStyle='#0a1e30'; ctx.fillRect(0,0,480,220);
    ctx.fillStyle='#1a7a3e'; ctx.fillRect(0,166,480,54);
    ctx.fillStyle='#4ade80'; ctx.font='bold 60px Arial'; ctx.textAlign='center'; ctx.fillText('🛒  Tienda Express',240,85);
    ctx.fillStyle='#a3e8b8'; ctx.font='24px Arial'; ctx.fillText('Snacks · Bebidas · Revistas · Viaje',240,138);
    ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font='19px Arial'; ctx.fillText('Convenience Store  ·  24h',240,190);
  });
  sign(inX,h-0.15,z-0.8,4.2,1.85,0.06,kt,ry,0x001a08);
}

// ── 3. LIBRERÍA & PRENSA ─────────────────────────
function buildNewsstand(x,z){
  const {inX,h,ry,s}=buildShopBase(x,z,8.5,2.2,0x1c1c24,0x3a5a90);
  // Pared de libros (estante full-height)
  box(x+s*0.4,0,z,0.55,3.2,7.8,0x1a1a22);
  [0.38,0.98,1.58,2.18,2.78].forEach(dy=>{
    for(let i=-3;i<=3;i++){
      const cols=[0x3344aa,0xaa3344,0x44aa55,0xaa7722,0x664488,0x228899,0xcc5522];
      const bk=new THREE.Mesh(mkBox(0.06,0.52,0.66),mkMat(cols[((i+3)+Math.round(dy))%7]));
      bk.position.set(x+s*0.71,dy+0.26,z+i*1.02); scene.add(bk);
    }
  });
  // Expositor inclinado de revistas (frente)
  const rack=new THREE.Mesh(mkBox(0.52,2.0,2.2),mkStd(0x2a2a32,0.7,0.05));
  rack.position.set(x+s*1.5,1.0,z-2.8); scene.add(rack);
  [0xff4444,0x4466ff,0x44aa44,0xff9900,0xcc44cc,0x00cccc].forEach((c,i)=>{
    const mg=new THREE.Mesh(mkBox(0.05,0.52,0.75),mkMat(c));
    mg.position.set(x+s*1.8,0.68+(i%2)*0.6,z-3.5+(i%3)*0.72); scene.add(mg);
  });
  // Mesita de hojeado
  box(x+s*1.8,0,z+3.1,0.78,0.7,0.78,0x2a2832);
  const mt=new THREE.Mesh(mkBox(0.8,0.05,0.8),mkStd(0xddd8f0,0.4,0.05));
  mt.position.set(x+s*1.8,0.725,z+3.1); scene.add(mt);
  // Cartel
  const nt=tex(480,220,(ctx)=>{
    ctx.fillStyle='#10101a'; ctx.fillRect(0,0,480,220);
    ctx.fillStyle='#3a5a90'; ctx.fillRect(0,166,480,54);
    ctx.fillStyle='#7eb8ff'; ctx.font='bold 56px Georgia'; ctx.textAlign='center'; ctx.fillText('📚  Libros & Prensa',240,85);
    ctx.fillStyle='#aaccee'; ctx.font='24px Arial'; ctx.fillText('Libros · Revistas · Snacks',240,138);
    ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font='19px Arial'; ctx.fillText('Books · Magazines · Snacks',240,190);
  });
  sign(inX,h-0.15,z,4.0,1.85,0.06,nt,ry,0x040416);
}

// ── 4. FARMACIA ──────────────────────────────────
function buildPharmacy(x,z){
  const {inX,h,ry,s}=buildShopBase(x,z,8.5,2.2,0x0e2018,0x1a9050);
  // Estante de medicamentos (cajas ordenadas)
  box(x+s*0.4,0,z,0.55,3.0,7.8,0x0e2018);
  [0.48,1.08,1.68,2.28].forEach(dy=>{
    for(let i=-3;i<=3;i++){
      const c=(i+dy)%2===0?0xeeeef8:0xd0eedd;
      const bx2=new THREE.Mesh(mkBox(0.06,0.45,0.7),mkMat(c));
      bx2.position.set(x+s*0.7,dy+0.22,z+i*1.0); scene.add(bx2);
    }
  });
  // Cruz médica en pared trasera
  const crossT=tex(256,256,(ctx)=>{
    ctx.fillStyle='#0e2018'; ctx.fillRect(0,0,256,256);
    ctx.fillStyle='#22cc66';
    ctx.fillRect(98,30,60,196); ctx.fillRect(30,98,196,60);
  });
  sign(x+s*0.14,2.5,z,1.8,1.8,0.05,crossT,ry,0x002211);
  // Mostrador con superficie blanca
  const counter=new THREE.Mesh(mkBox(1.0,1.05,2.2),mkStd(0x1a4030,0.55,0.05));
  counter.position.set(inX,0.525,z+2.5); scene.add(counter);
  const ctop=new THREE.Mesh(mkBox(1.05,0.06,2.25),mkStd(0xf0f4f0,0.3,0.1));
  ctop.position.set(inX,1.08,z+2.5); scene.add(ctop);
  addMonitor(inX,1.09,z+2.5);
  // Cartel
  const pt=tex(480,220,(ctx)=>{
    ctx.fillStyle='#081410'; ctx.fillRect(0,0,480,220);
    ctx.fillStyle='#1a9050'; ctx.fillRect(0,166,480,54);
    ctx.fillStyle='#22cc66'; ctx.font='bold 60px Arial'; ctx.textAlign='center'; ctx.fillText('🏥  Farmacia',240,86);
    ctx.fillStyle='#88ddaa'; ctx.font='24px Arial'; ctx.fillText('Medicamentos · Primeros Auxilios',240,138);
    ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font='19px Arial'; ctx.fillText('Travel Essentials  ·  Pharmacy',240,190);
  });
  sign(inX,h-0.15,z-0.8,4.0,1.85,0.06,pt,ry,0x001108);
}

// ── 5. RESTAURANTE / BAR ─────────────────────────
function buildRestaurant(x,z){
  const {inX,h,ry,s}=buildShopBase(x,z,9.0,2.2,0x1e0e06,0xc86430);
  // Barra principal
  const bar=new THREE.Mesh(mkBox(1.0,1.2,4.6),mkStd(0x2a1a0a,0.6,0.05));
  bar.position.set(inX,0.6,z-1.0); scene.add(bar);
  const btop=new THREE.Mesh(mkBox(1.05,0.07,4.7),mkStd(0x4a2808,0.3,0.15));
  btop.position.set(inX,1.245,z-1.0); scene.add(btop);
  // Taburetes
  [z-2.8,z-1.2,z+0.3].forEach(tz=>{
    cyl(x+s*1.9,0,tz,0.16,0.18,0.95,8,0x3a2010);
    cyl(x+s*1.9,0.95,tz,0.22,0.22,0.07,8,0x5a3018);
  });
  // Botellero detrás de la barra
  box(x+s*0.38,0,z-1.0,0.42,2.8,4.0,0x1a0e04);
  [0.55,1.15,1.75,2.35].forEach(dy=>{
    for(let i=-1;i<=1;i++){
      const bcol=[0x8a4a10,0x225040,0xaa3333,0x334488][((dy*2+i+4)|0)%4];
      cyl(x+s*0.6,dy,z-1.0+i*1.2,0.07,0.09,0.42,8,bcol);
    }
  });
  // Mesa con sillas
  box(x+s*1.7,0,z+3.4,1.1,0.72,1.1,0x3d2a12);
  const mt=new THREE.Mesh(mkBox(1.12,0.05,1.12),mkStd(0xfff0d8,0.4,0.05));
  mt.position.set(x+s*1.7,0.745,z+3.4); scene.add(mt);
  [[-0.6,0],[0.6,0],[0,-0.6],[0,0.6]].forEach(([ddx,ddz])=>box(x+s*1.7+ddx,0,z+3.4+ddz,0.42,0.45,0.42,0x2a1a0a));
  // Cartel
  const rt=tex(480,220,(ctx)=>{
    ctx.fillStyle='#120804'; ctx.fillRect(0,0,480,220);
    ctx.fillStyle='#c86430'; ctx.fillRect(0,165,480,55);
    ctx.fillStyle='#f0a060'; ctx.font='bold 58px Georgia'; ctx.textAlign='center'; ctx.fillText('🍽  El Rincón',240,84);
    ctx.fillStyle='#cc7840'; ctx.font='24px Arial'; ctx.fillText('Cocina del Viajero · Todo el día',240,138);
    ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font='19px Arial'; ctx.fillText('Full Menu  ·  Coffee & Drinks',240,190);
  });
  sign(inX,h-0.15,z-1.5,4.5,1.85,0.06,rt,ry,0x110400);
}

// ── 6. REGALOS & SOUVENIRS ───────────────────────
function buildGiftShop(x,z){
  const {inX,h,ry,s}=buildShopBase(x,z,8.5,2.2,0x16102a,0x7040a0);
  // Estante de regalos con cajas de colores
  box(x+s*0.4,0,z,0.55,3.2,7.8,0x1a1030);
  [[0.4,0xe74c3c],[0.95,0x3498db],[1.5,0x2ecc71],[2.1,0xf39c12],[2.65,0x9b59b6]].forEach(([dy,c])=>{
    for(let i=-3;i<=2;i++){
      const bx2=new THREE.Mesh(mkBox(0.06,0.5,0.75),mkMat(c));
      bx2.position.set(x+s*0.7,dy+0.25,z+i*1.1); scene.add(bx2);
    }
  });
  // Peluches decorativos (cilindros con cabeza esférica)
  [[z-2.5,0xcc4488],[z,0x44aacc],[z+2.5,0xee8844]].forEach(([tz,c])=>{
    cyl(x+s*1.6,0,tz,0.22,0.28,0.65,8,c);
    const head=new THREE.Mesh(new THREE.SphereGeometry(0.3,8,8),mkMat(c));
    head.position.set(x+s*1.6,0.95,tz); scene.add(head);
  });
  // Mostrador con caja registradora
  const counter=new THREE.Mesh(mkBox(1.0,1.05,2.0),mkStd(0x2a2040,0.55,0.05));
  counter.position.set(inX,0.525,z+2.8); scene.add(counter);
  const ctop=new THREE.Mesh(mkBox(1.05,0.06,2.05),mkStd(0xc0a8e0,0.35,0.1));
  ctop.position.set(inX,1.08,z+2.8); scene.add(ctop);
  addMonitor(inX,1.09,z+2.8);
  // Cartel
  const gt=tex(480,220,(ctx)=>{
    ctx.fillStyle='#0e0818'; ctx.fillRect(0,0,480,220);
    const g=ctx.createLinearGradient(0,0,480,0); g.addColorStop(0,'#7040a0'); g.addColorStop(1,'#4a2870');
    ctx.fillStyle=g; ctx.fillRect(0,164,480,56);
    ctx.fillStyle='#c080f0'; ctx.font='bold 56px Arial'; ctx.textAlign='center'; ctx.fillText('🎁  Regalos & Souvenirs',240,84);
    ctx.fillStyle='#d0a0f8'; ctx.font='24px Arial'; ctx.fillText('Recuerdos · Regalos · Artesanías',240,138);
    ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font='19px Arial'; ctx.fillText('Gifts · Souvenirs · Handcraft',240,190);
  });
  sign(inX,h-0.15,z-0.5,4.2,1.85,0.06,gt,ry,0x080418);
}

// ══════════════════════════════════════════════════
// DIRECTION SIGNS
// ══════════════════════════════════════════════════
function buildDirectionSigns(){
  [
    {z:44,txt:'← CHECK-IN  🧳  |  🔍 SEGURIDAD →',bg:'#f5f0e8',fg:'#1a2e42'},
    {z:22,txt:'← SEGURIDAD  🔍  |  🛋 SALA ESPERA →',bg:'#f5f0e8',fg:'#1a2e42'},
    {z:2, txt:'← SALA ESPERA  |  ✈ EMBARQUE →',bg:'#1a3a55',fg:'#fff'},
    {z:-18,txt:'← EMBARQUE  ✈  |  🛫 AVIÓN →',bg:'#1a3a55',fg:'#fff'},
    {z:-38,txt:'← AVIÓN  🛫  |  🏁 LLEGADA →',bg:'#0d2235',fg:'#fff'},
  ].forEach(({z,txt,bg,fg})=>{
    const t=tex(1024,128,(ctx)=>{ ctx.fillStyle=bg; ctx.fillRect(0,0,1024,128); ctx.fillStyle=fg; ctx.font='bold 46px Arial'; ctx.textAlign='center'; ctx.fillText(txt,512,82); });
    sign(0,11,z,13,1.2,0.12,t,0,0x080e1a);
    [-4.5,4.5].forEach(dx=>box(dx,8.5,z,0.06,2.8,0.06,0x888888,false,false));
  });
}

// ══════════════════════════════════════════════════
// FLIGHT DEPARTURE BOARD
// ══════════════════════════════════════════════════
function buildFlightBoard(){
  flightBoardCanvas=document.createElement('canvas'); flightBoardCanvas.width=1024; flightBoardCanvas.height=512;
  flightBoardCtx=flightBoardCanvas.getContext('2d');
  flightBoardTexture=new THREE.CanvasTexture(flightBoardCanvas);
  drawFlightBoard();
  const bm=new THREE.MeshLambertMaterial({map:flightBoardTexture,emissive:0x111111,emissiveIntensity:0.3});
  const brd=new THREE.Mesh(mkBox(14,5.5,0.2),bm); brd.position.set(-4,8.5,36); scene.add(brd);
  box(-4,8.5,36.12,14.4,5.9,0.15,0x333344,false,false);
  [-6,6].forEach(dx=>box(-4+dx,8,36.05,0.3,5.8,0.3,0x555566,false,false));
}

function drawFlightBoard(){
  const ctx=flightBoardCtx,w=1024,h=512;
  ctx.fillStyle='#080e1a'; ctx.fillRect(0,0,w,h);
  const hg=ctx.createLinearGradient(0,0,w,0); hg.addColorStop(0,'#1a3a55'); hg.addColorStop(1,'#0d2235');
  ctx.fillStyle=hg; ctx.fillRect(0,0,w,72);
  ctx.fillStyle='#fff'; ctx.font='bold 34px Arial'; ctx.textAlign='center'; ctx.fillText('✈  SALIDAS · DEPARTURES',w/2,48);
  const cols=[20,160,420,560,760];
  ctx.fillStyle='#4a9eff'; ctx.font='bold 22px Arial'; ctx.textAlign='left';
  ['VUELO','DESTINO','HORA','PUERTA','ESTADO'].forEach((h2,i)=>ctx.fillText(h2,cols[i],96));
  ctx.strokeStyle='#4a9eff'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(10,102); ctx.lineTo(w-10,102); ctx.stroke();
  FLIGHTS.forEach((f,i)=>{
    const y=135+i*46;
    ctx.fillStyle=i%2===0?'rgba(255,255,255,0.04)':'transparent'; ctx.fillRect(10,y-28,w-20,44);
    ctx.fillStyle='#fff'; ctx.font='24px monospace';
    ctx.fillText(f.code,cols[0],y); ctx.fillText(f.dest,cols[1],y); ctx.fillText(f.time,cols[2],y); ctx.fillText(f.gate,cols[3],y);
    ctx.fillStyle=f.statusColor; ctx.font='bold 20px Arial'; ctx.fillText(f.status,cols[4],y);
  });
  const now=new Date();
  ctx.fillStyle='#555'; ctx.font='18px monospace'; ctx.textAlign='right';
  ctx.fillText(`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`,w-15,h-12);
}

// ══════════════════════════════════════════════════
// EXTERIOR
// ══════════════════════════════════════════════════
// ══════════════════════════════════════════════════
// FASE 2 — ESTRUCTURAS BASE DEL HALL
// Bancos · Postes info · Ventanales laterales
// Marcadores de corredor
// ══════════════════════════════════════════════════

// ─── BANCOS DE TRANSICIÓN ────────────────────────
// Pares de bancos entre zonas del recorrido.
// Posición lateral (x=±11) para no bloquear el corredor.
function buildTransitionBenches(){
  [{z:+38},{z:+16},{z:-2},{z:-20}].forEach(({z})=>{
    buildAirportBench(-11,z,-Math.PI/2); // izquierda, cara al centro
    buildAirportBench( 11,z, Math.PI/2); // derecha, cara al centro
  });
}

function buildAirportBench(x,z,ry){
  const g=new THREE.Group();
  const seatM=mkStd(0x374558,0.75,0.02);   // azul pizarra
  const frameM=mkStd(0x8899aa,0.28,0.28);  // metal cepillado

  // 4 asientos conectados
  for(let i=0;i<4;i++){
    const sx=-1.6+i*1.08;
    const seat=new THREE.Mesh(mkBox(1.0,0.09,0.72),seatM);
    seat.position.set(sx,0.47,0); g.add(seat);
    const back=new THREE.Mesh(mkBox(1.0,0.55,0.07),seatM);
    back.position.set(sx,0.80,0.33); g.add(back);
  }
  // Apoyabrazos: extremos + central
  [-1.65,0,1.65].forEach(ax=>{
    const arm=new THREE.Mesh(mkBox(0.07,0.22,0.60),frameM);
    arm.position.set(ax,0.59,0.02); g.add(arm);
  });
  // Estructura metálica: 2 grupos de patas
  [-0.85,0.85].forEach(fx=>{
    const v=new THREE.Mesh(mkBox(0.06,0.47,0.06),frameM);
    v.position.set(fx,0.24,0); g.add(v);
    const h=new THREE.Mesh(mkBox(0.06,0.06,0.84),frameM);
    h.position.set(fx,0.06,0); g.add(h);
    const vb=new THREE.Mesh(mkBox(0.06,0.68,0.06),frameM);
    vb.position.set(fx,0.50,0.33); g.add(vb);
  });
  // Barra superior del respaldo
  const topBar=new THREE.Mesh(mkBox(3.58,0.06,0.06),frameM);
  topBar.position.set(0,1.02,0.33); g.add(topBar);

  g.position.set(x,0,z); g.rotation.y=ry;
  g.traverse(c=>{if(c.isMesh){c.castShadow=true;c.receiveShadow=true;}});
  scene.add(g);
}

// ─── POSTES DE INFORMACIÓN DIGITAL ───────────────
// 3 pares en zonas de transición (x=±7).
// No bloquean el corredor — están en el área de tiendas.
function buildInfoPosts(){
  buildInfoPost(-7,+36,'ℹ INFORMACIÓN',0x5ba4d4);
  buildInfoPost(+7,+36,'ℹ INFORMACIÓN',0x5ba4d4);
  buildInfoPost(-7,+14,'⚡ CARGA · WiFi',0x4ecdc4);
  buildInfoPost(+7,+14,'⚡ CARGA · WiFi',0x4ecdc4);
  buildInfoPost(-7,-16,'🚻 SERVICIOS',0x52b788);
  buildInfoPost(+7,-16,'🚻 SERVICIOS',0x52b788);
}

function buildInfoPost(x,z,label,col){
  const g=new THREE.Group();
  const frameMat=mkStd(0x607d8b,0.35,0.18);
  const baseMat=mkStd(0x2d4a63,0.5,0.08);

  // Base hexagonal
  const base=new THREE.Mesh(new THREE.CylinderGeometry(0.30,0.34,0.11,6),baseMat);
  base.position.set(0,0.06,0); g.add(base);
  // Columna
  const col_=new THREE.Mesh(new THREE.CylinderGeometry(0.052,0.062,1.32,8),frameMat);
  col_.position.set(0,0.71,0); g.add(col_);
  // Cabezal
  const head=new THREE.Mesh(mkBox(0.48,0.36,0.09),mkStd(0x1a2230,0.4,0.1));
  head.position.set(0,1.55,0); g.add(head);
  // Pantalla con canvas
  const screenTex=tex(256,192,(ctx)=>{
    ctx.fillStyle='#06101e'; ctx.fillRect(0,0,256,192);
    const accent='#'+col.toString(16).padStart(6,'0');
    ctx.fillStyle=accent; ctx.fillRect(0,0,256,4);
    ctx.fillStyle='#fff'; ctx.font='bold 22px Arial'; ctx.textAlign='center';
    ctx.fillText(label,128,52);
    ctx.fillStyle='rgba(255,255,255,0.48)'; ctx.font='14px Arial';
    ctx.fillText('Toque para consultar',128,86);
    ctx.fillText('Touch to inquire',128,106);
    // QR decorativo
    ctx.fillStyle='#fff'; ctx.fillRect(96,128,64,46);
    ctx.fillStyle='#111';
    for(let qi=0;qi<4;qi++) for(let qj=0;qj<4;qj++)
      if((qi+qj+qi*qj)%2===0) ctx.fillRect(98+qi*13,130+qj*10,11,8);
  });
  const screenM=new THREE.MeshLambertMaterial({
    map:screenTex,
    emissive:new THREE.Color(col).multiplyScalar(0.10),
    emissiveIntensity:1
  });
  const screen=new THREE.Mesh(mkBox(0.42,0.30,0.04),screenM);
  screen.position.set(0,1.55,-0.05); g.add(screen);
  // Luz sutil
  const pl=new THREE.PointLight(col,0.16,3.2);
  pl.position.set(0,1.8,-0.7); g.add(pl);

  g.position.set(x,0,z);
  g.traverse(c=>{if(c.isMesh){c.castShadow=true;c.receiveShadow=true;}});
  scene.add(g);
}

// ══════════════════════════════════════════════════
// VENTANALES LATERALES — Fase 7
// 5 ventanas por lado (vs. 3 anteriores), tamaño ampliado (7.5 × 5.5 u).
// 3 variantes de escena exterior: apron/plataforma, doble avión, jetway íntima.
// Las texturas se precomputan (3 canvas total) y se reusan para
// no generar 10 texturas distintas → rendimiento estable.
// ══════════════════════════════════════════════════
function buildSidewallWindows(){
  // Pre-renderizar las 3 variantes (reutilizadas entre ventanas)
  const extT=[0,1,2].map(v=>tex(768,384,(ctx)=>_drawExtScene(ctx,v)));

  // Posiciones en gaps libres de tiendas (verificado contra Fase 6)
  const pos=[
    {z:+44,vL:0,vR:1},
    {z:+28,vL:2,vR:0},
    {z: +6,vL:1,vR:2},
    {z:-14,vL:0,vR:1},
    {z:-38,vL:2,vR:0},
  ];
  pos.forEach(({z,vL,vR})=>{
    _buildSideWindow(-17,z,extT[vL]);
    _buildSideWindow(+17,z,extT[vR]);
  });
}

function _buildSideWindow(wx,wz,extTexture){
  const iw=wx<0?1:-1;
  const W=7.5, H=5.5, yc=5.5;
  const frameMat=mkStd(0xc8c8cc,0.28,0.35);

  // Marco de aluminio (4 barras perimetrales)
  [yc+H/2+0.08, yc-H/2-0.08].forEach(fy=>{
    const f=new THREE.Mesh(mkBox(0.22,0.14,W+0.3),frameMat);
    f.position.set(wx,fy,wz); scene.add(f);
  });
  [wz-W/2-0.08, wz+W/2+0.08].forEach(fz=>{
    const f=new THREE.Mesh(mkBox(0.22,H+0.3,0.14),frameMat);
    f.position.set(wx,yc,fz); scene.add(f);
  });
  // Barras divisorias interiores (patrón 2×2)
  const bH=new THREE.Mesh(mkBox(0.20,0.10,W-0.08),frameMat);
  bH.position.set(wx,yc,wz); scene.add(bH);
  const bV=new THREE.Mesh(mkBox(0.20,H-0.08,0.10),frameMat);
  bV.position.set(wx,yc,wz); scene.add(bV);
  // Antepecho destacado
  const sill=new THREE.Mesh(mkBox(0.34,0.12,W+0.5),mkStd(0xdad2c8,0.55,0.0));
  sill.position.set(wx+iw*0.10,yc-H/2+0.04,wz); scene.add(sill);

  // Panel de vista exterior (textura del apron)
  const glassMat=new THREE.MeshLambertMaterial({
    map:extTexture, transparent:true, opacity:0.93, side:THREE.DoubleSide
  });
  const glass=new THREE.Mesh(mkBox(0.09,H-0.14,W-0.14),glassMat);
  glass.position.set(wx+iw*0.10,yc,wz); scene.add(glass);

  // Tinte de vidrio (muy sutil, encima del panel)
  const tintM=new THREE.MeshStandardMaterial({
    color:0xd8f0ff,transparent:true,opacity:0.09,roughness:0.05,metalness:0.2
  });
  const tint=new THREE.Mesh(mkBox(0.05,H-0.14,W-0.14),tintM);
  tint.position.set(wx+iw*0.16,yc,wz); scene.add(tint);

  // Luz natural suave
  const wl=new THREE.PointLight(0xfff5e8,0.20,8);
  wl.position.set(wx+iw*2.8,5.8,wz); scene.add(wl);
}

// ── ESCENA EXTERIOR PROCEDURAL ──────────────────
// Dibuja cielo, nubes, plataforma de asfalto, marcas de rodaje,
// aeronaves y vehículos de apoyo tierra — todo en canvas 2D.
function _drawExtScene(ctx,variant){
  const w=ctx.canvas.width, h=ctx.canvas.height;

  // Cielo degradado
  const sky=ctx.createLinearGradient(0,0,0,h*0.58);
  sky.addColorStop(0,'#3a7eb8'); sky.addColorStop(0.45,'#68aed6'); sky.addColorStop(1,'#bcd8f0');
  ctx.fillStyle=sky; ctx.fillRect(0,0,w,h*0.58);

  // Nubes sutiles
  ctx.globalAlpha=0.52; ctx.fillStyle='#f0f8ff';
  [[w*.12,h*.08,88,22],[w*.48,h*.04,130,18],[w*.78,h*.13,72,20]].forEach(([cx,cy,rx,ry])=>{
    ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2); ctx.fill();
  });
  ctx.globalAlpha=0.30;
  [[w*.30,h*.10,55,13],[w*.65,h*.08,82,14]].forEach(([cx,cy,rx,ry])=>{
    ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2); ctx.fill();
  });
  ctx.globalAlpha=1;

  // Neblina horizonte
  const haze=ctx.createLinearGradient(0,h*.52,0,h*.63);
  haze.addColorStop(0,'rgba(195,220,242,0)'); haze.addColorStop(1,'rgba(195,220,240,0.52)');
  ctx.fillStyle=haze; ctx.fillRect(0,h*.52,w,h*.12);

  // Hangares/edificios lejanos
  ctx.fillStyle='#8898aa';
  [[w*.06,30,44],[w*.28,18,34],[w*.62,24,50],[w*.85,34,58]].forEach(([bx,bh,bw])=>{
    ctx.fillRect(bx-bw/2,h*.58-bh,bw,bh);
    ctx.fillStyle='#707a86'; ctx.fillRect(bx-7,h*.58-bh+5,14,bh-5); ctx.fillStyle='#8898aa';
  });

  // Plataforma / tarmac
  const tarmac=ctx.createLinearGradient(0,h*.58,0,h);
  tarmac.addColorStop(0,'#586870'); tarmac.addColorStop(0.3,'#4a5a62'); tarmac.addColorStop(1,'#3a4a52');
  ctx.fillStyle=tarmac; ctx.fillRect(0,h*.58,w,h*.42);

  // Marcas de plataforma
  ctx.strokeStyle='rgba(255,255,255,0.28)'; ctx.lineWidth=2.5;
  ctx.setLineDash([22,16]);
  [h*.76,h*.89].forEach(my=>{ctx.beginPath();ctx.moveTo(0,my);ctx.lineTo(w,my);ctx.stroke();});
  ctx.setLineDash([]);
  ctx.strokeStyle='rgba(210,178,38,0.38)'; ctx.lineWidth=2; ctx.setLineDash([18,12]);
  ctx.beginPath(); ctx.moveTo(0,h*.70); ctx.lineTo(w,h*.70); ctx.stroke();
  ctx.setLineDash([]);

  // Escenas por variante
  if(variant===0){
    _drawPlane(ctx,w*.65,h*.44,1.05,'#d4d8e6');
    _drawPlane(ctx,w*.18,h*.52,0.52,'#dde0ea',true);
    _drawVehicle(ctx,w*.32,h*.73,'#e08030','fuel');
    // Pasarela de embarque
    ctx.fillStyle='#7888a0'; ctx.fillRect(w*.46,h*.60,100,11); ctx.fillRect(w*.46-12,h*.58,14,16);
  } else if(variant===1){
    _drawPlane(ctx,w*.35,h*.46,0.88,'#d6dae6');
    _drawPlane(ctx,w*.72,h*.50,0.64,'#e0e4ee',true);
    _drawVehicle(ctx,w*.55,h*.78,'#4488cc','luggage');
    ctx.fillStyle='#d04020'; ctx.fillRect(w*.18,h*.80,18,8); ctx.fillRect(w*.18-3,h*.81,5,7);
  } else {
    _drawPlane(ctx,w*.58,h*.41,1.18,'#d2d8e4');
    // Jetway detallada
    ctx.fillStyle='#78889a';
    ctx.fillRect(w*.22,h*.58,148,13); ctx.fillRect(w*.22-10,h*.56,14,18); ctx.fillRect(w*.22+146,h*.55,12,18);
    // Personal de tierra
    ctx.fillStyle='#f5a023'; [w*.38,w*.46].forEach(px=>{ctx.fillRect(px,h*.73,8,13);});
  }
}

// Perfil simplificado de aeronave comercial (fuselaje + alas + cola + motores + ventanas)
function _drawPlane(ctx,cx,cy,sc,color,flip=false){
  ctx.save(); ctx.translate(cx,cy); if(flip) ctx.scale(-1,1);
  ctx.fillStyle=color;
  // Fuselaje
  ctx.beginPath(); ctx.ellipse(0,0,68*sc,11*sc,0,0,Math.PI*2); ctx.fill();
  // Morro
  ctx.beginPath(); ctx.moveTo(60*sc,-3*sc); ctx.quadraticCurveTo(82*sc,0,60*sc,3*sc); ctx.fill();
  // Cola vertical
  ctx.beginPath();
  ctx.moveTo(-65*sc,-2*sc); ctx.lineTo(-55*sc,-22*sc); ctx.lineTo(-48*sc,-22*sc); ctx.lineTo(-44*sc,-2*sc);
  ctx.closePath(); ctx.fill();
  // Cola horizontal
  ctx.beginPath(); ctx.ellipse(-57*sc,2*sc,22*sc,5*sc,-0.12,0,Math.PI*2); ctx.fill();
  // Ala
  ctx.beginPath();
  ctx.moveTo(20*sc,-3*sc); ctx.lineTo(-32*sc,-3*sc); ctx.lineTo(-56*sc,-1*sc); ctx.lineTo(24*sc,3*sc);
  ctx.closePath(); ctx.fill();
  // Franja de aerolínea
  ctx.fillStyle='rgba(44,90,155,0.48)';
  ctx.fillRect(-62*sc,-4*sc,112*sc,5*sc);
  // Ventanas
  ctx.fillStyle='rgba(155,210,238,0.88)';
  for(let i=0;i<9;i++){ctx.beginPath();ctx.arc((-32+i*11)*sc,-4*sc,2.8*sc,0,Math.PI*2);ctx.fill();}
  // Motores
  ctx.fillStyle='#9aa0aa';
  ctx.beginPath(); ctx.ellipse(8*sc,9*sc,10*sc,5*sc,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(-20*sc,10*sc,8*sc,4*sc,0,0,Math.PI*2); ctx.fill();
  // Aro motor
  ctx.fillStyle='#c0c5cc';
  ctx.beginPath(); ctx.arc(18*sc,9*sc,4*sc,0,Math.PI*2); ctx.fill();
  ctx.restore();
}

// Vehículo de plataforma: cabina + carrocería + ruedas + elemento del tipo
function _drawVehicle(ctx,x,y,color,type){
  ctx.fillStyle=color;
  ctx.fillRect(x-3,y-8,10,8);     // cabina
  ctx.fillRect(x-3,y,28,9);       // carrocería
  ctx.fillStyle='#222';
  [x+2,x+20].forEach(cx=>{ctx.beginPath();ctx.arc(cx,y+11,3.5,0,Math.PI*2);ctx.fill();});
  if(type==='fuel'){
    ctx.fillStyle='#e0e0e0';
    ctx.beginPath(); ctx.ellipse(x+22,y+4,15,6,0,0,Math.PI*2); ctx.fill();
  } else {
    ctx.fillStyle='rgba(0,0,0,0.3)';
    ctx.fillRect(x+10,y-1,14,7);  // carro de equipajes
  }
}

// ── VISTA DE PLATAFORMA DESDE LA ENTRADA — Fase 7 ─
// Telón exterior visible desde el interior al mirar hacia la entrada
// (player empieza en z=52 mirando en +z; this plane is at z=62).
function buildEntranceTarmacView(){
  const extT=tex(1024,512,(ctx)=>{
    const w=1024,h=512;
    // Cielo
    const sky=ctx.createLinearGradient(0,0,0,h*.55);
    sky.addColorStop(0,'#3a7eb8'); sky.addColorStop(0.45,'#68b0d8'); sky.addColorStop(1,'#b8d8f0');
    ctx.fillStyle=sky; ctx.fillRect(0,0,w,h*.55);
    // Nubes
    ctx.globalAlpha=0.55; ctx.fillStyle='#f0f8ff';
    [[140,38,110,26],[480,22,170,22],[820,52,90,24]].forEach(([cx,cy,rx,ry])=>{
      ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2); ctx.fill();
    });
    ctx.globalAlpha=1;
    // Horizonte
    const haze=ctx.createLinearGradient(0,h*.48,0,h*.60);
    haze.addColorStop(0,'rgba(195,222,240,0)'); haze.addColorStop(1,'rgba(195,222,240,0.58)');
    ctx.fillStyle=haze; ctx.fillRect(0,h*.48,w,h*.13);
    // Edificios terminal
    ctx.fillStyle='#8898a8';
    [[130,55,280],[620,42,120],[820,70,160]].forEach(([bx,bh,bw])=>{
      ctx.fillRect(bx-bw/2,h*.55-bh,bw,bh);
    });
    // Tarmac
    const tarmac=ctx.createLinearGradient(0,h*.55,0,h);
    tarmac.addColorStop(0,'#566870'); tarmac.addColorStop(0.35,'#486058'); tarmac.addColorStop(1,'#3a4850');
    ctx.fillStyle=tarmac; ctx.fillRect(0,h*.55,w,h*.45);
    // Marcas
    ctx.strokeStyle='rgba(210,178,38,0.40)'; ctx.lineWidth=3; ctx.setLineDash([30,20]);
    [h*.72,h*.85].forEach(my=>{ctx.beginPath();ctx.moveTo(0,my);ctx.lineTo(w,my);ctx.stroke();});
    ctx.setLineDash([]);
    ctx.strokeStyle='rgba(255,255,255,0.25)'; ctx.lineWidth=2.5; ctx.setLineDash([18,14]);
    ctx.beginPath(); ctx.moveTo(w/2,h*.55); ctx.lineTo(w/2,h); ctx.stroke();
    ctx.setLineDash([]);
    // 3 aeronaves en plataforma
    _drawPlane(ctx,w*.58,h*.40,1.40,'#d0d8e6');
    _drawPlane(ctx,w*.16,h*.48,0.72,'#dde0ea',true);
    _drawPlane(ctx,w*.84,h*.50,0.60,'#d8dce8');
    // Pasarela central
    ctx.fillStyle='#778898';
    ctx.fillRect(w*.38,h*.56,165,14); ctx.fillRect(w*.38-12,h*.54,16,18);
    // Vehículos
    _drawVehicle(ctx,w*.43,h*.74,'#e08030','fuel');
    _drawVehicle(ctx,w*.22,h*.81,'#4488cc','luggage');
    // Personal (siluetas pequeñas)
    ctx.fillStyle='#f5a023';
    [w*.60,w*.67].forEach(px=>{ctx.fillRect(px,h*.74,8,13);});
    // Reflejo sutil
    const shine=ctx.createLinearGradient(0,0,w*.25,0);
    shine.addColorStop(0,'rgba(255,255,255,0.10)'); shine.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=shine; ctx.fillRect(0,0,w,h);
  });

  // Panel backdrop (visible al mirar hacia el exterior desde dentro del hall)
  const mat=new THREE.MeshLambertMaterial({map:extT,side:THREE.FrontSide});
  const backdrop=new THREE.Mesh(mkBox(38,12,0.12),mat);
  backdrop.position.set(0,7,62); scene.add(backdrop);

  // Piso de tarmac (continuación del suelo entre las puertas y el backdrop)
  const tarmacT=tex(512,512,(ctx)=>{
    const g=ctx.createLinearGradient(0,0,512,512);
    g.addColorStop(0,'#4a5860'); g.addColorStop(1,'#3a4850');
    ctx.fillStyle=g; ctx.fillRect(0,0,512,512);
    ctx.strokeStyle='rgba(200,170,35,0.38)'; ctx.lineWidth=4; ctx.setLineDash([32,22]);
    [128,256,384].forEach(l=>{
      ctx.beginPath(); ctx.moveTo(l,0); ctx.lineTo(l,512); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,l); ctx.lineTo(512,l); ctx.stroke();
    });
    ctx.setLineDash([]);
  });
  tarmacT.wrapS=tarmacT.wrapT=THREE.RepeatWrapping; tarmacT.repeat.set(3,4);
  const tarmacFloor=new THREE.Mesh(
    new THREE.PlaneGeometry(38,14),
    new THREE.MeshLambertMaterial({map:tarmacT})
  );
  tarmacFloor.rotation.x=-Math.PI/2; tarmacFloor.position.set(0,0.01,56); scene.add(tarmacFloor);
}

// ─── MARCADORES DE BORDE DEL CORREDOR ────────────
// Jardineras/columnitas bajas en x=±10 a intervalos.
// Definen visualmente el límite corredor↔zona de tiendas.
// Altura 0.6 m — no bloquean la vista. Alternadas: con/sin planta.
function buildCorridorEdgeMarkers(){
  const positions=[+44,+34,+22,+10,-1,-14,-25,-38];
  positions.forEach((mz,idx)=>{
    [-10,10].forEach(mx=>{
      const g=new THREE.Group();
      const stoneMat=mkStd(0xd2cac0,0.68,0.02);

      // Base cuadrada
      const base=new THREE.Mesh(mkBox(0.60,0.50,0.60),stoneMat);
      base.position.set(0,0.25,0); g.add(base);
      // Moldura superior
      const top=new THREE.Mesh(mkBox(0.72,0.07,0.72),mkStd(0xc8c0b4,0.55,0.03));
      top.position.set(0,0.54,0); g.add(top);

      // Alterna: jardinera con plantita vs. columna lisa
      if(idx%2===0){
        const soil=new THREE.Mesh(mkBox(0.56,0.16,0.56),mkStd(0x2a3a2a,0.8,0.0));
        soil.position.set(0,0.66,0); g.add(soil);
        const lm=mkStd(0x3d7a38,0.75,0.0);
        [[-0.11,0.08],[0.11,0.08],[0,-0.11],[0,0.11]].forEach(([dx,dz])=>{
          const leaf=new THREE.Mesh(new THREE.SphereGeometry(0.13,5,5),lm);
          leaf.position.set(dx,0.88,dz); leaf.scale.y=0.52; g.add(leaf);
        });
        // Centro de la planta
        const center=new THREE.Mesh(new THREE.SphereGeometry(0.10,5,5),lm);
        center.position.set(0,0.92,0); center.scale.y=0.5; g.add(center);
      }

      g.position.set(mx,0,mz);
      g.traverse(c=>{if(c.isMesh){c.castShadow=true;c.receiveShadow=true;}});
      scene.add(g);
    });
  });
}

// ─── FASE 3: PUESTOS FUNCIONALES DEL HALL ────────
// Mostradores modulares que dan identidad aeroportuaria
// sin invadir el corredor central (|x|>=9, lejos de
// los radios de activación de zona — distancia > 9).
// Reutilizan el patrón Group + mkBox/mkStd ya usado
// en bancos, postes y ventanas (Fase 2).
function buildServicePosts(){
  buildServiceDesk(-9, 33, Math.PI/2,  {label:'CHECK-IN ADICIONAL', sub:'Aerolíneas asociadas · Partner counters', col:0x8b5cf6, icon:'🧳'});
  buildServiceDesk( 9, -5, -Math.PI/2, {label:'INFORMACIÓN Y ORIENTACIÓN', sub:'Mapas · Horarios · Ayuda general', col:0x5ba4d4, icon:'ℹ'});
  buildServiceDesk(-9,-33, Math.PI/2,  {label:'ASISTENCIA Y ACCESO', sub:'Movilidad reducida · Apoyo al pasajero', col:0x52b788, icon:'🤝'});
}

function buildServiceDesk(x,z,ry,cfg){
  const g=new THREE.Group();
  const bodyM=mkStd(0x2d4a63,0.6,0.15);
  const topM=mkStd(0x9fb3c8,0.4,0.25);
  const hexCol='#'+cfg.col.toString(16).padStart(6,'0');

  // Cuerpo del mostrador y superficie
  const front=new THREE.Mesh(mkBox(3.4,1.15,0.7),bodyM);
  front.position.set(0,0.575,0); g.add(front);
  const top=new THREE.Mesh(mkBox(3.7,0.1,0.85),topM);
  top.position.set(0,1.2,0); g.add(top);
  // Zócalo de color institucional (franja inferior)
  const stripe=new THREE.Mesh(mkBox(3.42,0.16,0.02),mkStd(cfg.col,0.5,0.1,{emissive:cfg.col,emissiveIntensity:0.18}));
  stripe.position.set(0,0.12,0.36); g.add(stripe);

  // Panel frontal con identificación (texto + ícono)
  const dt=tex(512,256,(ctx)=>{
    ctx.fillStyle='#16202c'; ctx.fillRect(0,0,512,256);
    const grad=ctx.createLinearGradient(0,0,512,256);
    grad.addColorStop(0,hexCol); grad.addColorStop(1,'#16202c');
    ctx.globalAlpha=0.30; ctx.fillStyle=grad; ctx.fillRect(0,0,512,256); ctx.globalAlpha=1;
    ctx.fillStyle='#fff'; ctx.font='bold 38px Arial'; ctx.textAlign='center';
    ctx.fillText(`${cfg.icon}  ${cfg.label}`,256,108);
    ctx.fillStyle='#cbd5e1'; ctx.font='21px Arial';
    ctx.fillText(cfg.sub,256,156);
  });
  const panel=new THREE.Mesh(mkBox(3.1,0.78,0.04),new THREE.MeshLambertMaterial({map:dt}));
  panel.position.set(0,0.62,0.37); g.add(panel);

  // Monitores sobre el mostrador (geometría simple, reutiliza estética de addMonitor)
  [-0.95,0.95].forEach(mx=>{
    const base=new THREE.Mesh(mkBox(0.1,0.22,0.06),mkStd(0x333344,0.6));
    base.position.set(mx,1.32,-0.18); g.add(base);
    const screen=new THREE.Mesh(mkBox(0.78,0.55,0.05),mkStd(0x1a1a2e,0.5));
    screen.position.set(mx,1.65,-0.2); g.add(screen);
    const glow=new THREE.Mesh(mkBox(0.7,0.46,0.02),new THREE.MeshLambertMaterial({color:0x1a4a7a,emissive:0x1a3355,emissiveIntensity:0.4}));
    glow.position.set(mx,1.65,-0.175); g.add(glow);
  });

  // Banderín colgante de identificación (visible desde lejos)
  const pt=tex(256,128,(ctx)=>{
    ctx.fillStyle=hexCol; ctx.fillRect(0,0,256,128);
    ctx.fillStyle='rgba(0,0,0,0.18)'; ctx.fillRect(0,98,256,30);
    ctx.fillStyle='#fff'; ctx.font='bold 30px Arial'; ctx.textAlign='center';
    ctx.fillText(`${cfg.icon}  ${cfg.label.split(' ')[0]}`,128,58);
    ctx.fillStyle='#fff'; ctx.font='16px Arial'; ctx.fillText(cfg.label.split(' ').slice(1).join(' '),128,86);
  });
  const flag=new THREE.Mesh(mkBox(1.7,0.85,0.05),new THREE.MeshLambertMaterial({map:pt,emissive:0x111111,emissiveIntensity:0.25}));
  flag.position.set(0,2.55,0); g.add(flag);
  const pole=new THREE.Mesh(mkBox(0.05,1.35,0.05),mkStd(0x8899aa,0.3,0.3));
  pole.position.set(0,1.95,0); g.add(pole);

  // Banqueta tras el mostrador (presencia funcional, sin NPC fijo)
  const stool=new THREE.Mesh(new THREE.CylinderGeometry(0.26,0.22,0.5,10),mkStd(0x374151,0.7,0.05));
  stool.position.set(0,0.25,-0.55); g.add(stool);
  const stoolTop=new THREE.Mesh(new THREE.CylinderGeometry(0.27,0.27,0.06,10),mkStd(0x4a5568,0.6,0.05));
  stoolTop.position.set(0,0.51,-0.55); g.add(stoolTop);

  g.position.set(x,0,z); g.rotation.y=ry;
  g.traverse(c=>{if(c.isMesh){c.castShadow=true; c.receiveShadow=true;}});
  scene.add(g);
}

function buildExterior(){
  buildDetailedPlane(-28,0,-44,0.12);
  buildDetailedPlane(26,0,-30,-0.15);
  buildDetailedPlane(-18,0,-12,0.05);
  buildTower(55,0,0);
  addClouds();
}

function buildDetailedPlane(x,y,z,ry){
  const g=new THREE.Group(); g.position.set(x,y,z); g.rotation.y=ry;
  const fm=mkMat(0xf0f0f0); const bm=mkMat(0x2255aa);
  const fuse=new THREE.Mesh(new THREE.CylinderGeometry(2.2,2.2,30,14),fm); fuse.rotation.z=Math.PI/2; g.add(fuse);
  const nose=new THREE.Mesh(new THREE.ConeGeometry(2.2,6,14),fm); nose.rotation.z=Math.PI/2; nose.position.set(18,0,0); g.add(nose);
  [[0,-0.3,10],[0,-0.3,-10]].forEach(([ex,ey,ez])=>{ const w=new THREE.Mesh(mkBox(5,0.4,22),fm); w.position.set(ex,ey,ez); g.add(w); });
  [[-12,3,0]].forEach(([ex,ey,ez])=>{ const t=new THREE.Mesh(mkBox(0.5,6,0.5),fm); t.position.set(ex,ey,ez); g.add(t); });
  [[4,-2,7],[4,-2,-7]].forEach(([ex,ey,ez])=>{ const en=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.4,6,12),mkMat(0xaaaaaa)); en.rotation.z=Math.PI/2; en.position.set(ex,ey,ez); g.add(en); });
  const stripe=new THREE.Mesh(mkBox(30,0.4,1.2),bm); stripe.position.set(0,1.5,0); g.add(stripe);
  for(let wx=-8;wx<=10;wx+=2.2){ const wm=mkMat(0x88c8e8,{transparent:true,opacity:0.7}); [2.2,-2.2].forEach(wz=>{ const w=new THREE.Mesh(mkBox(0.1,0.9,1.1),wm); w.position.set(wx,1.8,wz); g.add(w); }); }
  scene.add(g);
}

function buildTower(x,y,z){
  box(x,y,z,6,40,6,0xd8d0c8);
  box(x,40,z,10,5,10,0xc8c0b8,false,false);
  const gm=mkMat(0x88c8e8,{transparent:true,opacity:0.5}); const gl=new THREE.Mesh(mkBox(9.5,3.5,9.5),gm); gl.position.set(x,42.5,z); scene.add(gl);
  box(x,44.5,z,10.5,0.4,10.5,0xb0a898,false,false);
  box(x,45,z,0.3,8,0.3,0x888899,false,false);
  cyl(x+2,44.5,z,1.5,0.1,0.3,12,0x888899,false);
}

function addClouds(){
  const cm=mkMat(0xffffff,{transparent:true,opacity:0.88});
  for(let i=0;i<22;i++){
    const cx=(Math.random()-0.5)*500,cy=70+Math.random()*55,cz=(Math.random()-0.5)*500;
    const s=6+Math.random()*14;
    [0,1.5,-1.5,3,-3,0.8,-0.8].forEach(dx=>{ const c=new THREE.Mesh(new THREE.SphereGeometry(s*(0.5+Math.random()*0.5),7,7),cm); c.position.set(cx+dx*4,cy+(Math.random()-0.5)*5,cz+(Math.random()-0.5)*5); scene.add(c); });
  }
}

// ══════════════════════════════════════════════════
// PROP HELPERS
// ══════════════════════════════════════════════════
function addMonitor(x,y,z){
  box(x,y,z,0.9,0.65,0.06,0x1a1a2e);
  const sm=mkMat(0x1a4a7a,{emissive:0x1a3355,emissiveIntensity:0.4});
  const s=new THREE.Mesh(mkBox(0.82,0.55,0.02),sm); s.position.set(x,y+0.32,z-0.04); scene.add(s);
  box(x,y-0.05,z,0.1,0.25,0.06,0x333344); box(x,y-0.06,z,0.3,0.04,0.2,0x333344);
}

function addCart(x,z){
  [0,0.5,1.0].forEach(dy=>box(x,dy,z,0.8,0.06,1.5,0xaaaaaa));
  [-0.7,0.7].forEach(dz=>box(x,0,z+dz,0.06,1.1,0.06,0x888888,false));
  box(x,1.1,z,0.06,0.12,1.55,0x888888,false);
}

function addPlant(x,z){
  cyl(x,0,z,0.35,0.4,0.7,10,0x8b6344);
  cyl(x,0.7,z,0.05,0.05,1.2,6,0x556633);
  const lm=mkMat(0x3d7a3d);
  [[-0.3,0.5],[0.3,0.5],[0,0.8],[-0.4,0.3],[0.4,0.3]].forEach(([dx,dy])=>{ const l=new THREE.Mesh(new THREE.SphereGeometry(0.48,6,6),lm); l.position.set(x+dx,1.7+dy,z); l.scale.y=0.55; scene.add(l); });
}

function addPlantLarge(x,z){
  cyl(x,0,z,0.55,0.65,0.9,10,0x7a5a3a);
  cyl(x,0.9,z,0.08,0.08,1.8,6,0x556633);
  const lm=mkMat(0x2d6a2d);
  for(let i=0;i<8;i++){ const angle=(i/8)*Math.PI*2,r=0.5+(i%2)*0.3; const l=new THREE.Mesh(new THREE.SphereGeometry(0.62,6,6),lm); l.position.set(x+Math.cos(angle)*r,2.5+(i%3)*0.3,z+Math.sin(angle)*r); l.scale.y=0.55; scene.add(l); }
}

function addVending(x,z){
  box(x,0,z,1.1,2.3,0.75,0x2244aa);
  const vt=tex(128,256,(ctx)=>{ ctx.fillStyle='#0a1a44'; ctx.fillRect(0,0,128,256); ctx.fillStyle='#4488ff'; ctx.font='bold 16px Arial'; ctx.textAlign='center'; ctx.fillText('SNACKS & DRINKS',64,35); ['🥤','🍫','🥨','🍪','🥜','🍬'].forEach((e,i)=>{ctx.font='28px Arial'; ctx.fillText(e,32+(i%2)*60,80+Math.floor(i/2)*55);}); ctx.fillStyle='#223366'; ctx.fillRect(10,200,108,40); ctx.fillStyle='#88aaff'; ctx.font='13px Arial'; ctx.fillText('Introduce monedas',64,225); });
  sign(x,1.15,z-0.39,1.0,1.8,0.05,vt,0,0x000833);
}

function addSuitcase(x,y,z,color){
  box(x,y-0.4,z,0.72,0.58,0.32,color);
  box(x,y,z,0.62,0.06,0.27,0x888888,false);
}

// ══════════════════════════════════════════════════
// CHARACTER BUILDER V2 — GTA-style realistic humanoids
// Proporciones reales 1:7.5, PBR materials, mayor detalle
// ══════════════════════════════════════════════════
const SKINS=[0xfde0bd,0xf5c8a0,0xe8b88a,0xc88a52,0x9a6438,0xfad6a5];
const HAIRS=[0x0f0b08,0x3b1f0f,0x6b4226,0xd4a832,0x888888,0xcc4400,0x1a0f08];
const TOPS =[0x1a4a99,0xbb2211,0x1a7744,0x6622aa,0xbb7711,0x1199bb,0x775522,0x991144];

function buildCharacter(opts){
  const{skin=0xf5c8a0,hair=0x1a1008,top=0x1a4a99,pants=0x1a2a3a,shoes=0x0a0a0a,
        role='civilian',hatCol=0x0d1f3c,tieCol=0xbb1111}=opts;
  const g=new THREE.Group();

  // Materiales PBR por tipo de superficie
  const sM=mkStd(skin,0.62,0.0);                       // piel — ligera especularidad
  const tM=mkStd(top,0.88,0.0);                        // tela ropa — mate
  const pM=mkStd(pants,0.85,0.0);                      // pantalón
  const shM=mkStd(shoes,0.35,0.15);                    // zapatos — cuero brillante
  const wM=mkStd(0xfafafa,0.1,0.0);                    // blanco ojos
  const dM=mkStd(0x050508,0.4,0.0);                    // pupilas
  const darkTop=mkStd(top,0.95,0.0,{color:new THREE.Color(top).multiplyScalar(0.6)});

  const BX=(w,h,d,m,px,py,pz,rx=0,ry=0)=>{
    const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);
    o.position.set(px,py,pz); o.rotation.x=rx; o.rotation.y=ry;
    o.castShadow=true; o.receiveShadow=true; return o;
  };
  const SP=(r,segs,m,px,py,pz)=>{
    const o=new THREE.Mesh(new THREE.SphereGeometry(r,segs,Math.ceil(segs*0.7)),m);
    o.position.set(px,py,pz); o.castShadow=true; return o;
  };
  const CY=(rt,rb,h,s,m,px,py,pz)=>{
    const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,s),m);
    o.position.set(px,py,pz); o.castShadow=true; return o;
  };
  const CO=(r,h,s,m,px,py,pz)=>{
    const o=new THREE.Mesh(new THREE.ConeGeometry(r,h,s),m);
    o.position.set(px,py,pz); o.castShadow=true; return o;
  };

  // ── ZAPATOS con puntera redondeada y suela diferenciada
  const soleM=mkStd(0x050505,0.6,0.0);
  const shoeM=mkStd(shoes,0.32,0.18);
  [-0.145,0.145].forEach(sx=>{
    // Suela
    g.add(BX(0.23,0.04,0.36,soleM,sx,0.02,0.04));
    // Cuerpo zapato
    g.add(BX(0.21,0.08,0.33,shoeM,sx,0.07,0.03));
    // Puntera ligeramente saliente
    const pt=new THREE.Mesh(new THREE.SphereGeometry(0.105,8,6),shoeM);
    pt.scale.set(1,0.55,1.2); pt.position.set(sx,0.075,0.175);
    pt.castShadow=true; g.add(pt);
  });

  // ── CALCETINES (visible entre zapato y pantalón)
  [-0.145,0.145].forEach(sx=>g.add(BX(0.175,0.08,0.2,mkStd(0xdddddd,0.9,0),sx,0.13,-0.02)));

  // ── PIERNAS con muslo cónico (más ancho arriba) y espinilla más delgada
  const legPivotY=0.85;
  [-1,1].forEach(s=>{
    const lg=new THREE.Group(); lg.position.set(s*0.135,legPivotY,0);
    // Muslo — CylinderGeometry más realista
    lg.add(new THREE.Mesh(new THREE.CylinderGeometry(0.11,0.095,0.40,8),pM)); // thigh
    lg.children[0].position.set(0,-0.20,0); lg.children[0].castShadow=true;
    // Rodilla — esfera aplanada
    const knee=SP(0.098,7,mkStd(pants,0.9,0),0,-0.42,0.02); knee.scale.set(1,0.75,0.95); lg.add(knee);
    // Pantorrilla
    lg.add(new THREE.Mesh(new THREE.CylinderGeometry(0.087,0.082,0.36,8),pM));
    lg.children[2].position.set(0,-0.63,0); lg.children[2].castShadow=true;
    lg.userData={isLeg:true,side:-s}; g.add(lg);
  });

  // ── CINTURA y cadera
  { const h=new THREE.Mesh(new THREE.CylinderGeometry(0.155,0.18,0.12,10),pM); h.position.set(0,0.88,0); h.castShadow=true; g.add(h); }

  // ── TORSO trapezoidal (más ancho en hombros — proporción natural)
  // Parte baja del torso
  g.add(BX(0.42,0.30,0.26,tM,0,1.02,0));
  // Parte alta (más ancha — pecho)
  g.add(BX(0.50,0.32,0.28,tM,0,1.31,0));
  // Detalle costados del torso (ligero sombreado)
  g.add(BX(0.04,0.56,0.24,darkTop,-0.25,1.15,0));
  g.add(BX(0.04,0.56,0.24,darkTop, 0.25,1.15,0));
  // Hombros redondeados — esferas
  [-0.27,0.27].forEach(sx=>{
    const sh=SP(0.115,8,tM,sx,1.43,0); sh.scale.set(1,0.8,0.9); g.add(sh);
  });

  // ── BRAZOS — forma más cilíndrica y natural
  [-1,1].forEach(s=>{
    const ag=new THREE.Group(); ag.position.set(s*0.315,1.43,0);
    // Brazo superior
    ag.add(new THREE.Mesh(new THREE.CylinderGeometry(0.092,0.082,0.34,8),tM));
    ag.children[0].position.set(0,-0.18,0); ag.children[0].castShadow=true;
    // Codo
    const elb=SP(0.082,7,mkStd(top,0.9,0),0,-0.37,0); elb.scale.set(1,0.75,1); ag.add(elb);
    // Antebrazo
    ag.add(new THREE.Mesh(new THREE.CylinderGeometry(0.075,0.065,0.30,8),sM));
    ag.children[2].position.set(0,-0.54,0); ag.children[2].castShadow=true;
    // Mano
    ag.add(BX(0.155,0.12,0.105,sM,0,-0.70,0));
    // Dedos insinuados (3 líneas)
    [-.045,0,.045].forEach(fx=>ag.add(BX(0.028,0.08,0.018,mkStd(skin,0.7,0),fx,-0.775,0.04)));
    // Pulgar
    ag.add(BX(0.06,0.075,0.06,sM,s*0.095,-0.70,0.04));
    ag.userData={isArm:true,side:s}; g.add(ag);
  });

  // ── CUELLO con forma más natural
  const nk=CY(0.082,0.098,0.2,8,sM,0,1.58,0); g.add(nk);

  // ── CABEZA (proporción 1:7.5 — más pequeña que antes)
  const hg=new THREE.Group(); hg.position.set(0,1.72,0);

  // Cráneo — elipsoide
  const headSph=new THREE.Mesh(new THREE.SphereGeometry(0.195,12,10),sM);
  headSph.scale.set(1,1.08,0.95); hg.add(headSph);
  // Mandíbula — trapecio
  hg.add(BX(0.34,0.14,0.28,sM,0,-0.155,0.01));
  // Mentón redondeado
  const chin=SP(0.085,7,sM,0,-0.185,0.08); chin.scale.set(1,0.7,0.9); hg.add(chin);
  // Mejillas
  hg.add(SP(0.09,6,mkStd(Math.min(skin+0x0c0808,0xffffff),0.65,0),-0.165,-0.02,0.12));
  hg.add(SP(0.09,6,mkStd(Math.min(skin+0x0c0808,0xffffff),0.65,0), 0.165,-0.02,0.12));
  // Frente — supercilios
  hg.add(BX(0.34,0.07,0.07,mkStd(Math.max(skin-0x0a0606,0x100808),0.7,0),0,0.085,0.17));

  // Ojos — estructura en capas
  const eyeWhiteM=mkStd(0xfafafa,0.05,0.0);
  const irisColors=[0x2244aa,0x1a6632,0x6b3a18,0x4a4a55,0x1a3066];
  const irisMat=mkStd(irisColors[Math.floor(Math.random()*irisColors.length)],0.3,0.05);
  [-0.085,0.085].forEach(ex=>{
    hg.add(SP(0.062,8,eyeWhiteM,ex,0.022,0.175));  // blanco
    hg.add(SP(0.043,7,irisMat,ex,0.022,0.208));     // iris
    hg.add(SP(0.028,6,dM,ex,0.022,0.218));           // pupila
    hg.add(SP(0.011,5,wM,ex+0.014,0.032,0.222));     // brillo
    // Párpado superior
    const lid=BX(0.11,0.025,0.02,mkStd(Math.max(skin-0x080404,0),0.8,0),ex,0.042,0.182);
    lid.rotation.x=-0.15; hg.add(lid);
  });

  // Cejas más definidas con ángulo
  const browM=mkStd(Math.max(hair-0x050505,0),0.9,0);
  [[-0.085,0.092,0.188,-0.12],[ 0.085,0.092,0.188, 0.12]].forEach(([ex,ey,ez,rz])=>{
    const br=BX(0.095,0.022,0.018,browM,ex,ey,ez); br.rotation.z=rz; hg.add(br);
  });

  // Nariz — cono + aletas
  const noseM=mkStd(Math.max(skin-0x060404,0),0.7,0);
  hg.add(CO(0.032,0.09,6,noseM,0,-0.025,0.205));
  hg.add(SP(0.038,6,noseM,0,-0.055,0.215));
  hg.add(SP(0.028,5,noseM,-0.040,-0.063,0.205));
  hg.add(SP(0.028,5,noseM, 0.040,-0.063,0.205));

  // Boca — labio superior e inferior diferenciados
  const lipUpM=mkStd(Math.max(skin-0x200a0a,0),0.6,0.02);
  const lipLoM=mkStd(Math.max(skin-0x160606,0),0.55,0.02);
  hg.add(BX(0.10,0.022,0.012,mkStd(0x8a2a1a,0.5,0.01),0,-0.118,0.206)); // raya boca
  hg.add(BX(0.095,0.025,0.018,lipUpM,0,-0.108,0.208));  // labio sup
  hg.add(BX(0.090,0.030,0.020,lipLoM,0,-0.133,0.206));  // labio inf

  // Orejas con hélix insinuado
  [-0.21,0.21].forEach(ex=>{
    const ear=SP(0.068,7,sM,ex,-0.01,0.01); ear.scale.set(0.55,0.9,1); hg.add(ear);
    hg.add(BX(0.02,0.04,0.04,mkStd(Math.max(skin-0x080404,0),0.7,0),ex,-0.04,0.01));
  });

  // PELO — más volumen y detalle
  const hrM=mkStd(hair,0.85,0.02);
  const hShineM=mkStd(Math.min(hair+0x181008,0xffffff),0.4,0.05); // brillo de pelo

  if(role==='police'||role==='agent'||role==='pilot'||role==='attendant'){
    // Sombrero de uniforme
    const htM=mkStd(hatCol,0.6,0.05);
    hg.add(BX(0.50,0.05,0.48,htM,0,0.235,-0.025)); // ala/brim
    hg.add(BX(0.40,0.22,0.38,htM,0,0.355,0.01));   // copa
    // Costura del sombrero
    hg.add(BX(0.41,0.015,0.39,mkStd(Math.max(hatCol-0x101010,0),0.5,0.1),0,0.248,0.01));
    if(role==='pilot'){
      hg.add(BX(0.41,0.038,0.39,mkStd(0xd4a800,0.3,0.4),0,0.262,0.01)); // banda dorada
      hg.add(BX(0.095,0.075,0.035,mkStd(0xd4a800,0.2,0.5),0,0.445,0.185)); // insignia alas
    }
    if(role==='police'){
      hg.add(BX(0.085,0.065,0.028,mkStd(0xd4aa00,0.2,0.5),0,0.435,0.185));
    }
    if(role==='attendant'){
      hg.add(BX(0.41,0.028,0.39,mkStd(0xaa1111,0.4,0.1),0,0.262,0.01));
    }
    // Pelo lateral visible
    hg.add(BX(0.36,0.12,0.07,hrM,0,0.15,-0.175));
    hg.add(BX(0.09,0.20,0.36,hrM,-0.18,0.13,0));
    hg.add(BX(0.09,0.20,0.36,hrM, 0.18,0.13,0));
  } else {
    // Pelo civil — más realista con capas
    hg.add(BX(0.40,0.13,0.38,hrM,0,0.195,0.01));  // capa base arriba
    hg.add(BX(0.40,0.20,0.09,hrM,0,0.08,-0.165));  // nuca
    hg.add(BX(0.40,0.09,0.12,hrM,0,0.10,0.175));   // flequillo
    hg.add(BX(0.09,0.22,0.38,hrM,-0.195,0.07,0));  // lado L
    hg.add(BX(0.09,0.22,0.38,hrM, 0.195,0.07,0));  // lado R
    // Brillo de pelo
    const shineStrip=BX(0.25,0.035,0.22,hShineM,0.06,0.235,0.04); shineStrip.rotation.z=0.15; hg.add(shineStrip);
  }
  hg.userData={isHead:true}; g.add(hg);

  // ── ACCESORIOS POR ROL
  if(role==='police'){
    g.add(BX(0.095,0.115,0.022,mkStd(0xd4a800,0.15,0.6),0.145,1.255,0.148)); // placa
    g.add(BX(0.50,0.07,0.28,mkStd(0x080808,0.4,0.3),0,0.86,0.01));            // cinturón
    g.add(BX(0.075,0.185,0.065,mkStd(0x111111,0.5,0.1),-0.295,0.82,0.01));    // funda
    g.add(BX(0.065,0.235,0.245,mkStd(0x0a1020,0.6,0.1),0,0.825,-0.02));       // placa cinturón
    g.add(BX(0.075,0.13,0.038,mkStd(0x111111,0.5,0.1),-0.255,1.35,-0.01));    // radio
    g.add(BX(0.013,0.095,0.013,mkStd(0x222222,0.8,0),-0.255,1.465,-0.01));    // antena
    // Reflectivos en hombros
    [-0.27,0.27].forEach(sx=>g.add(BX(0.06,0.02,0.14,mkStd(0xdd9900,0.1,0.3),sx,1.46,0)));
  }
  if(role==='agent'||role==='attendant'){
    const tieMatR=mkStd(tieCol,0.6,0.05);
    g.add(BX(0.055,0.21,0.022,tieMatR,0,1.225,0.148));              // corbata
    g.add(BX(0.022,0.135,0.022,mkStd(0xfafafa,0.5,0),-0.068,1.295,0.147)); // solapa L
    g.add(BX(0.022,0.135,0.022,mkStd(0xfafafa,0.5,0), 0.068,1.295,0.147)); // solapa R
    g.add(BX(0.135,0.038,0.018,mkStd(0xfafafa,0.3,0),0,1.062,0.148)); // gafete nombre
    // Detalle gafete — letras insinuadas
    g.add(BX(0.12,0.012,0.002,mkStd(0x3355aa,0.6,0),0,1.065,0.152));
    if(role==='attendant'){
      g.add(BX(0.075,0.075,0.055,mkStd(0xcc1111,0.5,0.05),0.162,1.345,0.10)); // pañuelo nudo
    }
  }
  if(role==='pilot'){
    // Hombreras con galones dorados reales
    [-0.255,0.255].forEach(dx=>{
      g.add(BX(0.195,0.048,0.155,mkStd(0x001030,0.6,0.1),dx,1.445,0.01));
      g.add(BX(0.195,0.022,0.155,mkStd(0xd4a800,0.2,0.5),dx,1.475,0.01));
      g.add(BX(0.12,0.018,0.095,mkStd(0xd4a800,0.2,0.5),dx,1.500,0.01));
    });
    g.add(BX(0.055,0.215,0.022,mkStd(0x000820,0.5,0.05),0,1.225,0.148)); // corbata
    g.add(BX(0.135,0.038,0.018,mkStd(0xd4a800,0.15,0.5),0.138,1.115,0.148)); // insignia alas
  }

  g.userData.headGroup=hg;
  g.userData.role=role;
  return g;
}
// Alias para compatibilidad con llamadas existentes
const buildCharacterV2=buildCharacter;

// ══════════════════════════════════════════════════
// PILOTO DETALLADO — sentado, con yoke y uniforme completo
// ══════════════════════════════════════════════════
function buildPilotDetailed(skinTone, hairCol){
  const skin=skinTone||SKINS[0];
  const hair=hairCol||HAIRS[6];
  const g=new THREE.Group();

  // Materiales PBR
  const sM=mkStd(skin,0.62,0.0);
  const uniM=mkStd(0x0d1f3c,0.75,0.0);       // uniforme azul marino oscuro
  const shirM=mkStd(0xf5f5f0,0.8,0.0);        // camisa blanca
  const hatM=mkStd(0x0a1828,0.55,0.05);       // gorra oscura
  const goldM=mkStd(0xd4a800,0.18,0.55);      // dorado epaulettes/insignia
  const shoeM=mkStd(0x080808,0.3,0.2);        // zapatos negros brillantes
  const yokeM=mkStd(0x222222,0.4,0.15);       // yoke

  const BX=(w,h,d,m,px,py,pz,rx=0,ry=0,rz=0)=>{
    const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);
    o.position.set(px,py,pz); o.rotation.set(rx,ry,rz);
    o.castShadow=true; o.receiveShadow=true; return o;
  };
  const SP=(r,m,px,py,pz)=>{
    const o=new THREE.Mesh(new THREE.SphereGeometry(r,10,8),m);
    o.position.set(px,py,pz); o.castShadow=true; return o;
  };
  const CY=(rt,rb,h,s,m,px,py,pz,rx=0)=>{
    const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,s),m);
    o.position.set(px,py,pz); o.rotation.x=rx; o.castShadow=true; return o;
  };

  // ── POSICIÓN SENTADO: cadera en y=0, torso inclinado ligeramente hacia adelante

  // Zapatos
  [-0.135,0.135].forEach(sx=>{
    g.add(BX(0.20,0.07,0.32,shoeM,sx,0.04,0.18));
    g.add(BX(0.18,0.10,0.28,shoeM,sx,0.10,0.16));
  });

  // Piernas (posición sentada — dobladas 90°)
  [-0.13,0.13].forEach(sx=>{
    // Muslo (horizontal — apuntando hacia adelante)
    g.add(BX(0.22,0.20,0.44,uniM,sx,0.20,-0.05));
    // Rodilla
    g.add(SP(0.11,mkStd(0x0a1828,0.8,0),sx,0.20,0.18));
    // Pantorrilla (vertical — colgando)
    g.add(BX(0.18,0.36,0.19,uniM,sx,0.04,0.18));
  });

  // Cadera/pelvis
  g.add(BX(0.48,0.18,0.38,uniM,0,0.22,0));

  // Torso (ligeramente inclinado hacia el panel)
  const torso=new THREE.Group(); torso.position.set(0,0.38,0); torso.rotation.x=-0.08;
  // Cuerpo principal
  torso.add(BX(0.54,0.62,0.30,uniM,0,0.31,0));
  // Camisa visible en pecho
  torso.add(BX(0.18,0.40,0.05,shirM,0,0.38,0.155));
  // Corbata
  torso.add(BX(0.052,0.30,0.022,mkStd(0x001020,0.5,0.03),0,0.32,0.162));
  // Botones de camisa
  [0.42,0.34,0.26].forEach(by=>torso.add(BX(0.018,0.018,0.02,mkStd(0xdddddd,0.3,0.1),0,by,0.165)));
  // Epaulettes (hombreras) con 4 galones — comandante
  [-0.285,0.285].forEach(dx=>{
    torso.add(BX(0.18,0.04,0.14,uniM,dx,0.62,0.02));
    // 4 galones dorados = comandante (4 rayas)
    [0,0.020,0.040,0.060].forEach(dy=>torso.add(BX(0.18,0.014,0.14,goldM,dx,0.635+dy,0.02)));
  });
  // Insignia alas en pecho izquierdo
  torso.add(BX(0.14,0.052,0.022,goldM,-0.14,0.50,0.158));
  torso.add(BX(0.08,0.025,0.018,mkStd(0xb8860b,0.2,0.5),-0.18,0.495,0.160)); // ala izquierda
  torso.add(BX(0.08,0.025,0.018,mkStd(0xb8860b,0.2,0.5),-0.10,0.495,0.160)); // ala derecha
  // Bolsillo pecho
  torso.add(BX(0.10,0.075,0.025,uniM,0.16,0.48,0.158));
  torso.add(BX(0.009,0.065,0.018,mkStd(0x4a90d9,0.6,0),0.175,0.478,0.160)); // bolígrafo azul
  g.add(torso);

  // Brazos (hacia adelante en posición de pilotaje)
  [[-0.30,0.28,0.28,-0.9,0,0.3], [0.30,0.28,0.28,-0.9,0,-0.3]].forEach(([ax,ay,az,rx,ry,rz],i)=>{
    const armG=new THREE.Group(); armG.position.set(ax,0.38+ay*0.1,az*0.2);
    armG.rotation.set(rx,ry,rz);
    // Brazo superior
    armG.add(new THREE.Mesh(new THREE.CylinderGeometry(0.085,0.075,0.28,8),uniM));
    // Codo
    const elbow=SP(0.08,uniM,0,0.14,0); armG.add(elbow);
    // Antebrazo — extendido hacia el panel
    const forearm=new THREE.Mesh(new THREE.CylinderGeometry(0.072,0.065,0.26,8),uniM);
    forearm.position.set(0,0.14,0.13); forearm.rotation.x=-1.05; armG.add(forearm);
    // Mano en yoke
    armG.add(BX(0.09,0.095,0.06,sM, i===0?-0.01:0.01, 0.14+0.26*Math.sin(1.05), 0.13+0.26*Math.cos(1.05)));
    armG.castShadow=true;
    g.add(armG);
  });

  // Cuello
  g.add(CY(0.068,0.075,0.12,8,sM,0,1.00,0));

  // CABEZA
  const hg=new THREE.Group(); hg.position.set(0,1.08,0.04);

  // Cráneo
  const headM=mkStd(skin,0.65,0);
  hg.add(new THREE.Mesh(new THREE.SphereGeometry(0.175,12,10),headM));
  hg.children[0].scale.set(1,0.92,0.92);

  // Mandíbula
  hg.add(BX(0.30,0.095,0.28,headM,0,-0.085,0.02));

  // Cara: ojos, cejas, nariz, boca
  const wM=mkStd(0xfafafa,0.1,0);
  const dM=mkStd(0x050508,0.4,0);
  const iriM=mkStd(0x3a5a2a,0.3,0);
  [-0.073,0.073].forEach(ex=>{
    hg.add(SP(0.038,wM,ex,0.025,0.168));
    hg.add(SP(0.026,iriM,ex,0.025,0.177));
    hg.add(SP(0.016,dM,ex,0.025,0.182));
    hg.add(SP(0.008,wM,ex+0.01,0.033,0.184));
    // Párpado
    const lid=new THREE.Mesh(new THREE.BoxGeometry(0.09,0.020,0.016),mkStd(Math.max(skin-0x090505,0x401010),0.8,0));
    lid.position.set(ex,0.037,0.162); lid.rotation.x=-0.18; hg.add(lid);
  });
  // Cejas
  const browM=mkStd(Math.max(hair-0x060606,0),0.9,0);
  [[-0.075,0.085,0.152,-0.10],[0.075,0.085,0.152,0.10]].forEach(([bx,by,bz,rz])=>{
    const br=new THREE.Mesh(new THREE.BoxGeometry(0.080,0.018,0.014),browM);
    br.position.set(bx,by,bz); br.rotation.z=rz; hg.add(br);
  });
  // Nariz
  hg.add(new THREE.Mesh(new THREE.ConeGeometry(0.028,0.078,6),mkStd(Math.max(skin-0x060404,0),0.7,0)));
  hg.children[hg.children.length-1].position.set(0,-0.022,0.175); hg.children[hg.children.length-1].rotation.x=Math.PI/2;
  // Boca
  hg.add(BX(0.085,0.018,0.010,mkStd(0x8a2a1a,0.5,0),0,-0.100,0.172));
  hg.add(BX(0.078,0.022,0.016,mkStd(Math.max(skin-0x200a0a,0),0.55,0.02),0,-0.092,0.174));
  hg.add(BX(0.074,0.026,0.018,mkStd(Math.max(skin-0x160606,0),0.55,0.02),0,-0.114,0.172));
  // Orejas
  [-0.188,0.188].forEach(ex=>{
    const ear=new THREE.Mesh(new THREE.SphereGeometry(0.062,7,6),sM);
    ear.scale.set(0.5,0.88,1); ear.position.set(ex,-0.008,0.008); hg.add(ear);
  });

  // ── GORRA DE COMANDANTE — detallada
  const brim=BX(0.44,0.038,0.42,hatM,0,0.188,-0.012);  // ala
  hg.add(brim);
  hg.add(BX(0.36,0.19,0.34,hatM,0,0.295,0.010));        // copa
  hg.add(BX(0.37,0.012,0.35,mkStd(0x0a1520,0.4,0.1),0,0.202,0.010)); // costura copa
  // Banda dorada (4 galones = comandante)
  [0,0.016,0.032,0.048].forEach(dy=>hg.add(BX(0.37,0.010,0.35,goldM,0,0.210+dy,0.010)));
  // Insignia dorada frontal
  hg.add(BX(0.085,0.065,0.028,goldM,0,0.370,0.180));
  // Visera de la gorra — semicírculo estilizado
  const visorM=mkStd(0x070c14,0.3,0.15);
  hg.add(BX(0.40,0.022,0.14,visorM,0,0.182,0.172));
  // Pelo lateral visible
  const hrM=mkStd(hair,0.85,0.02);
  hg.add(BX(0.33,0.10,0.06,hrM,0,0.12,-0.152));
  hg.add(BX(0.07,0.18,0.32,hrM,-0.165,0.10,0));
  hg.add(BX(0.07,0.18,0.32,hrM, 0.165,0.10,0));

  g.add(hg);

  // ── YOKE (control en U)
  const yokeG=new THREE.Group(); yokeG.position.set(0,0.48,0.30);
  // Columna central del yoke
  yokeG.add(new THREE.Mesh(new THREE.CylinderGeometry(0.025,0.028,0.22,8),yokeM));
  // Parte superior en U — barra horizontal
  yokeG.add(BX(0.32,0.042,0.038,yokeM,0,0.11,0));
  // Mangos verticales
  [-0.155,0.155].forEach(hx=>{
    yokeG.add(new THREE.Mesh(new THREE.CylinderGeometry(0.022,0.022,0.12,8),yokeM));
    yokeG.children[yokeG.children.length-1].position.set(hx,0.17,0);
    // Botones en los mangos
    yokeG.add(new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.012,0.008,6),mkStd(0xcc2222,0.4,0)));
    yokeG.children[yokeG.children.length-1].position.set(hx,0.23,0.025); yokeG.children[yokeG.children.length-1].rotation.x=Math.PI/2;
    yokeG.add(new THREE.Mesh(new THREE.CylinderGeometry(0.010,0.010,0.008,6),mkStd(0x2266cc,0.4,0)));
    yokeG.children[yokeG.children.length-1].position.set(hx,0.22,-0.025); yokeG.children[yokeG.children.length-1].rotation.x=Math.PI/2;
  });
  yokeG.traverse(c=>{ if(c.isMesh){c.castShadow=true;} });
  g.add(yokeG);

  g.userData.role='pilot'; g.userData.isPilotDetailed=true;
  g.userData.idlePhase=Math.random()*Math.PI*2;
  return g;
}

// ══════════════════════════════════════════════════
// AUXILIAR DE VUELO DETALLADA — de pie, con carrito
// ══════════════════════════════════════════════════
function buildAttendantDetailed(skinTone, hairCol, gender){
  const skin=skinTone||SKINS[3];
  const hair=hairCol||HAIRS[1];
  const g=new THREE.Group();
  const isFemale=(gender!=='male');

  // Materiales
  const sM=mkStd(skin,0.62,0.0);
  const uniM=mkStd(0x1a2e50,0.80,0.0);        // uniforme azul marino
  const scarfM=mkStd(0xcc1111,0.65,0.02);      // pañuelo rojo
  const shirM=mkStd(0xf5f5f2,0.78,0.0);        // blusa blanca
  const goldM=mkStd(0xd4a800,0.20,0.50);
  const shoeM=mkStd(0x0a0a0a,0.28,0.18);
  const skinDark=mkStd(Math.max(skin-0x060404,0),0.65,0);

  const BX=(w,h,d,m,px,py,pz,rx=0,ry=0,rz=0)=>{
    const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);
    o.position.set(px,py,pz); o.rotation.set(rx,ry,rz);
    o.castShadow=true; o.receiveShadow=true; return o;
  };
  const SP=(r,m,px,py,pz,sx=1,sy=1,sz=1)=>{
    const o=new THREE.Mesh(new THREE.SphereGeometry(r,10,8),m);
    o.position.set(px,py,pz); o.scale.set(sx,sy,sz); o.castShadow=true; return o;
  };
  const CY=(rt,rb,h,s,m,px,py,pz,rx=0)=>{
    const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,s),m);
    o.position.set(px,py,pz); o.rotation.x=rx; o.castShadow=true; return o;
  };

  // ── ZAPATOS — tacón bajo para auxiliar femenina
  const heelH=isFemale?0.12:0.07;
  [-0.115,0.115].forEach(sx=>{
    g.add(BX(0.18,0.065,0.30,shoeM,sx,0.04,0.05));
    g.add(BX(0.16,heelH,0.10,shoeM,sx,heelH/2,-0.12)); // tacón/suela trasera
    const pt=SP(0.09,shoeM,sx,0.09,0.12,1,0.55,1.1); g.add(pt); // puntera
  });

  // MEDIAS/CALCETINES visibles
  [-0.115,0.115].forEach(sx=>g.add(BX(0.155,0.09,0.18,mkStd(isFemale?0xeecc99:0xdddddd,0.9,0),sx,0.16,-0.02)));

  // ── PIERNAS
  const legTone=isFemale?mkStd(0x0e1a2e,0.85,0):uniM; // falda o pantalón
  if(isFemale){
    // Falda cónica (skirt) — más realista
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.24,0.28,0.52,10),uniM));
    g.children[g.children.length-1].position.set(0,0.30,0);
    // Piernas visibles bajo la falda
    [-0.095,0.095].forEach(sx=>g.add(CY(0.075,0.068,0.30,8,sM,sx,0.16,0)));
  } else {
    [-0.125,0.125].forEach(sx=>{
      g.add(CY(0.10,0.085,0.38,8,uniM,sx,0.19,0));
      g.add(CY(0.082,0.075,0.30,8,uniM,sx,0.04,0));
    });
  }

  // Cadera
  g.add(BX(0.44,0.16,0.32,uniM,0,0.54,0));

  // ── TORSO
  const torso=new THREE.Group(); torso.position.set(0,0.66,0);
  const torsoW=isFemale?0.48:0.52;
  torso.add(BX(torsoW,0.58,0.28,uniM,0,0.29,0));
  // Blusa/camisa visible en pecho
  torso.add(BX(0.16,0.35,0.045,shirM,0,0.34,0.145));
  // Solapa chaqueta
  torso.add(BX(0.020,0.28,0.040,uniM,-0.075,0.37,0.148));
  torso.add(BX(0.020,0.28,0.040,uniM, 0.075,0.37,0.148));
  // Pañuelo rojo al cuello (auxiliar)
  torso.add(BX(0.09,0.09,0.055,scarfM,0,0.56,0.10));
  // Nudo del pañuelo — detalle
  torso.add(SP(0.038,scarfM,0,0.565,0.148,1,0.9,0.9));
  // Gafete nombre
  torso.add(BX(0.12,0.042,0.020,mkStd(0xf0e8cc,0.3,0.1),-0.145,0.44,0.148));
  torso.add(BX(0.095,0.010,0.006,mkStd(0x3355aa,0.6,0),-0.145,0.444,0.153));
  // Botones de chaqueta
  [0.52,0.44,0.36,0.28].forEach(by=>torso.add(BX(0.016,0.016,0.020,mkStd(0x888890,0.25,0.3),0.01,by,0.146)));

  // Epaulette (1 galón — auxiliar estándar)
  [-0.26,0.26].forEach(dx=>{
    torso.add(BX(0.16,0.036,0.125,uniM,dx,0.575,0.01));
    torso.add(BX(0.16,0.010,0.125,goldM,dx,0.588,0.01));
  });
  g.add(torso);

  // ── BRAZO DERECHO — extendido hacia el carrito (sosteniendo)
  const armRG=new THREE.Group(); armRG.position.set(-0.27,0.98,0);
  armRG.rotation.set(0.4,0,-0.2);
  armRG.add(CY(0.075,0.065,0.26,8,uniM,0,-0.13,0));
  armRG.add(SP(0.072,uniM,0,-0.27,0));
  // Antebrazo bajando al carrito
  const fgR=new THREE.Group(); fgR.position.set(0,-0.27,0);
  fgR.rotation.x=0.75;
  fgR.add(CY(0.063,0.055,0.24,8,uniM,0,-0.12,0));
  // Mano
  fgR.add(BX(0.085,0.082,0.055,sM,0,-0.26,0));
  armRG.add(fgR); g.add(armRG);

  // ── BRAZO IZQUIERDO — natural colgando/sosteniendo
  const armLG=new THREE.Group(); armLG.position.set(0.27,0.98,0);
  armLG.rotation.set(0.1,0,0.18);
  armLG.add(CY(0.075,0.065,0.26,8,uniM,0,-0.13,0));
  armLG.add(SP(0.072,uniM,0,-0.27,0));
  const fgL=new THREE.Group(); fgL.position.set(0,-0.27,0);
  fgL.rotation.x=0.25;
  fgL.add(CY(0.063,0.055,0.24,8,uniM,0,-0.12,0));
  fgL.add(BX(0.085,0.082,0.055,sM,0,-0.26,0));
  armLG.add(fgL); g.add(armLG);

  // ── CUELLO
  g.add(CY(0.065,0.072,0.115,8,sM,0,1.24,0));

  // ── CABEZA
  const hg=new THREE.Group(); hg.position.set(0,1.37,0.03);
  hg.add(new THREE.Mesh(new THREE.SphereGeometry(0.168,12,10),mkStd(skin,0.65,0)));
  hg.children[0].scale.set(1,0.91,0.90);
  hg.add(BX(0.285,0.090,0.265,sM,0,-0.082,0.018));

  // Ojos
  const wE=mkStd(0xfafafa,0.1,0); const dE=mkStd(0x050508,0.4,0);
  const iriE=mkStd(isFemale?0x6b3a2a:0x2a4a6b,0.3,0);
  [-0.068,0.068].forEach(ex=>{
    hg.add(SP(0.035,wE,ex,0.026,0.162));
    hg.add(SP(0.024,iriE,ex,0.026,0.170));
    hg.add(SP(0.015,dE,ex,0.026,0.175));
    hg.add(SP(0.007,wE,ex+0.010,0.033,0.177));
    const lid=new THREE.Mesh(new THREE.BoxGeometry(0.082,0.018,0.015),mkStd(Math.max(skin-0x090505,0x3a1010),0.8,0));
    lid.position.set(ex,0.036,0.155); lid.rotation.x=-0.16; hg.add(lid);
    // Maquillaje — línea de ojo más gruesa para auxiliar femenina
    if(isFemale){
      hg.add(BX(0.088,0.008,0.008,mkStd(0x111111,0.5,0.05),ex,0.037,0.155));
    }
  });
  // Cejas
  const browM2=mkStd(Math.max(hair-0x060606,0x0a0804),0.9,0);
  [[-0.070,0.088,0.145,-0.10],[0.070,0.088,0.145,0.10]].forEach(([bx,by,bz,rz])=>{
    const br=new THREE.Mesh(new THREE.BoxGeometry(0.075,0.015,0.012),browM2);
    br.position.set(bx,by,bz); br.rotation.z=rz; hg.add(br);
  });
  // Nariz
  hg.add(new THREE.Mesh(new THREE.ConeGeometry(0.025,0.070,6),skinDark));
  hg.children[hg.children.length-1].position.set(0,-0.020,0.168); hg.children[hg.children.length-1].rotation.x=Math.PI/2;
  // Boca con labial (auxiliar femenina)
  const lipCol=isFemale?0xcc3322:0x882818;
  hg.add(BX(0.078,0.015,0.010,mkStd(lipCol,0.45,0.05),0,-0.092,0.166));
  hg.add(BX(0.072,0.020,0.016,mkStd(Math.max(skin-0x1a0808,0),0.55,0.02),0,-0.082,0.168));
  hg.add(BX(0.068,0.024,0.018,mkStd(Math.max(skin-0x100606,0),0.55,0.02),0,-0.102,0.166));
  // Orejas
  [-0.180,0.180].forEach(ex=>{
    hg.add(SP(0.058,sM,ex,-0.008,0.010,0.52,0.88,1));
    if(isFemale){
      // Pendiente pequeño
      hg.add(new THREE.Mesh(new THREE.SphereGeometry(0.014,6,4),goldM));
      hg.children[hg.children.length-1].position.set(ex,-0.065,0.008);
    }
  });

  // ── PEINADO / SOMBRERO
  const hrM=mkStd(hair,0.82,0.03);
  if(isFemale){
    // Recogido — moño profesional
    hg.add(BX(0.32,0.08,0.30,hrM,0,0.168,0.002));   // base
    hg.add(BX(0.30,0.10,0.08,hrM,0,0.105,-0.145));   // nuca
    hg.add(BX(0.28,0.06,0.10,hrM,0,0.082,0.155));    // flequillo bajo
    hg.add(BX(0.075,0.18,0.28,hrM,-0.178,0.065,0));  // lado L
    hg.add(BX(0.075,0.18,0.28,hrM, 0.178,0.065,0));  // lado R
    // Moño trasero
    const bun=SP(0.075,hrM,0,0.048,-0.160,0.85,1,0.85); hg.add(bun);
    // Pasadores dorados
    [-0.04,0.04].forEach(px=>hg.add(BX(0.005,0.005,0.10,goldM,px,0.045,-0.125)));
    // Gorra pequeña de auxiliar
    hg.add(BX(0.36,0.028,0.32,mkStd(0x1a2e50,0.6,0.05),0,0.185,0.002));
    hg.add(BX(0.28,0.12,0.26,mkStd(0x1a2e50,0.6,0.05),0,0.258,0.008));
    hg.add(BX(0.29,0.010,0.27,mkStd(0x0a1520,0.4,0.1),0,0.195,0.008));
    hg.add(BX(0.29,0.010,0.27,goldM,0,0.200,0.008)); // banda dorada
  } else {
    // Masculino — pelo corto
    hg.add(BX(0.34,0.09,0.32,hrM,0,0.165,0.008));
    hg.add(BX(0.32,0.12,0.08,hrM,0,0.080,-0.148));
    hg.add(BX(0.08,0.18,0.30,hrM,-0.178,0.065,0));
    hg.add(BX(0.08,0.18,0.30,hrM, 0.178,0.065,0));
    // Gorra
    hg.add(BX(0.38,0.030,0.36,mkStd(0x1a2e50,0.55,0.05),0,0.180,0.002));
    hg.add(BX(0.30,0.175,0.29,mkStd(0x1a2e50,0.60,0.05),0,0.268,0.010));
    hg.add(BX(0.31,0.010,0.30,goldM,0,0.196,0.010));
  }
  g.add(hg);

  g.userData.role='attendant'; g.userData.isAttendantDetailed=true;
  g.userData.idlePhase=Math.random()*Math.PI*2;
  g.userData.isFemale=isFemale;
  return g;
}

// ══════════════════════════════════════════════════
// CARRITO DE SERVICIO DE VUELO — detallado
// ══════════════════════════════════════════════════
function buildServiceCart(){
  const g=new THREE.Group();
  const bodyM=mkStd(0xdad6cc,0.55,0.05);
  const handleM=mkStd(0x555555,0.35,0.15);
  const wheelM=mkStd(0x111111,0.6,0.1);
  const logoM=mkStd(0x1a2e50,0.7,0.0);

  // Cuerpo principal del carrito
  g.add(new THREE.Mesh(new THREE.BoxGeometry(0.52,0.90,0.36),bodyM));
  g.children[0].position.set(0,0.48,0); g.children[0].castShadow=true;

  // Franja de la aerolínea
  g.add(new THREE.Mesh(new THREE.BoxGeometry(0.525,0.10,0.365),mkStd(0x1a2e50,0.7,0)));
  g.children[g.children.length-1].position.set(0,0.70,0);
  g.add(new THREE.Mesh(new THREE.BoxGeometry(0.525,0.04,0.365),mkStd(0xd4a800,0.25,0.4)));
  g.children[g.children.length-1].position.set(0,0.752,0);

  // Estantes internos visibles (rendijas laterales)
  [0.26,0.50,0.74].forEach(sy=>{
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.54,0.010,0.38),mkStd(0xbbbbbb,0.4,0.1)));
    g.children[g.children.length-1].position.set(0,sy,0);
  });

  // Puerta delantera con bisagra
  g.add(new THREE.Mesh(new THREE.BoxGeometry(0.50,0.26,0.018),mkStd(0xcac6be,0.45,0.08)));
  g.children[g.children.length-1].position.set(0,0.35,0.185);
  // Tirador de puerta
  g.add(new THREE.Mesh(new THREE.BoxGeometry(0.12,0.012,0.025),handleM));
  g.children[g.children.length-1].position.set(0,0.35,0.197);

  // Bandeja superior con vasos/botellas
  const trayM=mkStd(0xc8c4bc,0.4,0.08);
  g.add(new THREE.Mesh(new THREE.BoxGeometry(0.50,0.022,0.34),trayM));
  g.children[g.children.length-1].position.set(0,0.945,0);
  // Vasos en bandeja (4)
  [-0.14,-0.06,0.06,0.14].forEach(cx=>{
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.020,0.016,0.055,7),mkStd(0xddeeff,0.05,0.02,{transparent:true,opacity:0.7})));
    g.children[g.children.length-1].position.set(cx,0.985,0.04);
  });
  // Botella de agua/refresco
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.022,0.020,0.090,8),mkStd(0x4488cc,0.15,0.08,{transparent:true,opacity:0.8})));
  g.children[g.children.length-1].position.set(0.18,0.992,0.04);

  // Mango/asa trasero
  g.add(new THREE.Mesh(new THREE.BoxGeometry(0.46,0.022,0.028),handleM));
  g.children[g.children.length-1].position.set(0,0.88,-0.182);
  g.add(new THREE.Mesh(new THREE.BoxGeometry(0.022,0.10,0.028),handleM));
  g.children[g.children.length-1].position.set(-0.21,0.84,-0.182);
  g.add(new THREE.Mesh(new THREE.BoxGeometry(0.022,0.10,0.028),handleM));
  g.children[g.children.length-1].position.set( 0.21,0.84,-0.182);

  // Ruedas (4)
  [[-0.22,0.06,-0.17],[0.22,0.06,-0.17],[-0.22,0.06,0.17],[0.22,0.06,0.17]].forEach(([wx,wy,wz])=>{
    const wh=new THREE.Mesh(new THREE.CylinderGeometry(0.048,0.048,0.028,10),wheelM);
    wh.rotation.z=Math.PI/2; wh.position.set(wx,wy,wz); g.add(wh);
    // Aro de rueda
    g.add(new THREE.Mesh(new THREE.TorusGeometry(0.036,0.007,5,10),mkStd(0x444444,0.4,0.15)));
    g.children[g.children.length-1].rotation.z=Math.PI/2; g.children[g.children.length-1].position.set(wx,wy,wz);
  });

  g.traverse(c=>{ if(c.isMesh){c.castShadow=true; c.receiveShadow=true;} });
  return g;
}

// ══════════════════════════════════════════════════
// SPAWN WALKING NPCs  (civilians + attendants)
// ══════════════════════════════════════════════════
// ══════════════════════════════════════════════════
// PERFILES DE PERSONAS (Fase 4 — Ambientación)
// ──────────────────────────────────────────────────
// 1) Pasajeros solos       — caminan rutas civiles; alternan entre
//                            caminar, detenerse a esperar y mirar
//                            carteles/pantallas (ver POI_POINTS).
// 2) Parejas / grupos chicos— 2 personas que caminan juntas, en
//                            paralelo, al mismo ritmo (ver "grupo").
// 3) Personal aeroportuario — agentes de check-in/información y
//                            tripulación (spawnStaffNPCs / cabina).
// 4) Seguridad y asistencia — oficiales del control (police) y
//                            agente del mostrador de información.
// Densidad moderada (≈ misma cantidad que antes, redistribuida).
// Sin movimientos bruscos. En Modo Calma: caminan más lento y
// permanecen quietos por más tiempo (menos estímulo visual).
// ══════════════════════════════════════════════════

// Puntos de interés donde los pasajeros en pausa pueden "mirar
// carteles": tablero de salidas y postes de información (Fase 2).
const POI_POINTS=[
  {x:-4,z:36},
  {x:7,z:36},{x:-7,z:36},
  {x:7,z:14},{x:-7,z:14},
  {x:7,z:-16},{x:-7,z:-16}
];

function spawnNPCs(){
  const civRoutes=[
    {x:-5,z:44,dx:-5,dz:25,spd:1.2},{x:3,z:42,dx:5,dz:20,spd:1.5},
    {x:-2,z:30,dx:-3,dz:45,spd:1.0},{x:7,z:15,dx:6,dz:-5,spd:1.3},
    {x:-6,z:5,dx:-5,dz:30,spd:1.1},{x:4,z:-8,dx:3,dz:-25,spd:1.4},
    {x:-3,z:-20,dx:-4,dz:-5,spd:0.9},{x:8,z:25,dx:7,dz:5,spd:1.6},
    {x:-8,z:-12,dx:-7,dz:10,spd:1.2},{x:3,z:32,dx:2,dz:48,spd:1.4}
    // (una ruta menos que antes: su lugar lo ocupa la pareja que camina junta, más abajo)
  ];
  civRoutes.forEach(d=>{
    const skin=SKINS[Math.floor(Math.random()*SKINS.length)];
    const hair=HAIRS[Math.floor(Math.random()*HAIRS.length)];
    const top=TOPS[Math.floor(Math.random()*TOPS.length)];
    const pantsC=[0x223344,0x444422,0x333322,0x442233,0x334433][Math.floor(Math.random()*5)];
    const npc=buildCharacter({skin,hair,top,pants:pantsC,shoes:0x111111,role:'civilian'});
    npc.position.set(d.x,0,d.z);
    npc.userData.isNPC=true; npc.userData.isWalking=true;
    npc.userData.spd=d.spd; npc.userData.wt=Math.random()*Math.PI*2;
    npc.userData.progress=Math.random();
    npc.userData.start=new THREE.Vector3(d.x,0,d.z);
    npc.userData.dest=new THREE.Vector3(d.dx,0,d.dz);
    // Perfil "pasajero solo": alterna caminar / pausa (esperar o mirar carteles)
    npc.userData.behaviorState='walk';
    npc.userData.behaviorTimer=4+Math.random()*9;
    npc.userData.lookTarget=null;
    npc.userData.idlePhase=Math.random()*Math.PI*2;
    // Random luggage
    if(Math.random()>0.45){
      const bc=TOPS[Math.floor(Math.random()*TOPS.length)];
      const bag=new THREE.Mesh(new THREE.BoxGeometry(0.28,0.38,0.14),mkMat(bc));
      bag.position.set(0.32,0.18,0); npc.add(bag);
      const bh=new THREE.Mesh(new THREE.BoxGeometry(0.10,0.06,0.02),mkMat(0x888888));
      bh.position.set(0.32,0.36,0); npc.add(bh);
    }
    npcs.push(npc); scene.add(npc);
  });

  // ── Perfil "pareja / grupo pequeño": dos personas que caminan
  // juntas, en paralelo y al mismo paso — dan sensación de compañía
  // sin aumentar la densidad general (reemplaza, no suma, al conteo).
  {
    const base={x:-6,z:5,dx:-5,dz:30,spd:1.0};
    const sharedProgress=Math.random();
    [-0.5,0.45].forEach((off,gi)=>{
      const skin=SKINS[Math.floor(Math.random()*SKINS.length)];
      const hair=HAIRS[Math.floor(Math.random()*HAIRS.length)];
      const top=TOPS[Math.floor(Math.random()*TOPS.length)];
      const npc=buildCharacter({skin,hair,top,pants:[0x223344,0x444422,0x333322][gi],shoes:0x111111,role:'civilian'});
      npc.userData.isNPC=true; npc.userData.isWalking=true; npc.userData.isCompanion=true;
      npc.userData.spd=base.spd; npc.userData.wt=Math.random()*Math.PI*2;
      npc.userData.progress=sharedProgress;
      npc.userData.start=new THREE.Vector3(base.x+off,0,base.z+off*0.6);
      npc.userData.dest=new THREE.Vector3(base.dx+off,0,base.dz+off*0.6);
      npc.position.copy(npc.userData.start);
      // Las parejas se detienen con menos frecuencia que los pasajeros solos
      npc.userData.behaviorState='walk';
      npc.userData.behaviorTimer=7+Math.random()*7;
      npc.userData.lookTarget=null;
      npc.userData.idlePhase=Math.random()*Math.PI*2;
      npcs.push(npc); scene.add(npc);
    });
  }

  // Cabin attendants walk in plane aisle
  [
    {x:0,z:-38,dx:0,dz:-56,spd:0.7},
    {x:0,z:-54,dx:0,dz:-36,spd:0.65}
  ].forEach((d,i)=>{
    const npc=buildCharacter({skin:SKINS[i],hair:HAIRS[0],top:0x1a2e42,pants:0x1a2e42,shoes:0x111111,role:'attendant',hatCol:0x1a2e42,tieCol:0xcc2222});
    npc.position.set(d.x,0,d.z);
    npc.userData.isNPC=true; npc.userData.isWalking=true;
    npc.userData.spd=d.spd; npc.userData.wt=Math.random()*Math.PI*2;
    npc.userData.progress=i*0.5;
    npc.userData.start=new THREE.Vector3(d.x,0,d.z);
    npc.userData.dest=new THREE.Vector3(d.dx,0,d.dz);
    npcs.push(npc); scene.add(npc);
  });
}

// ══════════════════════════════════════════════════
// SPAWN STAFF NPCs  (agents, police, pilot)
// ══════════════════════════════════════════════════
function spawnStaffNPCs(){
  // ── CHECK-IN AGENTS (behind counters at z=24, facing player z+)
  const agentX=[-11,-5.5,0,5.5,11];
  const agentTops=[0x1a3060,0x1a3060,0x25408a,0x1a3060,0x25408a];
  agentX.forEach((ax,i)=>{
    const skin=SKINS[i%SKINS.length];
    const hair=HAIRS[i%HAIRS.length];
    const npc=buildCharacter({skin,hair,top:agentTops[i],pants:0x1a2240,shoes:0x111111,role:'agent',tieCol:[0xcc2222,0x003399,0xcc7700,0x220099,0x009933][i]});
    npc.position.set(ax,0,24.2);
    npc.rotation.y=0; // faces player (z+)
    npc.userData.isNPC=true; npc.userData.isStaff=true;
    npc.userData.idlePhase=Math.random()*Math.PI*2;
    npc.userData.role='agent'; npc.userData.baseRotY=0;
    npcs.push(npc); scene.add(npc);
  });

  // ── POLICE at security (flanking the security zone, z=8)
  [
    {x:-12,z:10,ry: Math.PI*0.15},
    {x: 12,z:10,ry:-Math.PI*0.15},
    {x: 0, z:14, ry:Math.PI}
  ].forEach((d,i)=>{
    const npc=buildCharacter({skin:SKINS[i%3],hair:HAIRS[0],top:0x0d1f3c,pants:0x0d1f3c,shoes:0x0a0a0a,role:'police',hatCol:0x0d1f3c});
    npc.position.set(d.x,0,d.z); npc.rotation.y=d.ry;
    npc.userData.isNPC=true; npc.userData.isStaff=true;
    npc.userData.idlePhase=Math.random()*Math.PI*2;
    npc.userData.role='police'; npc.userData.baseRotY=d.ry;
    npcs.push(npc); scene.add(npc);
  });

  // ── PILOT at boarding gate (z=-28)
  const pilot=buildCharacter({skin:SKINS[0],hair:HAIRS[6],top:0xfafafa,pants:0x0d1f3c,shoes:0x0a0a0a,role:'pilot',hatCol:0x0d1f3c});
  pilot.position.set(-4,0,-31); pilot.rotation.y=Math.PI*0.5;
  pilot.userData.isNPC=true; pilot.userData.isStaff=true;
  pilot.userData.idlePhase=0; pilot.userData.role='pilot'; pilot.userData.baseRotY=Math.PI*0.5;
  npcs.push(pilot); scene.add(pilot);

  // ── INFO DESK agent at entrance
  const infoAgent=buildCharacter({skin:SKINS[2],hair:HAIRS[1],top:0x2a4a8a,pants:0x1a2240,shoes:0x111111,role:'agent',tieCol:0xcc7700});
  infoAgent.position.set(6,0,42.5); infoAgent.rotation.y=Math.PI;
  infoAgent.userData.isNPC=true; infoAgent.userData.isStaff=true;
  infoAgent.userData.idlePhase=1.2; infoAgent.userData.role='agent'; infoAgent.userData.baseRotY=Math.PI;
  npcs.push(infoAgent); scene.add(infoAgent);
}

// ══════════════════════════════════════════════════
// GLTF CABIN CREW LOADER
// Intenta cargar modelos de assets/ — si no existen,
// usa buildCharacter() como fallback transparente
// ══════════════════════════════════════════════════
function loadCabinCrew(){
  // Sin GLTFLoader o sin archivos GLB: usar siempre la tripulación procedural detallada
  if(!gltfLoader){
    spawnCabinCrewFallback(); return;
  }
  // Intentar cargar GLBs externos — si fallan, spawnCabinCrewFallback ya creó la tripulación
  let fallbackSpawned=false;
  const tryLoad=(file, onSuccess)=>{
    gltfLoader.load(file,
      (gltf)=>{
        const model=gltf.scene;
        model.traverse(c=>{
          if(c.isMesh){
            c.castShadow=true; c.receiveShadow=true;
            if(c.material){
              c.material.roughness=Math.max(c.material.roughness||0.5,0.4);
              c.material.envMapIntensity=0.8;
            }
          }
        });
        scene.add(model);
        if(gltf.animations&&gltf.animations.length>0){
          const mixer=new THREE.AnimationMixer(model);
          const idle=gltf.animations.find(a=>a.name.toLowerCase().includes('idle'))||gltf.animations[0];
          mixer.clipAction(idle).play();
          cabinMixers.push(mixer);
        }
        console.log(`✅ Modelo GLB cargado: ${file}`);
        onSuccess(model);
      },
      undefined,
      ()=>{
        console.info(`ℹ️ ${file} no encontrado — usando tripulación procedural detallada`);
        if(!fallbackSpawned){ fallbackSpawned=true; spawnCabinCrewFallback(); }
      }
    );
  };
  // Intentar cargar pilot.glb; en error -> fallback completo
  tryLoad('assets/pilot.glb', (model)=>{
    model.position.set(-3.8,0,-28.8); model.rotation.y=Math.PI;
    tryLoad('assets/attendant.glb', (m2)=>{ m2.position.set(1.2,0,-38); m2.rotation.y=-0.25; });
  });
  // Si ningún archivo existe, spawnCabinCrewFallback se llama automáticamente
}

function spawnCabinCrewFallback(){
  // ── COMANDANTE — sentado en asiento izquierdo del cockpit
  // El cockpit está en z ≈ -46 + 17.5 = -28.5; piloto en asiento izquierdo
  const pilot1=buildPilotDetailed(SKINS[0], HAIRS[6]);
  pilot1.position.set(-3.8, 0, -28.8);
  pilot1.rotation.y=Math.PI;   // mirando hacia los instrumentos (hacia z-)
  pilot1.userData.isNPC=true; pilot1.userData.isStaff=true;
  pilot1.userData.role='pilot'; pilot1.userData.baseRotY=Math.PI;
  pilot1.userData.idlePhase=0; pilot1.userData.headGroup=pilot1.userData.headGroup;
  // Recuperar headGroup si existe
  pilot1.traverse(c=>{ if(c.userData&&c.userData.isHead) pilot1.userData.headGroup=c; });
  npcs.push(pilot1); scene.add(pilot1);

  // ── COPILOTO — asiento derecho del cockpit
  const pilot2=buildPilotDetailed(SKINS[2], HAIRS[3]);
  pilot2.position.set(3.8, 0, -28.8);
  pilot2.rotation.y=Math.PI;
  pilot2.userData.isNPC=true; pilot2.userData.isStaff=true;
  pilot2.userData.role='pilot'; pilot2.userData.baseRotY=Math.PI;
  pilot2.userData.idlePhase=1.1;
  pilot2.traverse(c=>{ if(c.userData&&c.userData.isHead) pilot2.userData.headGroup=c; });
  npcs.push(pilot2); scene.add(pilot2);

  // ── AUXILIAR 1 (femenina) — al inicio del pasillo con carrito
  const att1=buildAttendantDetailed(SKINS[3], HAIRS[1], 'female');
  att1.position.set(1.2, 0, -38);
  att1.rotation.y=-Math.PI*0.08; // ligeramente girada hacia el pasillo
  att1.userData.isNPC=true; att1.userData.isStaff=true;
  att1.userData.role='attendant'; att1.userData.baseRotY=att1.rotation.y;
  att1.userData.idlePhase=0.5;
  att1.traverse(c=>{ if(c.userData&&c.userData.isHead) att1.userData.headGroup=c; });
  npcs.push(att1); scene.add(att1);

  // Carrito de servicio junto a auxiliar 1
  const cart1=buildServiceCart();
  cart1.position.set(2.5, 0, -37.8);
  cart1.rotation.y=-Math.PI*0.08;
  scene.add(cart1);

  // ── AUXILIAR 2 (masculino) — al fondo del pasillo
  const att2=buildAttendantDetailed(SKINS[4], HAIRS[0], 'male');
  att2.position.set(-1.2, 0, -53);
  att2.rotation.y=Math.PI*0.05;
  att2.userData.isNPC=true; att2.userData.isStaff=true;
  att2.userData.role='attendant'; att2.userData.baseRotY=att2.rotation.y;
  att2.userData.idlePhase=2.1;
  att2.traverse(c=>{ if(c.userData&&c.userData.isHead) att2.userData.headGroup=c; });
  npcs.push(att2); scene.add(att2);

  // Carrito de servicio junto a auxiliar 2
  const cart2=buildServiceCart();
  cart2.position.set(-2.4, 0, -52.8);
  cart2.rotation.y=Math.PI*0.05;
  scene.add(cart2);
}

// ══════════════════════════════════════════════════
// UPDATE NPCs  (walk + look-at-player + idle)
// ══════════════════════════════════════════════════
function updateNPCs(delta){
  const playerPos=camera.position;
  const t=clock.getElapsedTime();

  npcs.forEach(npc=>{
    const ud=npc.userData;

    // ── WALKING NPCs (perfiles civiles — Fase 4: caminar / esperar / mirar carteles)
    if(ud.isWalking){
      const walkMult=calmMode?0.15:1.0; // muy lentos en modo calma

      // Pasajeros con perfil de comportamiento (no aplica a tripulación de cabina)
      if(ud.behaviorState){
        ud.behaviorTimer-=delta;
        if(ud.behaviorTimer<=0){
          if(ud.behaviorState==='walk'){
            ud.behaviorState='pause';
            // En Modo Calma las pausas son más largas → menos movimiento en pantalla
            ud.behaviorTimer=(calmMode?5:2.2)+Math.random()*(calmMode?5.5:3.5);
            // ¿Hay un cartel/pantalla cerca? a veces se detiene a mirarlo
            let nearest=null,nd=7.5;
            POI_POINTS.forEach(p=>{ const dd=Math.hypot(p.x-npc.position.x,p.z-npc.position.z); if(dd<nd){nd=dd;nearest=p;} });
            ud.lookTarget=(nearest&&Math.random()<0.65)?nearest:null;
          } else {
            ud.behaviorState='walk';
            ud.behaviorTimer=(calmMode?10:5)+Math.random()*(calmMode?8:9);
            ud.lookTarget=null;
          }
        }
      }

      if(ud.behaviorState!=='pause'){
        ud.progress+=delta*ud.spd*0.055*walkMult;
        if(ud.progress>=1){ ud.progress=0; const tmp=ud.start.clone(); ud.start.copy(ud.dest); ud.dest.copy(tmp); }
        const pos=ud.start.clone().lerp(ud.dest,ud.progress);
        npc.position.copy(pos);
        const dir=ud.dest.clone().sub(ud.start).normalize();
        if(dir.length()>0.01) npc.rotation.y=Math.atan2(dir.x,dir.z);
        // Walk cycle
        ud.wt+=delta*ud.spd*4.5;
        const sw=Math.sin(ud.wt)*0.45;
        npc.children.forEach(c=>{
          if(c.userData.isLeg) c.rotation.x=sw*c.userData.side;
          if(c.userData.isArm) c.rotation.x=-sw*c.userData.side*0.55;
        });
      } else {
        // En pausa: de pie, quieto — piernas/brazos vuelven a reposo suavemente
        npc.children.forEach(c=>{
          if(c.userData.isLeg) c.rotation.x*=(1-Math.min(1,delta*3));
          if(c.userData.isArm) c.rotation.x*=(1-Math.min(1,delta*3));
        });
        // Balanceo de peso muy sutil (persona quieta, no estatua)
        ud.idlePhase=(ud.idlePhase||0)+delta*0.6;
        npc.rotation.z=Math.sin(ud.idlePhase)*0.012;
        // Si eligió un cartel/pantalla cercano, gira la cabeza para "mirarlo"
        if(ud.lookTarget&&ud.headGroup){
          const dx=ud.lookTarget.x-npc.position.x, dz=ud.lookTarget.z-npc.position.z;
          const worldAngle=Math.atan2(dx,dz);
          let rel=((worldAngle-npc.rotation.y+Math.PI)%(Math.PI*2))-Math.PI;
          rel=Math.max(-1.3,Math.min(1.3,rel));
          ud.headGroup.rotation.y+=(rel-ud.headGroup.rotation.y)*Math.min(1,delta*2.2);
          ud.headGroup.rotation.x+=(0.12-ud.headGroup.rotation.x)*Math.min(1,delta*2.2);
        }
      }
    }

    // ── STAFF NPCs (idle animations + look-at)
    if(ud.isStaff){
      ud.idlePhase+=delta;
      // Subtle body sway
      npc.rotation.z=Math.sin(ud.idlePhase*0.8)*0.012;

      if(ud.role==='agent'){
        // Typing arm motion
        npc.children.forEach(c=>{
          if(c.userData.isArm&&c.userData.side===1) c.rotation.x=-0.3-Math.abs(Math.sin(ud.idlePhase*2.5))*0.25;
          if(c.userData.isArm&&c.userData.side===-1) c.rotation.x=-0.1-Math.abs(Math.sin(ud.idlePhase*2.5+1))*0.18;
        });
      }

      if(ud.role==='police'){
        // Occasional subtle head scan
        npc.children.forEach(c=>{
          if(c.userData&&c.userData.isHead) c.rotation.y=Math.sin(ud.idlePhase*0.5)*0.3;
        });
      }

      // ── PILOTO DETALLADO sentado — respiración + manos en yoke
      if(ud.role==='pilot' && ud.isPilotDetailed){
        // Respiración sutil (torso sube/baja)
        npc.children.forEach(c=>{
          if(c.isGroup && c.position.y > 0.3 && c.position.y < 0.7){
            // torso group
            c.position.y = 0.38 + Math.sin(ud.idlePhase*0.9)*0.004;
          }
        });
        // Movimiento ocasional de cabeza mirando instrumentos
        if(ud.headGroup){
          const scanX=-0.05+Math.sin(ud.idlePhase*0.3)*0.06;  // mira ligeramente abajo
          const scanY=Math.sin(ud.idlePhase*0.22)*0.15;        // scan lateral suave
          ud.headGroup.rotation.x+=(scanX-ud.headGroup.rotation.x)*Math.min(1,delta*1.5);
          ud.headGroup.rotation.y+=(scanY-ud.headGroup.rotation.y)*Math.min(1,delta*1.5);
        }
        // Manos en yoke — micro-ajuste de timón (realismo)
        npc.rotation.z=Math.sin(ud.idlePhase*0.4)*0.008;
      }

      // ── AUXILIAR DETALLADA — balanceo natural + movimiento de cabeza
      if(ud.role==='attendant' && (ud.isAttendantDetailed||ud.isPilotDetailed===undefined)){
        // Balanceo de peso (shift weight)
        npc.rotation.z=Math.sin(ud.idlePhase*0.55)*0.018;
        // Cabeza mirando hacia los asientos ocasionalmente
        if(ud.headGroup){
          const hX=Math.sin(ud.idlePhase*0.28)*0.08;
          const hY=Math.sin(ud.idlePhase*0.40)*0.22;
          ud.headGroup.rotation.x+=(hX-ud.headGroup.rotation.x)*Math.min(1,delta*1.8);
          // Solo override look-at si el jugador está lejos
          const dx=playerPos.x-npc.position.x;
          const dz=playerPos.z-npc.position.z;
          if(Math.sqrt(dx*dx+dz*dz)>8){
            ud.headGroup.rotation.y+=(hY-ud.headGroup.rotation.y)*Math.min(1,delta*1.8);
          }
        }
        // Brazo derecho hacia carrito: pequeño movimiento
        npc.children.forEach(c=>{
          if(c.isGroup && c.position.x < -0.2 && c.position.y > 0.9){
            c.rotation.x = 0.4 + Math.sin(ud.idlePhase*0.7)*0.04;
          }
        });
      }
    }

    // ── LOOK-AT-PLAYER (all NPCs with head, within 8 units)
    // Si el pasajero está en pausa "mirando un cartel", ese gesto manda
    // sobre el look-at-player — así no compiten por el control de la cabeza.
    if(ud.headGroup && !(ud.behaviorState==='pause' && ud.lookTarget)){
      const dx=playerPos.x-npc.position.x;
      const dz=playerPos.z-npc.position.z;
      const dist=Math.sqrt(dx*dx+dz*dz);
      if(dist<8 && dist>0.5){
        // World-space angle to player
        const worldAngle=Math.atan2(dx,dz);
        // Relative to NPC body rotation
        const relAngle=worldAngle-npc.rotation.y;
        // Normalize to -PI..PI
        let clamped=((relAngle+Math.PI)%(Math.PI*2))-Math.PI;
        // Clamp: can't look more than 80° left/right
        clamped=Math.max(-1.4,Math.min(1.4,clamped));
        // Smooth lerp
        ud.headGroup.rotation.y+=(clamped-ud.headGroup.rotation.y)*Math.min(1,delta*3.5);
        // Slight pitch toward player (if player is at different height)
        const pitchAngle=Math.atan2(1.6-playerPos.y,dist)*0.5;
        ud.headGroup.rotation.x+=(pitchAngle-ud.headGroup.rotation.x)*Math.min(1,delta*3);
      } else {
        // Return to neutral
        ud.headGroup.rotation.y*=(1-Math.min(1,delta*2));
        ud.headGroup.rotation.x*=(1-Math.min(1,delta*2));
      }
    }
  });
}

// ══════════════════════════════════════════════════
// FASE C — EFECTOS VISUALES Y ATMÓSFERA
// ══════════════════════════════════════════════════

// Flash sutil de color al entrar a una zona
function flashZoneColor(hexColor){
  if(prefersReducedMotion()) return;
  const el=document.getElementById('zone-transition');
  if(!el) return;
  const r=(hexColor>>16)&255, g=(hexColor>>8)&255, b=hexColor&255;
  el.style.background=`rgba(${r},${g},${b},1)`;
  el.classList.remove('flash-active');
  void el.offsetWidth; // fuerza reflow para reiniciar la animación
  el.classList.add('flash-active');
}

// Animación de aviones flotantes en el menú
function startMenuAnimation(){
  if(menuAnimId||prefersReducedMotion()||isMobile) return;
  const canvas=document.getElementById('menu-bg-canvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  canvas.width=canvas.offsetWidth||window.innerWidth;
  canvas.height=canvas.offsetHeight||window.innerHeight;
  const planes=Array.from({length:11},()=>({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    size:10+Math.random()*13,
    speed:0.10+Math.random()*0.20,
    alpha:0.038+Math.random()*0.065,
    rot:-0.18+Math.random()*0.36
  }));
  const loop=()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    planes.forEach(p=>{
      ctx.save();
      ctx.globalAlpha=p.alpha;
      ctx.translate(p.x,p.y);
      ctx.rotate(p.rot);
      ctx.font=`${p.size}px serif`;
      ctx.fillStyle='#ffffff';
      ctx.fillText('✈',0,0);
      ctx.restore();
      p.x+=p.speed;
      if(p.x>canvas.width+40){ p.x=-40; p.y=Math.random()*canvas.height; }
    });
    menuAnimId=requestAnimationFrame(loop);
  };
  loop();
}

// ══════════════════════════════════════════════════
// FASE F — GAMIFICACIÓN SUAVE
// ══════════════════════════════════════════════════

// ── DIARIO LOCAL ──────────────────────────────────
function loadDiary(){
  try{
    const d=JSON.parse(localStorage.getItem(DIARY_KEY));
    return d&&typeof d==='object'?d:{completedCount:0,totalBreaths:0,totalSessions:0,lastDate:null,bestTime:null};
  }catch(e){ return {completedCount:0,totalBreaths:0,totalSessions:0,lastDate:null,bestTime:null}; }
}
function saveDiary(data){
  try{ localStorage.setItem(DIARY_KEY,JSON.stringify(data)); }catch(e){}
}
function updateDiaryDisplay(){
  const d=loadDiary();
  const el=document.getElementById('diary-display');
  if(!el) return;
  if(d.completedCount===0&&d.totalSessions===0){ el.classList.add('hidden'); return; }
  let txt='';
  if(d.completedCount>0){
    txt=`Recorridos completos: ${d.completedCount}`;
    if(d.lastDate) txt+=` · Última visita: ${d.lastDate}`;
    if(d.totalBreaths>0) txt+=` · Respiraciones totales: ${d.totalBreaths}`;
  } else {
    txt=`Recorridos iniciados: ${d.totalSessions}`;
  }
  el.textContent=txt;
  el.classList.remove('hidden');
}

// ── ESCALA DE ANSIEDAD 0-10 ──────────────────────
function renderAnxietyScale(containerId, onSelect){
  const el=document.getElementById(containerId);
  if(!el) return;
  el.innerHTML=Array.from({length:11},(_,i)=>
    `<button class="anxiety-btn" data-level="${i}" type="button" aria-label="${i} de 10">${i}</button>`
  ).join('');
  el.querySelectorAll('.anxiety-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      el.querySelectorAll('.anxiety-btn').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
      onSelect(parseInt(btn.dataset.level));
    });
  });
}

function showAnxietyPre(){
  showScreen('anxiety-pre-screen');
  anxietyPre=-1;
  document.getElementById('btn-confirm-anxiety').disabled=true;
  document.querySelectorAll('#anxiety-scale-pre .anxiety-btn').forEach(b=>b.classList.remove('selected'));
}

function initAnxietyScales(){
  renderAnxietyScale('anxiety-scale-pre',(level)=>{
    anxietyPre=level;
    document.getElementById('btn-confirm-anxiety').disabled=false;
  });
}

// ── MODO GUIADO / LIBRE ───────────────────────────
function toggleGuidedMode(){
  guidedMode=!guidedMode;
  const btn=document.getElementById('btn-toggle-guided');
  if(btn){
    btn.setAttribute('aria-pressed',String(guidedMode));
    btn.firstChild.textContent=guidedMode?' 📍 Modo Guiado':' 🗺 Modo Libre';
  }
  const hint=btn?btn.parentElement.querySelector('.calm-hint'):null;
  if(hint) hint.textContent=guidedMode?'Los paneles se abren automáticamente':'Explorás libremente sin interrupciones';
}

// ── IR DIRECTO A UNA ZONA ─────────────────────────
function goToZone(i){
  startAtZone=i;
  startGame();
  if(isMobile){
    // En mobile no hay pointer lock, posicionamos directo
    const z=ZONE_DATA[i];
    camera.position.set(z.position.x,PLAYER_HEIGHT,z.position.z+z.radius+1.5);
    startAtZone=-1;
  }
}

// ── SELLO SEGÚN RECORRIDOS COMPLETADOS ───────────
function getCompletionMessage(count){
  if(count===1) return 'Completaste tu primer recorrido completo del aeropuerto.';
  if(count<=3)  return `Este es tu recorrido número ${count}. El aeropuerto ya es un lugar más familiar.`;
  if(count<=7)  return `${count} recorridos completos. Tu sistema nervioso sigue adaptándose.`;
  return `${count} recorridos. El aeropuerto ya no te es desconocido.`;
}

// ── MODO CALMA ────────────────────────────────────
function toggleCalmMode(){
  calmMode=!calmMode;
  document.body.classList.toggle('calm-mode',calmMode);
  // Actualizar aria-pressed en ambos botones
  const pressed=String(calmMode);
  const btnMenu=document.getElementById('btn-toggle-calm');
  const btnPause=document.getElementById('btn-calm-pause');
  if(btnMenu) btnMenu.setAttribute('aria-pressed',pressed);
  if(btnPause) btnPause.setAttribute('aria-pressed',pressed);
  const label=document.getElementById('calm-status-label');
  if(label) label.textContent=calmMode?'ON':'OFF';
  if(isGameActive) showToast(calmMode?'🧘 Modo Calma activado':'⚡ Modo normal activado');
  // El Modo Calma reduce el volumen del ambiente sonoro (nunca lo aumenta)
  if(audioEnabled&&audioCtx){
    applyCalmAudioGains();
    setAmbientMasterTarget(calmMode?0.45:1.0,1.6);
  }
}

// ── TAMAÑO DE TEXTO EN EL PANEL ───────────────────
function setTextScale(delta){
  textScale=Math.max(0.85,Math.min(1.4,textScale+delta));
  document.documentElement.style.setProperty('--panel-text-scale',textScale);
}

function stopMenuAnimation(){
  if(menuAnimId){ cancelAnimationFrame(menuAnimId); menuAnimId=null; }
  const canvas=document.getElementById('menu-bg-canvas');
  if(canvas){ const ctx=canvas.getContext('2d'); ctx.clearRect(0,0,canvas.width,canvas.height); }
}

// ══════════════════════════════════════════════════
// EVENTS & GAME LOGIC
// ══════════════════════════════════════════════════
function setupEvents(){
  // btn-start ahora muestra la pantalla de ansiedad antes de iniciar
  document.getElementById('btn-start').addEventListener('click',showAnxietyPre);
  document.getElementById('btn-confirm-anxiety').addEventListener('click',startGame);
  document.getElementById('btn-skip-anxiety').addEventListener('click',startGame);
  document.getElementById('btn-back-anxiety').addEventListener('click',()=>showScreen('main-menu'));
  document.getElementById('btn-toggle-calm').addEventListener('click',toggleCalmMode);
  document.getElementById('btn-toggle-guided').addEventListener('click',toggleGuidedMode);
  document.getElementById('btn-calm-pause').addEventListener('click',toggleCalmMode);
  document.getElementById('btn-toggle-sound').addEventListener('click',toggleAmbientSound);
  document.getElementById('btn-sound-pause').addEventListener('click',toggleAmbientSound);
  document.getElementById('btn-emergency-exit').addEventListener('click',returnToMenu);
  document.getElementById('btn-text-increase').addEventListener('click',()=>setTextScale(0.15));
  document.getElementById('btn-text-decrease').addEventListener('click',()=>setTextScale(-0.15));
  document.getElementById('btn-info').addEventListener('click',()=>showScreen('info-screen'));
  document.getElementById('btn-back-info').addEventListener('click',()=>showScreen('main-menu'));
  document.getElementById('btn-start-from-info').addEventListener('click',showAnxietyPre);
  document.getElementById('btn-pause').addEventListener('click',pauseGame);
  document.getElementById('btn-resume').addEventListener('click',resumeGame);
  document.getElementById('btn-to-menu').addEventListener('click',returnToMenu);
  document.getElementById('btn-breathe').addEventListener('click',openBreathing);
  document.getElementById('btn-narrate').addEventListener('click',narrateCurrentZone);
  document.getElementById('btn-tips').addEventListener('click',openCurrentZonePanel);
  document.getElementById('btn-close-zone').addEventListener('click',closeZonePanel);
  document.getElementById('btn-close-hint').addEventListener('click',()=>document.getElementById('controls-hint').classList.add('hidden'));

  // Overlay click-to-play
  // Click en toda la tarjeta → activar
  document.querySelector('.ctp-inner').addEventListener('click',()=>{ controls.lock(); });
  // Botón principal — stopPropagation para no disparar dos veces
  document.getElementById('btn-ctp-activate').addEventListener('click',(e)=>{ e.stopPropagation(); controls.lock(); });
  // Botón secundario Volver — no propagar al ctp-inner
  document.getElementById('btn-ctp-back').addEventListener('click',(e)=>{ e.stopPropagation(); returnToMenu(); });
  document.getElementById('btn-panel-breathe').addEventListener('click',openBreathing);
  document.getElementById('btn-panel-grounding').addEventListener('click',openGrounding);
  document.getElementById('btn-panel-narrate').addEventListener('click',()=>{ narrateZone(currentZoneIndex); closeZonePanel(); });
  document.getElementById('btn-close-breath').addEventListener('click',closeBreathing);
  document.getElementById('btn-start-breath').addEventListener('click',startBreathing);
  document.getElementById('btn-stop-breath').addEventListener('click',stopBreathing);
  document.getElementById('btn-restart').addEventListener('click',restartGame);
  document.getElementById('btn-share').addEventListener('click',shareWithTherapist);
  document.getElementById('btn-end-menu').addEventListener('click',returnToMenu);
  document.getElementById('btn-close-grounding').addEventListener('click',closeGrounding);
  document.getElementById('btn-grounding-next').addEventListener('click',advanceGrounding);
  document.getElementById('btn-grounding-restart').addEventListener('click',()=>{ groundingStep=0; renderGroundingStep(); document.getElementById('btn-grounding-restart').classList.add('hidden'); });
  document.querySelectorAll('.tab-btn').forEach(btn=>{ btn.addEventListener('click',()=>{ document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active')); document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active')); btn.classList.add('active'); document.getElementById('tab-'+btn.dataset.tab).classList.add('active'); }); });
  renderer.domElement.addEventListener('click',()=>{ if(!isMobile&&isGameActive&&!isPaused) controls.lock(); });
  document.addEventListener('keydown',onKeyDown);
  document.addEventListener('keyup',onKeyUp);
  window.addEventListener('resize',()=>{
    camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix();
    renderer.setSize(innerWidth,innerHeight);
    if(composer) composer.setSize(innerWidth,innerHeight);
  });
  controls.addEventListener('lock',()=>{
    document.getElementById('click-to-play').classList.add('hidden');
    // Si se pidió ir directo a una zona (goToZone), posicionar ahora que el lock está activo
    if(startAtZone>=0){
      const z=ZONE_DATA[startAtZone];
      camera.position.set(z.position.x,PLAYER_HEIGHT,z.position.z+z.radius+1.5);
      startAtZone=-1;
    }
  });
  controls.addEventListener('unlock',()=>{ if(!isMobile&&isGameActive&&!isPaused){ isPaused=true; document.getElementById('pause-menu').classList.remove('hidden'); } });
  if(isMobile) setupMobileControls();
}

function onKeyDown(e){
  // ESC con juego pausado → reanudar (el pointer lock ya se liberó; este ESC es el segundo)
  if(e.code==='Escape'&&isGameActive&&isPaused){ resumeGame(); return; }
  if(!isGameActive) return;
  switch(e.code){
    case 'KeyW': case 'ArrowUp':    movement.forward=true;  break;
    case 'KeyS': case 'ArrowDown':  movement.backward=true; break;
    case 'KeyA': case 'ArrowLeft':  movement.left=true;     break;
    case 'KeyD': case 'ArrowRight': movement.right=true;    break;
    case 'KeyB': openBreathing();        break;
    case 'KeyE': openCurrentZonePanel(); break;
  }
}
function onKeyUp(e){ switch(e.code){ case 'KeyW': case 'ArrowUp': movement.forward=false; break; case 'KeyS': case 'ArrowDown': movement.backward=false; break; case 'KeyA': case 'ArrowLeft': movement.left=false; break; case 'KeyD': case 'ArrowRight': movement.right=false; break; } }

// ══════════════════════════════════════════════════
// MOBILE TOUCH CONTROLS
// ══════════════════════════════════════════════════
function setupMobileControls(){
  document.getElementById('mobile-joystick').classList.remove('hidden');
  document.getElementById('mobile-rotate-btns').classList.remove('hidden');
  const crosshair=document.getElementById('crosshair');
  if(crosshair) crosshair.style.display='none';
  const hint=document.getElementById('controls-hint');
  if(hint) hint.querySelector('span').textContent='⬤ Izquierda: moverse  ·  Derecha: mirar  ·  Botones: acciones';

  // Botones de rotación de cámara — pointerdown/up para respuesta inmediata
  const btnRL=document.getElementById('btn-rotate-left');
  const btnRR=document.getElementById('btn-rotate-right');
  const setRL=(v)=>{ rotateLeft=v;  btnRL.classList.toggle('pressed',v); };
  const setRR=(v)=>{ rotateRight=v; btnRR.classList.toggle('pressed',v); };
  btnRL.addEventListener('pointerdown',(e)=>{ e.stopPropagation(); setRL(true);  });
  btnRR.addEventListener('pointerdown',(e)=>{ e.stopPropagation(); setRR(true);  });
  btnRL.addEventListener('pointerup',   ()=>setRL(false));
  btnRL.addEventListener('pointercancel',()=>setRL(false));
  btnRL.addEventListener('pointerleave', ()=>setRL(false));
  btnRR.addEventListener('pointerup',   ()=>setRR(false));
  btnRR.addEventListener('pointercancel',()=>setRR(false));
  btnRR.addEventListener('pointerleave', ()=>setRR(false));

  const jHandle=document.getElementById('joystick-handle');
  const JOY_R=46;

  // Joystick zone: bottom-left quadrant of screen
  const inJoyZone=(x,y)=> x < window.innerWidth*0.45 && y > window.innerHeight*0.52;

  // Check if the touch target is a UI button (should NOT be hijacked)
  const isUITarget=(e)=>{
    const tag=e.target.tagName;
    if(tag==='BUTTON'||tag==='A'||tag==='INPUT'||tag==='SELECT') return true;
    if(e.target.closest) return !!e.target.closest(
      'button, a, input, ' +
      '#bottom-bar .hud-action-btn, #btn-pause, .close-btn, .tab-btn, ' +
      '.zone-panel-actions, .breath-btns, ' +
      // Paneles con scroll — no interceptar sus toques
      '#zone-panel, #breathing-modal, #pause-menu, ' +
      // Botones de rotación
      '#mobile-rotate-btns'
    );
    return false;
  };

  // ── Use document-level events so touches reach us even when HUD overlays canvas ──
  document.addEventListener('touchstart',(e)=>{
    if(!isGameActive||isPaused) return;
    if(isUITarget(e)) return;          // let buttons handle their own touches
    for(const t of e.changedTouches){
      if(!joystick.active && inJoyZone(t.clientX,t.clientY)){
        joystick.active=true; joystick.id=t.identifier;
        joystick.baseX=t.clientX; joystick.baseY=t.clientY;
        joystick.nx=0; joystick.ny=0;
      } else if(!lookTouch.active && t.clientX>window.innerWidth*0.28){
        lookTouch.active=true; lookTouch.id=t.identifier;
        lookTouch.lastX=t.clientX; lookTouch.lastY=t.clientY;
      }
    }
    e.preventDefault();
  },{passive:false});

  document.addEventListener('touchmove',(e)=>{
    if(!isGameActive||isPaused) return;
    if(isUITarget(e)) return;
    for(const t of e.changedTouches){
      if(joystick.active&&t.identifier===joystick.id){
        const dx=t.clientX-joystick.baseX, dy=t.clientY-joystick.baseY;
        const dist=Math.hypot(dx,dy), clamped=Math.min(dist,JOY_R);
        const ang=Math.atan2(dy,dx);
        const cx=Math.cos(ang)*clamped, cy=Math.sin(ang)*clamped;
        joystick.nx=cx/JOY_R; joystick.ny=cy/JOY_R;
        jHandle.style.transform=`translate(${cx}px,${cy}px)`;
      }
      if(lookTouch.active&&t.identifier===lookTouch.id){
        const dx=t.clientX-lookTouch.lastX, dy=t.clientY-lookTouch.lastY;
        mobileYaw-=dx*0.006;
        mobilePitch=Math.max(-0.5,Math.min(0.5,mobilePitch-dy*0.004));
        lookTouch.lastX=t.clientX; lookTouch.lastY=t.clientY;
      }
    }
    e.preventDefault();
  },{passive:false});

  const endT=(e)=>{
    for(const t of e.changedTouches){
      if(joystick.active&&t.identifier===joystick.id){
        joystick.active=false; joystick.id=null; joystick.nx=0; joystick.ny=0;
        jHandle.style.transform='translate(0px,0px)';
      }
      if(lookTouch.active&&t.identifier===lookTouch.id){
        lookTouch.active=false; lookTouch.id=null;
      }
    }
  };
  document.addEventListener('touchend',  endT,{passive:false});
  document.addEventListener('touchcancel',endT,{passive:false});
}

function showScreen(id){ document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden')); if(id) document.getElementById(id).classList.remove('hidden'); }
function startGame(){
  stopMenuAnimation();
  gameStartTime=Date.now();
  // Registrar sesión iniciada en el diario
  const d=loadDiary();
  d.totalSessions=(d.totalSessions||0)+1;
  saveDiary(d);
  showScreen(null);
  document.getElementById('game-hud').classList.remove('hidden');
  isGameActive=true; isPaused=false; currentZoneIndex=-1;
  visitedZones.clear(); breathCount=0;
  document.getElementById('breath-count-stat').textContent='0';
  camera.position.set(0,PLAYER_HEIGHT,52);
  if(isMobile){
    mobileYaw=Math.PI; mobilePitch=0;
    camera.rotation.order='YXZ';
    camera.rotation.y=mobileYaw; camera.rotation.x=mobilePitch;
    showToast('✈ Avanzá hacia la entrada. Usá 💡 Consejos, 🫁 Respirar y 🔊 Escuchar.');
  } else {
    camera.rotation.set(0,Math.PI,0);
    document.getElementById('click-to-play').classList.remove('hidden');
    document.getElementById('controls-hint').classList.remove('hidden');
    // Auto-focus en el botón principal para que Enter/Espacio funcionen sin mouse
    setTimeout(()=>{ const b=document.getElementById('btn-ctp-activate'); if(b) b.focus(); },80);
  }
  resetProgressUI();
  resumeAmbientAudioIfEnabled();
}
function pauseGame(){ isPaused=true; if(!isMobile)controls.unlock(); document.getElementById('pause-menu').classList.remove('hidden'); suspendAmbientAudio(); }
function resumeGame(){ isPaused=false; document.getElementById('pause-menu').classList.add('hidden'); if(!isMobile)controls.lock(); resumeAmbientAudioIfEnabled(); }
function returnToMenu(){ isGameActive=false; isPaused=false; stopSpeech(); stopAmbientAudio(); if(!isMobile)controls.unlock(); closeZonePanel(); closeGrounding(); closeBreathing(); document.getElementById('game-hud').classList.add('hidden'); document.getElementById('pause-menu').classList.add('hidden'); document.getElementById('click-to-play').classList.add('hidden'); document.getElementById('controls-hint').classList.add('hidden'); showScreen('main-menu'); startMenuAnimation(); updateDiaryDisplay(); }
function restartGame(){ showScreen(null); startGame(); }
function resetProgressUI(){
  document.getElementById('progress-fill').style.width='0%';
  document.querySelectorAll('.step').forEach(s=>{
    s.classList.remove('done','active','step-pop');
    delete s.dataset.animated;
  });
}

function checkZones(){
  const pos=camera.position; let ni=0,nd=Infinity;
  ZONE_DATA.forEach((zone,i)=>{ const dx=pos.x-zone.position.x,dz=pos.z-zone.position.z,d=Math.sqrt(dx*dx+dz*dz); if(d<nd){nd=d;ni=i;} });
  const hintEl=document.getElementById('approach-hint'),badgeEl=document.getElementById('zone-badge');
  if(nd<18){ const zone=ZONE_DATA[ni]; document.getElementById('approach-text').textContent=nd<zone.radius?zone.name:`Avanza hacia: ${zone.name}`; hintEl.classList.remove('hidden'); badgeEl.textContent=`${zone.emoji} ${zone.name}`; badgeEl.classList.add('visible'); } else { hintEl.classList.add('hidden'); badgeEl.classList.remove('visible'); }
  if(nd<ZONE_DATA[ni].radius&&ni!==currentZoneIndex) enterZone(ni);
}
function enterZone(i){
  currentZoneIndex=i;
  const zone=ZONE_DATA[i];
  const first=!visitedZones.has(i);
  visitedZones.add(i);
  updateProgress(i);
  if(first){
    flashZoneColor(zone.color); // flash sutil del color de la zona
    if(i===0){
      // Bienvenida extendida en la primera zona
      const msg=isMobile
        ? '✈ ¡Primera zona! Tocá 💡 Consejos para leer info, 🫁 para respirar y 🔊 para escuchar la guía.'
        : '✈ Primera zona alcanzada. Se abrirá el panel de información de cada zona al llegar. Podés usar E, B y 🔊 en cualquier momento.';
      showToast(msg);
    }
    if(guidedMode){
      if(isMobile){
        if(i!==0) showToast(`${zone.emoji} ${zone.name} — tocá 💡 para info`);
        narrateZone(i);
      } else {
        openZonePanel(i);
        narrateZone(i);
        if(i!==0) showToast(`${zone.emoji} ${zone.name}`);
      }
    } else {
      // Modo libre: solo toast suave, sin panel ni narración automática
      showToast(`${zone.emoji} ${zone.name}`);
    }
  }
  if(visitedZones.size>=ZONE_DATA.length) setTimeout(()=>endGame(),2000);
}
function updateProgress(i){
  document.getElementById('progress-fill').style.width=((i+1)/ZONE_DATA.length*100)+'%';
  document.querySelectorAll('.step').forEach((s,j)=>{
    s.classList.remove('active','done');
    if(j<i){
      s.classList.add('done');
      // Animación suave solo la primera vez que se completa ese paso
      if(!s.dataset.animated){
        s.dataset.animated='1';
        if(!prefersReducedMotion()&&!calmMode){
          s.classList.add('step-pop');
          setTimeout(()=>s.classList.remove('step-pop'),500);
        }
      }
    } else if(j===i){
      s.classList.add('active');
    }
  });
}
function endGame(){
  isGameActive=false; stopSpeech(); stopAmbientAudio();
  if(!isMobile)controls.unlock();
  document.getElementById('click-to-play').classList.add('hidden');
  document.getElementById('controls-hint').classList.add('hidden');
  closeZonePanel();
  document.getElementById('game-hud').classList.add('hidden');
  document.getElementById('breath-count-stat').textContent=breathCount;
  // Tiempo total del recorrido
  const secs=Math.floor((Date.now()-gameStartTime)/1000);
  const m=Math.floor(secs/60), s=secs%60;
  document.getElementById('time-stat').textContent=`${m}:${String(s).padStart(2,'0')}`;

  // Actualizar diario en localStorage
  const d=loadDiary();
  d.completedCount=(d.completedCount||0)+1;
  d.totalBreaths=(d.totalBreaths||0)+breathCount;
  d.lastDate=new Date().toLocaleDateString('es-AR',{day:'2-digit',month:'2-digit',year:'numeric'});
  if(!d.bestTime||secs<d.bestTime) d.bestTime=secs;
  saveDiary(d);

  // Mensaje personalizado según recorridos completados (sello discreto)
  const subEl=document.getElementById('end-subtitle');
  if(subEl) subEl.textContent=getCompletionMessage(d.completedCount);

  // Ansiedad post-juego
  anxietyPost=-1;
  const anxResult=document.getElementById('anxiety-result');
  if(anxietyPre>=0&&anxResult){
    document.getElementById('anxiety-pre-display').textContent=
      `Empezaste el recorrido con ansiedad: ${anxietyPre}/10`;
    anxResult.classList.remove('hidden');
    document.getElementById('anxiety-comparison').classList.add('hidden');
    renderAnxietyScale('anxiety-scale-post',(level)=>{
      anxietyPost=level;
      const diff=anxietyPre-level;
      let msg=`${anxietyPre}/10 → ${level}/10`;
      if(diff>0)      msg+=` · Bajó ${diff} ${diff===1?'punto':'puntos'} 🌿`;
      else if(diff<0) msg+=` · Subió ${Math.abs(diff)} ${Math.abs(diff)===1?'punto':'puntos'} — es normal después del esfuerzo.`;
      else            msg+=` · Se mantuvo igual.`;
      const compEl=document.getElementById('anxiety-comparison');
      compEl.textContent=msg; compEl.classList.remove('hidden');
    });
  } else if(anxResult){
    anxResult.classList.add('hidden');
  }

  // Generar botones de zona para "Practicar zona"
  const grid=document.getElementById('zone-repeat-grid');
  if(grid){
    grid.innerHTML=ZONE_DATA.map((z,i)=>
      `<button class="btn-zone-repeat" data-zone="${i}" type="button">${z.emoji} ${z.name}</button>`
    ).join('');
    grid.querySelectorAll('.btn-zone-repeat').forEach(btn=>{
      btn.addEventListener('click',()=>goToZone(parseInt(btn.dataset.zone)));
    });
  }

  showScreen('end-screen');
  speak('¡Felicitaciones! Completaste el recorrido completo del aeropuerto. Ahora estás más preparado para tu próximo vuelo.');
}

function openZonePanel(i){
  if(i<0||i>=ZONE_DATA.length) return;
  const z=ZONE_DATA[i];
  document.getElementById('zone-icon-big').textContent=z.emoji;
  document.getElementById('zone-panel-title').textContent=z.name;
  document.getElementById('zone-panel-subtitle').textContent=z.subtitle;
  document.getElementById('zone-expect-list').innerHTML=z.expect.map(e=>`<li>${e}</li>`).join('');
  document.getElementById('zone-health-content').innerHTML=z.health.map(h=>`<div class="health-tip">${h.text}</div>`).join('');
  document.getElementById('zone-panic-content').innerHTML=z.panic.map(p=>`<div class="panic-tip"><div class="panic-title">${p.title}</div>${p.text}</div>`).join('');
  // 4° tab: Para el día real
  const prepHTML=z.prepare?z.prepare.map(t=>`<div class="prepare-tip">${t}</div>`).join(''):'<p style="color:var(--text-light);padding:12px">Información no disponible para esta zona.</p>';
  document.getElementById('zone-prepare-content').innerHTML=prepHTML;
  // Botón grounding solo en zona del avión
  const isPlane=z.id==='plane';
  document.getElementById('btn-panel-grounding').classList.toggle('hidden',!isPlane);
  // Resetear tabs al primero
  document.querySelectorAll('.tab-btn').forEach((b,j)=>b.classList.toggle('active',j===0));
  document.querySelectorAll('.tab-content').forEach((t,j)=>t.classList.toggle('active',j===0));
  document.getElementById('zone-panel').classList.remove('hidden');
}
function closeZonePanel(){ document.getElementById('zone-panel').classList.add('hidden'); }
function openCurrentZonePanel(){ if(currentZoneIndex>=0) openZonePanel(currentZoneIndex); else showToast('Acércate a una zona del aeropuerto primero.'); }

// ── GROUNDING MODAL ───────────────────────────────
function openGrounding(){
  groundingStep=0;
  closeZonePanel();
  if(!isMobile) controls.unlock();
  document.getElementById('grounding-modal').classList.remove('hidden');
  renderGroundingStep();
}
function closeGrounding(){
  document.getElementById('grounding-modal').classList.add('hidden');
  if(!isMobile&&isGameActive&&!isPaused) controls.lock();
}
function renderGroundingStep(){
  const s=GROUNDING_STEPS[groundingStep];
  document.getElementById('grounding-num').textContent=s.num;
  document.getElementById('grounding-sense').textContent=s.sense;
  document.getElementById('grounding-instruction').innerHTML=s.instruction.replace('\n','<br>');
  // Dots
  document.querySelectorAll('.grounding-dot').forEach((d,i)=>{
    d.classList.remove('active','done');
    if(i<groundingStep) d.classList.add('done');
    else if(i===groundingStep) d.classList.add('active');
  });
  const isLast=groundingStep===GROUNDING_STEPS.length-1;
  document.getElementById('btn-grounding-next').textContent=isLast?'✓ Terminado':'Siguiente →';
  document.getElementById('btn-grounding-restart').classList.toggle('hidden',!isLast);
}
function advanceGrounding(){
  if(groundingStep<GROUNDING_STEPS.length-1){ groundingStep++; renderGroundingStep(); }
  else closeGrounding();
}

// ── COMPARTIR CON TERAPEUTA ───────────────────────
function generateShareText(){
  const secs=Math.floor((Date.now()-gameStartTime)/1000);
  const m=Math.floor(secs/60), s=secs%60;
  const date=new Date().toLocaleDateString('es-AR',{day:'2-digit',month:'2-digit',year:'numeric'});
  const zonas=Array.from(visitedZones).sort((a,b)=>a-b).map(i=>`✓ ${ZONE_DATA[i].emoji} ${ZONE_DATA[i].name}`).join('\n');
  let txt=`AeroCalma – Resumen del recorrido\n` +
    `Fecha: ${date}\n` +
    `Tiempo total: ${m}:${String(s).padStart(2,'0')}\n` +
    `Zonas recorridas: ${visitedZones.size}/7\n` +
    `Ejercicios de respiración: ${breathCount}\n`;
  if(anxietyPre>=0)  txt+=`Ansiedad inicial: ${anxietyPre}/10\n`;
  if(anxietyPost>=0) txt+=`Ansiedad final:   ${anxietyPost}/10\n`;
  txt+=`\nZonas visitadas:\n${zonas}\n\n` +
    `Consultorio Dr. Pedro Dagnino – Psiquiatría\nhttps://aerocalma.netlify.app/`;
  return txt;
}
function shareWithTherapist(){
  const text=generateShareText();
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(()=>showShareFeedback()).catch(()=>fallbackCopy(text));
  } else { fallbackCopy(text); }
}
function fallbackCopy(text){
  const ta=document.createElement('textarea');
  ta.value=text; ta.style.cssText='position:fixed;top:-9999px';
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); showShareFeedback(); }catch(e){ alert(text); }
  document.body.removeChild(ta);
}
function showShareFeedback(){
  const el=document.getElementById('share-feedback');
  el.classList.remove('hidden');
  setTimeout(()=>el.classList.add('hidden'),4000);
}

// ════════════════════════════════════════════════════════════
// AMBIENTE SONORO DEL HALL — Fase 5
// Música suave tipo "pad" generada con osciladores + filtro,
// más un murmullo de hall muy tenue generado con ruido filtrado.
// Todo es procedural (Web Audio API): no requiere archivos de audio.
// Apagado por defecto — el usuario lo activa desde el menú o pausa.
// ════════════════════════════════════════════════════════════
function ensureAmbientAudio(){
  if(audioCtx) return true;
  try{
    const Ctx=window.AudioContext||window.webkitAudioContext;
    if(!Ctx) return false;
    audioCtx=new Ctx();

    ambientMaster=audioCtx.createGain();
    ambientMaster.gain.value=0; // arranca en silencio; sube al activar
    ambientMaster.connect(audioCtx.destination);

    musicGainNode=audioCtx.createGain();
    musicGainNode.gain.value=AMBIENT_MUSIC_BASE;
    musicGainNode.connect(ambientMaster);

    hallGainNode=audioCtx.createGain();
    hallGainNode.gain.value=AMBIENT_HALL_BASE;
    hallGainNode.connect(ambientMaster);

    ambientNodes={ osc:[], lfo:[], noise:null };

    buildAmbientPad();
    buildHallMurmur();
    return true;
  }catch(e){ audioCtx=null; return false; }
}

// Pad armónico suave: 3 osciladores tipo seno/triángulo, ligeramente
// desafinados entre sí, pasando por un filtro pasa-bajos con un LFO
// lento que lo "respira" — evoca música instrumental ambiental de
// salas de espera, sin melodía marcada ni ritmo perceptible.
function buildAmbientPad(){
  const now=audioCtx.currentTime;
  const filter=audioCtx.createBiquadFilter();
  filter.type='lowpass';
  filter.frequency.value=900;
  filter.Q.value=0.4;
  filter.connect(musicGainNode);

  // LFO que mueve suavemente la frecuencia de corte (sensación de "respiración")
  const lfo=audioCtx.createOscillator();
  lfo.type='sine';
  lfo.frequency.value=0.045; // muy lento
  const lfoGain=audioCtx.createGain();
  lfoGain.gain.value=220;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start(now);
  ambientNodes.lfo.push(lfo);

  // Acorde abierto y cálido (fundamental + quinta + octava + ligera disonancia suave)
  const freqs=[110.0, 164.81, 220.0, 277.18];
  const types=['sine','triangle','sine','triangle'];
  const detunes=[0,-4,3,-2];
  freqs.forEach((f,i)=>{
    const osc=audioCtx.createOscillator();
    osc.type=types[i];
    osc.frequency.value=f;
    osc.detune.value=detunes[i];

    const voiceGain=audioCtx.createGain();
    voiceGain.gain.value=0.22 - i*0.035; // las voces más agudas suenan más tenues

    // leve trémolo individual para que el conjunto se sienta vivo, no estático
    const trem=audioCtx.createOscillator();
    trem.type='sine';
    trem.frequency.value=0.07+i*0.015;
    const tremGain=audioCtx.createGain();
    tremGain.gain.value=0.05;
    trem.connect(tremGain);
    tremGain.connect(voiceGain.gain);
    trem.start(now);

    osc.connect(voiceGain);
    voiceGain.connect(filter);
    osc.start(now);
    ambientNodes.osc.push(osc);
    ambientNodes.lfo.push(trem);
  });
}

// Murmullo de hall: ruido filtrado en banda media-baja, evocando la
// sensación de espacio amplio y actividad lejana, sin voces inteligibles
// ni anuncios — sólo una textura de fondo casi imperceptible.
function buildHallMurmur(){
  const now=audioCtx.currentTime;
  const bufferSize=audioCtx.sampleRate*2;
  const buffer=audioCtx.createBuffer(1,bufferSize,audioCtx.sampleRate);
  const data=buffer.getChannelData(0);
  for(let i=0;i<bufferSize;i++) data[i]=(Math.random()*2-1)*0.6;

  const noise=audioCtx.createBufferSource();
  noise.buffer=buffer;
  noise.loop=true;

  const bandpass=audioCtx.createBiquadFilter();
  bandpass.type='bandpass';
  bandpass.frequency.value=420;
  bandpass.Q.value=0.6;

  const lowpass=audioCtx.createBiquadFilter();
  lowpass.type='lowpass';
  lowpass.frequency.value=1100;

  // LFO lento que varía el nivel del murmullo, como oleadas distantes de actividad
  const lfo=audioCtx.createOscillator();
  lfo.type='sine';
  lfo.frequency.value=0.03;
  const lfoGain=audioCtx.createGain();
  lfoGain.gain.value=0.45;
  const murmurShape=audioCtx.createGain();
  murmurShape.gain.value=0.55;
  lfo.connect(lfoGain);
  lfoGain.connect(murmurShape.gain);
  lfo.start(now);

  noise.connect(bandpass);
  bandpass.connect(lowpass);
  lowpass.connect(murmurShape);
  murmurShape.connect(hallGainNode);
  noise.start(now);

  ambientNodes.noise=noise;
  ambientNodes.lfo.push(lfo);
}

// Sube/baja suavemente el volumen maestro (evita "clics" perceptibles)
function setAmbientMasterTarget(target,rampSeconds){
  if(!audioCtx||!ambientMaster) return;
  const now=audioCtx.currentTime;
  ambientMaster.gain.cancelScheduledValues(now);
  ambientMaster.gain.setValueAtTime(ambientMaster.gain.value,now);
  ambientMaster.gain.linearRampToValueAtTime(target,now+(rampSeconds||1.5));
}

// Aplica el factor de Modo Calma a los volúmenes base de música y murmullo
// (en baja estimulación, el ambiente sonoro se reduce — nunca se vuelve más intenso)
function applyCalmAudioGains(){
  if(!audioCtx||!musicGainNode||!hallGainNode) return;
  const now=audioCtx.currentTime;
  const calmFactor=calmMode?0.45:1.0;
  musicGainNode.gain.cancelScheduledValues(now);
  musicGainNode.gain.setValueAtTime(musicGainNode.gain.value,now);
  musicGainNode.gain.linearRampToValueAtTime(AMBIENT_MUSIC_BASE*calmFactor,now+1.2);
  hallGainNode.gain.cancelScheduledValues(now);
  hallGainNode.gain.setValueAtTime(hallGainNode.gain.value,now);
  hallGainNode.gain.linearRampToValueAtTime(AMBIENT_HALL_BASE*calmFactor,now+1.2);
}

// Sincroniza ambos botones de sonido (menú principal y pausa)
function syncSoundButtons(){
  const mainBtn=document.getElementById('btn-toggle-sound');
  const pauseBtn=document.getElementById('btn-sound-pause');
  const label=document.getElementById('sound-status-label');
  if(mainBtn) mainBtn.setAttribute('aria-pressed', audioEnabled?'true':'false');
  if(pauseBtn) pauseBtn.setAttribute('aria-pressed', audioEnabled?'true':'false');
  if(label) label.textContent=audioEnabled?'ON':'OFF';
}

// Activa/desactiva el ambiente sonoro — debe llamarse desde un gesto del
// usuario (click) por la política de autoplay de los navegadores.
function toggleAmbientSound(){
  audioEnabled=!audioEnabled;
  if(audioEnabled){
    const ok=ensureAmbientAudio();
    if(!ok){ audioEnabled=false; syncSoundButtons(); return; }
    if(audioCtx.state==='suspended') audioCtx.resume();
    applyCalmAudioGains();
    const calmFactor=calmMode?0.45:1.0;
    setAmbientMasterTarget(calmFactor,2.2);
  }else{
    setAmbientMasterTarget(0,1.2);
  }
  syncSoundButtons();
}

// Silencia el ambiente sin apagar la preferencia del usuario (p.ej. al pausar
// o volver al menú) — se reanuda suavemente si corresponde.
function suspendAmbientAudio(){
  if(audioCtx&&ambientMaster) setAmbientMasterTarget(0,0.8);
}
function resumeAmbientAudioIfEnabled(){
  if(!audioEnabled) return;
  if(!audioCtx||!ambientMaster){ if(!ensureAmbientAudio()) return; }
  if(audioCtx.state==='suspended') audioCtx.resume();
  applyCalmAudioGains();
  const calmFactor=calmMode?0.45:1.0;
  setAmbientMasterTarget(calmFactor,1.8);
}
// Detiene y libera todos los nodos — usar al finalizar el recorrido.
function stopAmbientAudio(){
  if(!audioCtx) return;
  try{
    setAmbientMasterTarget(0,0.6);
    setTimeout(()=>{
      try{
        if(ambientNodes){
          ambientNodes.osc.forEach(o=>{ try{o.stop();}catch(e){} });
          ambientNodes.lfo.forEach(o=>{ try{o.stop();}catch(e){} });
          if(ambientNodes.noise){ try{ambientNodes.noise.stop();}catch(e){} }
        }
        audioCtx.close();
      }catch(e){}
      audioCtx=null; ambientMaster=null; musicGainNode=null; hallGainNode=null; ambientNodes=null;
    },700);
  }catch(e){}
}

function narrateZone(i){ if(i>=0&&i<ZONE_DATA.length) speak(ZONE_DATA[i].narration); }
function narrateCurrentZone(){ if(currentZoneIndex>=0) narrateZone(currentZoneIndex); else speak('Avanza hacia la entrada del aeropuerto para comenzar tu recorrido.'); }
function speak(text){
  if(!speechSynth) return;
  stopSpeech();
  const u=new SpeechSynthesisUtterance(text);
  u.lang='es-ES';
  u.rate=calmMode?0.72:0.88; // más lento en modo calma
  u.pitch=1.0; u.volume=1.0;
  const voices=cachedVoices.length?cachedVoices:speechSynth.getVoices();
  const v=voices.find(v=>v.lang.startsWith('es')&&!v.name.includes('Google'))||voices.find(v=>v.lang.startsWith('es'));
  if(v) u.voice=v;
  isSpeaking=true;
  // Mostrar subtítulo visual
  const sub=document.getElementById('tts-subtitle');
  if(sub){ sub.textContent=text; sub.classList.remove('hidden'); }
  u.onend=()=>{ isSpeaking=false; if(sub) sub.classList.add('hidden'); };
  speechSynth.speak(u);
}
function stopSpeech(){
  if(speechSynth){ speechSynth.cancel(); isSpeaking=false; }
  const sub=document.getElementById('tts-subtitle');
  if(sub) sub.classList.add('hidden');
}

function openBreathing(){ closeZonePanel(); if(!isMobile)controls.unlock(); document.getElementById('breathing-modal').classList.remove('hidden'); resetBreathUI(); }
function closeBreathing(){ document.getElementById('breathing-modal').classList.add('hidden'); stopBreathing(); if(!isMobile&&isGameActive&&!isPaused)controls.lock(); }
function resetBreathUI(){ document.getElementById('breath-phase').textContent='LISTO'; document.getElementById('breath-count').textContent='—'; document.getElementById('breath-instruction').textContent='Presiona "Iniciar" cuando estés preparado'; document.getElementById('btn-start-breath').classList.remove('hidden'); document.getElementById('btn-stop-breath').classList.add('hidden'); const el=document.getElementById('breath-ring-progress'); if(el){el.style.transition='none';el.style.strokeDashoffset='502';} }
function startBreathing(){ breathCycles=0; breathCount++; document.getElementById('btn-start-breath').classList.add('hidden'); document.getElementById('btn-stop-breath').classList.remove('hidden'); runBreathPhase('inhale'); }
function stopBreathing(){ if(breathInterval){clearInterval(breathInterval);breathInterval=null;} if(breathPhaseTimer){clearTimeout(breathPhaseTimer);breathPhaseTimer=null;} }
function runBreathPhase(phase){ stopBreathing(); const phases={inhale:{label:'INHALA',instruction:'Respira profundo por la nariz',seconds:4,next:'hold'},hold:{label:'RETÉN',instruction:'Mantén el aire en los pulmones',seconds:7,next:'exhale'},exhale:{label:'EXHALA',instruction:'Suelta el aire lentamente por la boca',seconds:8,next:'inhale'}}; const p=phases[phase]; document.getElementById('breath-phase').textContent=p.label; document.getElementById('breath-instruction').textContent=p.instruction; let sec=p.seconds; document.getElementById('breath-count').textContent=sec; animBreathRing(phase); breathInterval=setInterval(()=>{ sec--; document.getElementById('breath-count').textContent=sec>0?sec:''; if(sec<=0){ clearInterval(breathInterval); breathInterval=null; if(phase==='exhale')breathCycles++; if(breathCycles>=3){ document.getElementById('breath-phase').textContent='✓'; document.getElementById('breath-count').textContent=''; document.getElementById('breath-instruction').textContent='¡Excelente! Tu sistema nervioso se ha calmado.'; document.getElementById('btn-start-breath').classList.remove('hidden'); document.getElementById('btn-stop-breath').classList.add('hidden'); } else breathPhaseTimer=setTimeout(()=>runBreathPhase(p.next),300); } },1000); }
function animBreathRing(phase){ const el=document.getElementById('breath-ring-progress'); if(!el)return; const targets={inhale:0,hold:150,exhale:502}; const durs={inhale:4,hold:0.5,exhale:8}; el.style.transition=`stroke-dashoffset ${durs[phase]}s linear`; el.style.strokeDashoffset=targets[phase]; }

function showToast(text){ const t=document.getElementById('toast'); t.textContent=text; t.classList.remove('hidden'); t.classList.add('show'); setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.classList.add('hidden'),300);},3200); }

// ══════════════════════════════════════════════════
// RENDER LOOP
// ══════════════════════════════════════════════════
let ringTime=0;

function animate(){
  requestAnimationFrame(animate);
  const delta=Math.min(clock.getDelta(),0.05);
  const t=clock.getElapsedTime();

  if(isGameActive && !isPaused && (isMobile || controls.isLocked)){
    if(isMobile){
      // Botones de rotación: velocidad 1.8 rad/s
      if(rotateLeft)  mobileYaw+=1.8*delta;
      if(rotateRight) mobileYaw-=1.8*delta;
      // Apply camera rotation from touch look + rotation buttons
      camera.rotation.order='YXZ';
      camera.rotation.y=mobileYaw;
      camera.rotation.x=mobilePitch;
      // Move along camera facing direction using joystick
      if(Math.abs(joystick.nx)>0.06 || Math.abs(joystick.ny)>0.06){
        const sinY=Math.sin(mobileYaw), cosY=Math.cos(mobileYaw);
        const fwd=-joystick.ny, right=joystick.nx; // ny<0 = thumb up = forward
        const spd=PLAYER_SPEED*delta*1.4;
        camera.position.x+=(-sinY*fwd + cosY*right)*spd;
        camera.position.z+=(-cosY*fwd - sinY*right)*spd;
      }
    } else {
      velocity.x-=velocity.x*10*delta; velocity.z-=velocity.z*10*delta;
      const spd=PLAYER_SPEED*delta*55;
      if(movement.forward)  velocity.z-=spd;
      if(movement.backward) velocity.z+=spd;
      if(movement.left)     velocity.x-=spd;
      if(movement.right)    velocity.x+=spd;
      controls.moveRight(-velocity.x*delta); controls.moveForward(-velocity.z*delta);
    }
    const pos=camera.position;
    pos.x=Math.max(-16,Math.min(16,pos.x)); pos.z=Math.max(-70,Math.min(54,pos.z)); pos.y=PLAYER_HEIGHT;
    checkZones();
  }

  updateNPCs(delta);

  // Ciclo sutil de luz ambiental — simula variación de iluminación del aeropuerto
  // Período ~52 s, amplitud ±0.03 → imperceptible pero da vida al espacio
  if(ambientLight) ambientLight.intensity=0.28+Math.sin(t*0.12)*0.03;

  // Rings pulse — más suave en modo calma
  ringTime+=delta;
  ringMeshes.forEach((ring,i)=>{
    const amp=calmMode?0.06:0.2, rotSpd=calmMode?0.08:0.2;
    ring.material.opacity=0.25+Math.sin(ringTime*1.5+i*0.8)*amp;
    ring.rotation.z+=delta*(rotSpd+i*0.02);
    const s=1+Math.sin(ringTime*2+i)*(calmMode?0.015:0.05);
    ring.scale.set(s,1,s);
  });

  // Luggage belt rotate
  if(luggageBelt) luggageBelt.rotation.z+=delta*0.45;

  // Flight board refresh every 30s
  boardTimer+=delta;
  if(boardTimer>30&&flightBoardTexture){ boardTimer=0; drawFlightBoard(); flightBoardTexture.needsUpdate=true; }

  // Actualizar animaciones de modelos GLTF (Mixamo)
  if(cabinMixers.length>0) cabinMixers.forEach(m=>m.update(delta));

  // Render: sin bloom en móvil o en modo calma
  if(composer && !calmMode) composer.render(delta);
  else renderer.render(scene,camera);
}

// ══════════════════════════════════════════════════
// BOOT
// ══════════════════════════════════════════════════
window.addEventListener('load',()=>{
  if(speechSynth){
    const loadVoices=()=>{ cachedVoices=speechSynth.getVoices(); };
    if(speechSynth.onvoiceschanged!==undefined) speechSynth.onvoiceschanged=loadVoices;
    loadVoices();
  }
  // Inicializar escalas de ansiedad 0-10
  initAnxietyScales();
  // Auto-activar modo calma si el sistema tiene prefers-reduced-motion
  if(prefersReducedMotion()){
    calmMode=true;
    document.body.classList.add('calm-mode');
    const btn=document.getElementById('btn-toggle-calm');
    if(btn) btn.setAttribute('aria-pressed','true');
    const lbl=document.getElementById('calm-status-label');
    if(lbl) lbl.textContent='ON';
  }
  init();
});