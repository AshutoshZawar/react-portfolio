import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useContactModal } from '../components/ContactModalContext';
import '../styles/contact.css';

const Contact = () => {
  const { openContactModal } = useContactModal();

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-text"
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div><span className="from-concept">FROM CONCEPT TO</span> <span className="creation">CREATION</span></div>
              <div><span className="lets-make">LET's MAKE IT</span> <span className="happen">HAPPEN!</span></div>
            </motion.h1>
            
            <motion.div 
              className="hero-button-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <button onClick={openContactModal} className="get-in-touch-btn">
                Get In Touch <FaArrowRight className="arrow-icon" />
              </button>
            </motion.div>
            
            <motion.div 
              className="availability-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="availability-text">
                I'm available for full-time roles & freelance projects.
              </h2>
              <p className="hero-description">
                I thrive on crafting dynamic web applications, and 
                delivering seamless user experiences.
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="rotating-badge-container"
            initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.9, type: "spring", stiffness: 100 }}
          >
            <div className="rotating-badge">
              <svg viewBox="0 0 200 200" className="rotating-text">
                <defs>
                  <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7163fb" />
                    <stop offset="100%" stopColor="#4d7cfe" />
                  </linearGradient>
                  <path id="circle-path" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"></path>
                </defs>
                <text>
                  <textPath href="#circle-path" className="rotating-text-path" fill="url(#textGradient)">
                    • OPEN TO WORK • OPEN TO WORK • OPEN TO WORK •
                  </textPath>
                </text>
              </svg>
              <div className="badge-center">
                <span className="star-icon">★</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;