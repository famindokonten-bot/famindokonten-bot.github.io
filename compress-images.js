import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src', 'assets');

function compressFile(filePath) {
  sharp(filePath)
    .png({ quality: 80 })
    .toBuffer()
    .then(data => {
      fs.writeFileSync(filePath, data);
      console.log(`Compressed: ${filePath}`);
    })
    .catch(err => {
      console.error(`Error compressing ${filePath}:`, err);
    });
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.png') {
      compressFile(fullPath);
    }
  }
}

walkDir(srcDir);
console.log('Image compression complete.');