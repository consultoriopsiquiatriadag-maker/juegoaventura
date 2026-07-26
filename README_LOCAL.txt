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
