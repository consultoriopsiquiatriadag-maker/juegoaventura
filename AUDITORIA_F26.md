# AUDITORIA_F26 — Auditoria post-F25

**Fecha:** 2026-07-29
**Estado:** Diagnostico solamente — sin modificaciones
**Repo:** `https://github.com/consultoriopsiquiatriadag-maker/juegoaventura` (branch `main`)

---

## 1. Carga y carga util

### Orden de secuencias en `index.html`
| Orden | Script | Rol |
|-------|--------|-----|
| 1 (head) | Three.js r128 CDN | Motor 3D |
| 2 (head) | PointerLockControls.js | Controles de camara |
| 3 (head) | Postprocessing passes | Bloom, efectos |
| 4 (head) | GLTFLoader.js | Modelos cabina |
| 5 (head) | Sky.js | Cielo atmosferico |
| 6 (body end) | `js/data.js` | Zonas, vuelos, grounding |
| 7 (body end) | **`js/assets-lib.js`** | `window.AeroAssets` (F25) |
| 8 (body end) | `game.js` | Logica principal (~4900 lineas) |

### Verificacion de `window.AeroAssets`
`assets-lib.js` se ejecuta inmediatamente (IIFE al inicio del archivo) y asigna `window.AeroAssets = { makeSign, makeStorefront, makeAd }` antes de que `game.js` se ejecute. **OK.**

### Errores de consola esperados en limpio
 Ninguno reportado al cargar la pagina con `python -m http.server 8080`. `node --check game.js` pasa sin errores.

---

## 2. Mapa de funciones por sistema

### 2.1 Hall (estructura principal)
| Sistema | Funcion | Linea aprox. | Descripcion |
|---------|---------|-------------|-------------|
| Init | `init()` | 151 | Setup escena, camara, renderer, carga de todo |
| Iluminacion | `setupLighting()` | 219 | Ambient + direccional + puntuales + sky |
| Particulas | `setupDustParticles()` | 277 | 300 particulas de polvo atmosferico |
| **Suelo** | `buildGround()` | 320 | Tarmac, marquesinas, luces de pista, taxiway |
| **Cubeta** | `buildShell()` | 398 | Cuerpo terminal, muro cortina fondo (z=-73), entrada canopy, side glass |
| **Piso** | `buildFloorTile()` | 440 | Marmol con venas canvas + capa especular |
| **Techo** | `buildCeiling()` | 500 | Paneles acusticos, luminarias, vigas, claraboyas |
| **Paredes** | `buildWalls()` | 556 | Paneles MDF + muro cortina fondo (vidrio + mullions) |
| **Columnas** | `buildPillars()` | 624 | 10 columnas de marmol + luces + LEDs |
| **Anillos** | `buildZoneRings()` | 661 | 7 anillos de zona con colores |
| Ambiente | `buildHallAmbience()` | 676 | Plantas, bancos, carros, vending, monitores |

### 2.2 Ventanales y fachada (F25-F28)
| Sistema | Funcion | Linea aprox. | Descripcion |
|---------|---------|-------------|-------------|
| Vidrios laterales | `buildSidewallWindows()` | 1885 | 5 ventanas por lado (3 variantes de escena) |
| Ventana lateral | `_buildSideWindow()` | 1912 | Marco aluminio + vidrio + tinte + luz |
| Escena exterior | `_drawExtScene()` | 1957 | Cielo, nubes, tarmac, aviones, vehiculos (3 variantes) |
| Avion | `_drawPlane()` | 2025 | Perfil low-poly (fuselaje + alas + cola + motores) |
| Vehiculo | `_drawVehicle()` | 2059 | Tipo: fuel / luggage |
| Vista tarmac | `buildEntranceTarmacView()` | 2077 | Backdrop + piso tarmac, 3 aviones, pasarela |
| **Calle scene** | `_drawStreetScene()` | **4571** | Cielo tarde, edificios, vereda, taxi, 2 autos, senales, farolas, arboles, siluetas |
| **Backdrop calle** | `buildStreetScene()` | **4659** | Plano exterior (z=68) + piso vereda |
| **Vidriera fachada** | `buildEntranceFacadeWindows()` | **4675** | 3 paneles vidrio opacity 0.12, mullions, bandas opacas |
| **Vidrios laterales entrada** | `buildEntranceSideWindows()` | **4708** | 6 ventanas adicionales en x=±17, z=38/48/58 |
| **Calidad hall** | `buildHallQuality()` | **4734** | Especular piso, letreros emissive, cinta fila, plantas, bins |

