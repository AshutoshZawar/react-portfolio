import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import '../styles/projectCard.css';

const ProjectCard = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    if (!cardRef.current || isFlipped) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  // Toggle card flip
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className="project-card-container"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className={`project-card ${isFlipped ? 'is-flipped' : ''}`}
        style={{
          transform: isFlipped 
            ? 'rotateY(180deg)' 
            : `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
      >
        {/* Front Side */}
        <div className="project-card-front">
          <div className="project-card-image-container">
            <div className="project-card-image" style={{ backgroundImage: `url(${project.image})` }}>
              <div className="project-card-overlay">
                <div className="project-card-content">
                  <h3>{project.title}</h3>
                  <p className="project-period">{project.period}</p>
                  <div className="project-tech-stack">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="tech-badge">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-badge">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="project-card-back">
          <div className="project-card-back-content">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            
            <div className="project-details">
              <h4>Key Features:</h4>
              <ul>
                {project.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            
            <div className="project-tech-stack-full">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-badge">{tech}</span>
              ))}
            </div>
            
            <div className="project-price-info">
              <div className="price-container">
                <span className="price-label">Total Price</span>
                <span className="price-value">{project.totalPrice}</span>
              </div>
              <div className="price-container">
                <span className="price-label">Floor Price</span>
                <span className="price-value">{project.floorPrice}</span>
              </div>
            </div>
            
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-link">
              <FaGithub /> View on GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
