// This script requires Node.js and the 'sharp' package to be installed
// Run: npm install sharp
// Then: node generate-favicon.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Ensure the assets/images directory exists
const assetsDir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// SVG content for the favicon (simple version of your logo)
const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="128" fill="#1a1a2e"/>
  <path d="M256 128C179.2 128 121.6 185.6 121.6 262.4C121.6 279.467 131.2 310.4 166.4 332.8C179.2 339.2 192 332.8 197.333 323.2C201.6 313.6 195.2 307.2 188.8 300.8C163.2 281.6 153.6 262.4 153.6 249.6C153.6 204.8 190.933 166.4 236.8 166.4C282.667 166.4 320 204.8 320 249.6C320 262.4 310.4 281.6 284.8 300.8C278.4 307.2 272 313.6 276.267 323.2C281.6 332.8 294.4 339.2 307.2 332.8C342.4 310.4 352 279.467 352 262.4C352 185.6 294.4 128 217.6 128H256Z" fill="#00b4d8"/>
  <path d="M236.8 345.6C236.8 358.4 247.467 368 260.267 368H268.8C281.6 368 292.267 358.4 292.267 345.6C292.267 332.8 281.6 323.2 268.8 323.2H260.267C247.467 323.2 236.8 332.8 236.8 345.6Z" fill="#00b4d8"/>
</svg>`;

// Save the SVG file
fs.writeFileSync(path.join(assetsDir, 'logo.svg'), svgContent);

// Create different sizes of favicons
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'logo-192x192.png', size: 192 },
  { name: 'logo-512x512.png', size: 512 }
];

// Generate each favicon size
async function generateFavicons() {
  for (const { name, size } of sizes) {
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toFile(path.join(assetsDir, name));
    console.log(`Generated ${name} (${size}x${size})`);
  }
  
  // Create ICO file (Windows)
  await sharp(Buffer.from(svgContent))
    .resize(64, 64)
    .toFile(path.join(__dirname, 'favicon.ico'));
  
  console.log('Favicon generation complete!');
}

generateFavicons().catch(console.error);
