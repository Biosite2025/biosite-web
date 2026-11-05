import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import axios from 'axios';
import { rateLimit } from '@/lib/rateLimit';
import { CONTACT_FIELDS, REGIONS, validateContact, type ContactValues } from '@/lib/contactValidation';


// Both regions' teams receive every message; the region is noted in the subject.
const DEPARTMENT_EMAILS: Record<string, string[]> = {
  quotation: ['quotation.luzon@biositeph.com', 'quotation.vismin@biositeph.com'],
  sales: ['nsm@biositeph.com', 'sheereann.barnes@biositeph.com'],
  technical_service: ['mnl.servicecoordinator@biositeph.com', 'irisclint.caro@biositeph.com'],
  marketing: ['customerengagement@biositeph.com'],
};

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, 'contact', 5, 10 * 60 * 1000);
  if (limited) return limited;

  try {
    const body = await request.json();
    // Hidden field real visitors never fill in: pretend success so bots don't adapt.
    if (body.website) return NextResponse.json({ success: true, message: 'Email sent successfully' });
    const values = Object.fromEntries(
      CONTACT_FIELDS.map((field) => [field, typeof body[field] === 'string' ? body[field].trim() : '']),
    ) as ContactValues;
    const fieldErrors = validateContact(values);
    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json({ success: false, error: 'Please correct the highlighted fields.', fieldErrors }, { status: 400 });
    }

    // Visitor text goes into an HTML email: escape it so it can't inject markup or links.
    const esc = (v: string) =>
      v.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
    const name = esc(values.name);
    const email = esc(values.email);
    const phone = esc(values.phone);
    const message = esc(values.message);
    // Header fields must be single-line plain text.
    const subject = `${values.subject || 'New Inquiry'} - ${REGIONS[values.location]}`.replace(/[\r\n]+/g, ' ');

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
      to: DEPARTMENT_EMAILS[values.department].join(', '),
      subject: `${subject }`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2B3990 0%, #2B7CD3 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">${esc(subject)}</h1>
          </div>
          
          <div style="background: #f7f9fc; padding: 30px;">
            <div style="background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #2B3990; margin-top: 0;">Contact Details</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;"><strong style="color: #2B3990;">Subject:</strong></td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">${esc(subject)}</td>
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
      replyTo: values.email,
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
      { success: false, error: 'Your message could not be sent. Please try again later.' },
      { status: 500 }
    );
  }
}
