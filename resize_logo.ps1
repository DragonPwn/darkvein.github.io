Add-Type -AssemblyName System.Drawing
$path = "C:\Users\Admin\Desktop\DarkVein.github.io\public\newlogo.png"
$outPath = "C:\Users\Admin\Desktop\DarkVein.github.io\public\og_logo.png"

$img = [System.Drawing.Image]::FromFile($path)
$ratio = 1200 / $img.Width
$h = [int]($img.Height * $ratio)

$new = new-object System.Drawing.Bitmap(1200, $h)
$g = [System.Drawing.Graphics]::FromImage($new)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, 1200, $h)
$new.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$img.Dispose()
$new.Dispose()
$g.Dispose()
Write-Host "Resized to $outPath"
