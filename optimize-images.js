const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const fs = require('fs');
const path = require('path');

const inputDir = 'src/assets';
const outputDir = 'src/assets/optimized';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
  console.log('🖼️  Optimizing images...\n');

  // Convert to WebP
  const webpFiles = await imagemin([`${inputDir}/*.{jpg,png}`], {
    destination: outputDir,
    plugins: [
      imageminWebp({ quality: 80 })
    ]
  });

  // Optimize JPG fallbacks
  const jpgFiles = await imagemin([`${inputDir}/*.jpg`], {
    destination: outputDir,
    plugins: [
      imageminMozjpeg({ quality: 85 })
    ]
  });

  // Optimize PNG fallbacks
  const pngFiles = await imagemin([`${inputDir}/*.png`], {
    destination: outputDir,
    plugins: [
      imageminPngquant({ quality: [0.8, 0.9] })
    ]
  });

  console.log(`✅ Converted ${webpFiles.length} images to WebP`);
  console.log(`✅ Optimized ${jpgFiles.length} JPG images`);
  console.log(`✅ Optimized ${pngFiles.length} PNG images`);
  console.log(`\n📁 Optimized images saved to: ${outputDir}`);
  console.log('\n⚠️  Next: Update imports to use optimized images');
})();
