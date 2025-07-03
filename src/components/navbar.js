import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ThemeContext } from '../components/themeContext';
import { useContactModal } from '../components/ContactModalContext';
import '../styles/navbar.css';
import resumePDF from '../assets/Ashutosh_Zawar_resume.pdf';
import azLogo from '../assets/az-logo.jpeg';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { openContactModal } = useContactModal();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle contact click
  const handleContactClick = () => {
    setMenuOpen(false); // Close mobile menu if open
    openContactModal(); // Open contact modal
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <div className="navbar-logo">
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
        </div>

        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <Link 
            to="about" 
            smooth={true} 
            duration={500} 
            onClick={() => setMenuOpen(false)}
            className="nav-link"
          >
            About
          </Link>
          <Link 
            to="skills" 
            smooth={true} 
            duration={500} 
            onClick={() => setMenuOpen(false)}
            className="nav-link"
          >
            Skills
          </Link>
          <Link 
            to="projects" 
            smooth={true} 
            duration={500} 
            onClick={() => setMenuOpen(false)}
            className="nav-link"
          >
            Projects
          </Link>
          <Link 
            to="testimonials" 
            smooth={true} 
            duration={500} 
            onClick={() => setMenuOpen(false)}
            className="nav-link"
          >
            Testimonials
          </Link>
          <button
            onClick={handleContactClick}
            className="nav-link nav-contact-button"
          >
            Contact
          </button>
        </div>

        <div className="navbar-actions">
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          {/* Fixed resume link */}
          <a 
            href={resumePDF} 
            download="Ashutosh_Zawar_resume.pdf"
            className="sign-in-btn"
          >
            Resume
          </a>
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;