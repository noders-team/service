const fs = require('fs');
const path = require('path');

// Path to the PNG icons directory
const pngIconsDir = path.join(__dirname, '..', 'static', 'img', 'png-icon');

// Check if directory exists before attempting to delete
if (fs.existsSync(pngIconsDir)) {
  console.log(`Removing PNG icons directory: ${pngIconsDir}`);

  try {
    // Use fs.rmSync with recursive option (Node.js v14.14.0+)
    fs.rmSync(pngIconsDir, { recursive: true, force: true });
    console.log('PNG icons directory successfully removed');
  } catch (error) {
    console.error('Error removing PNG icons directory:', error);
  }
} else {
  console.log('PNG icons directory does not exist, nothing to remove');
}