### 2.3 NPCs
| Sistema | Funcion | Linea aprox. | Descripcion |
|---------|---------|-------------|-------------|
| Constructor | `buildCharacter()` | 2405 | GTA-style humanoide PBR, cabeza 1/7.5, cuello, manos |
| Piloto detallado | `buildPilotDetailed()` | 2645 | Sentado, yoke, uniforme, gorra |
| Auxiliar detallada | `buildAttendantDetailed()` | 2829 | De pie, carrito, uniforme distintivo |
| Carrito servicio | `buildServiceCart()` | 3025 | Carrito de bebidas con ruedas |
| Spawn civiles | `spawnNPCs()` | 3118 | ~12 npcs base + 14 NPCs F25 = ~26 |
| Spawn staff | `spawnStaffNPCs()` | 3242 | Agentes, police, piloto, info desk |
| Carga GLTF | `loadCabinCrew()` | 3295 | Intenta assets/; fallback procedimental |
| Tripulacion fallback | `spawnCabinCrewFallback()` | 3340 | 4 NPCs de cabina con carritos |
| Actualizar NPCs | `updateNPCs()` | 3401 | Walk/pause/idle + look-at-player + LOD + player avoidance (F25) |

### 2.4 Tiendas
| Sistema | Funcion | Linea aprox. | Descripcion |
|---------|---------|-------------|-------------|
| Tiendas master | `buildShops()` | 1456 | Llama a 7 tiendas |
| Fachada base | `buildShopBase()` | 1467 | Pared trasera + laterales + fascia + vidrios |
| Cafeteria | `buildCafe()` | 1499 | Mostrador, espresso, neon, mesitas |
| Kiosco express | `buildConvenienceStore()` | 1535 | Estantes, frigorifico, registradora |
| Libreria | `buildNewsstand()` | 1570 | Pared libros, rack revistas, mesita |
| Farmacia | `buildPharmacy()` | 1604 | Estantes medicamentos, cruz, mostrador |
| Restaurante | `buildRestaurant()` | 1640 | Barra, taburetes, botellero |
| Souvenirs | `buildGiftShop()` | 1677 | Estantes colores, peluches, caja registradora |

### 2.5 Carteleria y senales
| Sistema | Funcion | Linea aprox. | Descripcion |
|---------|---------|-------------|-------------|
| Senales direccionales | `buildDirectionSigns()` | 1714 | Posters de zona |
| Tablero vuelos | `buildFlightBoard()` | 1731 | Canvas animado conFLIGHTS |
| Render tablero | `drawFlightBoard()` | 1742 | Dibuja en canvas 512x128 |
| Senales AerAssets | `AeroAssets.makeSign()` | js/assets-lib.js | Directional, gate, floor, pillar |
| Tiendas AerAssets | `AeroAssets.makeStorefront()` | js/assets-lib.js | Fachada completa con vidrio, logo, luz |
| Ads | `AeroAssets.makeAd()` | js/assets-lib.js | Panel publicitario relajante |

### 2.6 Audio (Fase 5)
| Sistema | Funcion | Linea aprox. | Descripcion |
|---------|---------|-------------|-------------|
| Audio pad | `buildAmbientPad()` | 4314 | Sintetizador reverb |
| Murmullo hall | `buildHallMurmur()` | 4367 | Audio base ambiente |
| Volumen master | `setAmbientMasterTarget()` | 4410 | Ramp suave |
| Calm audio | `applyCalmAudioGains()` | 4420 | Reduce en modo calma |

