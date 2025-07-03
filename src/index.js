// index.js - Add this import and call
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { ThemeProvider } from './components/themeContext';
import { initEmailJS } from './utils/emailService'; // Add this import
import './index.css';

// Initialize EmailJS when app starts
initEmailJS(); // Add this line

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);