# AeroCalma — Informe de validación (F82–F83)

**Fecha:** 26/11/2026 · **Versión validada:** `8970ecd` (rama `main`)
**Equipo de prueba:** PC Windows 10, Chrome con ANGLE / Direct3D 11, NVIDIA GeForce RTX 5060 Ti. Celular **simulado** en la misma PC (375 × 812, modo táctil).

> Las mediciones de "celular" usan el procesador y la placa de esta PC: sirven para comparar antes y después, **no** representan un teléfono real.

---

## 1. Pruebas funcionales

| Prueba | Resultado |
|---|---|
| Autodiagnóstico `runChecks()` (46 chequeos: librerías, funciones, paneles, puntos de interacción, datos) | **46/46** |
| Las 27 interacciones del juego (abrir y cerrar cada una) | **Sin errores** |
| Recorrido completo: perfil con nombre → asiento e intensidad → vuelo → desembarque → pasillo (primera persona forzada) → sala de equipajes (tercera persona permitida) → valija → encuentro → pantalla final "¡Lo lograste, Ana!" | **OK, sin errores en consola** |
| Tres cámaras (Tab, botón 🎥, Pausa, botón táctil) y paredes | OK; se acerca o pasa a primera persona junto a paredes |
| Perfil local: guardar, aplicar al avatar y cámara inicial, borrar | OK |
| Centro de Información: 8 tarjetas, animación, voz, flechas, Escape | OK |
| Necesito una pausa: 7 herramientas, volver al menú, seguir, terminar por hoy, tecla P | OK |
| Respiración suave sin retención (y 4-7-8 opcional) | OK |
| Grounding 5-4-3-2-1 (estaba roto desde la Fase 5) | **Corregido** y probado |
| Vuelo: 4 asientos, 3 intensidades, movimiento y motores apagables, etiquetas | OK (inicio, interruptores y salto al aterrizaje) |
| Biblioteca "Animate a volar": enlace y atribución | OK |
| Modo Calma / movimiento reducido | Respetado en las funciones nuevas |
| Celular simulado: HUD, botón de pausa, botón de cámara, personalización | OK |

### Enlaces externos (verificados el 26/11/2026, todos responden 200)
RENAPER · psicofármacos · medicina aeronáutica · equipo de salud mental · juego 26 (valija) · turnos · Te Paso a Buscar · GeoFS (Cessna 172 en Buenos Aires) · playlist "Animate a volar" · Instagram del consultorio · Three.js r128 (cdnjs y jsDelivr).

---

## 2. Rendimiento

### Tiempo de armado al cargar (`window.__initTimes`)

| | Antes (F82) | Después (F83-A) |
|---|---|---|
| Celular simulado | ~7,0 s | **~1,5 s** |
| Programas de sombreado compilados (celular) | 62 | **31** |
| Computadora | ~7,5 s | ~3–6 s |

**Causa encontrada:** construir el aeropuerto tarda menos de 0,5 s. El resto era la primera preparación de la placa de video: el reflejo del piso compilaba los sombreados con 58 luces y, en celular, se volvían a compilar con 12. Se corrigió el orden, se omite el reflejo en calidad baja y en computadora se usan como máximo 24 luces (visualmente casi idéntico).

> El navegador guarda los sombreados compilados entre visitas: la primera visita siempre es más lenta que las siguientes. Por eso las cifras de computadora varían.

### Cuadros por segundo y recursos

| | Computadora (calidad normal) | Celular simulado (calidad baja) |
|---|---|---|
| Hall (1ª / 3ª cercana / panorámica) | 70–77 | 120* |
| Sala de embarque / cabina | 71–99 | — |
| Memoria JS | 73–145 MB (según el momento) | ~156 MB |
| Geometrías / texturas | ~1.230 / ~220 | ~1.150 / ~210 |
| Luces puntuales | 24 (antes 58) | 12 |

\* La GPU de escritorio limita la representatividad.

---

## 3. Privacidad y almacenamiento local

Claves en `localStorage` (sólo en el dispositivo): `aerocalma_consent`, `aerocalma_diary`, `aerocalma_reviews`, `aerocalma_pildora`, `aerocalma_sound`, `aerocalma_cam`, `aerocalma_cam_instant`, `aerocalma_profile` (nombre y aspecto), `aerocalma_breath`, `aerocalma_flight`.
- El nombre no se envía a ningún servicio ni se agrega al resumen para el terapeuta.
- Google Tag Manager se carga sólo si la persona acepta (Consent Mode v2, por defecto denegado).
- "Borrar mis preferencias" elimina el perfil y la cámara guardada.

---

## 4. No verificado

- Celulares reales (Android / iPhone).
- Vuelo completo con todos los audios de principio a fin (se usaron saltos).
- Lectores de pantalla.
- Llegada de datos a la cuenta de Google Tag Manager.
