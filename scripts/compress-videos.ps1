$CLI = "$PSScriptRoot\handbrake\HandBrakeCLI.exe"
$VIDEOS_IN  = "$PSScriptRoot\..\public\videos"
$VIDEOS_OUT = "$PSScriptRoot\..\public\videos\compressed"

New-Item -ItemType Directory -Force -Path $VIDEOS_OUT | Out-Null

$videos = @("ballroom.mp4", "first-dance.mp4", "champagne.mp4", "chef-plating.mp4")

Write-Host "`n=== Aurum Events — Video Compression ===" -ForegroundColor Cyan
Write-Host "Tool : HandBrakeCLI 1.11.1"
Write-Host "Codec: H.264 (x264), RF 28, 1080p max, no audio (background web videos)`n"

foreach ($vid in $videos) {
    $input  = Join-Path $VIDEOS_IN $vid
    $output = Join-Path $VIDEOS_OUT $vid

    if (!(Test-Path $input)) {
        Write-Host "[SKIP] $vid not found" -ForegroundColor Yellow
        continue
    }

    $sizeBefore = [math]::Round((Get-Item $input).Length / 1MB, 2)
    Write-Host "▶ Compressing $vid ($sizeBefore MB)..." -ForegroundColor White

    & $CLI `
        --input  "$input" `
        --output "$output" `
        --encoder x264 `
        --quality 28 `
        --vfr `
        --maxWidth 1920 `
        --maxHeight 1080 `
        --audio none `
        --format av_mp4 `
        --optimize 2>&1 | Where-Object { $_ -match "Encoding|%" }

    if (Test-Path $output) {
        $sizeAfter = [math]::Round((Get-Item $output).Length / 1MB, 2)
        $saved     = [math]::Round((1 - $sizeAfter / $sizeBefore) * 100, 1)
        Write-Host "  ✅ Done: $sizeBefore MB → $sizeAfter MB  (saved $saved%)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Failed: output not created" -ForegroundColor Red
    }
    Write-Host ""
}

Write-Host "=== All done! Compressed videos saved to: public/videos/compressed/ ===" -ForegroundColor Cyan
Write-Host "Review them, then replace the originals in public/videos/ when happy.`n"
