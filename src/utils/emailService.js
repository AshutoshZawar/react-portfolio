// utils/emailService.js
import emailjs from '@emailjs/browser';

// EmailJS configuration from environment variables
const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY
};

// Initialize EmailJS - call this once when app starts
export const initEmailJS = () => {
  if (EMAILJS_CONFIG.PUBLIC_KEY) {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('✅ EmailJS initialized successfully');
    console.log('📧 Service ID:', EMAILJS_CONFIG.SERVICE_ID);
    console.log('📄 Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);
  } else {
    console.error('❌ EmailJS PUBLIC_KEY not found. Check your .env file.');
  }
};

// Validate EmailJS configuration
const validateConfig = () => {
  const missing = [];
  if (!EMAILJS_CONFIG.SERVICE_ID) missing.push('REACT_APP_EMAILJS_SERVICE_ID');
  if (!EMAILJS_CONFIG.TEMPLATE_ID) missing.push('REACT_APP_EMAILJS_TEMPLATE_ID');
  if (!EMAILJS_CONFIG.PUBLIC_KEY) missing.push('REACT_APP_EMAILJS_PUBLIC_KEY');
  
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
};

// Main function to send emails
export const sendEmail = async (templateParams) => {
  try {
    // Validate configuration
    validateConfig();
    
    // Add timestamp to the email
    const emailParams = {
      ...templateParams,
      sent_time: new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      })
    };
    
    console.log('📧 Sending email with EmailJS...');
    console.log('📋 Template params:', emailParams);
    
    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      emailParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    
    console.log('✅ Email sent successfully!', response);
    return { 
      success: true, 
      data: response,
      message: 'Email sent successfully!' 
    };
    
  } catch (error) {
    console.error('❌ EmailJS Error:', error);
    
    // Provide user-friendly error messages
    let errorMessage = 'Failed to send email. Please try again.';
    
    if (error.message?.includes('Missing environment variables')) {
      errorMessage = 'Email service configuration error. Please contact support.';
    } else if (error.status === 422) {
      errorMessage = 'Invalid email format. Please check your email address.';
    } else if (error.status === 400) {
      errorMessage = 'Please fill in all required fields correctly.';
    } else if (error.status === 403) {
      errorMessage = 'Email service temporarily unavailable. Please try again later.';
    } else if (error.text?.includes('rate limit')) {
      errorMessage = 'Too many emails sent. Please wait a moment and try again.';
    }
    
    return { 
      success: false, 
      error: errorMessage,
      details: error.message 
    };
  }
};

// Test function for development
export const sendTestEmail = async () => {
  console.log('🧪 Sending test email...');
  
  const testParams = {
    from_name: 'Test User',
    from_email: 'test@example.com',
    message: 'This is a test email from your portfolio! If you receive this, EmailJS is working correctly. 🎉'
  };
  
  return await sendEmail(testParams);
};