// app/api/apply/route.ts
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';           // use Node runtime (not Edge)
export const dynamic = 'force-dynamic';    // don't cache this route

const resend = new Resend(process.env.RESEND_API_KEY!);

// simple HTML escape
function esc(s: string) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

type RecaptchaVerifyResponse = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
};

async function verifyRecaptcha(token: string, req: NextRequest) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: false as const, reason: 'recaptcha_not_configured' };

  // Best-effort client IP (optional for Google, but useful)
  const xff = req.headers.get('x-forwarded-for') || '';
  const remoteip = xff.split(',')[0]?.trim();

  // Add a timeout so we don't hang if Google is unreachable
  const controller = new AbortController();
  const to = setTimeout(() => controller.abort(), 15_000);

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(remoteip ? { remoteip } : {}),
      }).toString(),
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(to);
    const data = (await res.json()) as RecaptchaVerifyResponse;

    if (!data.success) {
      return { ok: false as const, reason: 'recaptcha_failed', details: data['error-codes'] ?? [] };
    }
    return { ok: true as const };
  } catch (e) {
    clearTimeout(to);
    console.error('reCAPTCHA verify error:', e);
    return { ok: false as const, reason: 'recaptcha_error' };
  }
}

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();

    // Verify captcha BEFORE any processing
    const recaptchaToken = fd.get('recaptchaToken');
    if (!recaptchaToken || typeof recaptchaToken !== 'string' || !recaptchaToken.trim()) {
      return Response.json({ error: 'missing_recaptcha' }, { status: 400 });
    }
    const verify = await verifyRecaptcha(recaptchaToken, req);
    if (!verify.ok) {
      return Response.json(
        { ok: false, error: verify.reason, details: 'details' in verify ? verify.details : [] },
        { status: 400 }
      );
    }

    // Extract fields
    const jobTitle     = String(fd.get('jobTitle') ?? '').trim();
    const name         = String(fd.get('name') ?? '').trim();
    const email        = String(fd.get('email') ?? '').trim();
    const confirmEmail = String(fd.get('confirmEmail') ?? '').trim();
    const phone        = String(fd.get('phone') ?? '').trim();
    const location     = String(fd.get('location') ?? '').trim();
    const linkedIn     = String(fd.get('linkedIn') ?? '').trim();
    const message      = String(fd.get('message') ?? '').trim();

    // Basic server-side guard rails (client already validates)
    if (!jobTitle || !name || !email || !confirmEmail || !phone || !location || !message) {
      return Response.json({ error: 'missing_fields' }, { status: 400 });
    }
    if (email.toLowerCase() !== confirmEmail.toLowerCase()) {
      return Response.json({ error: 'emails_mismatch' }, { status: 400 });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return Response.json({ error: 'bad_email' }, { status: 400 });
    }

    // Optional resume file (keep uploads reasonable for your host)
    const file = fd.get('resume') as File | null;

    let attachments:
      | Array<{ filename: string; content: Buffer | string; content_type?: string }>
      | undefined;

    if (file && file.size > 0) {
      const buf = Buffer.from(await file.arrayBuffer());
      attachments = [
        {
          filename: file.name,
          content: buf, // Resend Node SDK accepts Buffer or Base64 string
          content_type: file.type || undefined,
        },
      ];
    }

    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5">
        <h2 style="margin:0 0 12px">New Application: ${esc(jobTitle)}</h2>
        <table style="border-collapse:collapse">
          <tr><td><strong>Name</strong></td><td style="padding-left:12px">${esc(name)}</td></tr>
          <tr><td><strong>Email</strong></td><td style="padding-left:12px"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
          <tr><td><strong>Phone</strong></td><td style="padding-left:12px">${esc(phone)}</td></tr>
          <tr><td><strong>Location</strong></td><td style="padding-left:12px">${esc(location)}</td></tr>
          <tr><td><strong>LinkedIn</strong></td><td style="padding-left:12px">${linkedIn ? `<a href="${esc(linkedIn)}">${esc(linkedIn)}</a>` : '—'}</td></tr>
        </table>
        <h3 style="margin:16px 0 8px">Message</h3>
        <p style="white-space:pre-wrap">${esc(message)}</p>
      </div>
    `;

    const text = [
      `New Application: ${jobTitle}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Location: ${location}`,
      `LinkedIn: ${linkedIn || '—'}`,
      '',
      'Message:',
      message,
    ].join('\n');

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_APPLY || 'Careers <onboarding@resend.dev>',
      to: (process.env.RESEND_TO_APPLY || 'mat@haledesign.co.za').split(','),
      subject: `Application • ${jobTitle} • ${name}`,
      replyTo: email,
      html,
      text,
      attachments,
      tags: [
        { name: 'source', value: 'apply-form' },
        { name: 'job', value: (jobTitle || 'unspecified').replace(/[^A-Za-z0-9_-]/g, '_') },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ ok: false, error: 'email_failed' }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Apply route error:', err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
