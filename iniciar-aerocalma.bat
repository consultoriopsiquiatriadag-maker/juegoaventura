@echo off
title AeroCalma - Servidor Local
echo ============================================
echo   AeroCalma - Servidor Local
echo   Consultorio Dr. Pedro Dagnino
echo ============================================
echo.

where python >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: Python no esta instalado o no esta en el PATH.
    echo Descargalo desde https://www.python.org/downloads/
    echo Asegurate de marcar "Add Python to PATH" durante la instalacion.
    pause
    exit /b 1
)

echo Iniciando servidor local en http://localhost:8080
echo Abriendo navegador...
start http://localhost:8080
echo.
echo Servidor corriendo. Presiona Ctrl+C para detener.
echo.
python -m http.server 8080 --bind 127.0.0.1