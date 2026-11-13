import { NextResponse } from 'next/server';
import { cachedJson } from '@/lib/cachedJson';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import { spaces } from '@/lib/spaces';

/**
 * File name (in the events-showcase folder) of the video that plays first in
 * Event Highlights. Change it to feature another video, or set it to '' to
 * go back to newest first.
 */
const FEATURED_VIDEO = 'Compress_VisMin Kick Off 2026.mp4';

async function load() {
  try {
    console.log('[event-videos] Fetching videos from Digital Ocean Spaces...');
    
    const params = {
      Bucket: 'biositeassets',
      Prefix: 'biosite-web/events/events-showcase/',
    };

    const data = await spaces.send(new ListObjectsV2Command(params));
    
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
        // The featured video always plays first; the rest go newest first.
        const featured = Number(b.name === FEATURED_VIDEO) - Number(a.name === FEATURED_VIDEO);
        return featured || (b.lastModified?.getTime() || 0) - (a.lastModified?.getTime() || 0);
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

// Bucket listing is slow (~9 s); serve it from memory and refresh in the background.
export const GET = cachedJson(load);
// Never prerender at build time: the cache above lives in the running server.
export const dynamic = 'force-dynamic';
