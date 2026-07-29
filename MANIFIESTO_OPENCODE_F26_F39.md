# MANIFIESTO AEROCALMA — Realismo Visual F26–F39 (para OpenCode)

## Contexto general

**AeroCalma** es un simulador terapéutico de aeropuerto 3D en navegador para personas con ansiedad (exposición gradual). El realismo debe crecer SIN aumentar la estimulación: ambiente calmado, luminoso, sin sustos, multitudes ni alarmas.

- Carpeta local: `C:\Users\LABORATORIO\Desktop\OPEN CODE PRUEBA\aeropuerto3d\juegoaventura`
- Repo: `https://github.com/consultoriopsiquiatriadag-maker/juegoaventura` (branch `main`)
- Sitio: `https://aerocalma.netlify.app/`
- Stack: HTML/CSS/JS vanilla + **Three.js r128 vía CDN**. Sin build system, sin Node.js, sin npm.
- Servidor local: `python -m http.server 8080` → `http://localhost:8080`
- Prueba: click para activar, WASD para caminar, **Tab** para 3ª persona.
- Archivos clave: `index.html`, `game.js` (~4900 líneas), `js/assets-lib.js` (F25: `window.AeroAssets` con `makeSign()`, `makeStorefront()`, `makeAd()`), `js/data.js`.
- Estado F25: `_drawStreetScene()`, `buildStreetScene()`, `buildEntranceFacadeWindows()`, `buildEntranceSideWindows()`, `buildHallQuality()`, +14 NPCs en `spawnNPCs()`, evitación del jugador en `updateNPCs()`. Muro cortina real al fondo del hall (en `buildWalls`) con vista a pista.

## Objetivo visual global

Evolucionar hacia una experiencia tipo juego 3D clásico transitable (inspiración conceptual en el realismo de juegos antiguos tipo GTA, **sin copiar GTA ni ningún asset protegido**): hall amplio, paredes vidriadas, fachada realista, calle visible afuera, plataforma con aviones visible, NPCs realistas, tiendas, mostradores, filas, cartelería, iluminación interior/exterior. Aeropuerto vivo pero regulado y terapéutico.

## Reglas legales y técnicas obligatorias

1. NO copiar assets, texturas, música, modelos ni código de GTA ni de juegos propietarios.
2. NO usar marcas reales de aerolíneas, aeropuertos, locales ni autos.
3. NO descargar ni integrar archivos externos sin revisar licencia.
4. Repos externos: primero como referencia conceptual.
5. Solo descargar/reutilizar archivos si: licencia clara + permite reutilización + compatible + sin material de terceros + liviano + fuente y licencia documentadas.
6. Priorizar assets generados por código, canvas, geometría Three.js o modelos propios.
7. Modelos externos: preferir `.glb`/`.gltf`; `.obj` solo si es liviano y convertible.
8. NO agregar dependencias pesadas sin justificar.
9. Mantener compatibilidad con `python -m http.server 8080`.
10. NO romper F25. NO usar APIs de Three.js posteriores a r128 (nada de `CapsuleGeometry`, `SRGBColorSpace`; usar `sRGBEncoding` si hace falta).
11. Verificar sintaxis antes de cerrar cada fase: `node --check game.js` (si node no está, revisión manual de llaves) y probar en navegador con consola abierta (F12) sin errores.
12. Comentar cada bloque nuevo con `// F<num>:`.

## Repositorios externos a AUDITAR (no copiar automáticamente)

| Repo | Uso posible | Advertencia |
|---|---|---|
| `https://github.com/bazilinskyy/gtav-sim` | Inspiración simulación urbana/tráfico/calle | NO usar assets ni material de GTA |
| `https://github.com/calloncampbell/BaggageHandling-TypeB-Simulator` | Inspiración equipaje, cintas, flujo valijas | No integrar backend/lógica pesada |
| `https://github.com/AndyMagwayer/A320-airplane` | Posible modelo A320 | Solo con licencia clara; si hay duda, avión propio low-poly |
| `https://github.com/kunal202426/Sim-City` | Inspiración edificios/calles/ciudad low-poly | No copiar assets sin licencia |
| `https://github.com/honzaap/GithubCity` | Inspiración ciudad procedural | No copiar código/assets sin licencia |

