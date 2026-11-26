# AeroCalma — Simulador terapéutico de aeropuerto

Recorrido 3D por un aeropuerto, un vuelo y la llegada, pensado como **exposición gradual y voluntaria** para personas con miedo a volar o ansiedad en aeropuertos.
Consultorio Dr. Pedro Nicolas Dagnino · Médico especialista en Psiquiatría y Medicina Aeronáutica.

**Sitio:** https://aerocalma.netlify.app/ · **Material orientativo: no reemplaza un tratamiento profesional.**

---

## Qué incluye

- **Recorrido:** entrada, check-in, control de seguridad (con la PSA), sala de embarque, puerta A7, manga, cabina, vuelo a Madrid, desembarque, sala de equipajes y encuentro en el hall.
- **Tu personaje:** "Personalizar mi experiencia" (nombre, femenino / masculino / neutro, colores, cámara inicial). Se guarda sólo en el dispositivo.
- **Tres cámaras:** primera persona, tercera cercana y panorámica (Tab, botón 🎥 o Pausa).
- **🤲 Necesito una pausa** (tecla P): presente, grounding 5-4-3-2-1, respiración suave, relajación muscular, sensaciones, pensamientos, Modo Calma.
- **Centro de Información Aeronáutica y Calma:** 8 tarjetas educativas con ilustración y lectura en voz.
- **Vuelo configurable:** asiento, intensidad (baja / moderada / mayor familiarización), movimiento y motores apagables, etiquetas "Normal" / "Para vos".
- **Modo Calma:** menos estímulos (sonido, luz, movimiento, sin turbulencia). Se activa solo si el sistema pide movimiento reducido.
- Carteles con enlaces: consultorio, salud mental, medicamentos, medicina aeronáutica, RENAPER, simulador de vuelo, valija inteligente, "Animate a volar", Te Paso a Buscar (próximamente).

## Controles

| Acción | Computadora | Celular |
|---|---|---|
| Moverse / mirar | W A S D o flechas + mouse | Joystick + arrastrar |
| Interactuar | E | Tocar el aviso |
| Respirar | B | Botón 🌬️ |
| Necesito una pausa | P | Botón 🤲 |
| Cambiar cámara | Tab | Botón 🎥 |
| Pausa | Esc | Botón ⏸ |

## Estructura

| Archivo | Contenido |
|---|---|
| `index.html` | Interfaz, paneles, aviso de privacidad |
| `game.js` | Motor del juego (Three.js r128, sin compilación) |
| `styles.css` | Estilos |
| `js/data.js` | Zonas y pasos de grounding |
| `js/assets-lib.js`, `js/ceiling-signage.js`, `js/flight-schedule.js`, `js/light-shafts.js` | Fábricas y señalética |
| `audios/` | Voces y sonido ambiente (los originales `.m4a` no se publican) |

## Ejecutar en local

```
python -m http.server 8080 --bind 127.0.0.1
```
Abrir http://localhost:8080 (o doble clic en `iniciar-aerocalma.bat`). Detalles de red local en `README_LOCAL.txt`.
Diagnóstico: abrir con `?debug` muestra el resultado de `runChecks()`; `window.__initTimes` muestra cuánto tarda cada parte del armado.

## Privacidad

Todo queda en el navegador (`localStorage`): diario, preferencias, perfil y nombre. Google Tag Manager sólo se carga si la persona acepta. Ley 25.326.

## Documentación

- `AUDITORIA_AEROCALMA_F40.md` — auditoría técnica previa a F75–F83
- `MANIFIESTO_AEROCALMA_F40_F49.md` — fases, commits y pendientes
- `INFORME_VALIDACION_AEROCALMA.md` — pruebas y mediciones
- `REFERENCIAS_Y_LICENCIAS.md` — licencias y recursos de terceros

## Publicación

Commit y push a `main` del repositorio `juegoaventura` (Netlify publica automáticamente). Nunca `git push --force`.
