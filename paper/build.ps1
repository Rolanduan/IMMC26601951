param(
    [string]$Engine = "pdflatex",
    [switch]$Clean
)

$ErrorActionPreference = "Stop"
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptRoot

if ($Clean) {
    $artifacts = @(
        "*.aux",
        "*.fdb_latexmk",
        "*.fls",
        "*.log",
        "*.out",
        "*.synctex.gz",
        "*.toc"
    )
    foreach ($pattern in $artifacts) {
        Get-ChildItem -Path $scriptRoot -Filter $pattern -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
    }
}

$candidateEngines = @($Engine, "xelatex", "lualatex", "pdflatex") | Select-Object -Unique
$resolvedEngine = $null

foreach ($candidate in $candidateEngines) {
    $command = Get-Command $candidate -ErrorAction SilentlyContinue
    if ($command) {
        $resolvedEngine = $command.Source
        break
    }
}

if (-not $resolvedEngine) {
    throw "No LaTeX engine found. Install TeX Live or MiKTeX, then rerun .\\build.ps1."
}

Write-Host "Using LaTeX engine: $resolvedEngine"

for ($pass = 1; $pass -le 2; $pass++) {
    Write-Host "Compilation pass $pass..."
    & $resolvedEngine "-interaction=nonstopmode" "-halt-on-error" "main.tex"
    if ($LASTEXITCODE -ne 0) {
        throw "LaTeX compilation failed on pass $pass."
    }
}

Write-Host "Build complete: $scriptRoot\\main.pdf"