---

# FASES

## F26 — Auditoría visual y técnica post-F25

**Objetivo:** confirmar que F25 funciona y mapear dónde vive cada sistema. NO modificar nada.

**Archivos a revisar:** `index.html`, `game.js`, `js/assets-lib.js`, `js/data.js`.

**Tareas:**
- Confirmar carga sin errores de consola y que `window.AeroAssets` existe antes de `game.js`.
- Localizar y anotar (número de línea) dónde se construyen: hall (`buildShell`, `buildWalls`, `buildFloorTile`, `buildCeiling`), vidrios (muro cortina en `buildWalls`, `buildEntranceFacadeWindows`, `buildEntranceSideWindows`), calle exterior (`buildStreetScene`, `_drawStreetScene`), NPCs (`spawnNPCs`, `updateNPCs`, `buildCharacter`), aviones (`buildPlane`, `buildDetailedPlane`), tiendas (`buildShops`, `buildCafe`, `buildPharmacy`, etc.), carteles (`sign()`, `AeroAssets.makeSign`), audio (`buildAmbientPad`, `buildHallMurmur`).
- Producir `AUDITORIA_F26.md` con el mapa de funciones, conteo aproximado de draw calls/objetos, y problemas detectados (z-fighting, fugas de rendimiento, vidrios invisibles, NPCs atravesando mobiliario).

**Riesgos:** ninguno (solo lectura).

**Cómo probar:** servidor local + recorrer hall completo en 1ª y 3ª persona, consola F12 sin errores.

```bash
git status
# Fase diagnóstica: no hacer commit.
```

## F27 — Auditoría de repositorios externos y licencias

**Objetivo:** clasificar los 5 repos externos SIN descargar ni integrar nada.

**Archivos a revisar:** los 5 repos (solo lectura web/clone temporal fuera del proyecto).

**Tareas:**
- Para cada repo detectar: licencia, tecnología, assets/modelos disponibles, peso aproximado, compatibilidad web, riesgo legal.
- Clasificar: `utilizable` / `solo inspiración` / `no usar`.
- Generar `REFERENCIAS_EXTERNAS_AEROCALMA.md` con: repo, utilidad, licencia, decisión, archivos candidatos (si los hay), advertencias.

**Riesgos:** licencias ausentes o ambiguas → clasificar como `solo inspiración` o `no usar` por defecto.

**Cómo probar:** el archivo existe, cubre los 5 repos y cada decisión está justificada.

```bash
git status
git add REFERENCIAS_EXTERNAS_AEROCALMA.md AUDITORIA_F26.md
git commit -m "docs: F26-F27 auditoria post-F25 y referencias externas con licencias"
git push origin main
```

## F28 — Realismo de ventanales y paredes vidriadas

**Objetivo:** paredes vidriadas más claras, amplias y realistas, que permitan ver calle y plataforma.

**Archivos a revisar:** `game.js` (`buildWalls`, `buildShell`, `buildEntranceFacadeWindows`, `buildEntranceSideWindows`).
**Archivos a modificar:** `game.js`.

**Tareas:**
- Mejorar curtain wall: paneles de vidrio continuos, mullions metálicos, transparencia sobria (opacity 0.10–0.18 — el vidrio NO debe ser invisible: leve tinte azulado + reflejo sugerido con `envMap` simple o banda especular canvas, sin costo alto).
- Diferenciar tres materiales: vidrio interior, vidrio exterior, estructura metálica.
- Cuidar `depthWrite:false` y orden de render para evitar artefactos de transparencia.

**Riesgos:** transparencias que ocultan objetos detrás (orden de render); bajones de FPS por overdraw; romper el muro cortina F24/F25 existente.

**Cómo probar:** pararse en el hall y verificar que se ve pista (fondo) y calle (entrada) a través del vidrio; el vidrio se percibe (tinte/reflejo); FPS estable; Tab funciona.

