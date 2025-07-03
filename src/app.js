import React, { useEffect, useContext } from 'react';
import Navbar from './components/navbar';
import Hero from './components/hero';
import About from './components/about';
import Skills from './components/skills';
import ProjectGrid from './components/projectGrid';
import Contact from './components/contact';
import Testimonials from './components/testimonials'; // Add this import
import Footer from './components/footer';
import { ThemeContext } from './components/themeContext';
import { ContactModalProvider } from './components/ContactModalContext';
import './app.css';

function App() {
  const { theme } = useContext(ThemeContext);
  
  useEffect(() => {
    document.title = "Ashutosh Zawar | Portfolio";
    
    // Ensure theme is applied to document
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Inline style to ensure consistent background
  const appStyle = {
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    transition: 'background-color 0.3s, color 0.3s'
  };

  return (
    <ContactModalProvider>
      <div className="App theme-transition" style={appStyle}>
        <Navbar />
        
        {/* Remove the id divs and render components directly */}
        <Hero />
        <About />
        <Skills />
        <ProjectGrid />
        <Contact />
        <Testimonials /> {/* Add testimonials section above footer */}
        <Footer />
      </div>
    </ContactModalProvider>
  );
}

export default App;