
import { NextRequest, NextResponse } from 'next/server';
// S3-only import — see note in app/api/event-gallery/route.ts.
import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
  endpoint: 'https://sgp1.digitaloceanspaces.com',
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { file, fileName: rawName } = await request.json();
    if (typeof file !== 'string' || typeof rawName !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid upload' }, { status: 400 });
    }

    // Remove the data URL prefix to get the base64 string
    const base64Data = Buffer.from(file.replace(/^data:.*;base64,/, ""), 'base64');

    // Public uploads: only real PDFs, at most 10 MB.
    if (base64Data.length > 10 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: 'File is too large (max 10 MB)' }, { status: 413 });
    }
    if (base64Data.subarray(0, 5).toString('latin1') !== '%PDF-') {
      return NextResponse.json({ success: false, error: 'Please upload a PDF file' }, { status: 400 });
    }
    // Safe, unique key: no path characters, and a random prefix so one
    // upload can never overwrite another applicant's résumé.
    const safe = rawName.replace(/\.pdf$/i, '').replace(/[^\w.-]+/g, '_').slice(0, 80) || 'resume';
    const fileName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safe}.pdf`;

    console.log('📤 Uploading to DigitalOcean Spaces:', fileName);

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
