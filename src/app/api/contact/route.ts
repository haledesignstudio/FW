// app/api/contact/route.ts
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';         // ensure Node runtime
export const dynamic = 'force-dynamic';  // do not cache this route

const resend = new Resend(process.env.RESEND_API_KEY!);

function esc(s: string) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// keep tags Resend-safe (ASCII letters, numbers, _ or -)
const TAG_SAFE = /[^A-Za-z0-9_-]/g;
function sanitizeTagValue(s: string) {
  return (s || '')
    .normalize('NFKD')
    .replace(TAG_SAFE, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 50);
}

function errorMessage(e: unknown, fallback = 'email_failed'): string {
  if (e && typeof e === 'object' && 'message' in e) {
    const m = (e as { message?: unknown }).message;
    if (typeof m === 'string' && m) return m;
  }
  return fallback;
}


export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, company, position, message } = await req.json();

    // Basic server-side validation (mirrors the client)
    const required = { name, email, phone, company, position, message };
    for (const [k, v] of Object.entries(required)) {
      if (!v || String(v).trim() === '') {
        return Response.json({ error: `missing_${k}` }, { status: 400 });
      }
    }
    if (!/\S+@\S+\.\S+/.test(String(email))) {
      return Response.json({ error: 'bad_email' }, { status: 400 });
    }

    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5">
        <h2 style="margin:0 0 12px">New Contact Message</h2>
        <table style="border-collapse:collapse">
          <tr><td><strong>Name</strong></td><td style="padding-left:12px">${esc(name)}</td></tr>
          <tr><td><strong>Email</strong></td><td style="padding-left:12px"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
          <tr><td><strong>Phone</strong></td><td style="padding-left:12px">${esc(phone)}</td></tr>
          <tr><td><strong>Company</strong></td><td style="padding-left:12px">${esc(company)}</td></tr>
          <tr><td><strong>Position</strong></td><td style="padding-left:12px">${esc(position)}</td></tr>
        </table>
        <h3 style="margin:16px 0 8px">Message</h3>
        <p style="white-space:pre-wrap">${esc(message)}</p>
      </div>
    `;

    const text = [
      'New Contact Message',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Company: ${company}`,
      `Position: ${position}`,
      '',
      'Message:',
      message,
    ].join('\n');

    const tags = [
      { name: 'source', value: 'contact_form' },
      { name: 'company', value: sanitizeTagValue(company) },
    ];

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM || 'Website <onboarding@resend.dev>',
      to: (process.env.RESEND_TO_CONTACT || 'mat@haledesign.co.za').split(','),
      subject: `Contact • ${name}${company ? ` • ${company}` : ''}`,
      replyTo: String(email),
      html,
      text,
      ...(tags.length ? { tags } : {}),
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json(
        { ok: false, error: errorMessage(error) },
        { status: 500 }
      );
    }

    return Response.json({ ok: true });
} catch (err: unknown) {
  console.error('Contact route error:', err);
  return Response.json({ ok: false, error: errorMessage(err) }, { status: 500 });
}
}
