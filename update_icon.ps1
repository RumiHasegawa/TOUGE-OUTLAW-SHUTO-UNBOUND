Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Moonxzy\.gemini\antigravity\brain\195e6f1c-f90e-498f-85dc-cf89329a9aab\mobil1_nsx_icon_1792940682388.jpg"
$destIcon = "d:\New folder (2)\anime-carbon-race\assets\icon.png"
$destSplash = "d:\New folder (2)\anime-carbon-race\assets\splash.png"

$img = [System.Drawing.Image]::FromFile($srcPath)

# 1. Save 512x512 icon.png for Android APK
$iconBmp = New-Object System.Drawing.Bitmap(512, 512)
$gIcon = [System.Drawing.Graphics]::FromImage($iconBmp)
$gIcon.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gIcon.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gIcon.DrawImage($img, 0, 0, 512, 512)
$gIcon.Dispose()
$iconBmp.Save($destIcon, [System.Drawing.Imaging.ImageFormat]::Png)
$iconBmp.Dispose()
Write-Host "assets/icon.png updated with Honda NSX Mobil 1 GT4!"

# 2. Save high-res splash.png
$splashBmp = New-Object System.Drawing.Bitmap(1024, 1024)
$gSplash = [System.Drawing.Graphics]::FromImage($splashBmp)
$gSplash.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gSplash.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gSplash.DrawImage($img, 0, 0, 1024, 1024)
$gSplash.Dispose()
$splashBmp.Save($destSplash, [System.Drawing.Imaging.ImageFormat]::Png)
$splashBmp.Dispose()
Write-Host "assets/splash.png updated with HD version!"

$img.Dispose()

Get-ChildItem "d:\New folder (2)\anime-carbon-race\assets" | Select-Object Name, Length