```bash
node --check game.js
git add game.js
git commit -m "feat: F28 curtain wall realista con mullions y vidrio diferenciado"
git push origin main
```

## F29 — Exterior urbano visible desde el hall

**Objetivo:** calle realista visible desde los ventanales de entrada.

**Archivos a revisar:** `game.js` (`buildStreetScene`, `_drawStreetScene`), `js/assets-lib.js`.
**Archivos a modificar:** `game.js` y/o nuevo `js/street-lib.js` si conviene (cargar en `index.html` antes de `game.js`).

**Tareas:**
- Agregar/mejorar: vereda con baldosas, dársena drop-off, autos y taxi low-poly (ruedas, ventanas, luces), farolas, árboles, edificios de fondo, carteles Llegadas/Salidas, siluetas de personas caminando (animación sutil).
- Todo low-poly/canvas/geometría propia. Sin marcas reales. Sin sobrecargar (usar `InstancedMesh` para farolas/árboles).

**Riesgos:** sobrecarga de draw calls; escena de calle "lavada" por fog/bloom (ajustar distancias de fog).

**Cómo probar:** mirar desde dentro del hall hacia la entrada; la calle se ve con profundidad y vida moderada; FPS estable.

```bash
node --check game.js
git add game.js js/ index.html
git commit -m "feat: F29 exterior urbano visible desde el hall"
git push origin main
```

## F30 — Plataforma aeroportuaria visible desde ventanales

**Objetivo:** desde otra zona vidriada se ve la plataforma (apron), claramente distinta de la calle.

**Archivos a revisar:** `game.js` (`buildGround`, `buildExterior`, muro cortina del fondo).
**Archivos a modificar:** `game.js`.

**Tareas:**
- Plano exterior de plataforma con: marcas de apron, luces, conos, vehículos simplificados (tug, fuel, pushback ya existen — reubicar/reutilizar), manga o puerta de embarque, 1–2 aviones estacionados.
- Coherencia espacial: calle del lado de entrada (+z), plataforma del lado de pista (−z). No deben verse mezcladas.

**Riesgos:** incoherencia espacial (ver calle y pista en el mismo lado); duplicar geometría ya creada en F23/F24.

**Cómo probar:** recorrer el perímetro interior: entrada → calle; fondo/abordaje → plataforma con aviones.

```bash
node --check game.js
git add game.js
git commit -m "feat: F30 plataforma aeroportuaria visible desde ventanales"
git push origin main
```

## F31 — Aviones realistas low-poly

**Objetivo:** mejorar los aviones exteriores.

**Archivos a revisar:** decisión F27 sobre `AndyMagwayer/A320-airplane`; `game.js` (`buildPlane`, `buildDetailedPlane`).
**Archivos a modificar:** `game.js`; solo si licencia clara: carpeta `assets/` + `ASSETS_LICENSES.md`.

**Tareas:**
- Si la licencia del repo A320 NO es clara → NO usar archivos; crear avión propio low-poly.
- El avión debe tener: fuselaje, alas, motores, cola, tren sugerido, ventanas, puerta. Sin logos Airbus ni aerolíneas reales (librea ficticia, ej. "AeroCalma Air").
- Visible desde ventanales sin ser pesado (una geometría compartida, materiales reutilizados).

**Riesgos:** modelo externo pesado o con licencia dudosa; exceso de polígonos.

**Cómo probar:** ver aviones desde el vidrio del fondo; silueta clara y proporcionada; carga rápida.

```bash
node --check game.js
git add game.js assets/ ASSETS_LICENSES.md 2>/dev/null || git add game.js
git commit -m "feat: F31 aviones low-poly mejorados con libreria ficticia"
git push origin main
```

## F32 — NPCs más realistas y variados

**Objetivo:** personas más realistas dentro del estilo low-poly, sin uncanny valley.

**Archivos a revisar:** `game.js` (`buildCharacter`, `spawnNPCs`, `updateNPCs`, `buildPilotDetailed`, `buildAttendantDetailed`).
**Archivos a modificar:** `game.js`.

