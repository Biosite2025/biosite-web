import { Pool } from 'pg';

import fs from 'fs';
import path from 'path';
let caCert = '';
if (process.env.NODE_ENV === 'production') {
  try {
    const certPath = path.join(process.cwd(), 'cert', 'ca-certificate.crt');
    if (fs.existsSync(certPath)) {
      caCert = fs.readFileSync(certPath, 'utf8').trim();
    } else {
      console.error('[db] CA certificate not found at:', certPath);
    }
  } catch (err) {
    console.error('[db] Failed to load CA certificate:', err);
  }
}
const sslConfig = process.env.NODE_ENV === 'production'
  ? caCert
    ? { ca: caCert, rejectUnauthorized: true }
    : { rejectUnauthorized: false }
  : false;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslConfig,
  // 20 idle sockets is far more than a single small instance needs — each one
  // holds its own buffers, and the managed DB has its own connection ceiling.
  max: 8,
  // Release idle sockets sooner so memory is returned between traffic bursts.
  idleTimeoutMillis: 10000,
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
