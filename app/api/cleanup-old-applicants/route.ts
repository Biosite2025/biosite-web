import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { v2 as cloudinary } from 'cloudinary';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
});

cloudinary.config({
  cloud_name: 'dmvyhrewy',
  api_key: '516493988527468',
  api_secret: 'abSvNRjH2vZNbP71VD2C9VB0avI',
});

export async function POST(request: NextRequest) {
  try {
    console.log('🧹 Starting cleanup of old applicants...');

    // For testing: 2 minutes (120 seconds)
    // For production: 30 days (change INTERVAL '2 minutes' to INTERVAL '30 days')
    const query = `
      SELECT id, name, status, resume_url, created_at
      FROM applicants
      WHERE status IN ('Hired', 'Rejected')
        AND created_at < NOW() - INTERVAL '2 minutes'
    `;

    const result = await pool.query(query);
    const oldApplicants = result.rows;

    console.log(`📊 Found ${oldApplicants.length} old applicants to delete`);

    if (oldApplicants.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No old applicants to delete',
        deleted: 0,
      });
    }

    let deletedCount = 0;
    let cloudinaryDeletedCount = 0;
    const errors: string[] = [];

    for (const applicant of oldApplicants) {
      try {
        // Delete from Cloudinary if resume exists
        if (applicant.resume_url) {
          try {
            // Extract public_id from Cloudinary URL
            // Example: https://res.cloudinary.com/dmvyhrewy/raw/upload/v1234/resumes/resume_123.pdf
            const urlParts = applicant.resume_url.split('/upload/');
            if (urlParts.length > 1) {
              const pathAfterUpload = urlParts[1];
              // Remove version number (v1234/)
              const publicIdWithExtension = pathAfterUpload.replace(/^v\d+\//, '');
              // Remove file extension
              const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, '');
              
              console.log(`🗑️ Deleting Cloudinary file: ${publicId}`);
              
              await cloudinary.uploader.destroy(publicId, {
                resource_type: 'raw',
                invalidate: true,
              });
              
              cloudinaryDeletedCount++;
              console.log(`✅ Deleted from Cloudinary: ${publicId}`);
            }
          } catch (cloudinaryError: any) {
            console.error(`⚠️ Failed to delete Cloudinary file for ${applicant.name}:`, cloudinaryError.message);
            errors.push(`Cloudinary deletion failed for ${applicant.name}: ${cloudinaryError.message}`);
          }
        }

        // Delete from database
        await pool.query('DELETE FROM applicants WHERE id = $1', [applicant.id]);
        deletedCount++;
        console.log(`✅ Deleted applicant: ${applicant.name} (${applicant.status})`);
      } catch (error: any) {
        console.error(`❌ Error deleting applicant ${applicant.name}:`, error.message);
        errors.push(`Failed to delete ${applicant.name}: ${error.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Cleanup completed: ${deletedCount} applicants deleted`,
      deleted: deletedCount,
      cloudinaryDeleted: cloudinaryDeletedCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('❌ Cleanup error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to cleanup old applicants',
      },
      { status: 500 }
    );
  }
}

// Also support GET for manual triggering
export async function GET(request: NextRequest) {
  return POST(request);
}
