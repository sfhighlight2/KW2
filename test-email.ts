import { Resend } from 'resend';

// Load API key from environment
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_7xKoXDGd_GXW7YFvwAFn6FJf6cJTgZh7F';

const resend = new Resend(RESEND_API_KEY);

async function testEmailSending() {
    console.log('🧪 Testing Resend Email Integration...\n');

    const testFormData = {
        name: 'Test Customer',
        email: 'test@example.com', // Change this to a real email to receive test
        phone: '+1 (555) 123-4567',
        pickupLocation: '123 Main Street, New York, NY',
        destination: 'JFK Airport, Queens, NY',
        date: '2026-02-20',
        time: '14:30',
        passengers: '2',
        serviceType: 'Airport VIP'
    };

    try {
        console.log('📧 Sending admin notification email...');
        const adminEmail = await resend.emails.send({
            from: 'Kingsway Chauffeur <info@app.ridekingsway.com>',
            to: ['kingswayro@gmail.com'],
            subject: `New Booking Request: ${testFormData.name}`,
            html: `
        <h1>New Booking Request</h1>
        <p><strong>Name:</strong> ${testFormData.name}</p>
        <p><strong>Email:</strong> ${testFormData.email}</p>
        <p><strong>Phone:</strong> ${testFormData.phone}</p>
        <p><strong>Pickup:</strong> ${testFormData.pickupLocation}</p>
        <p><strong>Destination:</strong> ${testFormData.destination}</p>
        <p><strong>Date:</strong> ${testFormData.date}</p>
        <p><strong>Time:</strong> ${testFormData.time}</p>
        <p><strong>Passengers:</strong> ${testFormData.passengers}</p>
        <p><strong>Service Type:</strong> ${testFormData.serviceType}</p>
      `,
        });
        console.log('✅ Admin email sent successfully!');
        console.log('   Email ID:', adminEmail.data?.id);

        console.log('\n📧 Sending customer confirmation email...');
        const customerEmail = await resend.emails.send({
            from: 'Kingsway Chauffeur <info@app.ridekingsway.com>',
            to: [testFormData.email],
            subject: 'Booking Confirmation - Kingsway Chauffeur',
            html: `
        <h1>Booking Received</h1>
        <p>Dear ${testFormData.name},</p>
        <p>Thank you for choosing Kingsway Chauffeur. We have received your booking request.</p>
        <p><strong>Trip Details:</strong></p>
        <ul>
          <li><strong>Pickup:</strong> ${testFormData.pickupLocation}</li>
          <li><strong>Destination:</strong> ${testFormData.destination}</li>
          <li><strong>Date:</strong> ${testFormData.date}</li>
          <li><strong>Time:</strong> ${testFormData.time}</li>
        </ul>
        <p>Our team will review your request and contact you shortly to confirm the details.</p>
        <p>Best regards,<br>Kingsway Chauffeur Team</p>
      `,
        });
        console.log('✅ Customer email sent successfully!');
        console.log('   Email ID:', customerEmail.data?.id);

        console.log('\n✅ All tests passed! Email integration is working correctly.');
        console.log('\n⚠️  IMPORTANT: Check that kingswayro@gmail.com received the test email.');
    } catch (error) {
        console.error('\n❌ Error sending emails:', error);
        if (error instanceof Error) {
            console.error('   Message:', error.message);
        }
        process.exit(1);
    }
}

testEmailSending();
