const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dmvyhrewy',
  api_key: process.env.CLOUDINARY_API_KEY || '516493988527468',
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadVideos() {
  const videos = [
    {
      localPath: path.join(__dirname, '../public/asset/My Video10.mp4'),
      publicId: 'biosite-assets/videos/event-video-1',
      fileName: 'My Video10.mp4'
    },
    {
      localPath: path.join(__dirname, '../public/asset/My Video11.mp4'),
      publicId: 'biosite-assets/videos/event-video-2',
      fileName: 'My Video11.mp4'
    }
  ];

  console.log('🚀 Starting video upload to Cloudinary...\n');

  for (const video of videos) {
    try {
      console.log(`📹 Uploading ${video.fileName}...`);
      
      const result = await cloudinary.uploader.upload_large(video.localPath, {
        resource_type: 'video',
        public_id: video.publicId,
        chunk_size: 6000000, // 6MB chunks
        overwrite: true,
        // Video optimization settings
        quality: 'auto:good',
        format: 'mp4',
      });

      console.log(`✅ Successfully uploaded ${video.fileName}`);
      console.log(`   URL: ${result.secure_url}`);
      console.log(`   Size: ${(result.bytes / (1024 * 1024)).toFixed(2)} MB`);
      console.log(`   Duration: ${result.duration} seconds\n`);
      
    } catch (error) {
      console.error(`❌ Error uploading ${video.fileName}:`, error.message);
    }
  }

  console.log('✨ Video upload complete!\n');
  console.log('📝 Update your EventGallery.tsx with these URLs:');
  console.log(`   Video 1: https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME || 'dmvyhrewy'}/video/upload/biosite-assets/videos/event-video-1.mp4`);
  console.log(`   Video 2: https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME || 'dmvyhrewy'}/video/upload/biosite-assets/videos/event-video-2.mp4`);
}

uploadVideos().catch(console.error);
