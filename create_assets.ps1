Add-Type -AssemblyName System.Drawing

New-Item -ItemType Directory -Force -Path "d:\New folder (2)\anime-carbon-race\assets" | Out-Null

# === ICON 512x512 ===
$bmp = New-Object System.Drawing.Bitmap(512, 512)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$bg = [System.Drawing.Color]::FromArgb(6, 8, 20)
$c1 = [System.Drawing.Color]::FromArgb(0, 200, 255)
$c2 = [System.Drawing.Color]::FromArgb(255, 50, 100)
$g.Clear($bg)
$b1 = New-Object System.Drawing.SolidBrush($c1)
$b2 = New-Object System.Drawing.SolidBrush($c2)
$bw = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g.FillEllipse($b1, 20, 20, 472, 472)
$g.FillEllipse($b2, 60, 60, 392, 392)
$font1 = New-Object System.Drawing.Font("Arial", 72, [System.Drawing.FontStyle]::Bold)
$font2 = New-Object System.Drawing.Font("Arial", 28, [System.Drawing.FontStyle]::Bold)
$g.DrawString("TO", $font1, $bw, 155, 140)
$g.DrawString("SU", $font1, $bw, 155, 230)
$g.DrawString("TOUGE OUTLAW", $font2, $bw, 90, 370)
$g.Dispose()
$bmp.Save("d:\New folder (2)\anime-carbon-race\assets\icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "icon.png created"

# === SPLASH 2732x2732 ===
$bmp2 = New-Object System.Drawing.Bitmap(2732, 2732)
$g2 = [System.Drawing.Graphics]::FromImage($bmp2)
$g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g2.Clear($bg)
$bg2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(0, 150, 200))
$bg3 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(200, 30, 80))
$bw2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g2.FillEllipse($bg2, 200, 200, 2332, 2332)
$g2.FillEllipse($bg3, 300, 300, 2132, 2132)
$fBig = New-Object System.Drawing.Font("Arial", 280, [System.Drawing.FontStyle]::Bold)
$fMed = New-Object System.Drawing.Font("Arial", 140, [System.Drawing.FontStyle]::Bold)
$fSm  = New-Object System.Drawing.Font("Arial", 100, [System.Drawing.FontStyle]::Regular)
$g2.DrawString("TOUGE", $fBig, $bw2, 450, 750)
$g2.DrawString("OUTLAW", $fBig, $bw2, 300, 1100)
$g2.DrawString("SHUTO UNBOUND", $fMed, $bw2, 450, 1500)
$g2.DrawString("A Phantom Games Production", $fSm, $bw2, 700, 1720)
$g2.Dispose()
$bmp2.Save("d:\New folder (2)\anime-carbon-race\assets\splash.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp2.Dispose()
Write-Host "splash.png created"

Get-ChildItem "d:\New folder (2)\anime-carbon-race\assets" | Select-Object Name, Length