**Tareas:**
- Mejorar proporciones (cabeza ≈1/7.5 de altura, cuello, hombros).
- Variar tipos: pasajeros, familias, niños, ejecutivo, limpieza, check-in, seguridad.
- Accesorios simples: valijas, mochilas, carrito.
- Respetar modo baja estimulación (densidad regulada).
- Correctos en 3ª persona, sin z-fighting ni atravesar mobiliario.

**Riesgos:** costo por NPC (usar geometrías/materiales compartidos); comportamiento errático que genere ansiedad.

**Cómo probar:** observar 5 min en 1ª y 3ª persona: caminatas suaves, variedad visible, sin glitches.

```bash
node --check game.js
git add game.js
git commit -m "feat: F32 NPCs variados con accesorios y proporciones humanas"
git push origin main
```

## F33 — Baggage / equipaje / cintas y valijas

**Objetivo:** elementos de equipaje realistas (sin simulación compleja todavía).

**Archivos a revisar:** decisión F27 sobre `BaggageHandling-TypeB-Simulator`; `game.js` (check-in, llegadas).
**Archivos a modificar:** `game.js`, `js/assets-lib.js` (fábrica `makeLuggage()` si conviene).

**Tareas:**
- Valijas en filas de check-in, carros de equipaje, cinta transportadora simple si corresponde, zona de baggage claim futura (marcada, no funcional).
- Repo externo solo como inspiración salvo licencia clara.

**Riesgos:** animar la cinta con costo alto (usar offset de textura, no mover cientos de meshes).

**Cómo probar:** zona check-in y llegadas pobladas con equipaje coherente; FPS estable.

```bash
node --check game.js
git add game.js js/assets-lib.js
git commit -m "feat: F33 equipaje, valijas, carros y cinta simple"
git push origin main
```

## F34 — Tiendas y zona comercial realista

**Objetivo:** tiendas laterales de mayor calidad.

**Archivos a revisar:** `game.js` (`buildShops`, `buildCafe`, `buildConvenienceStore`, `buildNewsstand`, `buildPharmacy`, `buildRestaurant`, `buildGiftShop`), `js/assets-lib.js`.
**Archivos a modificar:** `game.js`, `js/assets-lib.js`.

**Tareas:**
- Cafetería, kiosco, farmacia/travel essentials, librería/revistas, souvenirs.
- Nombres ficticios, fachadas diferenciadas, escaparates con productos visibles, cartelería (`makeSign`/`makeStorefront`), luz interior suave por rubro.
- Todo canvas o geometría propia; refactorizar duplicación hacia `AeroAssets`.

**Riesgos:** demasiadas luces puntuales (limitar; usar emissive para "luz" barata).

**Cómo probar:** recorrer el corredor comercial; cada tienda distinguible a distancia por fachada y cartel.

```bash
node --check game.js
git add game.js js/assets-lib.js
git commit -m "feat: F34 zona comercial realista con escaparates y carteleria"
git push origin main
```

## F35 — Iluminación, materiales y render

**Objetivo:** mejorar apariencia general.

**Archivos a revisar:** `game.js` (setup de renderer, luces, bloom, fog, `buildFloorTile`).
**Archivos a modificar:** `game.js`.

**Tareas:**
- Revisar luces (jerarquía: 1 direccional + ambiente + pocas puntuales clave).
- Piso especular sutil sin exagerar; mejorar materiales de vidrio; tonos cálidos interiores.
- Sombras o fake-shadows (blob bajo NPCs/vehículos) si son livianas.
- Mejorar contraste interior/exterior.
- Revisar/implementar modos de calidad: alta / normal / ahorro (resolución de sombras, densidad de partículas, cantidad de NPCs).

**Riesgos:** bloom lavando la escena; sombras 4096 caras en hardware modesto (bajar según modo).

**Cómo probar:** alternar los 3 modos de calidad y verificar diferencia de FPS y aspecto aceptable en ahorro.

```bash
node --check game.js
git add game.js
git commit -m "feat: F35 iluminacion, materiales y modos de calidad"
git push origin main
```

## F36 — Experiencia tipo juego 3D clásico

**Objetivo:** recorrido con sensación de juego 3D clásico, sin perder calma.

