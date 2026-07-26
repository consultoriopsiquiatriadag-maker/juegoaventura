@echo off
title IP - Consultorio AeroCalma
echo ============================================
echo  IP de esta PC (para acceso en red local)
echo ============================================
echo.
ipconfig | findstr /R /C:"IPv4" 
echo.
echo Para acceder desde otro dispositivo:
echo   http://IP_AQUI:8080
echo.
echo Lanzar servidor AeroCalma:
echo   iniciar-aerocalma.bat
echo.
pause
