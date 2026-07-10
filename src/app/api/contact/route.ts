import { NextResponse } from 'next/server';
import { getPool, initContactTable } from '../../../lib/db';
import { sendContactEmail } from '../../../lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
    }

    const { name, email, subject, message, company } = body as Record<string, string>;

    // Honeypot check
    if (company && company.trim().length > 0) {
      // Pretend success for spam bot
      return NextResponse.json({ ok: true });
    }

    // Server-side validation
    const errors: Record<string, string> = {};
    if (!name || !name.trim()) errors.name = 'Name is required.';
    if (!email || !email.trim()) errors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
    if (!subject || !subject.trim()) errors.subject = 'Subject is required.';
    if (!message || !message.trim()) errors.message = 'Message is required.';
    else if (message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // 1. Log to PostgreSQL (if DATABASE_URL configured)
    const db = getPool();
    if (db) {
      try {
        await initContactTable();
        await db.query(
          'INSERT INTO contact_submissions (name, email, subject, message) VALUES ($1, $2, $3, $4)',
          [name.trim(), email.trim(), subject.trim(), message.trim()]
        );
      } catch (dbErr) {
        console.error('[PostgreSQL error saving contact]:', dbErr);
        // Continue even if DB log fails so email can still send
      }
    }

    // 2. Send Email notification
    try {
      await sendContactEmail({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });
    } catch (emailErr) {
      console.error('[Email delivery error]:', emailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[API contact error]:', err);
    return NextResponse.json(
      { ok: false, error: 'Internal Server Error processing request' },
      { status: 500 }
    );
  }
}
