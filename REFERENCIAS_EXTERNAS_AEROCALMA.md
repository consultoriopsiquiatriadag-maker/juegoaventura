# REFERENCIAS_EXTERNAS_AEROCALMA

**Fecha:** 2026-07-29
**Objetivo:** Clasificar los 5 repos externos sugeridos en el MANIFIESTO F26-F39 sin descargar ni integrar código/assets. Solo análisis de licencias, contenido y adecuación.

---

## Resumen de decisiones

| Repo | Decisión | Razón principal |
|------|----------|-----------------|
| `bazilinskyy/gtav-sim` | **No usar** | Sin licencia + marca GTA + fork de mod de juego propietario |
| `calloncampbell/BaggageHandling-TypeB-Simulator` | **Solo inspiración** | Sin licencia + backend Python pesado no apto para web cliente |
| `AndyMagwayer/A320-airplane` | **Solo inspiración** | Sin licencia + posible problema de marca Airbus |
| `kunal202426/Sim-City` | **Utilizable** | Licencia MIT + Three.js + ciudad procedural |
| `honzaap/GithubCity` | **Utilizable** | Licencia Apache 2.0 + Three.js + 1292 estrellas |

---

## 1. bazilinskyy/gtav-sim

| Campo | Valor |
|-------|-------|
| URL | https://github.com/bazilinskyy/gtav-sim |
| Fork de | nheisterkamp/bepmod (Bicycle Experiment Program) |
| Licencia | **Ninguna** (null) |
| Lenguaje | C# |
| Tamaño | 444 KB |
| Stars | 0 |
| Temas | cycling, eye-tracking, gta, gta5, gtav, simulation |
| Descripción | "Cycling simulator based on GTA V" |
| Ultima actualización | 2022-01-19 (abandonado) |

### Analisis
- No tiene licencia → por defecto, todos los derechos reservados por el autor. No se puede reutilizar código ni assets.
- Es un fork de un mod de GTA V (Bicycle Experiment). GTA V es propiedad de Rockstar/Take-Two. Usar code o assets de este repo podría infringir derechos de autor de Rockstar.
- El repositorio contiene referencias directas a GTA5 (temas, nombre, descripción).
- C# y Unity/MonoBehaviour — incompatible con nuestro stack (Vanilla JS + Three.js).
- Abandonado desde 2022.

### Decision
**NO USAR.** Sin licencia, con marca GTA, y tecnología incompatible. El riesgo legal y la incompatibilidad técnica lo descartan completamente.

---

## 2. calloncampbell/BaggageHandling-TypeB-Simulator

| Campo | Valor |
|-------|-------|
| URL | https://github.com/calloncampbell/BaggageHandling-TypeB-Simulator |
| Fork de | clemensv/BaggageHandlingSimulator |
| Licencia | **Ninguna** (null) |
| Lenguaje | Python |
| Tamaño | 154 KB (sin node_modules) |
| Stars | 0 |
| Temas | (ninguno) |
| Descripción | (vacía) |
| Ultima actualización | 2026-05-02 |

### Analisis
- No tiene licencia → todos los derechos reservados. No se puede reutilizar.
- Es un simulador de manejo de equipaje backend (Python) con Docker, Azure, SQL, KQL. No es una aplicación visual 3D — es infraestructura de datos/analítica.
- No tiene assets visuales, modelos 3D, ni geometría que pueda interesarnos.
- El concepto de flujo de equipaje (baggage handling) es conceptualmente útil para entender cintas y valijas, pero la implementación es completamente ajena a nuestro stack.
- El repo padre (clemensv/BaggageHandlingSimulator) tampoco tiene licencia.

### Decision
**SOLO INSPIRACIÓN.** El concepto de flujo de equipaje y cintas transportadoras puede inspirar la geometría y lógica visual de F33, pero no se reutiliza código ni se integra ningún archivo. La implementación física en nuestro proyecto será propia (canvas + Three.js).

---

## 3. AndyMagwayer/A320-airplane

| Campo | Valor |
|-------|-------|
| URL | https://github.com/AndyMagwayer/A320-airplane |
| Licencia | **Ninguna** (null) |
| Lenguaje | JavaScript |
| Tamaño | 2.4 MB (incluye node_modules — peso real ~50 KB sin deps) |
| Stars | 3 |
| Temas | a320, airplane, airplane-game, portfolio |
| Descripción | "open-source initiative aimed at improving flight safety... Airbus A320 automation" |
| Pagina web | https://a320-airplane-maga.netlify.app/ |
| Ultima actualización | 2023-10-28 |

### Analisis
- No tiene licencia → todos los derechos reservados. No se puede reutilizar código ni assets.
- El repo tiene un `index.html`, `script.js` y `main.css` — es una demo web de avión con Three.js. Compatible con nuestro stack en principio.
- Sin embargo, modela el Airbus A320, que es un producto con marca registrada de Airbus. Aunque sea una demo open-source, reproducir fielmente el A320 podría generar problemas de propiedad intelectual (diseño industrial, marca).
- La descripción habla de "flight safety automation" — es un proyecto de simulación de aviación real, no un modelo de entretenimiento. Usar su modelo podría asociar AeroCalma con un producto comercial de Airbus.
- Contiene `node_modules` (no debemos copiarlo), pero el `index.html`, `script.js`, y `main.css` son los únicos archivos relevantes.
- Solo 3 estrellas y sin actividad reciente.

### Decision
**SOLO INSPIRACIÓN.** La técnica de modelado de avión low-poly en Three.js es útil como referencia, pero: (1) no tiene licencia, (2) representa un producto con marca Airbus, y (3) debemos crear nuestro propio modelo "AeroCalma Air" ficticio sin logos reales. Si en F31 se decide hacer un avión propio, se basará en las técnicas vistas aquí pero con geometría generada por nosotros.

---

## 4. kunal202426/Sim-City

| Campo | Valor |
|-------|-------|
| URL | https://github.com/kunal202426/Sim-City |
| Licencia | **MIT License** ✅ |
| Lenguaje | TypeScript (React + Three.js) |
| Tamaño | 4.9 MB (incluye node_modules) |
| Stars | 1 |
| Temas | (ninguno) |
| Descripción | "City Pulse — interactive 3D city simulation with React, TypeScript, and Three.js. Models urban zones, simulates demand allocation, analytics dashboard" |
| Pagina web | https://sim-city-alpha.vercel.app |
| Ultima actualización | 2026-04-24 |

### Analisis
- **Licencia MIT** — permite uso, modificación, distribución, incluso comercial. Completamente compatible con AeroCalma.
- Usa **Three.js** — mismo motor que nosotros. El código de generación procedural de ciudad es directamente relevante para F30 (plataforma) y F29 (exterior urbano).
- Es un proyecto React + TypeScript — no podemos copiar el código React directamente, pero las técnicas de generación procedural de edificios, calles y zonas urbanas son aplicables a nuestro sistema canvas + Three.js.
- El concepto de "zonas urbanas" (residential, commercial, industrial) se puede adaptar al exterior urbano de AeroCalma sin copiar assets.
- Tiene `node_modules` en el repo (debería estar en .gitignore, pero está incluido). No lo copiamos.
- La demo web funciona y se puede ver en vercel.

### Decision
**UTILIZABLE.** La licencia MIT permite referencia e integración de patrones. Podemos estudiar sus técnicas de generación procedural de ciudad y adaptarlas a nuestro sistema canvas/Three.js para F29 (exterior urbano) y F30 (plataforma). No integramos archivos del repo directamente.

---

## 5. honzaap/GithubCity

| Campo | Valor |
|-------|-------|
| URL | https://github.com/honzaap/GithubCity |
| Licencia | **Apache License 2.0** ✅ |
| Lenguaje | JavaScript (vanilla + Three.js) |
| Tamaño | 7.9 MB (incluye node_modules) |
| Stars | 1292 |
| Forks | 85 |
| Temas | 3d, blender, city, contribution, github, threejs, visualization |
| Descripción | "Create a 3D city from your GitHub contributions" |
| Pagina web | https://honzaap.github.io/GithubCity |
| Ultima actualización | 2023-10-20 |

### Analisis
- **Licencia Apache 2.0** — permite uso, modificación, distribución con protección de patentes. Completamente compatible con AeroCalma.
- Usa **Three.js** vanilla — mismo stack. El code es directamente relevante para generación procedural de ciudades 3D.
- Es un proyecto maduro (1292 stars, 85 forks) y bien mantenido con contributions activas.
- Genera edificios 3D procedurales a partir de datos — la técnica de instanciación y generación de geometría es aplicable a nuestro exterior urbano.
- El `assets/` directorio contiene modelos 3D y texturas. **No los copiamos** — solo usamos las técnicas/procedimientos como inspiración.
- La escena 3D es más compleja que la de Sim-City y tiene mejor organización de código para Three.js puro (sin React).
- Se puede ver la demo en Github Pages.

### Decision
**UTILIZABLE.** Apache 2.0 permite referencia e integración de técnicas. Las funciones de generación procedural de edificios y ciudad en Three.js son directamente aplicables para F29 (exterior urbano). Podemos estudiar `scene.js` y `algo.js` para entender sus patrones de instanciación y generación, y aplicar conceptos similares en nuestro propio código. No integramos archivos del repo directamente.

---

## Clasificacion resumen

| Categoria | Repos | Accion |
|-----------|-------|--------|
| **Utilizable** (licencia clara + compatible) | kunal202426/Sim-City (MIT), honzaap/GithubCity (Apache-2.0) | Referencia de tecnicas procedimentales permitida |
| **Solo inspiracion** (sin licencia o backend pesado) | calloncampbell/BaggageHandling-TypeB-Simulator, AndyMagwayer/A320-airplane | Conceptos utiles pero no se integra nada |
| **No usar** (propietario/ilegal) | bazilinskyy/gtav-sim | No se usa nada — marca GTA + sin licencia |

---

## Proximos pasos recomendados

- F27 está completo. Commit y push de este archivo.
- F28+ pueden referenciar estas clasificaciones al tomar decisiones de assets.
- Si en F31 (aviones) se decide crear modelos propios, las tecnicas de AndyMagwayer son solo referencia conceptual.
- Para F29/F30, las tecnicas de Sim-City y GithubCity son las mas aplicables (generacion procedural de calles y edificios).