### 2.7 Juego y UI
| Sistema | Funcion | Linea aprox. | Descripcion |
|---------|---------|-------------|-------------|
| Input | `setupEvents()` | 3793 | Pointer lock + teclado + mobile |
| Teclado | `onKeyDown/onKeyUp()` | 3869/3883 | WASD + escape |
| Movimiento | `animate()` | 4771 | Loop principal, movimiento suave, FOV calm |
| Zonas | `checkZones()` / `enterZone()` | 4066/4073 | Deteccion proximidad |
| 3ra persona | `buildPlayerBody()` | 4531 | Avatar visible en Tab |
| Menu | `startGame()` etc. | 4021 | Flujo completo |
| Check | `runChecks()` | 4861 | Diagnostico integrado |

---

## 3. Estimacion de draw calls y objetos

### Categoria | Estimacion meshes (approx) | Draw calls (estimado) | Notas
---|---|---|---
Suelo (tarmac) | 10-15 | 3-4 | Unificable con geoms compartidas
Shell/cuerpo terminal | 8-10 | 2-3 | Vidrio aparte
Columnas (10) | 30-40 | 2-3 | Geometria compartida reutilizada
Paredes + muro cortina | 5-8 | 2 | Vidrio + mullions separados
Piso marmol | 2 | 1-2 | Capa especular = 1 extra
Techo | 10-15 | 3 | Paneles + luminarias
NPCs (26) | ~800 | 80-120 | Cada NPC ~30 meshes; LOD ayuda
Tiendas (7) | ~140 | 15-20 | Cada local ~20 meshes
Senales y posters | 5-10 | 3-5 | Canvas textures
Vehiculos (exterior) | 5-8 | 2-3 | Autos + taxi en calle
Aviones (exterior) | 5 | 2-3 | Modelos compartidos
Plantas (12+) | 12-24 | 2-4 | Instanced posible
Bancos (6+) | 12-18 | 1-2 | Geometria compartida
Bins (6) | 12 | 1-2 | Geometria compartida
Particulas polvo | 1 | 1 | 300 puntos
Luminarias (8 techo + 10 postes + 6 farolas) | 10-15 | 2-3 | Luces sin mesh = gratis
Total estimado **draw calls reales** | | **~150-250** | Con batching y materiales compartidos |

### Objetos InstancedMesh pendientes
> El prompt F25-F30 pide InstancedMesh para elementos repetidos >10 veces. Actualmente NO se usa InstancedMesh en ningun lado. Elementos candidatos:
> - Marcos de ventana (repeats across windows)
> - Farolas (5+ en escena calle + 10 postes en paredes)
> - Arboles en maceteros (9+)
> - Asientos de bancos
> - Baldosas de vereda (pattern)
> - Luces de taxiway/borde pista (50+)

---

## 4. Problemas detectados

### 4.1 Transparencia / Orden de render
- **Vidrios de muro cortina (z=-73):** usa `depthWrite:false` y `side:THREE.DoubleSide`. OK para muro fondo.
- **Nuevos vidrios F25 (fachada + laterales):** mismo patron. `depthWrite:false` esta seteado en `buildEntranceFacadeWindows`. **Riesgo bajo** porque la camara mira de adentro hacia afuera (z+), y los planos de vidrio estan en z=40/52/64. El orden de pintado should be fine para transparente.
- **Posible z-fighting** entre las dos capas de piso (marmol + especular overlay). La capa especular esta a `y=0.11` vs piso a `y=0.09`. Separacion de 0.02 unidades — **podria haber z-fighting** en algunos angulos de camara cercanos al suelo.

### 4.2 Z-fighting potencial
| Par | Distancia | Riesgo |
|-----|-----------|--------|
| Piso marmol vs overlay especular | 0.02u | Medio — ajustar a 0.05 o usar polygon offset |
| Vidrio fachada vs ventana interior muro cortina | N/A (z diferentes) | Bajo |
| NPCs vs mobiliario | Depende de posicion | Medio — updateNPCs tiene look-at pero no collision |
| Backdrop calle (z=68) vs vidrio fachada (z=40-64) | 4-28u | Bajo — bien separados |

