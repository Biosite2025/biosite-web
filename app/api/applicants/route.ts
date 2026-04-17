import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import nodemailer from 'nodemailer';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
});

const HR_EMAIL = 'bmi.hr@biositeph.com';

async function notifyApplicantsRecipients(position: string) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('[Mailer] SMTP credentials not set — skipping applicant notification.');
    return;
  }
  try {
    const adminUrl = process.env.ADMIN_URL || 'https://admin.biositeph.com';

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    });

    await transporter.sendMail({
      from: `"Biosite Admin" <${process.env.SMTP_USER}>`,
      to: HR_EMAIL,
      subject: 'New Job Application Received — Biosite Careers',
      html: `
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">
        <tr><td style="background:linear-gradient(135deg,#2B3990,#2B7CD3);padding:32px 40px;text-align:center;">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">Biosite Admin Portal</h1>
        </td></tr>
        <tr><td style="padding:36px 40px;">
          <h2 style="margin:0 0 12px 0;color:#1a202c;font-size:20px;font-weight:700;">New Job Application Submitted</h2>
          <p style="margin:0 0 24px 0;color:#4a5568;font-size:15px;line-height:1.7;">A new job application has been submitted on the careers portal for the position: <strong>${position}</strong></p>
          <p style="margin:0 0 32px 0;color:#4a5568;font-size:15px;line-height:1.7;">Please log in to the admin portal to review the details. For security and privacy, no further information is included in this notification.</p>
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="border-radius:8px;background:#2B7CD3;">
              <a href="${adminUrl}/applicants" style="display:inline-block;padding:14px 32px;color:#fff;font-size:15px;font-weight:600;text-decoration:none;border-radius:8px;">View Applicants</a>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e8ecf0;text-align:center;">
          <p style="margin:0;color:#a0aec0;font-size:12px;line-height:1.6;">This is an automated notification from the Biosite Admin Portal.<br/>You received this because you are subscribed to HR notifications.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`,
    });

    console.log(`[Mailer] ✅ Applicant notification sent to ${HR_EMAIL}`);
  } catch (err: any) {
    console.error('[Mailer] ❌ Failed to send applicant notification:', err.message);
  }
}

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

    // Fire-and-forget email notification
    notifyApplicantsRecipients(position);

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
