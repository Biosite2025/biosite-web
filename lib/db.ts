import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('✅ Database connected successfully!');
    console.log('Current time from database:', result.rows[0]);
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error);
    return false;
  }
}

export default pool;
