# Download Google Fonts via API
$fontDir = "d:\New folder (2)\anime-carbon-race\lib\fonts"
if (-not (Test-Path $fontDir)) { New-Item -ItemType Directory -Force -Path $fontDir | Out-Null }

# Header agar Google Fonts kasih woff2
$headers = @{ "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" }

# Fetch CSS dari Google Fonts
$apiUrl = "https://fonts.googleapis.com/css2?family=Bangers&family=Orbitron:wght@500;700;900&family=Rajdhani:wght@600;700&display=swap"
Write-Host "Fetching Google Fonts CSS..."
$css = Invoke-WebRequest -Uri $apiUrl -Headers $headers -UseBasicParsing | Select-Object -ExpandProperty Content

# Extract semua URL woff2
$matches = [regex]::Matches($css, "url\(([^)]+\.woff2)\)")
$fontUrls = $matches | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique

Write-Host "Found $($fontUrls.Count) font files"

# Download setiap font
$i = 0
foreach ($url in $fontUrls) {
    $i++
    $fname = "font_$i.woff2"
    $dest = Join-Path $fontDir $fname
    Write-Host "Downloading $fname from $url"
    Invoke-WebRequest -Uri $url -Headers $headers -OutFile $dest -UseBasicParsing
    $size = [math]::Round((Get-Item $dest).Length / 1KB, 1)
    Write-Host "OK: $fname ($size KB)"
}

# Patch CSS: ganti semua url() dari Google ke path lokal
$localCss = $css
$i = 0
foreach ($url in $fontUrls) {
    $i++
    $localCss = $localCss -replace [regex]::Escape($url), "fonts/font_$i.woff2"
}

# Simpan CSS lokal
$localCss | Out-File -FilePath "d:\New folder (2)\anime-carbon-race\lib\fonts.css" -Encoding UTF8
Write-Host "lib\fonts.css saved with local paths!"
Write-Host "DONE - 100% OFFLINE FONTS READY!"
