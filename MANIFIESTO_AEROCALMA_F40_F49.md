# AeroCalma — Manifiesto F40–F49 (ejecutado como F74–F83)

**Proyecto:** personalización, inmersión aeronáutica y herramientas terapéuticas
**Sitio:** https://aerocalma.netlify.app/ · **Repositorio:** https://github.com/consultoriopsiquiatriadag-maker/juegoaventura (rama `main`)
**Carpeta de trabajo real:** `G:\Mi unidad\Dr.Dagnino\APLICACIONES Y SITIOS DEL CONSULTORIO\aeropuerto3d\juegoaventura`
**Cierre:** 26/11/2026

> La copia de `C:\Users\LABORATORIO\Desktop\OPEN CODE PRUEBA\...` quedó en F28 y **no debe usarse** sin antes hacer `git pull` (ver auditoría).
> Los números F40–F49 ya existían en el código, por eso las fases se ejecutaron como **F74–F83**, con el nombre del manifiesto entre paréntesis en cada commit.

---

## 1. Relación de fases y commits

| Manifiesto | Fase real | Qué se hizo | Commit |
|---|---|---|---|
| F40 Auditoría | **F74** | `AUDITORIA_AEROCALMA_F40.md`: arquitectura, cámaras, avatar, riesgos y manifiesto adaptado | `d017c85` |
| F43 Avatares | **F77** | Avatar del jugador con `buildCharacter` (femenino / masculino / neutro); espera, caminar, girar y detenerse con transición; sólo se anima si se ve | `37325f4` |
| F41 Cámaras | **F75** | Primera persona, tercera cercana ("sobre el hombro") y panorámica; Tab, botón 🎥 (también táctil) y Pausa; cambio suave o instantáneo; evita paredes; primera persona forzada en manga, cabina, vuelo y pasillo de llegadas | `02f5eb7` |
| F42 Personalización | **F76** | "Personalizar mi experiencia": nombre (24), personaje, colores, cámara inicial, vista previa 3D; perfil sólo local con "Borrar mis preferencias"; nombre en bienvenida, progreso, cartelito del avatar, cartel en Madrid y pantalla final | `5567ef7` |
| F44 Centro de información | **F78** | Centro de Información Aeronáutica y Calma (local ex AeroCafé): 8 tarjetas con ilustración animada y lectura en voz; rótulo "contenido educativo"; corrección de cifras sin fuente en `data.js` y pantalla final; la pausa de café pasa al kiosko de la sala de embarque | `ad032c8` |
| F45 Regulación | **F79** | Botón "🤲 Necesito una pausa" (y tecla P): detiene el recorrido, baja sonido y movimiento; presente, grounding, respiración, relajación muscular, sensaciones, reencuadre, Modo Calma, seguir o terminar por hoy. Respiración suave sin retención por defecto. **Arreglo:** el grounding 5-4-3-2-1 no abría desde la Fase 5 | `5431035` |
| F46 Cabina | **F80** | Antes de sentarse: asiento (14C, 14A, 4C, 24C), intensidad (baja / moderada / mayor familiarización), movimiento y motores apagables (también en vuelo); etiquetas "✓ Normal" / "👂 Para vos" por etapa; rodaje, tren, toque en pista | `488c67b` |
| F47 Biblioteca | **F81** | Pantalla "Animate a volar" (playlist oficial verificada de Aerolíneas Argentinas, 4 episodios) con enlace externo, sin logos ni embebido; los paneles quedan por encima del HUD | `3b34af4` |
| F48 Integración | **F82** | Autodiagnóstico ampliado (46 chequeos); prueba de las 27 interacciones y del recorrido completo; mediciones. **Arreglo:** el aviso "Tests: …" que veían todos ahora sólo aparece con `?debug` | `d302a77` |
| (pedido del Dr.) | **F83-A** | Aligerar la carga: luces ajustadas antes del primer dibujo, sin captura del reflejo en calidad baja, máximo 24 luces en computadora, medición del armado (`window.__initTimes`) | `8970ecd` |
| F49 Validación | **F83** | Este manifiesto, `INFORME_VALIDACION_AEROCALMA.md`, `REFERENCIAS_Y_LICENCIAS.md`, `README.md` | (este commit) |

Fases anteriores de la misma serie de trabajo: F60–F73 (conversaciones, PSA, cabina 737, simulador, carteles, frente vidriado, cintas, plataforma y handling, sonido real del hall, porcentaje de carga).

---

## 2. Reglas del manifiesto: cómo se cumplieron

| Regla | Cumplimiento |
|---|---|
| Conservar desarrollos previos | Sin reemplazos masivos; cada fase en bloques `// FASE NN` |
| No duplicar controladores de cámara | `camera` sigue siendo el jugador; la tercera persona usa sólo una cámara de dibujo (`viewCam`) |
| No reemplazar NPC sin evaluar | Se reutilizó `buildCharacter` para el jugador; los NPC no se tocaron |
| Sin servicios pagos ni dependencias nuevas | Ninguna dependencia agregada; sigue siendo sitio estático |
| Modo de baja estimulación | Respetado en cámaras, avatar, Centro de Información, pausa y vuelo |
| Material de terceros | Sin modelos ni imágenes de terceros; Aerolíneas Argentinas sólo como enlace con atribución |
| No copiar SkyGuru / VALK | Contenido e interfaces originales |
| Simulaciones no presentadas como reales | Rótulos "contenido educativo" y "simulación educativa"; sin cifras de seguridad ni pronósticos |
| Datos personales | Nombre y preferencias sólo en `localStorage`; nada se envía a servicios externos |
| Git por fase | Un commit por fase, push sólo con autorización |

---

## 3. Pendientes

**Para el Dr. Dagnino (decisión o revisión clínica):**
1. **Revisar los textos educativos y terapéuticos** antes de considerarlos definitivos: `AEROINFO` (8 tarjetas), `CARE_*` (pausa) y las etiquetas del vuelo, en `game.js`.
2. **Sonido del hall** (`audios/ambiente/hall-aeropuerto.mp3`): proviene de un archivo descargado ("Sonido Ultra Realista 3D Binaural"). Confirmar que el autor permite su uso o reemplazarlo por una grabación propia o CC0.
3. Probar en **celulares reales** (Android e iPhone): tiempo hasta el menú, fluidez, botón de pausa y cámaras.

**Técnicos (opcionales):**
4. Armar Madrid (llegadas) recién durante el vuelo y liberar texturas de lienzos fijos, para bajar memoria en celulares con poca RAM.
5. Bajar el brillo del exterior en la plataforma (cielo y avión se ven muy claros).
6. Evaluar un humanoide GLB con esqueleto (sólo modelos CC0) si se quiere un avatar más realista.
7. Probar el vuelo completo con audio en un celular real (en las pruebas se usaron saltos).
8. Política de privacidad completa revisada por un especialista (hoy hay un aviso y consentimiento básico).
