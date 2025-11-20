import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
});

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, title 
       FROM job_positions 
       WHERE is_active = true 
       ORDER BY title ASC`
    );

    return NextResponse.json(
      { success: true, data: result.rows },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job positions' },
      { status: 500 }
    );
  }
}
