import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dmvyhrewy',
  api_key: '516493988527468',
  api_secret: 'abSvNRjH2vZNbP71VD2C9VB0avI',
});

export async function POST(request: NextRequest) {
  try {
    const { file, fileName } = await request.json();
    
    console.log('📤 Uploading to Cloudinary:', fileName);
    
    // Upload to Cloudinary with raw resource type for PDFs
    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: 'resumes',
      resource_type: 'raw', // IMPORTANT: Use 'raw' for PDF files
      public_id: `resume_${Date.now()}_${fileName.replace(/\.[^/.]+$/, '')}`,
      type: 'upload', // Public upload
    });

    console.log('✅ Cloudinary upload successful:', uploadResponse.secure_url);

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
    });
  } catch (error: any) {
    console.error('❌ Cloudinary upload error:', error);
    console.error('Error details:', error.message, error.http_code);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to upload resume' },
      { status: 500 }
    );
  }
}
