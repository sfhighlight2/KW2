import { Resend } from 'resend';

const escapeHtml = (value: unknown) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

export default async (req: Request) => {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        if (!process.env.RESEND_API_KEY) {
            console.error('Email configuration is unavailable');
            return new Response(JSON.stringify({ error: 'Email service unavailable' }), {
                status: 503,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const formData = await req.json();
        const { name, email, phone, pickupLocation, destination, pickupDate, pickupTime, dropoffDate, dropoffTime, passengers, serviceType } = formData;
        const requiredFields = [name, email, phone, pickupLocation, destination, pickupDate, pickupTime, passengers, serviceType];

        if (requiredFields.some(value => typeof value !== 'string' || !value.trim())) {
            return new Response(JSON.stringify({ error: 'Missing required booking details' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);
        const safe = {
            name: escapeHtml(name),
            email: escapeHtml(email),
            phone: escapeHtml(phone),
            pickupLocation: escapeHtml(pickupLocation),
            destination: escapeHtml(destination),
            pickupDate: escapeHtml(pickupDate),
            pickupTime: escapeHtml(pickupTime),
            dropoffDate: escapeHtml(dropoffDate),
            dropoffTime: escapeHtml(dropoffTime),
            passengers: escapeHtml(passengers),
            serviceType: escapeHtml(serviceType),
        };

        const adminEmail = await resend.emails.send({
            from: 'Kingsway Chauffeur <info@app.ridekingsway.com>',
            to: ['Kingsway@gmail.com'],
            replyTo: email,
            subject: `New Booking Request: ${safe.name}`,
            html: `
        <h1>New Booking Request</h1>
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Phone:</strong> ${safe.phone}</p>
        <p><strong>Pickup Location:</strong> ${safe.pickupLocation}</p>
        <p><strong>Pickup Date:</strong> ${safe.pickupDate}</p>
        <p><strong>Pickup Time:</strong> ${safe.pickupTime}</p>
        <p><strong>Drop-off Location:</strong> ${safe.destination}</p>
        <p><strong>Drop-off Date:</strong> ${safe.dropoffDate}</p>
        <p><strong>Drop-off Time:</strong> ${safe.dropoffTime}</p>
        <p><strong>Passengers:</strong> ${safe.passengers}</p>
        <p><strong>Service Type:</strong> ${safe.serviceType}</p>
      `,
        });

        if (adminEmail.error) {
            console.error('Admin email rejected', {
                name: adminEmail.error.name,
                message: adminEmail.error.message,
            });
            return new Response(JSON.stringify({ error: 'Email notification rejected' }), {
                status: 502,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const confirmationEmail = await resend.emails.send({
            from: 'Kingsway Chauffeur <info@app.ridekingsway.com>',
            to: [email],
            subject: 'Booking Confirmation - Kingsway Chauffeur',
            html: `
        <h1>Booking Received</h1>
        <p>Dear ${safe.name},</p>
        <p>Thank you for choosing Kingsway Chauffeur. We have received your booking request.</p>
        <p><strong>Trip Details:</strong></p>
        <ul>
          <li><strong>Pickup Location:</strong> ${safe.pickupLocation}</li>
          <li><strong>Pickup Date:</strong> ${safe.pickupDate}</li>
          <li><strong>Pickup Time:</strong> ${safe.pickupTime}</li>
          <li><strong>Drop-off Location:</strong> ${safe.destination}</li>
          <li><strong>Drop-off Date:</strong> ${safe.dropoffDate}</li>
          <li><strong>Drop-off Time:</strong> ${safe.dropoffTime}</li>
        </ul>
        <p>Our team will review your request and contact you shortly to confirm the details.</p>
        <p>Best regards,<br>Kingsway Chauffeur Team</p>
      `,
        });

        if (confirmationEmail.error) {
            console.error('Confirmation email rejected', {
                name: confirmationEmail.error.name,
                message: confirmationEmail.error.message,
            });
            return new Response(JSON.stringify({ error: 'Confirmation email rejected' }), {
                status: 502,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ message: 'Emails sent successfully' }), {
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
