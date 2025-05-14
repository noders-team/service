const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { glob } = require('glob');

// Paths
const iconPattern = 'static/img/*-icon.svg';
const outputDir = 'static/img/png-icon';

// Icon settings
const iconSize = 120; // 120x120 pixels

// Set Sharp to use high quality rendering
sharp.cache(false); // Отключаем кэш для максимального качества каждой обработки

// Helper function to get file size in KB
function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

// Create output directory if it doesn't exist
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
    console.log(`Created directory: ${directory}`);
  }
}

// Find all SVG icons
async function convertIcons() {
  try {
    // Ensure output directory exists
    ensureDirectoryExists(outputDir);

    const files = await glob(iconPattern);

    console.log(`Found ${files.length} SVG icon files to process`);

    let totalOriginalSize = 0;
    let totalConvertedSize = 0;
    let skippedCount = 0;

    // Process each file
    for (const filePath of files) {
      try {
        const baseName = path.basename(filePath, '.svg');
        const outputPath = path.join(outputDir, `${baseName}.png`);

        // Skip if PNG already exists
        if (fs.existsSync(outputPath)) {
          console.log(`Skipped: ${filePath} (PNG already exists)`);
          skippedCount++;
          continue;
        }

        // Get original file size
        const originalSizeKB = getFileSizeInKB(filePath);
        totalOriginalSize += parseFloat(originalSizeKB);

        // Convert SVG to a high-resolution version first for better antialiasing
        const largeSize = iconSize * 4; // 480x480 промежуточный размер для улучшения сглаживания

        // Создаем промежуточный буфер с высоким разрешением
        const svgBuffer = await sharp(filePath)
          .resize({
            width: largeSize,
            height: largeSize,
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .png({
            quality: 100,
            compressionLevel: 0,
            adaptiveFiltering: true,
            force: true,
          })
          .toBuffer();

        // Теперь уменьшаем до итогового размера с высоким качеством сглаживания
        await sharp(svgBuffer)
          .resize({
            width: iconSize,
            height: iconSize,
            fit: 'contain',
            kernel: 'lanczos3', // Используем Lanczos для лучшего сглаживания при уменьшении
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .png({
            quality: 85,
            compressionLevel: 5,
            adaptiveFiltering: true,
            force: true,
          })
          .toFile(outputPath);

        // Get converted file size
        const convertedSizeKB = getFileSizeInKB(outputPath);
        totalConvertedSize += parseFloat(convertedSizeKB);

        // Calculate size reduction percentage
        const sizeChange = (((convertedSizeKB - originalSizeKB) / originalSizeKB) * 100).toFixed(2);
        const changeText = sizeChange >= 0 ? `increased by ${sizeChange}%` : `reduced by ${Math.abs(sizeChange)}%`;

        console.log(`Converted: ${filePath} → ${outputPath} (${iconSize}x${iconSize} px with enhanced antialiasing)`);
        console.log(`  Size: ${originalSizeKB} KB → ${convertedSizeKB} KB (${changeText})`);
      } catch (error) {
        console.error(`Error converting ${filePath}:`, error);
      }
    }

    // Only show total stats if files were actually converted
    if (files.length > skippedCount) {
      const totalChange = (((totalConvertedSize - totalOriginalSize) / totalOriginalSize) * 100).toFixed(2);
      const totalChangeText =
        totalChange >= 0 ? `increased by ${totalChange}%` : `reduced by ${Math.abs(totalChange)}%`;

      console.log('\nConversion complete!');
      console.log(`old: ${totalOriginalSize.toFixed(2)} KB`);
      console.log(`new: ${totalConvertedSize.toFixed(2)} KB`);
      console.log(`change: ${totalChangeText}`);
    }

    console.log(`\nTotal processed: ${files.length} files`);
    console.log(`Converted: ${files.length - skippedCount} files (${iconSize}x${iconSize} px)`);
    console.log(`Skipped: ${skippedCount} files (already exist)`);

    return { success: true, converted: files.length - skippedCount, skipped: skippedCount };
  } catch (err) {
    console.error('Error finding files:', err);
    return { success: false, error: err.message };
  }
}

if (require.main === module) {
  convertIcons();
} else {
  module.exports = convertIcons;
}
