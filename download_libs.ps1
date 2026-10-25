$libDir = "d:\New folder (2)\anime-carbon-race\lib"
if (-not (Test-Path $libDir)) { New-Item -ItemType Directory -Force -Path $libDir | Out-Null }

$downloads = @(
    @{ name = "three.min.js";  url = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" },
    @{ name = "GLTFLoader.js"; url = "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js" },
    @{ name = "OBJLoader.js";  url = "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/OBJLoader.js" },
    @{ name = "FBXLoader.js";  url = "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/FBXLoader.js" },
    @{ name = "fflate.min.js"; url = "https://cdn.jsdelivr.net/npm/fflate@0.7.4/umd/index.js" }
)

foreach ($item in $downloads) {
    $dest = Join-Path $libDir $item.name
    Write-Host "Downloading $($item.name) ..."
    Invoke-WebRequest -Uri $item.url -OutFile $dest -UseBasicParsing
    $size = [math]::Round((Get-Item $dest).Length / 1KB, 1)
    Write-Host "OK: $($item.name) ($size KB)"
}

Write-Host "ALL THREE.JS LIBRARIES DOWNLOADED LOCALLY!"
