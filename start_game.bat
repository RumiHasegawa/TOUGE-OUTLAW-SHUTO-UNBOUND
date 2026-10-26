@echo off
title TOUGE OUTLAW: SHUTO UNBOUND - LAUNCHER
echo ======================================================
echo   TOUGE OUTLAW: SHUTO UNBOUND - MEMULAI GAME...
echo   Mode HD 3D Model FBX + Cutscene Video + 100%% Offline
echo ======================================================
echo.

:: Tunggu 1 detik lalu buka browser otomatis ke localhost:8080
start "" cmd /c "timeout /t 1 /nobreak >nul && start http://localhost:8080"

:: Jalankan server lokal Node.js
node server.js

pause
