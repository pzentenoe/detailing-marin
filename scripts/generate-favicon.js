const fs = require('fs');
const { execSync } = require('child_process');

const LOGO_PATH = 'public/nadia-marin-logo.png';
const OUTPUT_PATH = 'app/favicon.ico';
const TMP_DIR = 'public/icons/_tmp';

function checkImageMagick() {
  try {
    execSync('magick --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function main() {
  console.log('🎨 Generador de Favicon - Nadia Marin Detailing');
  console.log('================================================');
  console.log('');

  if (!checkImageMagick()) {
    console.error('❌ Error: ImageMagick no está instalado.');
    console.error('   macOS: brew install imagemagick');
    process.exit(1);
  }

  if (!fs.existsSync(LOGO_PATH)) {
    console.error(`❌ Error: No se encontró ${LOGO_PATH}`);
    process.exit(1);
  }

  console.log('✅ ImageMagick instalado');
  console.log(`✅ Logo encontrado: ${LOGO_PATH}`);
  console.log('');

  // Crear directorio temporal
  if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
  }

  try {
    // Generar capas del .ico (16, 32, 48px)
    const sizes = [16, 32, 48];
    const tmpFiles = sizes.map(size => {
      const tmpPath = `${TMP_DIR}/favicon-${size}.png`;
      execSync(`magick "${LOGO_PATH}" -resize ${size}x${size} -background transparent -gravity center -extent ${size}x${size} "${tmpPath}"`, { stdio: 'ignore' });
      console.log(`✅ Capa ${size}x${size}px generada`);
      return tmpPath;
    });

    // Combinar en un solo .ico multi-resolución
    const inputFiles = tmpFiles.join(' ');
    execSync(`magick ${inputFiles} "${OUTPUT_PATH}"`, { stdio: 'ignore' });

    // Limpiar temporales
    tmpFiles.forEach(f => fs.unlinkSync(f));
    fs.rmdirSync(TMP_DIR);

    const stats = fs.statSync(OUTPUT_PATH);
    const fileSizeKB = Math.round(stats.size / 1024);

    console.log('');
    console.log(`✅ favicon.ico generado (${fileSizeKB}KB) → ${OUTPUT_PATH}`);
    console.log('   Resoluciones incluidas: 16×16, 32×32, 48×48');
  } catch (error) {
    console.error('\n❌ Error generando favicon:', error.message);
    process.exit(1);
  }
}

main();
