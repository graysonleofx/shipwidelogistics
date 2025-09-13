import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if(!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, error: 'Name, email, and message are required.' }), { status: 400, headers });
    }

    const data = await resend.emails.send({
      from: 'Pennywise Contact <contact@pennywiselogistics.online>',
      to: ['contact@pennywiselogistics.online'],
      subject: subject || 'New Contact Message',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <br>
        <p><strong>Email:</strong> ${email}</p>
        <br>
        <p><strong>Phone:</strong> ${phone}</p>
        <br>
        <p><strong>Message:</strong> ${message}</p>
        <br>
      `
    });

    console.log('Resend  Response:', data);

    return new Response(JSON.stringify({ success: true, data, message: 'Email sent successfully' }), { status: 200, headers });
    // return new Response(JSON.stringify({ success: true, data }), { status: 200, headers });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers });
    // return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers });
  }
}

// Optional: Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
