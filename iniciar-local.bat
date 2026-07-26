@echo off
title AeroCalma - Servidor Local
echo ============================================
echo   AeroCalma - Servidor Local
echo   Consultorio Dr. Pedro Dagnino
echo ============================================
echo.
echo Iniciando servidor en http://localhost:8080
echo Abre el navegador y accede a esa direccion.
echo Presiona Ctrl+C para detener el servidor.
echo.
start http://localhost:8080
python -m http.server 8080 --bind 127.0.0.1