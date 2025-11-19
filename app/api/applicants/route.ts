import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, position, location, resumeUrl, resumeFileName, message } = body;

    console.log('📝 Received application data:', { 
      name, 
      email, 
      phone, 
      position, 
      location, 
      resumeUrl,
      resumeFileName,
      message 
    });

    // Validate required fields
    if (!name || !email || !phone || !position || !location) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('💾 Saving to database...');

    const result = await pool.query(
      `INSERT INTO applicants (name, email, phone, position, location, resume_url, resume_filename, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, name, email, phone, position, location, resume_url, resume_filename, message, created_at`,
      [name, email, phone, position, location, resumeUrl, resumeFileName, message || null]
    );

    console.log('✅ Saved to database with ID:', result.rows[0].id);

    return NextResponse.json(
      { success: true, data: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const position = searchParams.get('position');
    const location = searchParams.get('location');
    const search = searchParams.get('search');

    let query = 'SELECT * FROM applicants WHERE 1=1';
    const params: any[] = [];
    let paramCount = 1;

    if (status && status !== 'All') {
      query += ` AND status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (position) {
      query += ` AND position = $${paramCount}`;
      params.push(position);
      paramCount++;
    }

    if (location) {
      query += ` AND location = $${paramCount}`;
      params.push(location);
      paramCount++;
    }

    if (search) {
      query += ` AND (name ILIKE $${paramCount} OR email ILIKE $${paramCount} OR phone ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }

    query += ' ORDER BY date_applied DESC';

    const result = await pool.query(query, params);
    console.log('📊 Returning applicants:', result.rows.length, 'records');
    console.log('📋 Sample record (first):', result.rows[0]);
    return NextResponse.json({ success: true, data: result.rows }, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applicants' },
      { status: 500 }
    );
  }
}
