import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ publicId: string }> }
) {
  try {
    // Await params in Next.js 15+
    const { publicId } = await params;
    // publicId is actually the applicant ID
    const id = parseInt(publicId);
    
    console.log('📥 Fetching resume for applicant ID:', id);
    
    const result = await pool.query(
      'SELECT resume_data, resume_filename FROM applicants WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0 || !result.rows[0].resume_data) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }
    
    const { resume_data, resume_filename } = result.rows[0];
    
    console.log('✓ Found resume:', resume_filename);
    
    // Return PDF with proper headers
    return new NextResponse(resume_data, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${resume_filename}"`,
      },
    });
  } catch (error) {
    console.error('❌ Error fetching resume:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    );
  }
}
