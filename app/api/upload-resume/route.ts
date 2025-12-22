
import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';

const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com'); // Change region if needed
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { file, fileName } = await request.json();

    console.log('📤 Uploading to DigitalOcean Spaces:', fileName);

    // Remove the data URL prefix to get the base64 string
    const base64Data = Buffer.from(file.replace(/^data:.*;base64,/, ""), 'base64');

    const params = {
      Bucket: 'biositeassets', // Your Space name
      Key: `admin/applicant-resume/${fileName}`,
      Body: base64Data,
      ACL: 'public-read', // Or 'private' if you want restricted access
      ContentType: 'application/pdf',
    };

    await s3.putObject(params).promise();
    const url = `https://biositeassets.sgp1.digitaloceanspaces.com/admin/applicant-resume/${fileName}`;

    console.log('✅ Spaces upload successful:', url);

    return NextResponse.json({
      success: true,
      url,
      fileName,
    });
  } catch (error: any) {
    console.error('❌ Spaces upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to upload resume' },
      { status: 500 }
    );
  }
}
