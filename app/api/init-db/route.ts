import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/db';

// This route initializes the database
export async function GET() {
  try {
    await testConnection();
    return NextResponse.json({ success: true, message: 'Database initialized' });
  } catch (error) {
    console.error('Database init error:', error);
    return NextResponse.json({ success: false, error: 'Failed to initialize database' }, { status: 500 });
  }
}
