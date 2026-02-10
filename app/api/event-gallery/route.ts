import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';

// Configure Digital Ocean Spaces
const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

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
            url: `https://biositeassets.sgp1.cdn.digitaloceanspaces.com/${item.Key}`,
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
