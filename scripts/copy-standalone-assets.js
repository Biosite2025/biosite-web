/**
 * Post-build step for `output: 'standalone'`.
 *
 * Next.js does not copy `public/` or `.next/static` into the standalone
 * bundle, so without this every favicon, logo, CSS and JS chunk 404s when the
 * app is started via `.next/standalone/server.js`.
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const standalone = path.join(root, '.next', 'standalone');

if (!fs.existsSync(standalone)) {
  console.log('No .next/standalone directory found — skipping asset copy.');
  process.exit(0);
}

fs.cpSync(path.join(root, 'public'), path.join(standalone, 'public'), { recursive: true });
fs.cpSync(path.join(root, '.next', 'static'), path.join(standalone, '.next', 'static'), { recursive: true });

console.log('Copied public/ and .next/static into .next/standalone');
