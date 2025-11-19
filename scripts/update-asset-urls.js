/**
 * Script to update all asset URLs in code to use Cloudinary URLs
 * Run: node scripts/update-asset-urls.js
 */

const fs = require('fs');
const path = require('path');

// Load the migration map
const migrationMapPath = path.join(__dirname, '../asset-migration-map.json');
const migrationMap = JSON.parse(fs.readFileSync(migrationMapPath, 'utf8'));

// Directories to search for files
const searchDirs = [
  path.join(__dirname, '../app'),
  path.join(__dirname, '../src'),
];

// File extensions to process
const extensions = ['.tsx', '.ts', '.jsx', '.js', '.css'];

let filesProcessed = 0;
let replacementsMade = 0;

/**
 * Get all files recursively from a directory
 */
function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (extensions.some(ext => filePath.endsWith(ext))) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Replace asset URLs in a file
 */
function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let fileReplacements = 0;

  // Sort URLs by length (longest first) to avoid partial matches
  const sortedUrls = Object.keys(migrationMap).sort((a, b) => b.length - a.length);

  sortedUrls.forEach((oldUrl) => {
    const newUrl = migrationMap[oldUrl];
    
    // Escape special regex characters in the URL
    const escapedOldUrl = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Replace in various formats:
    // 1. src="/asset/..."
    // 2. src='/asset/...'
    // 3. image: '/asset/...'
    // 4. url('/asset/...')
    
    const patterns = [
      new RegExp(`(['"])${escapedOldUrl}\\1`, 'g'),  // '/asset/...' or "/asset/..."
      new RegExp(`src=(['"])${escapedOldUrl}\\1`, 'g'), // src="/asset/..."
      new RegExp(`image:\\s*(['"])${escapedOldUrl}\\1`, 'g'), // image: '/asset/...'
      new RegExp(`url\\((['"])${escapedOldUrl}\\1\\)`, 'g'), // url('/asset/...')
    ];

    patterns.forEach((pattern) => {
      if (pattern.test(content)) {
        content = content.replace(pattern, (match) => {
          fileReplacements++;
          modified = true;
          
          // Preserve the quote style and structure
          if (match.includes('url(')) {
            return match.includes('"') 
              ? `url("${newUrl}")`
              : `url('${newUrl}')`;
          } else if (match.includes('src=')) {
            return match.includes('"')
              ? `src="${newUrl}"`
              : `src='${newUrl}'`;
          } else if (match.includes('image:')) {
            return match.includes('"')
              ? `image: "${newUrl}"`
              : `image: '${newUrl}'`;
          } else {
            return match.includes('"')
              ? `"${newUrl}"`
              : `'${newUrl}'`;
          }
        });
      }
    });
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${filePath.replace(process.cwd(), '.')} (${fileReplacements} replacements)`);
    replacementsMade += fileReplacements;
  }

  filesProcessed++;
}

/**
 * Main function
 */
function main() {
  console.log('🚀 Starting asset URL updates...\n');

  // Get all files
  let allFiles = [];
  searchDirs.forEach(dir => {
    allFiles = allFiles.concat(getAllFiles(dir));
  });

  console.log(`📦 Found ${allFiles.length} files to process\n`);

  // Process each file
  allFiles.forEach(updateFile);

  console.log('\n✨ Update complete!');
  console.log(`📊 Processed ${filesProcessed} files`);
  console.log(`✅ Made ${replacementsMade} replacements`);
  console.log('\n📝 Next steps:');
  console.log('1. Test your application locally (npm run dev)');
  console.log('2. Verify all images/videos load from Cloudinary');
  console.log('3. Delete public/asset folder');
  console.log('4. Commit and push changes');
  console.log('5. Redeploy to Render');
}

main();