### 4.3 Rendimiento
- **26 NPCs** (~800 meshes totales) es el mayor costo. Cada frame se itera `updateNPCs` con LOD (skip a 2 de 4 frames para >22u, 3 de 4 para >35u). **Mejorado** con el player avoidance.
- **2 point lights por ventana** (6 ventanas × 2 = 12 luces puntuales nuevas F25). LUCES TOTALES en escena: 8 techo + 3 por zona + 3 cabina + 12 ventanas + extras = ~45+ luces puntuales. Esto es alto para hardware modesto.
- **No hay InstancedMesh** — todos los meshes son individuales. Para escenas con >10 repeticiones, hay margen de mejora importante.

### 4.4 Niebla y escena de calle
- La niebla `FogExp2(0xb0d8f0,0.004)` (o 0.006 sin Sky) **puede lavar** la escena de calle si los colores son claros. La calle usa colores `#908878`-`#888070` para la calle y `#c8b8a0` para edificios — tonos que contrastan bien contra el fondo azul del cielo y no se perderan en la niebla.
- El bloom (threshold 0.85) es alto y **no afectara** la escena de calle (no tiene pixeles >0.98 excepto farolas).

### 4.5 Escenas exteriores canvas
- `_drawStreetScene` canvas 1024×512 — OK (<2048).
- `_drawExtScene` canvas 768×384 — OK.
- `buildEntranceTarmacView` canvas 1024×512 — OK.
- Total de texturas canvas en memoria: ~5 texturas grandes + ~10 medianas. **Dentro de limites.**

### 4.6 Otros
- **NPCs en 3ra persona (Tab):** El avatar `buildPlayerBody()` esta en el lado del jugador (no NPCs). NPCs visibles correctamente en 3ra persona.
- **NPCs atraviesando mobiliario:** No hay colisiones entre NPCs y mostradores/bancos. El `avoidPlayer` en updateNPCs solo desvia lateralmente del jugador, no de mobiliario. **No es un bug (es intencional por simplicidad) pero puede mejorarse.**
- **F25 sigue funcionando:** buildWorld() llama las 4 F25 functions al final. buildWall() original no se modifico.
- `assets-lib.js` carga correctamente (IIFE, window.AeroAssets asignado antes de game.js).

---

## 5. Checklist de verificacion F26

- [x] `window.AeroAssets` existe antes de `game.js` ejecutar
- [x] `js/assets-lib.js` carga sin errores
- [x] `node --check game.js` pasa
- [x] `node --check js/assets-lib.js` pasa
- [x] buildWorld() incluye llamadas F25
- [x] Todas las funciones F25 tienen `// F25:` comment (o están en el bloque F25)
- [x] No se rompio F20-F24 existente
- [x] No se usan APIs > r128 (CapsuleGeometry, SRGBColorSpace, etc.)

---

## 6. Proximos pasos recomendados (F27+)

1. **F27** — Auditoria de repos externos para decidir que assets/modelos reutilizar.
2. **F28** — Mejorar curtain wall: diferenciar vidrio interior/exterior/estructura metalica.
3. **F29-F30** — Mejorar/ampliar escena de calle (F29) + agregar plataforma visible desde otros ventanales (F30).
4. **F31** — Crear aviones propios low-poly (libreria ficticia AeroCalma Air).
5. **F32** — NPCs mejorados (ya en road map; buildCharacter ya es muy detallado).
6. **F33-F34** — Equipaje + tiendas enriquecidas con AeroAssets.
7. **F35** — Optimizar luces (reducir de ~45 a ~20-25 usando lights compartidas).
8. **F36** — Colisiones AABB + pulir 3ra persona cámara.
9. **F37** — Integrar modo baja estimulacion con F28-F36.
10. **F38** — Implementar InstancedMesh para farolas, arboles, asientos.
11. **F39** — Documentacion final.
