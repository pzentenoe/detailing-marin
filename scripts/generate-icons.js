const fs = require('fs');
const { execSync } = require('child_process');

// Icon sizes needed for complete PWA support
const iconSizes = [
  // Basic favicons
  { size: 16, name: 'favicon-16x16.png', purpose: 'any' },
  { size: 32, name: 'favicon-32x32.png', purpose: 'any' },

  // Android Chrome icons
  { size: 72, name: 'android-chrome-72x72.png', purpose: 'maskable any' },
  { size: 96, name: 'android-chrome-96x96.png', purpose: 'maskable any' },
  { size: 128, name: 'android-chrome-128x128.png', purpose: 'maskable any' },
  { size: 144, name: 'android-chrome-144x144.png', purpose: 'maskable any' },
  { size: 152, name: 'android-chrome-152x152.png', purpose: 'maskable any' },
  { size: 192, name: 'android-chrome-192x192.png', purpose: 'maskable any' },
  { size: 384, name: 'android-chrome-384x384.png', purpose: 'maskable any' },
  { size: 512, name: 'android-chrome-512x512.png', purpose: 'maskable any' },

  // iOS Safari icons
  { size: 120, name: 'apple-touch-icon-120x120.png', purpose: 'any' },
  { size: 152, name: 'apple-touch-icon-152x152.png', purpose: 'any' },
  { size: 180, name: 'apple-touch-icon.png', purpose: 'any' },

  // Windows tiles
  { size: 144, name: 'mstile-144x144.png', purpose: 'any' },
  { size: 150, name: 'mstile-150x150.png', purpose: 'any' },
  { size: 310, name: 'mstile-310x310.png', purpose: 'any' },
];

// Maskable icon sizes (with safe zone padding)
const maskableIconSizes = [
  { size: 192, name: 'maskable-icon-192x192.png', purpose: 'maskable' },
  { size: 384, name: 'maskable-icon-384x384.png', purpose: 'maskable' },
  { size: 512, name: 'maskable-icon-512x512.png', purpose: 'maskable' },
];

const LOGO_PATH = 'public/nadia-marin-logo.png';

function checkImageMagick() {
  try {
    execSync('magick --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function checkLogoExists() {
  return fs.existsSync(LOGO_PATH);
}

function generateIcon(size, outputName, isMaskable = false, isWindowsTile = false) {
  const outputPath = `public/icons/${outputName}`;

  let background = 'transparent';
  let logoSize = size;

  if (isMaskable) {
    background = 'black';
    logoSize = Math.floor(size * 0.8);
  } else if (isWindowsTile) {
    background = 'black';
    logoSize = Math.floor(size * 0.8);
  }

  try {
    const command = `magick "${LOGO_PATH}" -resize ${logoSize}x${logoSize} -background ${background} -gravity center -extent ${size}x${size} "${outputPath}"`;
    execSync(command, { stdio: 'ignore' });

    const stats = fs.statSync(outputPath);
    const fileSizeKB = Math.round(stats.size / 1024);

    console.log(`✅ ${outputName} (${fileSizeKB}KB)`);
  } catch (error) {
    console.error(`❌ Error generando ${outputName}:`, error.message);
    throw error;
  }
}

function generateAllIcons() {
  console.log('📱 Generando iconos regulares...');

  iconSizes.forEach(icon => {
    const isWindowsTile = icon.name.includes('mstile');
    generateIcon(icon.size, icon.name, false, isWindowsTile);
  });

  console.log('\n🎭 Generando iconos maskable...');

  maskableIconSizes.forEach(icon => {
    generateIcon(icon.size, icon.name, true, false);
  });
}

function generateManifestIcons() {
  const manifestIcons = [];

  iconSizes.forEach(icon => {
    manifestIcons.push({
      src: `/icons/${icon.name}`,
      sizes: `${icon.size}x${icon.size}`,
      type: 'image/png',
      purpose: icon.purpose,
    });
  });

  maskableIconSizes.forEach(icon => {
    manifestIcons.push({
      src: `/icons/${icon.name}`,
      sizes: `${icon.size}x${icon.size}`,
      type: 'image/png',
      purpose: icon.purpose,
    });
  });

  const manifestConfig = {
    icons: manifestIcons,
    shortcuts_icons: [
      {
        src: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };

  fs.writeFileSync('public/icons/manifest-icons.json', JSON.stringify(manifestConfig, null, 2));
  console.log('✅ Configuración de manifest creada: public/icons/manifest-icons.json');
}

function main() {
  console.log('🎨 Generador de Iconos PWA - Nadia Marin Detailing');
  console.log('====================================================');
  console.log('');

  console.log('🔍 Verificando requisitos...');

  if (!checkImageMagick()) {
    console.error('❌ Error: ImageMagick no está instalado.');
    console.error('📦 Instala ImageMagick:');
    console.error('   macOS: brew install imagemagick');
    console.error('   Linux: sudo apt install imagemagick');
    process.exit(1);
  }

  if (!checkLogoExists()) {
    console.error(`❌ Error: No se encontró ${LOGO_PATH}`);
    console.error('📁 Colocá el logo principal en public/nadia-marin-logo.png');
    process.exit(1);
  }

  console.log('✅ ImageMagick instalado');
  console.log(`✅ Logo encontrado: ${LOGO_PATH}`);
  console.log('');

  if (!fs.existsSync('public/icons')) {
    fs.mkdirSync('public/icons', { recursive: true });
    console.log('📁 Directorio de iconos creado: public/icons/');
  }

  console.log('🚀 Generando iconos PWA...');
  console.log('');

  try {
    generateAllIcons();

    console.log('\n📋 Generando configuración de manifest...');
    generateManifestIcons();

    console.log('\n✅ ¡Iconos PWA generados exitosamente!');
    console.log('📁 Archivos creados en: public/icons/');
    console.log(`📊 Total de iconos generados: ${iconSizes.length + maskableIconSizes.length}`);
    console.log('   - Iconos regulares:', iconSizes.length);
    console.log('   - Iconos maskable:', maskableIconSizes.length);
    console.log('');
    console.log('🎯 Próximos pasos:');
    console.log('1. Revisá los iconos generados en public/icons/');
    console.log('2. Los iconos están listos para usar en tu PWA');
    console.log('3. El manifest.json se actualizará automáticamente');
  } catch (error) {
    console.error('\n❌ Error durante la generación de iconos:', error.message);
    console.error('💡 Verificá que ImageMagick esté instalado correctamente');
    process.exit(1);
  }
}

main();
