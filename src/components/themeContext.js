import React, { createContext, useState, useEffect } from 'react';

// Create context with default values
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

// Create the provider component
export const ThemeProvider = ({ children }) => {
  // Initialize theme state to 'light' by default
  const [theme, setTheme] = useState('light');

  // Effect to load saved theme on initial render
  useEffect(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Use saved theme if available
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
      console.log('Loaded saved theme:', savedTheme);
    } else {
      // DEFAULT TO LIGHT MODE (no system preference check)
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
      console.log('No saved theme found, defaulting to light mode');
    }
  }, []);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    console.log('Theme toggled to:', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;