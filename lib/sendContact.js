import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

// This function should be used as an API route handler
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { name, email, phone, subject, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: email,
      to: ['contact-us@shipwidelogistics.online'],
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
    return res.status(200).json({ success: true, data, message: 'Email sent successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}