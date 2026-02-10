import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';

// Configure Digital Ocean Spaces (S3-compatible)
const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
  region: 'sgp1', // Your region
});

export async function GET() {
  try {
    console.log('[event-videos] Fetching videos from Digital Ocean Spaces...');
    
    const params = {
      Bucket: 'biositeassets',
      Prefix: 'biosite-web/events/events-showcase/',
    };

    const data = await s3.listObjectsV2(params).promise();
    
    if (!data.Contents) {
      console.log('[event-videos] No files found in folder');
      return NextResponse.json({ videos: [] });
    }

    // Filter for video files only (mp4, webm, mov, avi)
    const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.MP4', '.WEBM', '.MOV', '.AVI'];
    const videos = data.Contents
      .filter((file) => {
        const fileName = file.Key || '';
        return videoExtensions.some(ext => fileName.endsWith(ext)) && file.Size && file.Size > 0;
      })
      .map((file) => ({
        url: `https://biositeassets.sgp1.cdn.digitaloceanspaces.com/${file.Key}`,
        name: file.Key?.split('/').pop() || '',
        size: file.Size,
        lastModified: file.LastModified,
      }))
      .sort((a, b) => {
        // Sort by last modified date (newest first)
        return (b.lastModified?.getTime() || 0) - (a.lastModified?.getTime() || 0);
      });

    console.log(`[event-videos] Found ${videos.length} videos`);
    
    return NextResponse.json({ videos, count: videos.length });
  } catch (error) {
    console.error('[event-videos] Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos', videos: [] },
      { status: 500 }
    );
  }
}
