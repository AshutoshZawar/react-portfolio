import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaTimes } from 'react-icons/fa';
import '../styles/projectDetail.css';

const ProjectDetail = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div 
      className="project-detail-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="project-detail-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="project-detail-content">
          <div className="project-detail-header">
            <div className="project-detail-image" style={{ backgroundImage: `url(${project.image})` }} />
            <div className="project-detail-title">
              <h2>{project.title}</h2>
              <p className="project-period">{project.period}</p>
            </div>
          </div>
          
          <div className="project-detail-info">
            <div className="project-detail-description">
              <h3>Overview</h3>
              <p>{project.description}</p>
            </div>
            
            <div className="project-detail-tech">
              <h3>Technologies</h3>
              <div className="tech-stack">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="project-detail-features">
              <h3>Key Features</h3>
              <ul>
                {project.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            
            <div className="project-detail-actions">
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="github-link"
              >
                <FaGithub /> View on GitHub
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;