import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectDetail from './projectDetail';
import projects from '../data/projects'; // Import the exact same data as Technical Portfolio
import '../styles/about.css';

const About = () => {
  // State to track which education card is expanded
  const [expandedCard, setExpandedCard] = useState(null);
  // State to track which journey content is active
  const [activeJourneyContent, setActiveJourneyContent] = useState('education');
  // State for project detail modal
  const [selectedProject, setSelectedProject] = useState(null);
  const skillSectionRef = useRef(null);
  
  // Education data
  const education = [
    {
      degree: "Master of Science in Computer Science",
      institution: "University of North Carolina at Charlotte, NC, United States",
      period: "Aug '23 – May '25",
      gpa: "3.6",
      emoji: "🎓",
      courses: "Network-based Application Development, Database Systems, Algorithm & Data Structures, Intelligent Systems, Computer Communications and Networks, Data Mining, Visual Analytics, Survey of Programming Languages",
      skills: [
        { name: "Python", level: "Advanced", percentage: 95 },
        { name: "TensorFlow", level: "Advanced", percentage: 90 },
        { name: "Data Visualization", level: "Advanced", percentage: 85 },
        { name: "Database Systems", level: "Advanced", percentage: 80 },
        { name: "Network Programming", level: "Advanced", percentage: 75 }
      ]
    },
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Vishwakarma Institute of Technology, Pune, India",
      period: "Aug '19 – May '23",
      gpa: "3.4",
      emoji: "👨‍🎓",
      courses: "Object Oriented Programming (OOP), Data Science, Artificial Intelligence, Machine Learning, Operating Systems",
      skills: [
        { name: "Java", level: "Advanced", percentage: 90 },
        { name: "C++", level: "Advanced", percentage: 85 },
        { name: "Machine Learning", level: "Advanced", percentage: 80 },
        { name: "Operating Systems", level: "Advanced", percentage: 75 },
        { name: "Object Oriented Design", level: "Advanced", percentage: 85 }
      ]
    }
  ];

  // Internship Experience data
  const internshipExperience = [
    {
      id: 1,
      title: "Graduate Research Assistant",
      company: "University of North Carolina at Charlotte",
      period: "Mar 2024 - Aug 2024 · 6 mos",
      location: "Charlotte, North Carolina, United States · Hybrid",
      type: "Contract",
      description: "VR-based stress management and therapeutic interventions research",
      achievements: [
        "Pioneered innovative applications in VR-based stress management and therapeutic interventions",
        "Created robust Python data pipelines to efficiently process and analyze large datasets from fNIRS, ECG, and RSP sensors, applying advanced data cleaning and preprocessing techniques",
        "Conducted VR-based experiments with 60 participants, simulating varied environments to gather in-depth physiological data",
        "Boosted research productivity by 25% by designing and developing a Unity VR environment that dynamically adapts to real-time biometric data from Empatica and Biopac devices",
        "Collaborated with cross-functional teams to refine data collection and analysis methods, significantly contributing to impactful research outcomes in VR and biometric integration"
      ],
      technologies: ["Python", "Unity VR", "fNIRS", "ECG", "RSP Sensors", "Empatica", "Biopac", "Kubios", "Machine Learning", "Data Analysis", "Socket Connections", "Data Visualization"]
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Ortigan",
      period: "Apr 2022 - Jun 2023 · 1 yr 3 mos",
      location: "Aurangabad, Maharashtra, India · Hybrid",
      type: "Full-time",
      description: "Scalable B2B SaaS Development",
      achievements: [
        "Developed and delivered 20+ scalable web applications and SaaS solutions, specializing in modern B2B digital platforms",
        "Successfully launched a comprehensive financial platform connecting investors with startups, featuring portfolio management and real-time data visualization",
        "Built production-ready dashboard and component libraries, reducing team development time by 40%",
        "Maintained 95%+ client satisfaction rate across all delivered projects",
        "Achieved 90+ Lighthouse performance scores on all web applications"
      ],
      technologies: ["JavaScript", "Nuxt.js 3", "React", "TailwindCSS", "OAuth 2.0", "CI/CD", "Cloud Platforms", "Fintech Solutions"]
    },
    {
      id: 3,
      title: "Data Science & Software Intern",
      company: "BookBySlot",
      period: "Nov 2021 - Jan 2022 · 3 mos",
      location: "Delhi, India · Remote",
      type: "Internship",
      description: "Data Science and Backend Optimization",
      achievements: [
        "Optimized back-end systems using SQL enhancing operational efficiency",
        "Conducted comprehensive data-driven research on hospitality market trends using Python and Excel",
        "Identified high-value partnership opportunities that increased platform listings by 25%",
        "Integrated social media platforms, expanding market reach and boosting user engagement by 30%",
        "Established connections with over 20 clients through data analysis"
      ],
      technologies: ["Python", "SQL", "Excel", "Data Analysis", "Market Research", "Social Media Integration"]
    }
  ];

  // Projects data imported from the same source as Technical Portfolio

  // Updated certificates and publications data with real certificates
  const certificatesAndPublications = [
    {
      id: 1,
      title: "Social and Behavioral Research (IRB)",
      issuer: "CITI Program",
      date: "June 2024",
      type: "certificate",
      description: "Professional certification for conducting research involving human subjects. Covers ethical considerations, regulatory requirements, and best practices for IRB approval. Valid until June 2028. Credential ID: 63458716",
      link: "https://www.citiprogram.org/verify/?w74893af7-b297-4ffe-a088-503212d31c1a-63458716"
    },
    {
      id: 2,
      title: "Google Data Analytics Certificate",
      issuer: "Coursera",
      date: "February 2024",
      type: "certificate",
      description: "Professional certificate covering data analytics fundamentals, data cleaning, visualization, and analysis using tools like spreadsheets, SQL, Tableau, and R. Comprehensive 6-month program with hands-on projects and real-world case studies.",
      link: "https://www.credly.com/badges/4d2ce9d8-3249-4da2-bf9d-a2bc2ec46868/linked_in_profile"
    },
    {
      id: 3,
      title: "Ultimate AWS Certified Cloud Practitioner",
      issuer: "Udemy",
      date: "2024",
      type: "certificate",
      description: "Comprehensive AWS Cloud Practitioner certification course covering cloud concepts, AWS services, security, architecture, pricing, and support. Gained foundational knowledge of AWS cloud platform and best practices.",
      link: "https://www.udemy.com/certificate/UC-e6fd01d9-e8db-4993-8e68-a4a12df56bf2/"
    },
    {
      id: 4,
      title: "Artificial Intelligence A-Z: Learn how to Build An AI",
      issuer: "Udemy",
      date: "2024",
      type: "certificate",
      description: "Complete AI course covering machine learning, deep learning, and artificial intelligence concepts. Learned to build AI applications from scratch using Python, including neural networks, reinforcement learning, and practical AI implementations.",
      link: "https://www.udemy.com/certificate/UC-631b2af0-0636-4d12-95ac-67fe3ebe83e1/"
    },
    {
      id: 5,
      title: "Semiconductor Wafer Defect Detection Using Deep Learning",
      issuer: "HTL Journal (High Technology Letters)",
      date: "May 2023",
      type: "publication", 
      description: "Published research paper in Volume 29, Issue 5 | Impact Factor: 2.7. Achieved 96% accuracy in defect detection using YOLO v8 and v5 models. Research focuses on automated quality control in semiconductor manufacturing using computer vision.",
      link: "https://github.com/AshutoshZawar/Semiconductor-Wafer-Defect-Detection-Using-Deep-Learning"
    }
  ];

  // Function to toggle card expansion
  const toggleCard = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  // Function to change active journey content
  const setJourneyContent = (content) => {
    setActiveJourneyContent(content);
  };

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
    <section className="about-section" id="about">
      <div className="container">
        {/* My Journey Section */}
        <div className="journey-section">
          <h2 className="journey-title">MY JOURNEY</h2>
          
          <div className="journey-cards">
            {/* Education Card - FIRST */}
            <div 
              className={`journey-card ${activeJourneyContent === 'education' ? 'active' : ''}`}
              onClick={() => setJourneyContent('education')}
            >
              <div className="journey-card-content">
                <div className="journey-icon-container">
                  <span className="journey-icon">🎓</span>
                </div>
                <div className="journey-card-number">2</div>
                <h3 className="journey-card-title">Education</h3>
                <p className="journey-card-subtitle">Academic qualifications & learning</p>
                <span className="journey-arrow">➔</span>
              </div>
            </div>

            {/* Years of Experience Card - SECOND */}
            <div 
              className={`journey-card ${activeJourneyContent === 'experience' ? 'active' : ''}`}
              onClick={() => setJourneyContent('experience')}
            >
              <div className="journey-card-content">
                <div className="journey-icon-container">
                  <span className="journey-icon">💼</span>
                </div>
                <div className="journey-card-number">2+</div>
                <h3 className="journey-card-title">Years of Experience</h3>
                <p className="journey-card-subtitle">Professional research & development journey</p>
                <span className="journey-arrow">➔</span>
              </div>
            </div>
            
            {/* Certificates & Publications Card - THIRD */}
            <div 
              className={`journey-card ${activeJourneyContent === 'certificates' ? 'active' : ''}`}
              onClick={() => setJourneyContent('certificates')}
            >
              <div className="journey-card-content">
                <div className="journey-icon-container">
                  <span className="journey-icon">🏆</span>
                </div>
                <div className="journey-card-number">{certificatesAndPublications.length}</div>
                <h3 className="journey-card-title">Certificates & Publications</h3>
                <p className="journey-card-subtitle">Professional achievements & research</p>
                <span className="journey-arrow">➔</span>
              </div>
            </div>
            
            {/* Projects Card - FOURTH */}
            <div 
              className={`journey-card ${activeJourneyContent === 'projects' ? 'active' : ''}`}
              onClick={() => setJourneyContent('projects')}
            >
              <div className="journey-card-content">
                <div className="journey-icon-container">
                  <span className="journey-icon">{'<>'}</span>
                </div>
                <div className="journey-card-number">{projects.length}</div>
                <h3 className="journey-card-title">Total Projects</h3>
                <p className="journey-card-subtitle">Innovative web & mobile solutions crafted</p>
                <span className="journey-arrow">➔</span>
              </div>
            </div>
          </div>
          
          {/* Content panels */}
          <div className="journey-content">
            {/* Education Panel - FIRST */}
            <div className={`content-panel ${activeJourneyContent === 'education' ? 'active' : ''}`}>
              <h3 className="content-title">Education & Learning</h3>
              <div className="education-timeline">
                {education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <div className="education-date">{edu.period}</div>
                    <h4 className="education-title">{edu.degree}</h4>
                    <p className="education-institution">{edu.institution}</p>
                    <p className="education-gpa">GPA: {edu.gpa}</p>
                    <div className="education-courses">
                      <h5>Key Courses:</h5>
                      <div className="courses-tags">
                        {edu.courses.split(', ').map((course, i) => (
                          <span key={i} className="course-tag">{course}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Panel - SECOND */}
            <div className={`content-panel ${activeJourneyContent === 'experience' ? 'active' : ''}`}>
              <h3 className="content-title">Professional Experience</h3>
              <div className="experience-timeline">
                {internshipExperience.map((exp, index) => (
                  <div key={exp.id} className="experience-item">
                    <div className="experience-main-header">
                      <div className={`company-logo ${
                        exp.company.includes("University of North Carolina") ? "uncc" : 
                        exp.company === "Ortigan" ? "ortigan" : 
                        exp.company === "BookBySlot" ? "bookbyslot" : "default"
                      }`}
                      style={{
                        backgroundImage: exp.company.includes("University of North Carolina") 
                          ? `url(${process.env.PUBLIC_URL}/images/logos/uncc-logo.png)`
                          : exp.company === "Ortigan" 
                          ? `url(${process.env.PUBLIC_URL}/images/logos/ortigan-logo.png)`
                          : exp.company === "BookBySlot" 
                          ? `url(${process.env.PUBLIC_URL}/images/logos/bookbyslot-logo.png)`
                          : undefined,
                        backgroundSize: '80%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: exp.company.includes("University of North Carolina") 
                          ? '#00703C'
                          : 'white'
                      }}>
                      </div>
                      <div className="experience-content">
                        <div className="experience-title-section">
                          <h4 className="experience-title">{exp.title}</h4>
                          <p className="experience-company">{exp.company}</p>
                        </div>
                        <div className="experience-meta">
                          <span className="experience-date">{exp.period}</span>
                          <span className="experience-type">{exp.type}</span>
                        </div>
                        <p className="experience-location">{exp.location}</p>
                      </div>
                    </div>
                    
                    <p className="experience-description">{exp.description}</p>
                    
                    <div className="experience-achievements">
                      <h5>Key Achievements:</h5>
                      <ul>
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="experience-technologies">
                      <h5>Technologies Used:</h5>
                      <div className="tech-tags">
                        {exp.technologies.map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Certificates & Publications Panel - THIRD */}
            <div className={`content-panel ${activeJourneyContent === 'certificates' ? 'active' : ''}`}>
              <h3 className="content-title">Certificates & Publications</h3>
              <div className="certificates-grid-no-images">
                {certificatesAndPublications.map(item => (
                  <div key={item.id} className="certificate-card-no-image">
                    <div className="certificate-header">
                      <div className="certificate-type-badge">
                        <span className={`type-badge ${item.type}`}>
                          {item.type === 'publication' ? '📄' : '🏆'} {item.type.toUpperCase()}
                        </span>
                      </div>
                      <h4>{item.title}</h4>
                    </div>
                    <div className="certificate-details">
                      <p className="certificate-issuer">{item.issuer}</p>
                      <p className="certificate-date">{item.date}</p>
                      <p className="certificate-description">{item.description}</p>
                      {item.link && item.link !== "#" && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="certificate-link">
                          {item.type === 'publication' ? 'View Publication →' : 'View Certificate →'}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Panel - FOURTH */}
            <div className={`content-panel ${activeJourneyContent === 'projects' ? 'active' : ''}`}>
              <h3 className="content-title">Featured Projects</h3>
              <div className="projects-grid">
                {projects.map(project => (
                  <div 
                    key={project.id} 
                    className="project-item clickable"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="project-header">
                      <h4>{project.title}</h4>
                      <span className="project-period">{project.period}</span>
                    </div>
                    <p className="project-description">{project.description}</p>
                    <div className="project-technologies">
                      <h5>Technologies:</h5>
                      <div className="project-tech-tags">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <span key={i} className="project-tech-tag">{tech}</span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="project-tech-tag">+{project.technologies.length - 4}</span>
                        )}
                      </div>
                    </div>
                    <div className="project-click-hint">
                      <span>Click to view details →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
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

export default About;