$git = "C:\Users\Moonxzy\AppData\Local\GitHubDesktop\app-3.6.6\resources\app\git\cmd\git.exe"
$repo = "d:\New folder (2)\anime-carbon-race"

& $git -C $repo add index.html lib/ download_fonts.ps1 download_libs.ps1 ".github/workflows/build-apk.yml"
& $git -C $repo commit -m "100% offline mode - bundle fonts & Three.js locally"
& $git -C $repo push origin main
Write-Host "PUSHED!"
