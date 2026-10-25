$src = "D:\Bayshore Wangan\ShutoLegends\Assets\_Project\Models\Cars"
$dest = "d:\New folder (2)\anime-carbon-race\models"

New-Item -ItemType Directory -Force -Path $dest | Out-Null

$folders = Get-ChildItem $src -Directory

$results = @()

foreach ($folder in $folders) {
    $destFolder = Join-Path $dest $folder.Name
    Write-Host "Copying: $($folder.Name)..."
    
    New-Item -ItemType Directory -Force -Path $destFolder | Out-Null

    # Copy semua file kecuali .meta
    $files = Get-ChildItem $folder.FullName -Recurse -File | Where-Object { $_.Extension -ne ".meta" }
    
    foreach ($file in $files) {
        $relPath = $file.FullName.Substring($folder.FullName.Length)
        $destFile = Join-Path $destFolder $relPath
        $destDir = Split-Path $destFile -Parent
        if (-not (Test-Path $destDir)) {
            New-Item -ItemType Directory -Force -Path $destDir | Out-Null
        }
        Copy-Item -Path $file.FullName -Destination $destFile -Force
    }

    # Kalau ada ZIP, extract juga
    $zips = Get-ChildItem $destFolder -Filter "*.zip" -Recurse
    foreach ($zip in $zips) {
        $extractDir = Join-Path $zip.DirectoryName ($zip.BaseName + "_extracted")
        try {
            Expand-Archive -Path $zip.FullName -DestinationPath $extractDir -Force
            Write-Host "  Extracted: $($zip.Name)"
        } catch {
            Write-Host "  ZIP extract failed: $($zip.Name)"
        }
    }

    # Cek format model yang ada
    $allFiles = Get-ChildItem $destFolder -Recurse -File | Where-Object { $_.Extension -ne ".meta" }
    $fbxFiles = $allFiles | Where-Object { $_.Extension -eq ".fbx" }
    $gltfFiles = $allFiles | Where-Object { $_.Extension -eq ".gltf" -or $_.Extension -eq ".glb" }

    $format = "UNKNOWN"
    $modelPath = ""

    if ($fbxFiles.Count -gt 0) {
        $format = "FBX"
        $rel = $fbxFiles[0].FullName.Substring($destFolder.Length).TrimStart("\").Replace("\", "/")
        $modelPath = "models/$($folder.Name)/$rel"
    } elseif ($gltfFiles.Count -gt 0) {
        $format = "GLTF/GLB"
        $rel = $gltfFiles[0].FullName.Substring($destFolder.Length).TrimStart("\").Replace("\", "/")
        $modelPath = "models/$($folder.Name)/$rel"
    }

    $results += [PSCustomObject]@{
        Folder    = $folder.Name
        Format    = $format
        ModelPath = $modelPath
        FileCount = $allFiles.Count
    }
}

Write-Host ""
Write-Host "=== HASIL COPY SEMUA MOBIL ===" -ForegroundColor Cyan
$results | Format-Table -AutoSize

$results | ConvertTo-Json | Set-Content "d:\New folder (2)\anime-carbon-race\car_scan_results.json" -Encoding UTF8
Write-Host "Saved to car_scan_results.json"
