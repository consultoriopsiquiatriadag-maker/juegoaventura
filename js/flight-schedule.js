/* =========================================
   F32: HORARIO DE VUELOS DINÁMICO — AeroCalma
   window.AeroFlights — cargar después de data.js y antes de las pantallas

   Genera salidas y llegadas a partir de la hora real del equipo y calcula
   el estado de cada vuelo según los minutos que faltan:

     Salidas:   A TIEMPO → EMBARCANDO (45') → ULT. LLAMADO (15') → CERRADO (5')
                (algunos vuelos con DEMORA hh:mm)
     Llegadas:  EN HORA → ATERRIZANDO (10') → ATERRIZO (hasta 25' después)

   Cuando un vuelo sale (o una llegada ya pasó) se retira de la lista y se
   agrega uno nuevo al final, así las pantallas siempre tienen vuelos.
   Los cambios son graduales (cada pocos minutos), sin parpadeos: coherente
   con la baja estimulación del simulador.

   Uso:
     AeroFlights.departures()  → [{code,dest,time,gate,status,color}, ...]
     AeroFlights.arrivals()    → [{code,from,time,belt,status,color}, ...]
     AeroFlights.version()     → cambia cuando cambia algún estado/lista
   ========================================= */
(function(){
'use strict';

// Colores tipo panel LED (fondo negro)
const C = {
  normal:  '#ffffff',
  boarding:'#8bd17c',   // embarcando
  last:    '#fb8500',   // último llamado
  delayed: '#ffb703',   // demorado
  closed:  '#6b7280',   // cerrado
  landed:  '#8bd17c',
};

// Puertas coherentes con la señalética del hall (A1–A12, B1–B15)
const DEP_POOL = [
  { code:'AR 1302', dest:'MADRID',     gate:'A12' },
  { code:'LA 4480', dest:'MIAMI',      gate:'B07' },
  { code:'IB 6841', dest:'BARCELONA',  gate:'A06' },
  { code:'AF 1122', dest:'PARIS',      gate:'B02' },
  { code:'LH 2234', dest:'FRANKFURT',  gate:'A04' },
  { code:'BA 0456', dest:'LONDRES',    gate:'B11' },
  { code:'AA 0910', dest:'NUEVA YORK', gate:'A09' },
  { code:'UX 0042', dest:'MONTEVIDEO', gate:'B15' },
  { code:'LA 8064', dest:'SANTIAGO',   gate:'A03' },
  { code:'AV 0010', dest:'BOGOTA',     gate:'B05' },
  { code:'CM 0471', dest:'PANAMA',     gate:'A10' },
  { code:'AZ 0681', dest:'ROMA',       gate:'B09' },
];
const ARR_POOL = [
  { code:'AR 1131', from:'BUENOS AIRES', belt:'3' },
  { code:'LA 8065', from:'SANTIAGO',     belt:'1' },
  { code:'UX 0043', from:'MONTEVIDEO',   belt:'2' },
  { code:'AR 1555', from:'CORDOBA',      belt:'4' },
  { code:'AV 0011', from:'BOGOTA',       belt:'3' },
  { code:'CM 0472', from:'PANAMA',       belt:'1' },
  { code:'LA 2410', from:'LIMA',         belt:'2' },
  { code:'G3 7460', from:'SAO PAULO',    belt:'4' },
];

const MIN = 60 * 1000;
const LIST_SIZE = 12;        // vuelos en memoria por lista (2 páginas de 6)

// RNG con semilla del día: misma secuencia en todas las pantallas
function rng(seed){
  let a = seed >>> 0;
  return function(){
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const _d = new Date();
const rand = rng(_d.getFullYear() * 1000 + _d.getMonth() * 40 + _d.getDate());

const hhmm = t => {
  const d = new Date(t);
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
};

// ── ESTADO INTERNO ────────────────────────────────
const _dep = [];   // {..pool, sched, delay}
const _arr = [];
let _depIdx = 0, _arrIdx = 0;
let _version = 0, _lastSig = '';

function _nextDep(afterT){
  const p = DEP_POOL[_depIdx++ % DEP_POOL.length];
  const sched = afterT + (8 + Math.floor(rand() * 8)) * MIN;   // cada 8–15 min
  const delay = rand() < 0.17 ? (15 + Math.floor(rand() * 4) * 5) * MIN : 0;
  return Object.assign({}, p, { sched, delay });
}
function _nextArr(afterT){
  const p = ARR_POOL[_arrIdx++ % ARR_POOL.length];
  const sched = afterT + (9 + Math.floor(rand() * 9)) * MIN;
  const delay = rand() < 0.15 ? (10 + Math.floor(rand() * 3) * 5) * MIN : 0;
  return Object.assign({}, p, { sched, delay });
}

function _init(){
  const now = Date.now();
  // Arranca con vuelos ya en distintas etapas (alguno embarcando, alguno en último llamado)
  let t = now - 4 * MIN;
  for (let i = 0; i < LIST_SIZE; i++){ const f = _nextDep(t); _dep.push(f); t = f.sched; }
  t = now - 20 * MIN;
  for (let i = 0; i < LIST_SIZE; i++){ const f = _nextArr(t); _arr.push(f); t = f.sched; }
}

function _depStatus(f, now){
  const left = (f.sched + f.delay - now) / MIN;   // minutos para la salida real
  if (left <= 5)  return { status:'CERRADO',      color:C.closed };
  if (left <= 15) return { status:'ULT. LLAMADO', color:C.last };
  if (left <= 45) return { status:'EMBARCANDO',   color:C.boarding };
  if (f.delay)    return { status:'DEMORA ' + hhmm(f.sched + f.delay), color:C.delayed };
  return { status:'A TIEMPO', color:C.normal };
}
function _arrStatus(f, now){
  const left = (f.sched + f.delay - now) / MIN;
  if (left <= 0)  return { status:'ATERRIZO',    color:C.landed };
  if (left <= 10) return { status:'ATERRIZANDO', color:C.normal };
  if (f.delay)    return { status:'DEMORADO',    color:C.delayed };
  return { status:'EN HORA', color:C.normal };
}

// Retira vuelos vencidos y repone al final
function _refresh(){
  const now = Date.now();
  while (_dep.length && (_dep[0].sched + _dep[0].delay) < now - 3 * MIN){
    _dep.shift();
    _dep.push(_nextDep(_dep[_dep.length - 1].sched));
  }
  while (_arr.length && (_arr[0].sched + _arr[0].delay) < now - 25 * MIN){
    _arr.shift();
    _arr.push(_nextArr(_arr[_arr.length - 1].sched));
  }
  // Orden por hora real (un demorado puede quedar detrás de uno posterior)
  _dep.sort((a, b) => (a.sched + a.delay) - (b.sched + b.delay));
  const sig = _dep.map(f => f.code + _depStatus(f, now).status).join('|') + '#' +
              _arr.map(f => f.code + _arrStatus(f, now).status).join('|');
  if (sig !== _lastSig){ _lastSig = sig; _version++; }
  return now;
}

function departures(){
  const now = _refresh();
  return _dep.map(f => Object.assign({ code:f.code, dest:f.dest, time:hhmm(f.sched), gate:f.gate }, _depStatus(f, now)));
}
function arrivals(){
  const now = _refresh();
  return _arr.map(f => Object.assign({ code:f.code, from:f.from, time:hhmm(f.sched), belt:f.belt }, _arrStatus(f, now)));
}
function version(){ _refresh(); return _version; }

_init();
window.AeroFlights = { departures, arrivals, version, clock:() => hhmm(Date.now()), COLORS:C };
})();
