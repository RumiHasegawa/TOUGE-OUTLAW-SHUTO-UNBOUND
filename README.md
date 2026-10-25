# TOUGE OUTLAW: SHUTO UNBOUND 🏎️

> **Anime x NFS Carbon x NFS Unbound** — Mobile Racing Game untuk Android

---

## Tentang Game

**TOUGE OUTLAW: SHUTO UNBOUND** adalah game balapan mobile 3D bergaya anime yang menggabungkan gameplay canyon duel ala **NFS Carbon** dengan sistem kustomisasi modifikasi ala **NFS Unbound**, dibalut visual **Cel-Shading / Anime Toon Shader** yang memukau.

Balap di jalur **Shuto Expressway Tokyo** di malam hari, lawan geng rival **MIDNIGHT CINDERS**, dan jadilah raja jalanan bersama kru **NIGHT PHANTOM**!

---

## Cara Build APK Android via GitHub Actions ⚡

### 1. Push ke GitHub

```bash
git init
git add .
git commit -m "feat: initial TOUGE OUTLAW SHUTO UNBOUND"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/touge-outlaw-shuto-unbound.git
git push -u origin main
```

### 2. GitHub Actions Otomatis Build APK

Setelah push ke branch `main`, GitHub Actions akan otomatis:
1. ✅ Install Node.js & Capacitor
2. ✅ Sync web assets ke project Android
3. ✅ Build APK via Gradle (`assembleDebug`)
4. ✅ Upload file `.apk` sebagai **Artifact** yang bisa langsung didownload

### 3. Download APK

Buka **Actions tab** di GitHub repo Anda:
```
https://github.com/YOUR_USERNAME/touge-outlaw-shuto-unbound/actions
```
Klik workflow run terbaru → scroll ke bawah → klik **"TougeOutlaw-ShutoUnbound-v1.0-arm64-debug"** untuk download APK.

---

## Setup Lokal (Jika mau jalankan di PC)

```bash
npm install
npx cap sync android
npx cap open android  # Buka di Android Studio
```

Atau langsung build APK tanpa Android Studio:
```bash
cd android && ./gradlew assembleDebug
```

---

## Struktur Project

```
anime-carbon-race/
├── index.html              # Game UI + HUD + Cutscene
├── manifest.json           # Android PWA manifest
├── capacitor.config.json   # Capacitor Android config
├── package.json            # NPM dependencies
├── src/
│   ├── carsData.js         # Database mobil & body kit (nama parodi)
│   ├── crewData.js         # Lore crew, rival, dan AI Shuto
│   ├── animeEffects.js     # Anime visual effects & cel-shading
│   └── gameEngine.js       # Core physics, track, gameplay
├── .github/
│   └── workflows/
│       └── build-apk.yml   # GitHub Actions → Auto Build APK
└── assets/                 # Ikon & aset game
```

---

## Fitur Game

| Fitur | Keterangan |
|---|---|
| 🏙️ **Track** | Shuto Expressway C1 Loop & Wangan Line, Tokyo |
| 🚗 **Mobil** | 60+ Model JDM (Skylinex, Rotary-7, Apex-X, Akuma-Z, dll.) |
| 🔧 **Modifikasi** | Body kit swap, Bumper Delete, Stance/Camber, Underglow Neon |
| 🎌 **Efek Anime** | Cel-Shading, Cyber Wings, Raijin Lightning, Manga Speed Lines |
| 👥 **Crew System** | Yuki (Drafter), Ryo (Blocker), Mai (Scout) |
| 😈 **Rival Crews** | Midnight Cinders, Iron Apex Tuners, Canyon Ghosts |
| 🎬 **Cutscene** | Anime sinematik NFS Carbon-style sebelum balapan dimulai |
| 📱 **Mobile First** | Touch controls penuh — Gas, Rem, Drift, NOS, Crew Call |

---

## Kredit

- **3D Models**: Bayshore Wangan / ShutoLegends Project
- **Engine**: Three.js (WebGL) + Capacitor (Android APK)
- **Framework**: Capacitor 6

> ⚠️ Semua nama brand dan mobil dalam game ini adalah **nama parodi fiktif** untuk menghindari masalah lisensi.
