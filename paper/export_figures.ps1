$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$srcDir = Join-Path $PSScriptRoot "figures_src"
$outDir = Join-Path $PSScriptRoot "figures"

if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir | Out-Null
}

$files = Get-ChildItem -Path $srcDir -Filter *.svg | Sort-Object Name
foreach ($file in $files) {
    $target = Join-Path $outDir ($file.BaseName + ".png")
    $uri = "file:///" + ($file.FullName -replace "\\", "/")
    $svg = Get-Content -Raw -Path $file.FullName
    $w = 3000
    $h = 1289
    if ($svg -match 'viewBox="0 0 ([0-9]+(?:\.[0-9]+)?) ([0-9]+(?:\.[0-9]+)?)"') {
        $w = [int][math]::Round([double]$matches[1])
        $h = [int][math]::Round([double]$matches[2])
    } elseif ($svg -match 'width="([0-9]+(?:\.[0-9]+)?)".*height="([0-9]+(?:\.[0-9]+)?)"') {
        $w = [int][math]::Round([double]$matches[1])
        $h = [int][math]::Round([double]$matches[2])
    }
    $windowSize = "$w,$h"
    & $edge `
        --headless=new `
        --disable-gpu `
        --hide-scrollbars `
        --force-device-scale-factor=2 `
        --default-background-color=FFFFFFFF `
        --run-all-compositor-stages-before-draw `
        --screenshot="$target" `
        --window-size=$windowSize `
        $uri | Out-Null
    Write-Host "Exported $target"
}
