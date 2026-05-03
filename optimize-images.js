const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'src/assets';
const outputDir = 'dist/assets';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files
const imageFiles = fs.readdirSync(inputDir).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png'].includes(ext);
});

const results = [];

async function optimizeImage(file) {
  const inputPath = path.join(inputDir, file);
  const baseName = path.basename(file, path.extname(file));

  const originalStats = fs.statSync(inputPath);
  const originalSize = originalStats.size;

  // Get metadata
  const metadata = await sharp(inputPath).metadata();
  const width = metadata.width;

  // Convert to WebP
  const webpPath = path.join(outputDir, `${baseName}.webp`);
  await sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(webpPath);

  const webpStats = fs.statSync(webpPath);
  const webpSize = webpStats.size;

  // Convert to AVIF
  const avifPath = path.join(outputDir, `${baseName}.avif`);
  await sharp(inputPath)
    .avif({ quality: 50 })
    .toFile(avifPath);

  const avifStats = fs.statSync(avifPath);
  const avifSize = avifStats.size;

  // Choose the best (smallest)
  let bestFormat, bestSize, bestPath;
  if (avifSize < webpSize) {
    bestFormat = 'avif';
    bestSize = avifSize;
    bestPath = avifPath;
    // Remove webp
    fs.unlinkSync(webpPath);
  } else {
    bestFormat = 'webp';
    bestSize = webpSize;
    bestPath = webpPath;
    // Remove avif
    fs.unlinkSync(avifPath);
  }

  // Generate responsive sizes
  const sizes = [480, 768].filter(s => s < width);
  for (const size of sizes) {
    const respPath = path.join(outputDir, `${baseName}-${size}w.${bestFormat}`);
    await sharp(inputPath)
      .resize(size)
      [bestFormat](bestFormat === 'avif' ? { quality: 50 } : { quality: 80 })
      .toFile(respPath);
  }

  const improvement = ((originalSize - bestSize) / originalSize * 100).toFixed(2);

  results.push({
    name: file,
    oldFormat: path.extname(file).slice(1),
    newFormat: bestFormat,
    oldSize: originalSize,
    newSize: bestSize,
    improvement: `${improvement}%`
  });

  console.log(`Optimized ${file}: ${originalSize} -> ${bestSize} (${improvement}%)`);
}

async function main() {
  for (const file of imageFiles) {
    await optimizeImage(file);
  }

  // Output table
  console.table(results);

  // Write to JSON for documentation
  fs.writeFileSync('image-optimization-results.json', JSON.stringify(results, null, 2));

  console.log('Results saved to image-optimization-results.json');
}

main().catch(console.error);