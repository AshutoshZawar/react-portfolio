import React, { useContext } from 'react';
import { Link } from 'react-scroll';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { ThemeContext } from '../components/themeContext';
import { useContactModal } from '../components/ContactModalContext';
import '../styles/footer.css';
import azLogo from '../assets/az-logo.jpeg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useContext(ThemeContext);
  const { openContactModal } = useContactModal();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
          <Link to="home" smooth={true} duration={500}>
            <img 
              src={azLogo} 
              alt="AZ Logo" 
              className="logo-icon" 
              style={{ 
                height: '40px', 
                marginRight: '10px' 
              }} 
            /> 
            Ashutosh Zawar
          </Link>
            <p className="footer-tagline">
              Software Engineer & AI Specialist
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h4>Navigation</h4>
              <ul>
                <li>
                  <Link to="home" smooth={true} duration={500}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="about" smooth={true} duration={500}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="projects" smooth={true} duration={500}>
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="testimonials" smooth={true} duration={500}>
                    Testimonials
                  </Link>
                </li>
                <li>
                  <button
                    onClick={openContactModal}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      font: 'inherit',
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: '0.9rem',
                      textAlign: 'left',
                      transition: 'color 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4>Connect</h4>
              <ul>
                <li>
                  <a href="https://linkedin.com/in/ashutosh-zawar1" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin /> LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com/AshutoshZawar" target="_blank" rel="noopener noreferrer">
                    <FaGithub /> GitHub
                  </a>
                </li>
                <li>
                  <a href="mailto:ashujzawar5@gmail.com">
                    <FaEnvelope /> Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {currentYear} Ashutosh Zawar. All rights reserved.
          </div>
          <div className="footer-cta">
            <p>Looking for new opportunities</p>
            <button 
              onClick={openContactModal}
              className="footer-button"
              style={{
                background: 'rgba(var(--accent-primary-rgb), 0.1)',
                color: 'var(--accent-primary)',
                border: '1px solid rgba(var(--accent-primary-rgb), 0.3)',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textDecoration: 'none',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--accent-primary)';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(var(--accent-primary-rgb), 0.1)';
                e.target.style.color = 'var(--accent-primary)';
              }}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;