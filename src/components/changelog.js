import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import '../styles/changelog.css';

const ChangelogButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Launch confetti effect from both sides
  const launchConfetti = () => {
    // Left side confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { x: 0, y: 0.6 },
      colors: ['#60a5fa', '#ff718d', '#93c5fd'],
      angle: 60,
      startVelocity: 45,
      gravity: 0.8,
      decay: 0.94,
      ticks: 300
    });

    // Right side confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { x: 1, y: 0.6 },
      colors: ['#29cdff', '#93c5fd', '#5271ff'],
      angle: 120,
      startVelocity: 45,
      gravity: 0.8,
      decay: 0.94,
      ticks: 300
    });
  };

  return (
    <motion.div 
      className="changelog-button-container"
    >
      <button
        className={`changelog-button ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={launchConfetti}
      >
        <div className="changelog-button-content">
          <span className="changelog-rocket">🎉</span>
          <span className="changelog-text">Hi, there!</span>
          <span className="changelog-arrow">➔</span>
        </div>
        <div className="changelog-button-border"></div>
      </button>
    </motion.div>
  );
};

export default ChangelogButton;