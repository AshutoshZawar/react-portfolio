import React, { useEffect, useRef, useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../components/themeContext';
import ChangelogButton from '../components/changelog';
import { sendTestEmail } from '../utils/emailService'; // Add EmailJS test import
import '../styles/hero.css';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentText, setCurrentText] = useState(0);
  const profileRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  
  // Array of dynamic texts for typing animation
  const dynamicTexts = [
    "Ashutosh Zawar",
    "Developer",
    "Learner",
    "Data Scientist",
    "AI Engineer"
  ];

  // Set up interval for changing text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % dynamicTexts.length);
    }, 3000); // Change text every 3 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const dynamicTextVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -15,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.7,
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  // Handle mouse movement for profile card dancing effect
  const handleMouseMove = (e) => {
    if (!profileRef.current) return;
    
    const card = profileRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (normalized between -1 and 1)
    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);
    
    // Apply tilt effect (negative values tilt in opposite direction)
    setMousePosition({ 
      x: mouseX * -15, // adjust multiplier for more/less effect
      y: mouseY * -15 
    });
  };

  // Reset tilt when mouse leaves
  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // EmailJS test function
  const handleEmailJSTest = async () => {
    console.log('🧪 Testing EmailJS integration...');
    try {
      const result = await sendTestEmail();
      if (result.success) {
        alert('✅ EmailJS is working! Check your email inbox.');
        console.log('✅ EmailJS test successful:', result);
      } else {
        alert('❌ EmailJS test failed: ' + result.error);
        console.error('❌ EmailJS test failed:', result);
      }
    } catch (error) {
      alert('❌ EmailJS test error: ' + error.message);
      console.error('❌ EmailJS test error:', error);
    }
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-background">
        <div className="gradient-overlay"></div>
      </div>
      
      <div className="hero-content">
        <motion.div 
          className="hero-text"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <div className="heading-container">
            <h1 className="hello-world-text">Hello World,</h1>
            <div className="i-am-container">
              <h1 className="i-am-text">I am</h1>
              <h1 className="dynamic-text-container">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentText}
                    className="dynamic-text"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dynamicTextVariants}
                  >
                    {dynamicTexts[currentText]}
                  </motion.span>
                </AnimatePresence>
              </h1>
            </div>
          </div>
          
          <p>
          Hey there! I'm a Master's in Computer Science student who's absolutely fascinated by turning crazy ideas into real, working solutions. I've been lucky enough to work on everything from AI systems that actually stay up and running (99.9% uptime!) to VR environments that literally respond to your heartbeat—and honestly, I get way too excited about this stuff. Whether I'm automating data pipelines or building full-stack apps, I'm always chasing that moment when complex problems click into elegant solutions that people can actually use and benefit from.
          </p>
          
          {/* Hi, there! button placed after description */}
          <div className="hero-confetti-container">
            <ChangelogButton />
          </div>

          {/* 🧪 EMAILJS TEST BUTTON - TEMPORARY (Remove after testing)
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            background: 'rgba(59, 130, 246, 0.1)', 
            borderRadius: '12px',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <p style={{ 
              fontSize: '0.9rem', 
              color: 'var(--text-secondary)', 
              margin: '0 0 10px 0',
              fontWeight: '500'
            }}>
              🧪 Development Testing:
            </p>
            <button 
              onClick={handleEmailJSTest}
              style={{ 
                padding: '12px 24px', 
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', 
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
              }}
            >
              🧪 Test EmailJS Integration
            </button>
            <p style={{ 
              fontSize: '0.8rem', 
              color: 'var(--text-secondary)', 
              margin: '8px 0 0 0',
              opacity: '0.8'
            }}>
              Click to verify email service is working properly
            </p>
          </div> */}
        </motion.div>
        
        <div className="hero-image">
          <motion.div 
            className="profile-card"
            ref={profileRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
              rotateY: mousePosition.x,
              rotateX: mousePosition.y,
              transition: { type: "spring", stiffness: 100, damping: 10 }
            }}
          >
            <div className="profile-image">
              <img src="/images/profile.jpeg" alt="Ashutosh Zawar" />
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="hero-stats"
        initial="hidden"
        animate="visible"
        variants={statsVariants}
      >
        <div className="stat-item">
          <h3>7+</h3>
          <p>PROJECTS</p>
        </div>
        <div className="stat-item">
          <h3>3+</h3>
          <p>YEARS EXPERIENCE</p>
        </div>
        <div className="stat-item">
          <h3>20+</h3>
          <p>TECHNOLOGIES</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;