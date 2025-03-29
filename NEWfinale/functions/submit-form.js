// Load environment variables
require('dotenv').config({ path: './config/.env' });
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse the JSON body
    const body = JSON.parse(event.body);
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }

    // Prepare email content
    const mailOptions = {
      from: `"WebWacos Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      subject: `New Contact Form Submission - ${service} Package`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>This email was sent from the WebWacos website contact form.</p>
      `,
      text: `
        New Contact Form Submission
        ---------------------------
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Service: ${service}
        
        Message:
        ${message}
        
        This email was sent from the WebWacos website contact form.
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully!' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending message', error: error.message }),
    };
  }
}; 