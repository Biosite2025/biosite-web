import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { v2 as cloudinary } from 'cloudinary';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

cloudinary.config({
  cloud_name: 'dmvyhrewy',
  api_key: '516493988527468',
  api_secret: 'abSvNRjH2vZNbP71VD2C9VB0avI',
});

export async function GET(request: NextRequest) {
  try {
    // Get all applicants with resume URLs
    const result = await pool.query(`
      SELECT COUNT(*) as total_applicants,
             COUNT(CASE WHEN resume_url IS NOT NULL THEN 1 END) as with_resume,
             COUNT(CASE WHEN status IN ('Hired', 'Rejected') THEN 1 END) as hired_rejected
      FROM applicants
    `);

    // Get Cloudinary usage
    let cloudinaryUsage = 0;
    try {
      const usage = await cloudinary.api.usage();
      // Convert bytes to MB
      cloudinaryUsage = (usage.storage.usage / (1024 * 1024));
    } catch (error) {
      console.error('Cloudinary usage fetch error:', error);
    }

    // Calculate database size (rough estimate)
    const dbSizeResult = await pool.query(`
      SELECT pg_size_pretty(pg_database_size(current_database())) as size,
             pg_database_size(current_database()) as size_bytes
    `);

    const dbSizeBytes = parseInt(dbSizeResult.rows[0].size_bytes) || 0;
    const dbSizeMB = dbSizeBytes / (1024 * 1024);

    // Total storage used (Cloudinary + Database estimate)
    const totalUsedMB = cloudinaryUsage + dbSizeMB;
    const totalUsedGB = totalUsedMB / 1024;
    
    // Storage limit: 1GB
    const storageLimitGB = 1;
    const storageLimitMB = storageLimitGB * 1024;
    const percentageUsed = (totalUsedMB / storageLimitMB) * 100;

    return NextResponse.json({
      success: true,
      storage: {
        totalUsedMB: Math.round(totalUsedMB * 100) / 100,
        totalUsedGB: Math.round(totalUsedGB * 1000) / 1000,
        limitGB: storageLimitGB,
        limitMB: storageLimitMB,
        percentageUsed: Math.round(percentageUsed * 10) / 10,
        cloudinaryMB: Math.round(cloudinaryUsage * 100) / 100,
        databaseMB: Math.round(dbSizeMB * 100) / 100,
      },
      applicants: {
        total: parseInt(result.rows[0].total_applicants),
        withResume: parseInt(result.rows[0].with_resume),
        hiredRejected: parseInt(result.rows[0].hired_rejected),
      }
    });
  } catch (error: any) {
    console.error('Storage stats error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch storage stats' },
      { status: 500 }
    );
  }
}
