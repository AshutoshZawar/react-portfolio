import React, { createContext, useState, useEffect } from 'react';

// Create context with default values
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

// Create the provider component
export const ThemeProvider = ({ children }) => {
  // Initialize theme state
  const [theme, setTheme] = useState('light');

  // Effect to load saved theme on initial render
  useEffect(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Use saved theme if available
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Fallback to system preference if no saved theme
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Log for debugging
    console.log('Initial theme set to:', savedTheme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  }, []);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    console.log('Theme toggled to:', newTheme); // Debug log
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;