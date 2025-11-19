/**
 * Script to migrate all assets from public/asset to Cloudinary
 * Run: node scripts/migrate-assets-to-cloudinary.js
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dmvyhrewy',
  api_key: process.env.CLOUDINARY_API_KEY || '516493988527468',
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ASSET_DIR = path.join(__dirname, '../public/asset');
const OUTPUT_FILE = path.join(__dirname, '../asset-migration-map.json');

// Track uploaded files
const migrationMap = {};
let uploadCount = 0;
let errorCount = 0;

/**
 * Get all files recursively from a directory
 */
function getAllFiles(dir, baseDir = dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else {
      // Get relative path from asset directory
      const relativePath = path.relative(baseDir, fullPath);
      files.push({ fullPath, relativePath });
    }
  }

  return files;
}

/**
 * Sanitize filename for Cloudinary (remove invalid characters)
 */
function sanitizePublicId(str) {
  return str
    .replace(/[^a-zA-Z0-9_\-\/]/g, '_') // Replace special chars with underscore
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
}

/**
 * Upload a single file to Cloudinary
 */
async function uploadFile(filePath, relativePath) {
  try {
    // Create a folder structure in Cloudinary matching the local structure
    const dirPath = path.dirname(relativePath).replace(/\\/g, '/');
    const folder = dirPath === '.' ? 'biosite-assets' : `biosite-assets/${dirPath}`;
    const fileName = sanitizePublicId(path.basename(relativePath, path.extname(relativePath)));

    console.log(`📤 Uploading: ${relativePath}...`);

    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      public_id: fileName,
      resource_type: 'auto', // auto-detect image/video/raw
      overwrite: false, // don't overwrite if already exists
    });

    const oldPath = `/asset/${relativePath.replace(/\\/g, '/')}`;
    const newUrl = result.secure_url;

    migrationMap[oldPath] = newUrl;
    uploadCount++;

    console.log(`✅ Uploaded: ${oldPath} -> ${newUrl}`);
    return { success: true, oldPath, newUrl };
  } catch (error) {
    errorCount++;
    console.error(`❌ Failed to upload ${relativePath}:`, error.message);
    return { success: false, relativePath, error: error.message };
  }
}

/**
 * Main migration function
 */
async function migrateAssets() {
  console.log('🚀 Starting asset migration to Cloudinary...\n');

  if (!process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ CLOUDINARY_API_SECRET not found in .env.local');
    process.exit(1);
  }

  // Get all files
  const files = getAllFiles(ASSET_DIR);
  console.log(`📦 Found ${files.length} files to upload\n`);

  // Upload files (with rate limiting - 5 at a time)
  const BATCH_SIZE = 5;
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(({ fullPath, relativePath }) =>
        uploadFile(fullPath, relativePath)
      )
    );

    // Progress update
    console.log(`\n📊 Progress: ${Math.min(i + BATCH_SIZE, files.length)}/${files.length} files processed\n`);
  }

  // Save migration map
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(migrationMap, null, 2));

  console.log('\n✨ Migration complete!');
  console.log(`✅ Successfully uploaded: ${uploadCount} files`);
  console.log(`❌ Failed: ${errorCount} files`);
  console.log(`📄 Migration map saved to: ${OUTPUT_FILE}`);
  console.log('\n📝 Next steps:');
  console.log('1. Update your code to use the new Cloudinary URLs');
  console.log('2. Test that all images/videos load correctly');
  console.log('3. Delete public/asset folder and commit changes');
  console.log('4. Redeploy to Render');
}

// Run migration
migrateAssets().catch((error) => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
