import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/skills.css';

const AnimatedSkills = () => {
  const containerRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [visibleSections, setVisibleSections] = useState([]);

  // Updated skills data based on comprehensive resume analysis
  const skillsData = [
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

  // Detect scroll direction and track visible sections
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollTop(st <= 0 ? 0 : st);

      // Check which sections are in view
      const sections = document.querySelectorAll('.category-observer');
      const newVisibleSections = [];
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if (rect.top <= windowHeight * 0.85 && rect.bottom >= windowHeight * 0.15) {
          newVisibleSections.push(section.getAttribute('data-category'));
        }
      });
      
      setVisibleSections(newVisibleSections);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  // Get the appropriate icon for a skill
  const getSkillIcon = (skill) => {
    const iconMap = {
      // Programming Languages
      "Python": "🐍",
      "C": "©️",
      "C++": "©️➕",
      "JavaScript": "🟨",
      "JAVA": "☕",
      
      // Libraries & Frameworks
      "Keras": "🧠",
      "NumPy": "🔢",
      "Pandas": "🐼",
      "Matplotlib": "📊",
      "TensorFlow": "⚛️",
      "MlFlow": "🔄",
      "Scikit-learn": "🧪",
      "Sklearn": "🔬",
      "OpenCV": "👁️",
      "PyTorch": "🔥",
      "Computer Vision": "👁️‍🗨️",
      "Express.js": "⚡",
      "Django": "🎸",
      "Flask": "🧪",
      
      // Cloud & Front-End
      "AWS": "☁️",
      "HTML": "📄",
      "CSS": "🎨",
      "Bootstrap": "🅱️",
      "Angular": "🅰️",
      "React": "⚛️",
      "Vue.js": "💚",
      "Nuxt.js": "🟢",
      "Tableau": "📊",
      "PowerBI": "📈",
      
      // Back-End Technologies
      "Node.js": "🟢",
      "MongoDB": "🍃",
      "MySQL": "🐬",
      "SQL": "🗄️",
      "PostgreSQL": "🐘",
      "NoSQL": "📑",
      "REST API": "🔌",
      "Apache Airflow": "🌊",
      "OpenAI": "🤖",
      "Snowflake": "❄️",
      "PHP": "🐘",
      
      // Developer Tools & DevOps
      "GitHub": "🐙",
      "Git": "🔄",
      "Jupyter Notebooks": "📓",
      "VS Code": "📝",
      "Google Colab": "🔍",
      "Docker": "🐳",
      "Kubernetes": "☸️",
      "API Integration": "🔗",
      "CI/CD": "🔄",
      "SDLC": "♻️"
    };
    
    return iconMap[skill] || "🔹";
  };

  // Animation variants for both category and items
  const animationVariants = {
    hidden: (direction) => ({
      y: direction === 'down' ? -50 : 50,
      opacity: 0
    }),
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    exit: (direction) => ({
      y: direction === 'down' ? 50 : -50,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    })
  };

  // Animation for the whole section container
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.06
      }
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren"
      }
    }
  };

  // Custom styles to override existing CSS
  const compactStyles = {
    skillsSection: {
      padding: '40px 0' // Reduced from 80px
    },
    skillsContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },
    skillsTitle: {
      marginBottom: '5px' // Reduced
    },
    titleUnderline: {
      margin: '0 auto 20px' // Reduced bottom margin
    },
    subtitle: {
      marginBottom: '30px' // Reduced from 60px
    },
    categoryRow: {
      marginBottom: '40px' // Reduced from original
    },
    categoryLeft: {
      width: '30%',
      paddingRight: '40px'
    },
    categoryTitle: {
      marginBottom: '5px' // Reduced
    },
    categoryUnderline: {
      marginBottom: '10px' // Reduced
    },
    skillsWrapper: {
      gap: '12px' // Slightly reduced gap
    }
  };

  return (
    <section className="skills-section" id="skills" ref={containerRef} style={compactStyles.skillsSection}>
      <div className="skills-container" style={compactStyles.skillsContainer}>
        <h2 className="skills-title" style={compactStyles.skillsTitle}>MY STACK</h2>
        <div className="title-underline" style={compactStyles.titleUnderline}></div>
        <p className="skills-subtitle" style={compactStyles.subtitle}>These are the technologies I specialize in</p>
        
        {skillsData.map((category, catIndex) => (
          <div
            key={catIndex}
            className="skills-category-row category-observer"
            data-category={category.category}
            style={compactStyles.categoryRow}
          >
            <AnimatePresence mode="wait">
              {visibleSections.includes(category.category) && (
                <motion.div 
                  className="section-container"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={sectionVariants}
                  custom={scrollDirection}
                  style={{ display: 'flex', width: '100%' }}
                >
                  {/* Category section */}
                  <motion.div 
                    className="category-left"
                    variants={animationVariants}
                    custom={scrollDirection}
                    style={compactStyles.categoryLeft}
                  >
                    <h3 className="category-title" style={compactStyles.categoryTitle}>
                      {category.category}
                    </h3>
                    <div className="category-underline" style={compactStyles.categoryUnderline}></div>
                  </motion.div>
                  
                  {/* Skills section */}
                  <div className="category-right">
                    <div className="skills-wrapper" style={compactStyles.skillsWrapper}>
                      {category.items.map((skill, skillIndex) => (
                        <motion.div
                          key={`${category.category}-${skill}`}
                          variants={animationVariants}
                          custom={scrollDirection}
                          className="skill-pill"
                          whileHover={{ y: -5 }}
                        >
                          <span className="skill-icon">{getSkillIcon(skill)}</span>
                          <span className="skill-name">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnimatedSkills;