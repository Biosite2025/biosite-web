import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import axios from 'axios';


// Simple email validation regex
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, recipient, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !message || !recipient) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!isValidEmail(recipient)) {
      return NextResponse.json(
        { success: false, error: 'Invalid recipient email selected' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA v2
    if (!recaptchaToken) {
      return NextResponse.json({ success: false, error: 'reCAPTCHA token missing' }, { status: 400 });
    }
    const secret = "6LeM1lksAAAAALsWu2A1BMmGB3B348iWrWuGJO01";
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`;
    const recaptchaRes = await axios.post(verifyUrl);
    if (!recaptchaRes.data.success) {
      return NextResponse.json({ success: false, error: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: `"biositeph.com" <${process.env.SMTP_USER}>`,
      to: recipient,
      subject: `${subject }`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2B3990 0%, #2B7CD3 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">${subject } Form</h1>
          </div>
          
          <div style="background: #f7f9fc; padding: 30px;">
            <div style="background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #2B3990; margin-top: 0;">Contact Details</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong style="color: #2B3990;">Subject:</strong></td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${subject || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong style="color: #2B3990;">Name:</strong></td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong style="color: #2B3990;">Email:</strong></td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${email}" style="color: #2B7CD3;">${email}</a></td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong style="color: #2B3990;">Phone:</strong></td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${phone}</td>
                </tr>
                ` : ''}
              </table>
              
              <h3 style="color: #2B3990; margin-top: 30px; margin-bottom: 15px;">Message:</h3>
              <div style="background: #f7f9fc; padding: 15px; border-radius: 6px; border-left: 4px solid #2B3990;">
                <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>
            </div>
          </div>
          
          <div style="background: #2B3990; padding: 20px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 14px;">
              This email was sent from the Biosite website contact form
            </p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
      },
      { status: 500 }
    );
  }
}
