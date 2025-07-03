import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message, subject } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, and message are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Prepare email content
    const emailSubject = subject || `Portfolio Contact: ${name}`;
    const emailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Portfolio Contact</h1>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2c3e50; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h2>
            
            <div style="margin: 15px 0;">
              <strong style="color: #34495e; display: inline-block; width: 80px;">Name:</strong>
              <span style="color: #2c3e50; font-size: 16px;">${name}</span>
            </div>
            
            <div style="margin: 15px 0;">
              <strong style="color: #34495e; display: inline-block; width: 80px;">Email:</strong>
              <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-size: 16px;">${email}</a>
            </div>
            
            <div style="margin: 15px 0;">
              <strong style="color: #34495e; display: inline-block; width: 80px;">Time:</strong>
              <span style="color: #2c3e50; font-size: 16px;">${new Date().toLocaleString()}</span>
            </div>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2c3e50; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message</h2>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea; margin-top: 15px;">
              <p style="color: #2c3e50; line-height: 1.6; margin: 0; font-size: 16px; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center;">
            <p style="color: #6c757d; font-size: 14px; margin: 0;">
              📧 Sent from your portfolio contact form
            </p>
            <p style="color: #6c757d; font-size: 12px; margin: 5px 0 0 0;">
              Reply directly to this email to respond to ${name}
            </p>
          </div>
        </div>
      </div>
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Replace with your verified domain
      to: ['ashujzawar5@gmail.com'], // Your email
      subject: emailSubject,
      html: emailHtml,
      replyTo: email, // When you reply, it goes to the sender
    });

    console.log('✅ Email sent successfully:', data);

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!',
      id: data.id 
    });

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    
    return res.status(500).json({ 
      error: 'Failed to send email. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}