import { NextResponse } from 'next/server';
// Import ONLY the S3 client. `import AWS from 'aws-sdk'` pulls in every AWS
// service definition (~100MB on disk) and holds them in heap for the life of
// the process — we use exactly one service.
import S3 from 'aws-sdk/clients/s3';

// Configure Digital Ocean Spaces
const s3 = new S3({
  endpoint: 'https://sgp1.digitaloceanspaces.com',
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

const CDN = 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com';
const GALLERY_PREFIX = 'biosite-web/events/events-gallery/';
const OPTIMIZED_PREFIX = 'biosite-web/events/events-gallery-optimized/';

export async function GET() {
  try {
    console.log('[Event Gallery API] Fetching folders and images from Digital Ocean Spaces...');
    
    // First, list all folders (prefixes) in events-gallery
    const foldersParams = {
      Bucket: 'biositeassets',
      Prefix: 'biosite-web/events/events-gallery/',
      Delimiter: '/',
    };

    const foldersData = await s3.listObjectsV2(foldersParams).promise();
    
    if (!foldersData.CommonPrefixes || foldersData.CommonPrefixes.length === 0) {
      console.warn('[Event Gallery API] No folders found in events-gallery');
      return NextResponse.json({ folders: [] });
    }

    // Get first two folders
    const folders = foldersData.CommonPrefixes
      .slice(0, 2)
      .map(prefix => prefix.Prefix || '');

    console.log(`[Event Gallery API] Found ${folders.length} folders:`, folders);

    // Web-sized copies made by scripts/generate-event-thumbnails.js. The
    // originals are 7–11 MB camera JPGs, far too heavy to show directly.
    const optimizedKeys = new Set<string>();
    let token: string | undefined;
    do {
      const page = await s3
        .listObjectsV2({ Bucket: 'biositeassets', Prefix: OPTIMIZED_PREFIX, ContinuationToken: token })
        .promise();
      (page.Contents || []).forEach((o) => o.Key && optimizedKeys.add(o.Key));
      token = page.NextContinuationToken;
    } while (token);
    const webCopy = (key: string, suffix: 'thumb' | 'large') => {
      const copyKey = `${OPTIMIZED_PREFIX}${key.slice(GALLERY_PREFIX.length)}.${suffix}.webp`;
      return optimizedKeys.has(copyKey) ? `${CDN}/${copyKey}` : `${CDN}/${key}`;
    };

    // Fetch images from each folder
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
    const folderImages = await Promise.all(
      folders.map(async (folderPrefix) => {
        const imagesParams = {
          Bucket: 'biositeassets',
          Prefix: folderPrefix,
        };

        const imagesData = await s3.listObjectsV2(imagesParams).promise();
        
        if (!imagesData.Contents) return [];

        const images = imagesData.Contents
          .filter((item) => {
            const key = item.Key?.toLowerCase() || '';
            return imageExtensions.some(ext => key.endsWith(ext));
          })
          .map((item) => ({
            url: `${CDN}/${item.Key}`,
            thumbUrl: webCopy(item.Key || '', 'thumb'),
            largeUrl: webCopy(item.Key || '', 'large'),
            name: item.Key?.split('/').pop() || '',
            folder: folderPrefix.split('/').filter(Boolean).pop() || '',
            size: item.Size || 0,
            lastModified: item.LastModified || new Date(),
          }))
          .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());

        console.log(`[Event Gallery API] Folder ${folderPrefix}: ${images.length} images`);
        return images;
      })
    );

    return NextResponse.json({ 
      folders: folderImages,
      folderNames: folders.map(f => f.split('/').filter(Boolean).pop())
    });
  } catch (error) {
    console.error('[Event Gallery API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}
