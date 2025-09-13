// lib/sendEmail.js
 // Create a function that sends a shipping confirmation email using Resend API.  Fetch the user's email and shipping details from the supabase  using tracking ID. The email should inculde sender name, Receiver name, From, to, weight, estimated delivery, and tracking ID. user the Resend SDK to send the email
// export const sendEmailNotification = async (userEmail, trackingId, shipmentDetails) => {
//   // Send email using Resend SDK
//   try {
//     await fetch('https://api.resend.com/emails', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 're_DNNcQTSM_6zMTfZDnVD8Ls8Tn3t9fXXY1'
//       },
//       body: JSON.stringify({
//         form: 'PennyWise Logistics <contactus@pennywiselogistics.online>',
//         to: userEmail.email,
//         subject: `PennyWise Logistics Order Shipment: #${trackingId.trackingId}`,
//         html: `
//           <div style="background:#f6f6f6;padding:0;margin:0; width:100%; font-family:Arial,sans-serif;">
//             <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f6;padding:0;margin:0;">
//             <tr>
//               <td align="center">
//               <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.05);margin:40px 0;">
//                 <tr>
//                 <td style="padding:32px 32px 16px 32px;text-align:center;">
//                   <!-- Logo Placeholder -->
//                   <img src="https://via.placeholder.com/120x40?text=Logo" alt="Pennywise Logistics" style="display:block;margin:0 auto 16px auto;max-width:120px;">
//                   <h2 style="font-family:Arial,sans-serif;color:#222;font-size:24px;margin:0 0 8px 0;">Pennywise Logistics</h2>
//                   <p style="font-family:Arial,sans-serif;color:#555;font-size:16px;margin:0 0 24px 0;">Your shipment is on its way!</p>
//                 </td>
//                 </tr>
//                 <tr>
//                 <td style="padding:0 32px 24px 32px;">
//                   <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
//                   <tr>
//                     <td style="font-family:Arial,sans-serif;color:#888;font-size:14px;padding:8px 0;">From:</td>
//                     <td style="font-family:Arial,sans-serif;color:#222;font-size:14px;padding:8px 0;">${shipmentDetails.from}</td>
//                   </tr>
//                   <tr>
//                     <td style="font-family:Arial,sans-serif;color:#888;font-size:14px;padding:8px 0;">To:</td>
//                     <td style="font-family:Arial,sans-serif;color:#222;font-size:14px;padding:8px 0;">${shipmentDetails.to}</td>
//                   </tr>
//                   <tr>
//                     <td style="font-family:Arial,sans-serif;color:#888;font-size:14px;padding:8px 0;">Sender:</td>
//                     <td style="font-family:Arial,sans-serif;color:#222;font-size:14px;padding:8px 0;">${shipmentDetails.senderName}</td>
//                   </tr>
//                   <tr>
//                     <td style="font-family:Arial,sans-serif;color:#888;font-size:14px;padding:8px 0;">Receiver:</td>
//                     <td style="font-family:Arial,sans-serif;color:#222;font-size:14px;padding:8px 0;">${shipmentDetails.receiverName}</td>
//                   </tr>
//                   <tr>
//                     <td style="font-family:Arial,sans-serif;color:#888;font-size:14px;padding:8px 0;">Shipping Status:</td>
//                     <td style="font-family:Arial,sans-serif;color:#222;font-size:14px;padding:8px 0;">${shipmentDetails.status}</td>
//                   </tr>
//                   <tr>
//                     <td style="font-family:Arial,sans-serif;color:#888;font-size:14px;padding:8px 0;">Weight:</td>
//                     <td style="font-family:Arial,sans-serif;color:#222;font-size:14px;padding:8px 0;">${shipmentDetails.weight}</td>
//                   </tr>
//                   <tr>
//                     <td style="font-family:Arial,sans-serif;color:#888;font-size:14px;padding:8px 0;">Estimated Delivery:</td>
//                     <td style="font-family:Arial,sans-serif;color:#222;font-size:14px;padding:8px 0;">${shipmentDetails.estimatedDelivery}</td>
//                   </tr>
//                   <tr>
//                     <td style="font-family:Arial,sans-serif;color:#888;font-size:14px;padding:8px 0;">Tracking Code:</td>
//                     <td style="font-family:Arial,sans-serif;color:#222;font-size:14px;padding:8px 0;">
//                     <strong>${trackingId.trackingId}</strong>
//                     </td>
//                   </tr>
//                   </table>
//                 </td>
//                 </tr>
//                 <tr>
//                 <td style="padding:0 32px 32px 32px;text-align:center;">
//                   <a href="${shipmentDetails.trackingUrl}" style="display:inline-block;background:#F97316;color:#fff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;text-decoration:none;padding:12px 32px;border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,0.08);margin-top:16px;">
//                   Track Shipment
//                   </a>
//                 </td>
//                 </tr>
//                 <tr>
//                 <td style="padding:0 32px 32px 32px;text-align:center;">
//                   <p style="font-family:Arial,sans-serif;color:#aaa;font-size:12px;margin:24px 0 0 0;">&copy; ${new Date().getFullYear()} Pennywise Logistics. All rights reserved.</p>
//                 </td>
//                 </tr>
//               </table>
//               </td>
//             </tr>
//             </table>
//           </div>
//       `
//       })
//     });
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };
export const sendEmailNotification = async (userEmail, trackingId, shipmentDetails) => {
  // Send email using Resend SDK
  try {
    await fetch('https://resend-api-backend.vercel.app/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userEmail,
        trackingId: trackingId,
        shipmentDetails: shipmentDetails
      })
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};