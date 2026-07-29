# Prompt para OpenCode — Fase F25: Hall hiperrealista

Copia desde aquí hacia abajo:

---

## Contexto del proyecto

Trabajas en **AeroCalma**, un simulador terapéutico de aeropuerto en 3D para navegador, dirigido a personas con ansiedad (exposición gradual). Repo: `https://github.com/consultoriopsiquiatriadag-maker/juegoaventura`, branch `main`.

**Stack y restricciones (obligatorias):**
- HTML/CSS/JS vanilla + **Three.js r128 vía CDN** (`cdnjs`). NO uses APIs posteriores a r128 (nada de `CapsuleGeometry`, `SRGBColorSpace`, etc.; usa `sRGBEncoding` si hace falta).
- **Sin build system, sin Node.js, sin npm.** Todo debe correr abriendo `index.html` con `python -m http.server 8080`.
- Archivo principal: `game.js` (~4600 líneas). Respeta los helpers existentes: `mkMat`, `mkStd`, `mkLamb`, `mkBox`, `box()`, `cyl()`, `tex()` (texturas por canvas 2D), `sign()`.
- El juego ya tiene: cámara 1ª persona + **3ª persona con tecla Tab** (`buildPlayerBody`), fases F0–F24 (hall, check-in, seguridad, abordaje, tiendas, pista con luces, muro cortina de cristal al fondo con vista real a la pista).
- Público objetivo: pacientes con ansiedad. Nada de sustos, multitudes agobiantes ni sonidos estridentes. Ambiente calmado y luminoso.
- Debe mantener buen rendimiento en hardware modesto: usa `InstancedMesh` para elementos repetidos, texturas canvas ≤2048, y agrupa geometría estática donde puedas.

## Tarea: Fase F25 — Máxima definición del hall

### 1. Ventanales con vista a la calle (lado de llegadas/entrada)
- En la fachada de entrada (z≈+35 a +66) y tramos de paredes laterales cercanos, crea ventanales de piso a techo estilo muro cortina (vidrio `transparent`, `opacity` 0.10–0.15, montantes oscuros), coherentes con el muro cortina ya existente al fondo (búscalo en `buildWalls`).
- Del otro lado del vidrio, construye una **escena de calle**: vereda con baldosas, dársena de taxis/drop-off, 2–3 autos y un taxi (low-poly pero con detalle: ruedas, ventanas, luces), señalética de "Salidas/Llegadas", árboles en maceteros, farolas, gente caminando afuera (siluetas animadas simples), y un fondo urbano (edificios) con textura canvas de alta calidad.

### 2. NPCs más humanos
- Mejora `buildCharacter` / NPCs existentes: proporciones humanas correctas (cabeza ≈1/7.5 de la altura), cuello, hombros redondeados, manos diferenciadas, variedad de tonos de piel, peinados y vestimenta (viajero casual, ejecutivo, familia con niño, personal del aeropuerto con uniforme).
- Animaciones procedurales: caminar con balanceo de brazos y piernas (sin/cos sobre el reloj), idle con respiración sutil y giro ocasional de cabeza, NPCs sentados en bancos, NPCs mirando el panel de vuelos, NPCs haciendo fila en check-in con avance ocasional.
- 15–25 NPCs con rutas de patrulla (waypoints) por el hall, evitando el paso del jugador (desvío simple por distancia). Densidad calmada, no multitud.
- Todos los NPCs deben verse correctos también en cámara de 3ª persona (Tab), sin z-fighting con el suelo ni atravesar mobiliario.

### 3. Biblioteca de cartelería, negocios y vidrieras
- Crea un módulo `js/assets-lib.js` (cargado con `<script>` en `index.html` antes de `game.js`) que exporte en `window.AeroAssets` una **biblioteca de fábricas reutilizables**:
  - `makeSign(tipo, texto, opts)` — cartelería de aeropuerto: colgantes direccionales (fondo azul/amarillo estilo aeroportuario real, flechas, pictogramas dibujados en canvas: avión, maleta, baño, café, salida), carteles de gate, señal de piso "no correr / piso mojado", tótems publicitarios retroiluminados.
  - `makeStorefront(marca, tipo, opts)` — vidrieras de negocios completas: frente de vidrio, logo en canvas, interior visible con estantes y productos low-poly, iluminación propia (luz cálida para café, fría para farmacia, etc.). Tipos: cafetería, duty-free, librería/kiosco, farmacia, ropa, souvenirs, casa de cambio.
  - `makeAd(texto, colores)` — pantallas/afiches publicitarios ficticios (marcas inventadas, contenido relajante coherente con la terapia: viajes, naturaleza, calma).
- Refactoriza las tiendas existentes (`buildCafe`, `buildPharmacy`, etc.) para nutrirse de esta biblioteca en lugar de duplicar código.
- Todo generado por código/canvas: **no descargues assets externos ni uses URLs de imágenes**.

### 4. Definición general del hall
- Sube la calidad percibida: reflejo especular sutil en el piso de mármol (envMap simple o brillo por `metalness`/`roughness`), luces puntuales cálidas en vitrinas, letreros con `emissive`, molduras y detalles en columnas, plantas de interior, cintas separadoras de fila (postes con cinta), carros de equipaje agrupados, tachos de basura de reciclaje, bancos con gente sentada.
- Cuida que el fog y el bloom existentes no laven la nueva escena de calle.

## Entregables y verificación
1. Código en `game.js` + nuevo `js/assets-lib.js`, con comentarios `// F25:` en cada bloque nuevo.
2. Verifica sintaxis con `node --check game.js` (o revisión manual de llaves) antes de terminar.
3. Prueba mental de rendimiento: cuenta draw calls nuevos; usa `InstancedMesh`/geometría fusionada si un elemento se repite >10 veces.
4. Lista al final: qué funciones nuevas creaste, cuáles modificaste, y cómo probar cada cosa (dónde pararse, qué tecla).
5. NO hagas commit ni push: deja los cambios en working tree para revisión.
