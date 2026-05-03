const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'src/assets';
const outputDir = inputDir;

// Get all image files
const imageFiles = fs.readdirSync(inputDir).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png'].includes(ext);
});

const results = [];

async function optimizeImage(file) {
  console.log('Processing', file);
  const inputPath = path.join(inputDir, file);
  const baseName = path.basename(file, path.extname(file));

  const originalStats = fs.statSync(inputPath);
  const originalSize = originalStats.size;
  const metadata = await sharp(inputPath).metadata();
  const width = metadata.width;

  const formats = ['webp', 'avif'];
  const sizes = [480, 768].filter(s => s < width);
  const converted = [];

  for (const format of formats) {
    const outputPath = path.join(outputDir, `${baseName}.${format}`);
    if (fs.existsSync(outputPath)) {
      console.log(`Skipping ${outputPath}, already exists`);
      const stats = fs.statSync(outputPath);
      converted.push({ format, size: stats.size });
      continue;
    }
    const pipeline = sharp(inputPath);

    if (format === 'webp') {
      await pipeline.webp({ quality: 80 }).toFile(outputPath);
    } else {
      await pipeline.avif({ quality: 50 }).toFile(outputPath);
    }

    const stats = fs.statSync(outputPath);
    converted.push({ format, size: stats.size });

    for (const size of sizes) {
      const responsivePath = path.join(outputDir, `${baseName}-${size}w.${format}`);
      if (fs.existsSync(responsivePath)) {
        console.log(`Skipping ${responsivePath}, already exists`);
        continue;
      }
      const responsivePipe = sharp(inputPath).resize(size);
      if (format === 'webp') {
        await responsivePipe.webp({ quality: 80 }).toFile(responsivePath);
      } else {
        await responsivePipe.avif({ quality: 50 }).toFile(responsivePath);
      }
    }
  }

  const bestVariant = converted.reduce((best, current) => current.size < best.size ? current : best);
  const improvement = ((originalSize - bestVariant.size) / originalSize * 100).toFixed(2);

  results.push({
    name: file,
    oldFormat: path.extname(file).slice(1),
    newFormat: bestVariant.format,
    oldSize: originalSize,
    newSize: bestVariant.size,
    improvement: `${improvement}%`
  });

  console.log(`Optimized ${file}: ${originalSize} -> ${bestVariant.size} (${improvement}%) [${bestVariant.format}]`);
}

async function main() {
  for (const file of imageFiles) {
    try {
      await optimizeImage(file);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  // Output table
  console.table(results);

  // Write to JSON for documentation
  fs.writeFileSync('image-optimization-results.json', JSON.stringify(results, null, 2));

  console.log('Results saved to image-optimization-results.json');
}

main().catch(console.error);