**Archivos a revisar:** `game.js` (cámara, `buildPlayerBody`, colisiones, input).
**Archivos a modificar:** `game.js`.

**Tareas:**
- Pulir 3ª persona (Tab): distancia, altura, suavizado de cámara, sin clipping con paredes.
- Mejorar avatar del jugador (coherente con NPCs F32).
- Sensación de escala (alturas correctas, referencias visuales).
- Orientación visual (señalética direccional, hitos por zona).
- Colisiones simples: no atravesar mostradores/ventanales/tiendas (AABB por zona es suficiente).
- Movimiento suave (aceleración/frenado leves).

**Riesgos:** cámara 3ª persona metiéndose en paredes (raycast simple de cámara); colisiones que traben al jugador.

**Cómo probar:** recorrer todo el hall en 3ª persona intentando atravesar mobiliario y vidrios; no debe poder; movimiento fluido.

```bash
node --check game.js
git add game.js
git commit -m "feat: F36 camara 3a persona pulida, colisiones y escala"
git push origin main
```

## F37 — Modo terapéutico y baja estimulación

**Objetivo:** que el realismo no aumente la ansiedad.

**Archivos a revisar:** `game.js` (modo baja estimulación existente, spawns, audio).
**Archivos a modificar:** `game.js`.

**Tareas:**
- En modo baja estimulación: reducir NPCs, movimiento, luces, audio; simplificar exterior.
- NO eliminar orientación terapéutica: carteles y zonas claras siempre visibles.
- Sin multitudes, alarmas ni caos en ningún modo.

**Riesgos:** que el modo reducido rompa referencias de otras fases (guardar y restaurar estado limpio).

**Cómo probar:** activar/desactivar el modo varias veces; la escena se simplifica y restaura sin errores de consola.

```bash
node --check game.js
git add game.js
git commit -m "feat: F37 modo baja estimulacion integrado con realismo F28-F36"
git push origin main
```

## F38 — Optimización de assets

**Objetivo:** evitar que el juego se vuelva pesado.

**Archivos a revisar:** todos; tamaños con `dir` / `git count-objects -vH`.
**Archivos a modificar:** los que lo requieran.

**Tareas:**
- Medir tamaño de archivos; evitar imágenes grandes y modelos pesados; comprimir GLB si hubiera (Draco solo si se justifica).
- Reutilizar geometrías y materiales (cachés/factorías); fusionar geometría estática; `InstancedMesh` donde se repita >10 veces.
- Mantener carga rápida local con servidor simple.

**Riesgos:** optimizar rompiendo visuales (verificar cada zona tras cada cambio).

**Cómo probar:** tiempo de carga < unos segundos en local; recorrido completo sin caídas de FPS; consola sin warnings de memoria.

```bash
node --check game.js
git add -A
git commit -m "perf: F38 optimizacion de assets, geometria y materiales"
git push origin main
```

## F39 — Documentación y cierre

**Objetivo:** dejar documentado qué se usó y qué no.

**Archivos a modificar:** `README_LOCAL.txt`, `REFERENCIAS_EXTERNAS_AEROCALMA.md`, `ASSETS_LICENSES.md` (crear si corresponde).

**Tareas:**
- Documentar: assets propios, assets externos (con fuente y licencia), repos usados solo como inspiración, cómo probar cada fase, cómo revertir (hash de commit por fase).

**Riesgos:** ninguno.

**Cómo probar:** los tres documentos existen, están actualizados y un tercero podría retomar el proyecto solo con leerlos.

```bash
git add README_LOCAL.txt REFERENCIAS_EXTERNAS_AEROCALMA.md ASSETS_LICENSES.md
git commit -m "docs: F39 documentacion de assets, licencias y cierre de ciclo F26-F39"
git push origin main
```

---

## Regla transversal de cierre de fase

Antes de cada commit: (1) `node --check game.js` sin errores, (2) prueba en navegador con consola F12 limpia, (3) probar Tab (3ª persona) y modo baja estimulación, (4) confirmar que F25 sigue funcionando. Si algo falla, NO commitear: reportar el problema y esperar revisión.
