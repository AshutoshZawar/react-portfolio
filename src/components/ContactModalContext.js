import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaPaperPlane, FaCheck, FaClock, FaPhone } from 'react-icons/fa';
import { BsCalendarEvent } from 'react-icons/bs';
import { sendEmail } from '../utils/emailService';

const ContactModalContext = createContext();

export const useContactModal = () => {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error('useContactModal must be used within a ContactModalProvider');
  }
  return context;
};

export const ContactModalProvider = ({ children }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeTab, setActiveTab] = useState('quick');
  const [showEmailComposer, setShowEmailComposer] = useState(false);
  const [showCalendarMessage, setShowCalendarMessage] = useState(false);
  const [emailData, setEmailData] = useState({
    from: '',
    to: 'ashujzawar5@gmail.com',
    subject: '',
    message: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [messageLength, setMessageLength] = useState(0);

  const openContactModal = () => {
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
    setShowEmailComposer(false);
    setShowCalendarMessage(false);
    setActiveTab('quick');
    setSubmitSuccess(false);
    setSubmitError(false);
    setErrorMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    
    if (name === 'message') {
      setMessageLength(value.length);
    }
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    setErrorMessage('');
    
    try {
      if (!emailData.from.trim() || !emailData.subject.trim() || !emailData.message.trim()) {
        throw new Error('Please fill in all fields (From, Subject, and Message).');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailData.from)) {
        throw new Error('Please enter a valid email address in the From field.');
      }

      const emailParams = {
        from_name: emailData.from,
        from_email: emailData.from,
        message: `Subject: ${emailData.subject}\n\n${emailData.message}`
      };
      
      console.log('📧 Sending email composer message via EmailJS...', emailParams);
      const result = await sendEmail(emailParams);
      
      if (result.success) {
        console.log('✅ Email composer sent successfully!', result);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        setEmailData({
          from: '',
          to: 'ashujzawar5@gmail.com',
          subject: '',
          message: ''
        });
        
        setTimeout(() => {
          setShowEmailComposer(false);
          setSubmitSuccess(false);
          setShowContactModal(false);
        }, 2500);
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
      
    } catch (error) {
      console.error('❌ Email composer failed:', error);
      setIsSubmitting(false);
      setSubmitError(true);
      setErrorMessage(error.message || 'Failed to send email. Please try again.');
      
      setTimeout(() => {
        setSubmitError(false);
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    setErrorMessage('');
    
    try {
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all required fields.');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address.');
      }

      if (formData.message.length < 10) {
        throw new Error('Message must be at least 10 characters long.');
      }

      const emailParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
      };
      
      console.log('📧 Sending contact form via EmailJS...', emailParams);
      const result = await sendEmail(emailParams);
      
      if (result.success) {
        console.log('✅ Contact form sent successfully!', result);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        setMessageLength(0);
        
        setTimeout(() => {
          setShowContactModal(false);
          setSubmitSuccess(false);
        }, 2500);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
      
    } catch (error) {
      console.error('❌ Contact form failed:', error);
      setIsSubmitting(false);
      setSubmitError(true);
      setErrorMessage(error.message || 'Failed to send message. Please try again.');
      
      setTimeout(() => {
        setSubmitError(false);
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleCalendarClick = () => {
    setShowCalendarMessage(true);
    setTimeout(() => {
      setShowCalendarMessage(false);
    }, 4000);
  };

  const handlePhoneCall = () => {
    window.open('tel:+17043639906');
  };

  const openEmailComposer = () => {
    setShowEmailComposer(true);
    setSubmitError(false);
    setErrorMessage('');
  };

  const closeEmailComposer = () => {
    setShowEmailComposer(false);
    setSubmitError(false);
    setErrorMessage('');
    setEmailData({
      from: '',
      to: 'ashujzawar5@gmail.com',
      subject: '',
      message: ''
    });
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setShowCalendarMessage(false);
    setSubmitError(false);
    setErrorMessage('');
  };

  const value = {
    openContactModal,
    closeContactModal,
    showContactModal,
  };

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      
      <AnimatePresence>
        {showContactModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeContactModal}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px'
            }}
          >
            <motion.div 
              className="contact-modal"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '520px',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(var(--accent-primary-rgb), 0.1)',
                animation: 'modalSlideIn 0.4s ease-out'
              }}
            >
              {showEmailComposer ? (
                <div className="email-composer">
                  <div className="modal-header" style={{ padding: '24px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>Send Email</h2>
                    <button 
                      className="close-btn" 
                      onClick={closeEmailComposer}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '8px',
                        lineHeight: 1,
                        borderRadius: '4px'
                      }}
                    >×</button>
                  </div>
                  
                  <form className="email-form" onSubmit={handleEmailSubmit}>
                    <div className="tab-content" style={{ padding: '24px' }}>
                      <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px', display: 'block' }}>From:</label>
                        <input 
                          type="email" 
                          name="from" 
                          value={emailData.from} 
                          onChange={handleEmailChange}
                          placeholder="your.email@example.com"
                          required
                          style={{
                            padding: '12px 16px',
                            border: '1px solid rgba(var(--accent-primary-rgb), 0.2)',
                            borderRadius: '8px',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontSize: '0.9rem',
                            fontFamily: 'inherit',
                            width: '100%'
                          }}
                        />
                      </div>
                      
                      <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px', display: 'block' }}>To:</label>
                        <input 
                          type="email" 
                          name="to" 
                          value={emailData.to} 
                          readOnly
                          style={{
                            padding: '12px 16px',
                            border: '1px solid rgba(var(--accent-primary-rgb), 0.2)',
                            borderRadius: '8px',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontSize: '0.9rem',
                            fontFamily: 'inherit',
                            width: '100%'
                          }}
                        />
                      </div>
                      
                      <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px', display: 'block' }}>Subject:</label>
                        <input 
                          type="text" 
                          name="subject" 
                          value={emailData.subject} 
                          onChange={handleEmailChange}
                          placeholder="Subject"
                          required
                          style={{
                            padding: '12px 16px',
                            border: '1px solid rgba(var(--accent-primary-rgb), 0.2)',
                            borderRadius: '8px',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontSize: '0.9rem',
                            fontFamily: 'inherit',
                            width: '100%'
                          }}
                        />
                      </div>
                      
                      <div className="form-group" style={{ marginBottom: '24px' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px', display: 'block' }}>Message:</label>
                        <textarea
                          name="message"
                          value={emailData.message}
                          onChange={handleEmailChange}
                          placeholder="What would you like to discuss?"
                          rows="8"
                          required
                          style={{
                            padding: '12px 16px',
                            border: '1px solid rgba(var(--accent-primary-rgb), 0.2)',
                            borderRadius: '8px',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontSize: '0.9rem',
                            fontFamily: 'inherit',
                            width: '100%',
                            resize: 'vertical'
                          }}
                        ></textarea>
                      </div>
                      
                      <button 
                        type="submit" 
                        className={`send-message-btn ${isSubmitting ? 'submitting' : ''}`}
                        disabled={isSubmitting}
                        style={{
                          background: 'var(--accent-primary)',
                          color: 'white',
                          border: 'none',
                          padding: '14px 24px',
                          borderRadius: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          fontSize: '0.9rem',
                          width: '100%',
                          opacity: isSubmitting ? 0.8 : 1
                        }}
                      >
                        <FaPaperPlane style={{ fontSize: '0.9rem' }} /> 
                        {isSubmitting ? 'Sending...' : 'Send Email'}
                      </button>
                      
                      {submitSuccess && (
                        <div 
                          className="success-message"
                          style={{
                            background: 'rgba(34, 197, 94, 0.1)',
                            color: '#16a34a',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            fontSize: '0.9rem',
                            marginTop: '12px',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                        >
                          <FaCheck /> Email sent successfully.I'll get back to you soon.
                        </div>
                      )}
                      
                      {submitError && (
                        <div 
                          className="error-message"
                          style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#dc2626',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            fontSize: '0.9rem',
                            marginTop: '12px',
                            textAlign: 'center'
                          }}
                        >
                          {errorMessage}
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <div className="modal-header" style={{ padding: '24px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="social-links" style={{ display: 'flex', gap: '12px' }}>
                      <a href="https://linkedin.com/in/ashutosh-zawar1" target="_blank" rel="noopener noreferrer" className="social-link" style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'rgba(var(--accent-primary-rgb), 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-primary)',
                        fontSize: '1.2rem',
                        textDecoration: 'none'
                      }}>
                        <FaLinkedin />
                      </a>
                      <a href="https://github.com/AshutoshZawar" target="_blank" rel="noopener noreferrer" className="social-link" style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'rgba(var(--accent-primary-rgb), 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-primary)',
                        fontSize: '1.2rem',
                        textDecoration: 'none'
                      }}>
                        <FaGithub />
                      </a>
                    </div>
                    <button 
                      className="close-btn" 
                      onClick={closeContactModal}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '8px',
                        lineHeight: 1,
                        borderRadius: '4px'
                      }}
                    >×</button>
                  </div>
                  
                  <div className="modal-tabs" style={{
                    display: 'flex',
                    margin: '24px 24px 0',
                    background: 'rgba(var(--accent-primary-rgb), 0.05)',
                    borderRadius: '12px',
                    padding: '4px'
                  }}>
                    <button 
                      className={`tab-button ${activeTab === 'quick' ? 'active' : ''}`} 
                      onClick={() => switchTab('quick')}
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        border: 'none',
                        background: activeTab === 'quick' ? 'var(--accent-primary)' : 'transparent',
                        color: activeTab === 'quick' ? 'white' : 'var(--text-secondary)',
                        fontWeight: 500,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Quick connect
                    </button>
                    <button 
                      className={`tab-button ${activeTab === 'message' ? 'active' : ''}`}
                      onClick={() => switchTab('message')}
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        border: 'none',
                        background: activeTab === 'message' ? 'var(--accent-primary)' : 'transparent',
                        color: activeTab === 'message' ? 'white' : 'var(--text-secondary)',
                        fontWeight: 500,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Send a message
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {showCalendarMessage && (
                      <motion.div 
                        className="calendar-notification"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          margin: '16px 24px 0',
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05))',
                          border: '1px solid rgba(59, 130, 246, 0.2)',
                          borderRadius: '12px',
                          padding: '16px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px'
                        }}
                      >
                        <FaClock style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', marginTop: '2px' }} />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>Calendar Booking Coming Soon!</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>For now, please use phone or email to schedule a meeting. I'll get back to you within 24 hours.</p>
                        </div>
                        <button 
                          onClick={() => setShowCalendarMessage(false)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                        >
                          ×
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {activeTab === 'quick' && (
                    <div className="tab-content" style={{ padding: '24px' }}>
                      <div className="contact-options" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        
                        <div 
                          className="contact-option" 
                          onClick={handlePhoneCall}
                          style={{
                            background: 'var(--bg-primary)',
                            borderRadius: '16px',
                            padding: '20px',
                            cursor: 'pointer',
                            border: '1px solid rgba(var(--accent-primary-rgb), 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px'
                          }}
                        >
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '1.3rem'
                          }}>
                            <FaPhone />
                          </div>
                          <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>Phone</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 500, margin: '0 0 4px 0' }}>+1 (704) 363-9906</p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Call me directly</p>
                          </div>
                        </div>

                        <div 
                          className="contact-option" 
                          onClick={openEmailComposer}
                          style={{
                            background: 'var(--bg-primary)',
                            borderRadius: '16px',
                            padding: '20px',
                            cursor: 'pointer',
                            border: '1px solid rgba(var(--accent-primary-rgb), 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px'
                          }}
                        >
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '1.3rem'
                          }}>
                            <FaEnvelope />
                          </div>
                          <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>Email</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 500, margin: '0 0 4px 0' }}>ashujzawar5@gmail.com</p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Send me an email directly</p>
                          </div>
                        </div>
                        
                        <div 
                          className="contact-option" 
                          onClick={handleCalendarClick}
                          style={{
                            background: 'var(--bg-primary)',
                            borderRadius: '16px',
                            padding: '20px',
                            cursor: 'pointer',
                            border: '1px solid rgba(var(--accent-primary-rgb), 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px'
                          }}
                        >
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '1.3rem'
                          }}>
                            <BsCalendarEvent />
                          </div>
                          <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>Schedule</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 500, margin: '0 0 4px 0' }}>Book a time slot</p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Book a call on my calendar</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'message' && (
                    <div className="tab-content" style={{ padding: '24px' }}>
                      <form className="contact-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', gap: '16px' }}>
                          <div style={{ flex: 1 }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px', display: 'block' }}>Name</label>
                            <input
                              type="text"
                              name="name"
                              placeholder="Your name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              style={{
                                padding: '12px 16px',
                                border: '1px solid rgba(var(--accent-primary-rgb), 0.2)',
                                borderRadius: '8px',
                                background: 'var(--bg-primary)',
                                color: 'var(--text-primary)',
                                fontSize: '0.9rem',
                                fontFamily: 'inherit',
                                width: '100%'
                              }}
                            />
                          </div>
                          
                          <div style={{ flex: 1 }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px', display: 'block' }}>Email</label>
                            <input
                              type="email"
                              name="email"
                              placeholder="your.email@example.com"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              style={{
                                padding: '12px 16px',
                                border: '1px solid rgba(var(--accent-primary-rgb), 0.2)',
                                borderRadius: '8px',
                                background: 'var(--bg-primary)',
                                color: 'var(--text-primary)',
                                fontSize: '0.9rem',
                                fontFamily: 'inherit',
                                width: '100%'
                              }}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>Message</label>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{messageLength}/1000</span>
                          </div>
                          <textarea
                            name="message"
                            placeholder="What would you like to discuss?"
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            maxLength="1000"
                            required
                            style={{
                              padding: '12px 16px',
                              border: '1px solid rgba(var(--accent-primary-rgb), 0.2)',
                              borderRadius: '8px',
                              background: 'var(--bg-primary)',
                              color: 'var(--text-primary)',
                              fontSize: '0.9rem',
                              fontFamily: 'inherit',
                              width: '100%',
                              resize: 'vertical'
                            }}
                          ></textarea>
                        </div>
                        
                        <button 
                          type="submit" 
                          className={`send-message-btn ${isSubmitting ? 'submitting' : ''}`}
                          disabled={isSubmitting}
                          style={{
                            background: 'var(--accent-primary)',
                            color: 'white',
                            border: 'none',
                            padding: '14px 24px',
                            borderRadius: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            fontSize: '0.9rem',
                            marginTop: '8px',
                            opacity: isSubmitting ? 0.8 : 1
                          }}
                        >
                          <FaPaperPlane style={{ fontSize: '0.9rem' }} /> 
                          {isSubmitting ? 'Sending...' : 'Send message'}
                        </button>
                        
                        {submitSuccess && (
                          <div style={{
                            background: 'rgba(34, 197, 94, 0.1)',
                            color: '#16a34a',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            fontSize: '0.9rem',
                            marginTop: '12px',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}>
                            <FaCheck /> Message sent successfully. I'll get back to you soon.
                          </div>
                        )}
                        
                        {submitError && (
                          <div style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#dc2626',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            fontSize: '0.9rem',
                            marginTop: '12px',
                            textAlign: 'center'
                          }}>
                            {errorMessage}
                          </div>
                        )}
                      </form>
                    </div>
                  )}
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '16px 24px',
                    borderTop: '1px solid rgba(var(--accent-primary-rgb), 0.1)',
                    marginTop: '8px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#10b981'
                    }}></div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Currently available for new opportunities</p>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ContactModalContext.Provider>
  );
};