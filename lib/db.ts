import { Pool } from 'pg';

import fs from 'fs';
import path from 'path';
let caCert = '';
if (process.env.NODE_ENV === 'production') {
  try {
    const certPath = path.join(process.cwd(), 'cert', 'ca-certificate.crt');
    caCert = fs.readFileSync(certPath).toString();
    console.log('[DEBUG] CA certificate loaded from:', certPath);
    console.log('[DEBUG] CA certificate length:', caCert.length);
  } catch (err) {
    console.error('[ERROR] Failed to load CA certificate:', err);
  }
}
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? caCert
      ? { ca: caCert, rejectUnauthorized: true }
      : { rejectUnauthorized: false }
    : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
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
