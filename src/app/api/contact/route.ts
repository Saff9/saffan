import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, service, budget, message, website_hp } = body;

    // Honeypot check: if filled, quietly succeed to trap bots without spamming
    if (website_hp) {
      return NextResponse.json(
        { success: true, message: 'Your inquiry has been received!' },
        { status: 200 },
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 },
      );
    }

    const cleanName = String(name).trim().slice(0, 100);
    const cleanEmail = String(email).trim().slice(0, 150);
    const cleanService = String(service || '').trim().slice(0, 100);
    const cleanBudget = String(budget || '').trim().slice(0, 100);
    const cleanMessage = String(message).trim().slice(0, 3000);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    // If an external webhook is provided in .env (e.g. Discord, Slack, or Zapier/Make)
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `📬 **New Client Inquiry from saffan.dev**\n**Name:** ${cleanName}\n**Email:** ${cleanEmail}\n**Service:** ${cleanService || 'Not specified'}\n**Budget:** ${cleanBudget || 'Not specified'}\n**Message:**\n${cleanMessage}`,
          }),
        });
      } catch (webhookErr) {
        console.error('Webhook notification error:', webhookErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been received! Saffan will reply within 24 hours.',
      },
      { status: 200 },
    );
  } catch (err) {
    console.error('Contact form submission error:', err);
    return NextResponse.json(
      { error: 'Internal server error. Please try again or email directly.' },
      { status: 500 },
    );
  }
}
