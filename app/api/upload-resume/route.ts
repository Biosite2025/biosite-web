
import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { spaces } from '@/lib/spaces';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, 'upload-resume', 5, 10 * 60 * 1000);
  if (limited) return limited;

  try {
    const { file, fileName: rawName, website } = await request.json();
    // Hidden field real visitors never fill in: pretend success so bots don't adapt.
    if (website) return NextResponse.json({ success: true, url: '', fileName: '' });
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
      return NextResponse.json({ success: false, error: 'Attach a PDF file' }, { status: 400 });
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
      ACL: 'public-read' as const, // Or 'private' if you want restricted access
      ContentType: 'application/pdf',
    };

    await spaces.send(new PutObjectCommand(params));
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
      { success: false, error: 'Your résumé could not be uploaded. Please try again.' },
      { status: 500 }
    );
  }
}
