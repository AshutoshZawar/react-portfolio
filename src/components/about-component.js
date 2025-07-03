import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';

const About = () => {
  // Updated skills data based on comprehensive resume analysis
  const skills = [
    {
      category: "Programming Languages",
      items: ["Python", "C", "C++", "JavaScript", "JAVA"]
    },
    {
      category: "Libraries & Frameworks",
      items: ["Keras", "NumPy", "Pandas", "Matplotlib", "TensorFlow", "MlFlow", "Scikit-learn", "Sklearn", "OpenCV", "PyTorch", "Computer Vision", "Express.js", "Django", "Flask"]
    },
    {
      category: "Cloud & Front-End",
      items: ["AWS", "HTML", "CSS", "Bootstrap", "Angular", "React", "Vue.js", "Nuxt.js", "Tableau", "PowerBI"]
    },
    {
      category: "Back-End Technologies",
      items: ["Node.js", "MongoDB", "MySQL", "SQL", "PostgreSQL", "NoSQL", "REST API", "Apache Airflow", "OpenAI", "Snowflake", "PHP"]
    },
    {
      category: "Developer Tools & DevOps",
      items: ["GitHub", "Git", "Jupyter Notebooks", "VS Code", "Google Colab", "Docker", "Kubernetes", "API Integration", "CI/CD", "SDLC"]
    }
  ];

  // Education data
  const education = [
    {
      degree: "Master of Science in Computer Science",
      institution: "University of North Carolina at Charlotte, NC",
      period: "Aug '23 – May '25",
      gpa: "3.6",
      courses: "Network-based Application Development, Database Systems, Algorithm & Data Structures, Intelligent Systems"
    },
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Vishwakarma Institute of Technology, Pune, India",
      period: "Aug '19 – May '23",
      gpa: "3.4",
      courses: "Object Oriented Programming (OOP), Data Science, Artificial Intelligence, Machine Learning, Operating Systems"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  return (
    <section className="about-section">
      <div className="container">
        <div className="about-header text-center">
          <span className="section-subtitle">About Me</span>
          <h2 className="section-title">Discover Electronic Design via NFT</h2>
          <p className="section-description">
            Software Engineer specializing in Data Engineering and AI solutions.
            Master's student with industry experience in developing innovative solutions.
          </p>
        </div>
        
        <div className="about-content">
          <motion.div 
            className="about-skills"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3>Skills & Technologies</h3>
            
            <motion.div className="skills-grid" variants={containerVariants}>
              {skills.map((skillGroup, index) => (
                <motion.div key={index} className="skill-category" variants={itemVariants}>
                  <h4>{skillGroup.category}</h4>
                  <div className="skill-tags">
                    {skillGroup.items.map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            className="about-education"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3>Education</h3>
            
            <div className="education-timeline">
              {education.map((edu, index) => (
                <motion.div key={index} className="education-item" variants={itemVariants}>
                  <div className="education-period">{edu.period}</div>
                  <div className="education-content">
                    <h4>{edu.degree}</h4>
                    <p className="education-institution">{edu.institution}</p>
                    <p className="education-gpa">GPA: {edu.gpa}</p>
                    <p className="education-courses">
                      <strong>Coursework:</strong> {edu.courses}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="about-cta"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="cta-card" variants={itemVariants}>
            <h3>Let's build something amazing together</h3>
            <p>Looking for new opportunities to contribute my skills and experience</p>
            <button className="cta-button">Buy it now</button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;