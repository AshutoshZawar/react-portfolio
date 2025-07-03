import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectDetail from './projectDetail';
import projects from '../data/projects';
import '../styles/projectGrid.css';

const ProjectGrid = () => {
  const scrollRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Handle horizontal scroll with mouse wheel
  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollRef.current) {
        if (e.deltaY !== 0) {
          e.preventDefault();
          scrollRef.current.scrollLeft += e.deltaY;
        }
      }
    };

    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // Handle project selection
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  // Handle project detail close
  const handleCloseDetail = () => {
    setSelectedProject(null);
    document.body.style.overflow = ''; // Restore scrolling
  };

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <div className="section-description">
            <h3>My Technical Portfolio</h3>
            <p>Explore my projects showcasing expertise in AI, Data Engineering, and Full-Stack Development</p>
          </div>
        </div>
        
        <div className="project-slider-container">
          <div 
            className="project-slider"
            ref={scrollRef}
          >
            {projects.map((project) => (
              <motion.div 
                key={project.id} 
                className="project-slide"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                onClick={() => handleProjectClick(project)}
              >
                <div className="project-card-container">
                  <div className="project-image" style={{ backgroundImage: `url(${project.image})` }}>
                    <div className="project-overlay">
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
                      <button className="project-link">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="slider-controls">
            <button 
              className="scroll-button prev"
              onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })}
            >
              &lt;
            </button>
            <button 
              className="scroll-button next"
              onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })}
            >
              &gt;
            </button>
          </div>
        </div>
        
        <div className="projects-stats">
          <div className="stat-item">
            <h3>AI & ML</h3>
            <p>SPECIALIZATION</p>
          </div>
          <div className="stat-item">
            <h3>96%</h3>
            <p>ML MODEL ACCURACY</p>
          </div>
          <div className="stat-item">
            <h3>FULL-STACK</h3>
            <p>DEVELOPMENT</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail 
            project={selectedProject} 
            onClose={handleCloseDetail} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectGrid;