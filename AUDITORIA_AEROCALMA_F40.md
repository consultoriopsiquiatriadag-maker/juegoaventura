# AeroCalma — Auditoría F40 y manifiesto adaptado (F41–F49)

Fecha: 25/11/2026 · Estado auditado: commit `2a28fd6` (rama `main`, sincronizada con `origin/main`).
Fase exclusivamente diagnóstica: **no se modificó código**.

---

## 0. Dos avisos antes de empezar

### 0.1 La carpeta indicada en el manifiesto está desactualizada
| Carpeta | Último commit | `game.js` |
|---|---|---|
| `C:\Users\LABORATORIO\Desktop\OPEN CODE PRUEBA\aeropuerto3d\juegoaventura` | `d6e9ca8` (F28) | 4.948 líneas |
| `G:\Mi unidad\Dr.Dagnino\APLICACIONES Y SITIOS DEL CONSULTORIO\aeropuerto3d\juegoaventura` | `2a28fd6` (F73) | 9.402 líneas |

La copia del Escritorio quedó en F28: le faltan 45 fases (vuelo, llegadas, PSA, handling, carteles, sonido real, privacidad…).
**Trabajar ahí y hacer push borraría meses de trabajo publicado.** Toda la serie debe hacerse en la carpeta de `G:`, o antes hay que actualizar la del Escritorio con `git pull`.

### 0.2 Los números F40–F49 ya están usados
El código ya tiene `// FASE 40` … `// FASE 73` y los commits recientes se llaman `F69`, `F70`, `F71`… Si las nuevas fases se llaman F41–F49, los comentarios y el historial quedarían duplicados y confusos (p. ej. ya existe una "FASE 41" sobre luces en GPU de celular y una "FASE 48" de llegadas).
**Decisión (25/11/2026, aprobada por el Dr. Dagnino):** se numeran **F74–F83**, conservando el nombre del manifiesto entre paréntesis. Los commits usan el número real (p. ej. `F75 (F41) implementa sistema de camaras intercambiables`).

| Manifiesto | Número real propuesto |
|---|---|
| F40 Auditoría | F74 (este documento) |
| F41 Cámaras | F75 |
| F42 Personalización | F76 |
| F43 Avatares | F77 |
| F44 Centro de información | F78 |
| F45 Regulación emocional | F79 |
| F46 Cabina | F80 |
| F47 Biblioteca audiovisual | F81 |
| F48 Integración | F82 |
| F49 Validación final | F83 |

---

## 1. Arquitectura real

| Archivo | Líneas | Rol |
|---|---|---|
| `index.html` | 911 | Toda la interfaz: menú, HUD, ~25 modales, banner de privacidad, GTM con Consent Mode |
| `game.js` | 9.402 | Motor completo (mundo, personas, vuelo, llegadas, audio, interacción). Monolítico, funciones globales |
| `styles.css` | 1.987 | Estilos; varias reglas `prefers-reduced-motion` |
| `js/data.js` | 31 | `ZONE_DATA`: 7 zonas con textos de expectativa, salud, pánico, narración y preparación |
| `js/assets-lib.js` | 234 | `window.AeroAssets` (F25): fábricas de carteles, bancos, macetas, etc. |
| `js/ceiling-signage.js` | 382 | Señalética colgante |
| `js/flight-schedule.js` | 157 | Tablero de vuelos |
| `js/light-shafts.js` | 151 | Haces de luz |
| `audios/` | ~12 MB | voz (29), altoparlantes (12), tripulación (14), comandante (8), ambiente (1) |
| `assets/dr-dagnino.jpg` | 40 KB | Única imagen |

**Dependencias** (todas gratuitas, por CDN, sin build): Three.js r128 (cdnjs) + PointerLockControls, EffectComposer, RenderPass, ShaderPass, UnrealBloomPass, CopyShader, LuminosityHighPass, GammaCorrection, GLTFLoader y Sky (jsDelivr). Sitio estático en Netlify. No hay `package.json` ni servicios pagos.

**Geometría:** todo es procedural (cajas, cilindros, texturas dibujadas en canvas). **No hay modelos GLB en el repo**: `loadCabinCrew` intenta `assets/pilot.glb` y `assets/attendant.glb`, que no existen, y usa siempre el reemplazo procedural.

**Orden de arranque** (`init`, game.js:190–235): mundo → limpieza de llegadas → corte del lado aire → plataforma → puntos interactivos → flechas → reflejos → NPC → personal → tripulación → optimización (fusiona props por material) → ajuste de luces a la GPU → postprocesado → eventos → `animate()`.

---

## 2. Sistema de cámaras existente

- **Una sola cámara** `PerspectiveCamera` controlada por `PointerLockControls` (mouse) o por `mobileYaw`/`mobilePitch` (táctil).
- **La cámara ES el jugador:** la posición del personaje es `camera.position` (39 referencias en `game.js`: colisiones, zonas, puertas, interacciones, sala de equipajes, etc.). Altura de ojos `PLAYER_HEIGHT = 1.68`, velocidad 3,5 m/s.
- **Colisiones:** no hay motor físico. El movimiento se limita con rectángulos y polilíneas (`x ±16`, `z −60,6…54`, `_clampAirside` para manga y cabina, `_clampArrivals` para Madrid, baño). `_floorIsFree` sólo se usa al construir, para ubicar objetos.
- **FOV:** 72°, baja suave a 58° en Modo Calma.
- **Tab — primera/tercera persona: existe, pero no funciona en la práctica.**
  - `onKeyDown` (game.js:6891) alterna `isThirdPerson` y muestra un aviso.
  - En `animate()` (game.js:9346) el cuerpo `playerMesh` se coloca **2,8 m detrás de la cámara** (eje +Z local) mientras la cámara sigue en los ojos. Resultado: el avatar queda a espaldas de la cámara y **no se ve**. Tampoco gira con la persona ni tiene animación.
  - No hay prevención de que una cámara externa atraviese paredes, porque nunca se separó la cámara del jugador.
- **Celular:** joystick virtual y botones de giro. **No hay botón para cambiar la cámara** (Tab sólo existe en teclado).
- **Modos con cámara propia:** vuelo (asiento 14C, inclinación y vibración suaves), desembarque, caminata automática por la manga, llegadas. Cualquier cámara nueva debe **volver a primera persona** en esos tramos.

**Factibilidad F41 (alta, con cuidado).** Lo más seguro es **no** cambiar las 39 referencias: dejar `camera` como "cuerpo" del jugador (sigue moviéndose y chocando igual) y agregar una **segunda cámara sólo para dibujar** (`viewCam`) que en tercera persona se ubica detrás y arriba, con suavizado, y un rayo contra las paredes para acercarse si hay obstáculo. Se dibuja con `viewCam`; todo lo demás no se entera. Tercera persona deshabilitada automáticamente en manga, cabina, vuelo y pasillo de llegadas (espacios de 1,5–2,5 m).

---

## 3. Avatar actual

- **Jugador:** `buildPlayerBody()` (game.js:8980): figura de cajas, cilindros y esferas, colores fijos (camisa azul), sin articulaciones ni animación, sin variante femenina. Está oculta en primera persona.
- **Personas (NPC):** `buildCharacter(opts)` (game.js:5231) es **mucho más avanzado** que el cuerpo del jugador: piel, peinados (`long`, `bob`, `bun`, `ponytail`, `short`, `side`, `bald`, `cap`, `slick`, `swept`), versión femenina/masculina, uniformes (agente, PSA, TCP, piloto, médico), pestañas, labios, iris, aros, anteojos, barba, articulaciones de piernas y brazos con caminata, y fusión de mallas (`_optimizeCharacter`) para rendimiento.
- **NPC:** `spawnNPCs(lite)` (versión liviana en celular), `spawnStaffNPCs`, `updateNPCs` con rutas, evasión, balanceo reducido en Modo Calma, conversación (F60) y control PSA (F62).

**Factibilidad F42/F43.** El paso más barato y con más impacto es **usar `buildCharacter` también para el jugador** (mismo estilo que el resto, femenino/masculino/neutro, ropa y pelo elegibles) y reutilizar su animación de caminata. Un humanoide GLB con esqueleto es posible (GLTFLoader ya está cargado; faltaría `SkeletonUtils.js` r128 y `AnimationMixer`), pero agrega 1–3 MB por modelo y conviven dos estilos visuales. Recomendación: GLB sólo como evaluación posterior, con modelos **CC0** (Quaternius, Kenney) y versión liviana para celular.

---

## 4. Otros sistemas

| Sistema | Estado |
|---|---|
| **Audio** | Web Audio: pad musical sintetizado + grabación real de hall (F72) + voces grabadas con respaldo TTS (`speechSynthesis`) + altoparlantes + motores del avión. Preferencia `aerocalma_sound`. Se apaga en pausa y vuelo, baja en Modo Calma. |
| **Modo Calma (baja estimulación)** | `toggleCalmMode` (75 usos): baja audio, FOV, bloom, balanceo de NPC, vibración e inclinación del vuelo y **omite la turbulencia**. Se activa solo con `prefers-reduced-motion`. |
| **Calidad** | `ultra`, `high`, `normal`, `low` (`setQuality`); celular arranca en `low` y sin postprocesado. |
| **"Tarjetas"** | Panel de zona con pestañas (expectativa, salud, pánico, preparación) desde `ZONE_DATA`; píldoras de audio; tarjetas en modales (check-in, PSA, puerta, equipaje). |
| **Herramientas terapéuticas ya existentes** | Respiración (tecla B y botones), grounding 5-4-3-2-1, agua fría y respiración en el baño, café y mate, píldoras de audio, ansiedad antes/después, diario local, consultorio con WhatsApp, Centro virtual de Salud Mental, botón "← Salir". |
| **Vuelo** | Ya existe casi completo: embarque, asiento 14C, demostración de seguridad (7 pasos), comandante, despegue, crucero, servicio, turbulencia (omitida en Calma), descenso, aterrizaje, desembarque, llegadas en Madrid con sala de equipajes. Atajos: aterrizar ya / terminar. |
| **Persistencia (`localStorage`)** | `aerocalma_diary` (diario e interacciones), `aerocalma_reviews`, `aerocalma_pildora`, `aerocalma_sound`, `aerocalma_consent`. Todo local. `logInteraction` escribe **sólo** en el diario local, nada sale a Google. |
| **Privacidad** | GTM-NLW39K7T con Consent Mode v2: no carga nada hasta que la persona acepta; banner con Ley 25.326. |
| **Autodiagnóstico** | `runChecks()` (FASE 19) verifica TTS, audio, etc. Útil para F48–F49. |

---

## 5. Hallazgos que conviene corregir aunque no se pidan

1. **Respiración 4-7-8 con retención obligatoria de 7 s** (game.js:8970) y mensaje final "Tu sistema nervioso se ha calmado". El manifiesto (F45) pide respiración cómoda **sin retenciones obligatorias** y **sin garantizar resultados**. Hay que ofrecer un patrón sin retención (p. ej. 4-6) como opción por defecto y cambiar el mensaje.
2. **Afirmaciones aeronáuticas en `js/data.js`** que, según la regla 12 y F44, requieren fuente o revisión: "99.99997% de tasa de llegada segura", "La turbulencia NUNCA ha derribado un avión moderno", "soportan fuerzas 3 veces superiores", "El 99.5% de las maletas llegan…". Sugiero reformularlas sin cifras exactas o citar la fuente (OACI, IATA, ANAC).
3. **Tab en tercera persona no muestra nada** (sección 2). Hoy confunde más de lo que ayuda.
4. **Repositorio dentro de Google Drive** ("Mi unidad"): Drive puede sincronizar a medias la carpeta `.git` y corromperla si se edita desde dos equipos. Mantener siempre GitHub como copia de referencia.

---

## 6. Riesgos técnicos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| `game.js` monolítico (9.400 líneas, globales) | Cambios con efectos colaterales | Fases chicas, código nuevo en bloques `// FASE NN`, probar el recorrido completo |
| La cámara es la posición del jugador | Tercera persona podría romper colisiones e interacciones | Segunda cámara sólo de dibujo (sección 2) |
| Espacios angostos (manga, cabina) | Cámara externa atraviesa paredes | Forzar primera persona en esas zonas |
| Avatares GLB | +MB, otra estética, licencias | Empezar con `buildCharacter`; GLB sólo CC0 y opcional |
| Rendimiento en celular | Ya está al límite en la sala de embarque | El avatar del jugador fusionado y sin sombras en `low` |
| Nombre del personaje | Dato personal | Sólo `localStorage`, nunca en `dataLayer` ni URLs, botón para borrar |
| YouTube embebido | Cookies de terceros | Abrir la playlist en pestaña nueva (o `youtube-nocookie` sólo con consentimiento) |
| Contenido educativo | Afirmaciones sin fuente | Revisión profesional antes de publicar F44/F45 |
| Copias desactualizadas | Push que pisa trabajo | Trabajar sólo en `G:` y verificar `git log` antes de cada fase |

---

## 7. Manifiesto definitivo adaptado al repositorio

Cada fase: leer sólo lo necesario, cambios acotados, prueba en la vista previa, commit y push **sólo con autorización**, y detenerse.

