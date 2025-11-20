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
    console.log('🧹 Starting manual cleanup of Hired/Rejected applicants...');

    // Get all Hired and Rejected applicants
    const query = `
      SELECT id, name, status, resume_url, created_at
      FROM applicants
      WHERE status IN ('Hired', 'Rejected')
    `;

    const result = await pool.query(query);
    const applicantsToDelete = result.rows;

    console.log(`📊 Found ${applicantsToDelete.length} Hired/Rejected applicants to delete`);

    if (applicantsToDelete.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No Hired/Rejected applicants to delete',
        deleted: 0,
        cloudinaryDeleted: 0,
      });
    }

    let deletedCount = 0;
    let cloudinaryDeletedCount = 0;
    const errors: string[] = [];

    for (const applicant of applicantsToDelete) {
      try {
        // Delete from Cloudinary if resume exists
        if (applicant.resume_url) {
          try {
            // Extract public_id from Cloudinary URL
            const urlParts = applicant.resume_url.split('/upload/');
            if (urlParts.length > 1) {
              const pathAfterUpload = urlParts[1];
              const publicIdWithExtension = pathAfterUpload.replace(/^v\d+\//, '');
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
            errors.push(`Cloudinary: ${applicant.name}`);
          }
        }

        // Delete from database
        await pool.query('DELETE FROM applicants WHERE id = $1', [applicant.id]);
        deletedCount++;
        console.log(`✅ Deleted applicant: ${applicant.name} (${applicant.status})`);
      } catch (error: any) {
        console.error(`❌ Error deleting applicant ${applicant.name}:`, error.message);
        errors.push(`Database: ${applicant.name}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Cleanup completed successfully`,
      deleted: deletedCount,
      cloudinaryDeleted: cloudinaryDeletedCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('❌ Manual cleanup error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to cleanup applicants',
      },
      { status: 500 }
    );
  }
}
