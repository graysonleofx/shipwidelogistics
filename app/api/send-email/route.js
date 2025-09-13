import { NextResponse } from 'next/server';
// Import the Resend SDK
import {Resend} from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const body = await req.json();
    // Destructure the necessary fields from the request body
    const { email, trackingId, shipmentDetails } = body;

    // Send the email using Resend
    const data = await resend.emails.send({
      from: 'Pennywise Logistics <contact@pennywiselogistics.online>',
      to: email,
      subject: `Pennywise Logistics Order Shipment: #${trackingId}`,
      html: `
      <div style="background:#f6f6f6;padding:0;margin:0; width:100%; font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f6;padding:0;margin:0;">
        <tr>
          <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.05);margin:40px 0;">
            <tr>
            <td style="padding:32px 32px 16px 32px;text-align:center;">
              <!-- Logo Placeholder -->
              <h2 style="font-family:Arial,sans-serif;color:#222;font-size:24px;margin:0 0 8px 0;">Pennywise Logistics</h2>
              <p style="font-family:Arial,sans-serif;color:#555;font-size:16px;margin:0 0 24px 0;">Your shipment is on its way!</p>
            </td>
            </tr>
            <tr>
            <td style="padding:0 32px 24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="font-family:Arial,sans-serif;color:#888;font-size:14px;padding:8px 0;">From:</td>
                <td style="font-family:Arial,sans-serif;color:#222;font-size:14px;padding:8px 0;">${shipmentDetails.from}</td>
              </tr>
              <tr>
                <td style="font-family:Arial,sans-serif;color:#888;font-size:14px;padding:8px 0;">To:</td>
                <td style="font-family:Arial,sans-serif;color:#222;font-size:14px;padding:8px 0;">${shipmentDetails.to}</td>
              </tr>
              <tr>
                <td style="font-family:Arial,sans-serif;color:#888;font-size:14px;padding:8px 0;">Sender:</td>
                <td style="font-family:Arial,sans-serif;color:#222;font-size:14px;padding:8px 0;">${shipmentDetails.senderName}</td>
              </tr>
              <tr>
                <td style="font-family:Arial,sans-serif;color:#888;font-size:14px;padding:8px 0;">Receiver:</td>
                <td style="font-family:Arial,sans-serif;color:#222;font-size:14px;padding:8px 0;">${shipmentDetails.receiverName}</td>
              </tr>
              <tr>
                <td style="font-family:Arial,sans-serif;color:#888;font-size:14px;padding:8px 0;">Shipping Status:</td>
                <td style="font-family:Arial,sans-serif;color:#222;font-size:14px;padding:8px 0;">${shipmentDetails.status}</td>
              </tr>
              <tr>
                <td style="font-family:Arial,sans-serif;color:#888;font-size:14px;padding:8px 0;">Shipping Description:</td>
                <td style="font-family:Arial,sans-serif;color:#222;font-size:14px;padding:8px 0;">${shipmentDetails.description}</td>
              </tr>
              <tr>
                <td style="font-family:Arial,sans-serif;color:#888;font-size:14px;padding:8px 0;">Weight:</td>
                <td style="font-family:Arial,sans-serif;color:#222;font-size:14px;padding:8px 0;">${shipmentDetails.weight}</td>
              </tr>
              <tr>
                <td style="font-family:Arial,sans-serif;color:#888;font-size:14px;padding:8px 0;">Estimated Delivery:</td>
                <td style="font-family:Arial,sans-serif;color:#222;font-size:14px;padding:8px 0;">${shipmentDetails.estimatedDelivery}</td>
              </tr>
              <tr>
                <td style="font-family:Arial,sans-serif;color:#888;font-size:14px;padding:8px 0;">Tracking Code:</td>
                <td style="font-family:Arial,sans-serif;color:#222;font-size:14px;padding:8px 0;">
                <strong>#${trackingId}</strong>
                </td>
              </tr>
              </table>
            </td>
            </tr>
            <tr>
            <td style="padding:0 32px 32px 32px;text-align:center;">
              <a href="${shipmentDetails.trackingUrl}" style="display:inline-block;background:#F97316;color:#fff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;text-decoration:none;padding:12px 32px;border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,0.08);margin-top:16px;">
              Track Shipment
              </a>
            </td>
            </tr>
            <tr>
            <td style="padding:0 32px 32px 32px;text-align:center;">
              <p style="font-family:Arial,sans-serif;color:#aaa;font-size:12px;margin:24px 0 0 0;">&copy; ${new Date().getFullYear()} Pennywise Logistics. All rights reserved.</p>
            </td>
            </tr>
          </table>
          </td>
        </tr>
        </table>
      </div>
      `
    });
    // console.log('Resend  Response:', data);

    return new Response(JSON.stringify({ success: true, data, message: 'Email sent successfully' }), { status: 200, headers });

  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers });
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