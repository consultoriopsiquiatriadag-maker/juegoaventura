AeroCalma - Ejecucion Local
============================

Requisitos:
- Python 3 (incluido en Windows)
- Navegador moderno (Chrome, Edge, Firefox)

Para iniciar el servidor local:

  Opcion 1 — Doble click:
  Haz doble click en iniciar-aerocalma.bat
  Se abrira el navegador en http://localhost:8080

  Opcion 2 — Linea de comandos:
  python -m http.server 8080 --bind 127.0.0.1
  Abre http://localhost:8080 en tu navegador

Para detener el servidor:
- Cierra la ventana de la terminal
- O presiona Ctrl+C

Futuro — Ejecutable de escritorio:
- Se evaluara Tauri (liviano, Rust) o Electron (simple, Node.js)
- cuando el proyecto crezca y se necesiten dependencias de Node.
- Por ahora, el servidor local con Python es suficiente.

Notas:
- AeroCalma funciona completamente offline una vez abierto
- No se envian datos a ningun servidor
- La ansiedad pre/post queda solo en tu dispositivo (localStorage)
- Material orientativo. No reemplaza atencion medica.


Evaluacion ejecutable local (Fase 16):
- Opcion A (.bat + servidor web): ACTIVA — iniciar-aerocalma.bat funciona con Python 3
- Opcion B (Tauri): EVALUACION PENDIENTE — requiere Rust + toolchain, no instalado en esta PC
- Opcion C (Electron): EVALUACION PENDIENTE — requiere Node.js/npm, no instalado en esta PC
- Recomendacion actual: Opcion A (.bat) es suficiente para uso en consultorio local
- Futuro: instalar Node.js para evaluar Electron como ruta de emaparquetado (mas simple que Tauri)

---
Uso en servidor local del consultorio (Fase 17):

  1. Levantar el servidor:
     python -m http.server 8080 --bind 0.0.0.0

  2. Abrir desde otra PC en la misma red:
     http://IP_DE_LA_PC:8080

  3. Abrir desde celular en la misma WiFi:
     http://IP_DE_LA_PC:8080

  4. Ver IP local de la PC servidor:
     ipconfig
     (Buscar "IPv4 Address" en el adaptador de red activo)

  5. Firewall de Windows:
     - Permitir traffico entrante en el puerto 8080
     - Abrir "Firewall de Windows Defender" -> "Reglas de entrada" -> "Nueva regla"
     - Puerto TCP 8080 -> Permitir conexion

  NOTA: Para uso en consultorio, el servidor debe correr en la PC que tiene los archivos.
  Los pacientes acceden desde su celular o desde otra PC en la misma red WiFi.
  No se expone a internet (sin port forwarding).
  Todos los datos (ansiedad, diary, progreso) quedan solo en el dispositivo del paciente.

- Opcion A (.bat + servidor web): ACTIVA — iniciar-aerocalma.bat funciona con Python 3
- Opcion B (Tauri): EVALUACION PENDIENTE — requiere Rust + toolchain, no instalado en esta PC
- Opcion C (Electron): EVALUACION PENDIENTE — requiere Node.js/npm, no instalado en esta PC
- Recomendacion actual: Opcion A (.bat) es suficiente para uso en consultorio local
- Futuro: instalar Node.js para evaluar Electron como ruta de emaparquetado (mas simple que Tauri)

--- Cierre de version local (Fase 20) ---
Version local estable: todas las fases completadas.
Archivos clave: index.html, js/data.js, game.js, styles.css
Lanzador: iniciar-aerocalma.bat
Red local: python -m http.server 8080 --bind 0.0.0.0
Push al repo: origin main (juegoaventura)
