@echo off
title BUILD APK - TOUGE OUTLAW: SHUTO UNBOUND
echo ==============================================================
echo    BUILD APK ANDROID - TOUGE OUTLAW: SHUTO UNBOUND
echo ==============================================================
echo.

cd /d "d:\New folder (2)\anime-carbon-race"

echo [1/3] Memeriksa instalasi Node.js dan NPM...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js belum terinstall di komputer ini. Silakan download di https://nodejs.org
    pause
    exit /b
)

echo [2/3] Menginstalasi Capacitor & Android Platform...
call npm init -y >nul 2>nul
call npm install --save @capacitor/core @capacitor/cli @capacitor/android

echo [3/3] Inisialisasi Project Android...
call npx cap init "TOUGE OUTLAW: SHUTO UNBOUND" "com.outlaw.shutounbound" --web-dir "."
call npx cap add android
call npx cap sync android

echo.
echo ==============================================================
echo [SUKSES] Folder Android berhasil dibuat di:
echo    "d:\New folder (2)\anime-carbon-race\android"
echo.
echo Anda dapat membuka folder tersebut di Android Studio untuk
echo langsung mengklik "Build APK" (Build -> Build Bundle(s) / APK(s) -> Build APK).
echo Atau jalankan: npx cap open android
echo ==============================================================
pause
