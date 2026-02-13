
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: Request) => {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const formData = await req.json();
        const { name, email, phone, pickupLocation, destination, date, time, passengers, serviceType } = formData;

        // Send email to Admin
        await resend.emails.send({
            from: 'Kingsway Chauffeur <info@app.ridekingsway.com>',
            to: ['kingswayro@gmail.com'],
            subject: `New Booking Request: ${name}`,
            html: `
        <h1>New Booking Request</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Pickup:</strong> ${pickupLocation}</p>
        <p><strong>Destination:</strong> ${destination}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Passengers:</strong> ${passengers}</p>
        <p><strong>Service Type:</strong> ${serviceType}</p>
      `,
        });

        // Send confirmation email to User
        await resend.emails.send({
            from: 'Kingsway Chauffeur <info@app.ridekingsway.com>',
            to: [email],
            subject: 'Booking Confirmation - Kingsway Chauffeur',
            html: `
        <h1>Booking Received</h1>
        <p>Dear ${name},</p>
        <p>Thank you for choosing Kingsway Chauffeur. We have received your booking request.</p>
        <p><strong>Trip Details:</strong></p>
        <ul>
          <li><strong>Pickup:</strong> ${pickupLocation}</li>
          <li><strong>Destination:</strong> ${destination}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
        </ul>
        <p>Our team will review your request and contact you shortly to confirm the details.</p>
        <p>Best regards,<br>Kingsway Chauffeur Team</p>
      `,
        });

        return new Response(JSON.stringify({ message: 'Episodes sent successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
