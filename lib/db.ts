import { Pool } from 'pg';

import fs from 'fs';
import path from 'path';
let caCert = '';
if (process.env.NODE_ENV === 'production') {
  try {
    const certPath = path.join(process.cwd(), 'cert', 'ca-certificate.crt');
    console.log('[DEBUG] process.cwd():', process.cwd());
    console.log('[DEBUG] certPath:', certPath);
    const certExists = fs.existsSync(certPath);
    console.log('[DEBUG] cert exists:', certExists);
    if (certExists) {
      caCert = fs.readFileSync(certPath, 'utf8').trim();
      console.log('[DEBUG] CA certificate loaded from:', certPath);
      console.log('[DEBUG] CA certificate length:', caCert.length);
    } else {
      console.error('[ERROR] CA certificate file does not exist at:', certPath);
    }
  } catch (err) {
    console.error('[ERROR] Failed to load CA certificate:', err);
  }
}
const sslConfig = process.env.NODE_ENV === 'production'
  ? caCert
    ? { ca: caCert, rejectUnauthorized: true }
    : { rejectUnauthorized: false }
  : false;
console.log('[DEBUG] SSL config for pg Pool:', sslConfig);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslConfig,
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