### F75 (F41) — Cámaras intercambiables
- `viewCam` sólo de dibujo; `camera` sigue siendo el jugador. Tres modos: **1ª persona**, **3ª cercana** (≈2,2 m atrás, 0,5 m arriba), **3ª panorámica** (≈5 m atrás, 2 m arriba).
- Tab recorre los tres modos; selector visible en el HUD y en Pausa; botón táctil 🎥 en celular.
- Suavizado de posición; en Modo Calma o movimiento reducido el cambio es instantáneo y sin balanceo.
- Rayo contra paredes y techos para acercar la cámara; primera persona forzada en manga, cabina, vuelo y llegadas.
- El avatar del jugador gira con la dirección de marcha y camina (reutiliza F77 si ya está; si no, el cuerpo actual corregido).
- Archivos: `game.js`, `index.html`, `styles.css`.

### F76 (F42) — Personalización
- Botón "Personalizar mi experiencia" en el menú: nombre (máx. 24, sólo texto), femenino / masculino / neutro, color de ropa y pelo, cámara inicial, vista previa en 3D girando.
- Guardado en `aerocalma_profile` (local) con botón "Borrar mis preferencias". Nunca en GTM ni en URLs.
- El nombre aparece en la bienvenida, el HUD, los mensajes de progreso y el cierre.

### F77 (F43) — Avatar del jugador y animaciones
- Reemplazar `buildPlayerBody` por `buildCharacter` con el perfil de F76: estados de espera, caminar, girar y detenerse con transición; animación sólo si está visible.
- Evaluación aparte (sin integrar) de un humanoide CC0 en GLB; decisión según peso y estética.

### F78 (F44) — Centro de Información Aeronáutica y Calma
- Pantalla grande en el hall (lado aire, sala de embarque) con 8 tarjetas: cómo vuela un avión, turbulencia, sonidos, despegue, aterrizaje, aproximación frustrada, procedimientos de seguridad, sensaciones corporales.
- Ilustraciones dibujadas en canvas, lectura con las voces grabadas o TTS, rótulo "Contenido educativo — no es información de un vuelo real".
- Incluir la revisión de las afirmaciones de `js/data.js` (hallazgo 2). Textos para que revises antes de publicar.

### F79 (F45) — "Necesito una pausa"
- Botón siempre visible: pausa el recorrido, baja sonido y movimiento, y abre un menú que reúne lo que ya existe (respiración, grounding) y suma: orientación al presente, relajación muscular breve, qué sensaciones son normales, reencuadre de pensamientos anticipatorios, "salir del ejercicio".
- Respiración por defecto **sin retención**; 4-7-8 queda como opción. Sin promesas de resultado.
- Texto fijo: "No reemplaza un tratamiento profesional. Ante una urgencia: 911 / 135."

### F80 (F46) — Cabina (ampliar lo existente)
- Elegir asiento (ventanilla / pasillo / adelante / atrás) antes del vuelo.
- Intensidad: **Baja** (sin turbulencia ni vibración), **Moderada** (actual), **Mayor familiarización** (turbulencia leve más larga, nunca sacudidas fuertes).
- Interruptores separados: movimiento simulado y sonido de motores.
- Rodaje visible y, en cada etapa, una explicación breve que distinga **sonidos normales** de **señales para la tripulación**.

### F81 (F47) — Biblioteca audiovisual de Aerolíneas Argentinas
- Verificar título y contenido de la playlist antes de publicar.
- Pantalla en el hall reutilizando `LINK_INFO` + `openLinkModal`: "Animate a volar — Recursos audiovisuales de Aerolíneas Argentinas", propósito y botón a la playlist oficial en pestaña nueva. Sin logos, sin embebido ni descargas, con la aclaración "AeroCalma no tiene convenio con la aerolínea".

### F82 (F48) — Integración y accesibilidad
- Lista de pruebas del manifiesto + `runChecks()` ampliado con cámaras, perfil y pausa.
- Medir FPS, carga, memoria y peso en desktop y celular (calidades `ultra/high/normal/low`). Sin commit si no hay cambios.

### F83 (F49) — Validación y publicación
- Entregables: `MANIFIESTO_AEROCALMA_F40_F49.md`, `INFORME_VALIDACION_AEROCALMA.md`, `REFERENCIAS_Y_LICENCIAS.md` (extender `REFERENCIAS_EXTERNAS_AEROCALMA.md`), README actualizado, tabla de fases y commits, pendientes.

**Orden recomendado:** F77 (avatar) antes que F75 (cámaras), porque la tercera persona necesita un avatar que valga la pena ver; o hacer F75 con el cuerpo actual corregido y mejorarlo después. F79 y F81 son independientes y baratas: pueden ir en cualquier momento.

---

## 8. Comandos Git de esta fase

```
git status
git remote -v
git log -5 --oneline
```
Sin commit ni push (fase diagnóstica). El único archivo nuevo es este documento; se puede incluir en el commit de la próxima fase o subir aparte si lo autorizás.
