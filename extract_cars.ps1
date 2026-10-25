$sourceBase = "D:\Bayshore Wangan\ShutoLegends\Assets\_Project\Models\Cars"
$targetBase = "d:\New folder (2)\anime-carbon-race\models"

$carFolders = @(
    "1993-mazda-rx-7",
    "2001-honda-s2000",
    "1992_honda_nsx-r",
    "2006-mazda-rx-8",
    "nissan-fairlady-z-s30-devil-z",
    "2000-honda-civic-type-r-ek9",
    "2018_honda_fit__jazz",
    "2011-mazda-2-demio"
)

foreach ($folderName in $carFolders) {
    $src = Join-Path $sourceBase $folderName
    $dest = Join-Path $targetBase $folderName
    if (Test-Path $src) {
        if (-not (Test-Path $dest)) {
            New-Item -ItemType Directory -Force -Path $dest | Out-Null
        }
        $zips = Get-ChildItem -Path $src -Filter "*.zip" -Recurse
        if ($zips.Count -gt 0) {
            $firstZip = $zips[0]
            try {
                Expand-Archive -Path $firstZip.FullName -DestinationPath $dest -Force
                Write-Host "Success: $folderName"
            } catch {
                Write-Host "Error extracting $folderName"
            }
        }
    }
}
