const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { glob } = require('glob');

// Paths
const iconPattern = 'static/img/*-icon.svg';
const outputDir = 'static/img/png-icon';

// Icon size (120x120 pixels)
const iconSize = 120;

// Disable cache for maximum quality
sharp.cache(false);

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

// Find and convert all SVG icons
async function convertIcons() {
  try {
    ensureDirectoryExists(outputDir);

    const files = await glob(iconPattern);

    console.log(`Found ${files.length} SVG icon files to process`);

    let totalOriginalSize = 0;
    let totalConvertedSize = 0;

    // Process each file
    for (const filePath of files) {
      try {
        const baseName = path.basename(filePath, '.svg');
        const outputPath = path.join(outputDir, `${baseName}.png`);

        // Get original file size
        const originalSizeKB = getFileSizeInKB(filePath);
        totalOriginalSize += parseFloat(originalSizeKB);

        // Convert to high-resolution first for better antialiasing
        const largeSize = iconSize * 4;

        // Create intermediate high-res buffer
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

        // Resize to final size with high-quality antialiasing
        await sharp(svgBuffer)
          .resize({
            width: iconSize,
            height: iconSize,
            fit: 'contain',
            kernel: 'lanczos3',
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

        // Calculate size change
        const sizeChange = (((convertedSizeKB - originalSizeKB) / originalSizeKB) * 100).toFixed(2);
        const changeText = sizeChange >= 0 ? `increased by ${sizeChange}%` : `reduced by ${Math.abs(sizeChange)}%`;

        console.log(`Converted: ${filePath} → ${outputPath} (${iconSize}x${iconSize} px)`);
        console.log(`  Size: ${originalSizeKB} KB → ${convertedSizeKB} KB (${changeText})`);
      } catch (error) {
        console.error(`Error converting ${filePath}:`, error);
      }
    }

    // Show total stats
    const totalChange = (((totalConvertedSize - totalOriginalSize) / totalOriginalSize) * 100).toFixed(2);
    const totalChangeText = totalChange >= 0 ? `increased by ${totalChange}%` : `reduced by ${Math.abs(totalChange)}%`;

    console.log('\nConversion complete!');
    console.log(`Original total: ${totalOriginalSize.toFixed(2)} KB`);
    console.log(`Converted total: ${totalConvertedSize.toFixed(2)} KB`);
    console.log(`Size change: ${totalChangeText}`);
    console.log(`\nTotal processed: ${files.length} files`);

    return { success: true, converted: files.length };
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
