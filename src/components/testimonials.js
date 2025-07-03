import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import '../styles/testimonials.css';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 });

  const testimonials = [
    {
      id: 1,
      name: "Diven Ahuja",
      title: "Software Dev Engineer I @AWS | Ex-SDE Intern @AWS | Graduated student from UNCC",
      company: "AWS",
      companyLogo: "🚀",
      text: "I had the opportunity to work with Ashutosh on a research project under Professor Vishnu Prabhu at UNCC. Despite joining the team later, Ashutosh quickly understood the research project and contributed effectively to data collection, cleaning, transformation, and analysis. I appreciated his eagerness to grasp the value of our work and his ability to ask insightful questions. I highly recommend Ashutosh for any role that values critical thinking, adaptability, and a strong work ethic.",
      rating: 5,
      initials: "DA",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      highlight: "critical thinking, adaptability, and strong work ethic"
    },
    {
      id: 2,
      name: "Vishnu Prabhu",
      title: "Assistant Professor at the University of Central Florida | Co-Founder at Immersive Reality Group & IntelligHealth",
      company: "UCF",
      companyLogo: "🎓",
      text: "I'm pleased to recommend Ashutosh Zawar for technical roles. As my Graduate Research Assistant at UNC Charlotte, Ashutosh consistently demonstrated strong technical skills and a proactive attitude. He built robust Python pipelines for processing biometric data and contributed effectively to team-based projects. His problem-solving ability, attention to detail, and reliability stood out throughout his time in the lab. Ashutosh is a dependable and skilled developer who would bring value to any technical team.",
      rating: 5,
      initials: "VP",
      bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      highlight: "strong technical skills and proactive attitude"
    },
    {
      id: 3,
      name: "Shashank Bidwai",
      title: "SDE II @ Amazon | Full Stack Developer | MSCS at UNC Charlotte",
      company: "Amazon",
      companyLogo: "⚡",
      text: "I had the opportunity to work closely with Ashutosh during our research assistantship, and his problem-solving skills truly stood out. Under tight deadlines, he successfully integrated BIOPAC data into Unity using C#, demonstrating both technical depth and clarity in execution. Ashutosh consistently took initiative—reading research papers, formulating new problem statements, and analyzing data with a keen eye. He took ownership of complex tasks and delivered with reliability and creativity. His ability to break down challenges and work through them efficiently made him an invaluable team member. I highly recommend Ashutosh for any role requiring technical excellence and dedication.",
      rating: 5,
      initials: "SB",
      bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      highlight: "problem-solving skills and technical excellence"
    }
  ];

  // Auto-rotate testimonials every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      setProgress(0);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlaying]);

  // Progress animation
  useEffect(() => {
    if (!isAutoPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / (6000 / 50)); // Update every 50ms
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [currentTestimonial, isAutoPlaying]);

  // Manual navigation
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setProgress(0);
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
    setProgress(0);
  };

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, index) => (
          <motion.span
            key={index}
            className={`star ${index < rating ? 'filled' : ''}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: index < rating ? 1 : 0.4, 
              scale: 1 
            }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 200
            }}
          >
            ★
          </motion.span>
        ))}
      </div>
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const testimonialVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.9,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section 
      className="testimonials-section" 
      id="testimonials" // This is crucial for scroll navigation!
      ref={sectionRef}
    >
      <div className="testimonials-background">
        <div className="testimonials-gradient"></div>
      </div>
      
      <div className="container">
        <motion.div
          className="testimonials-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="testimonials-title"
            variants={titleVariants}
          >
            Testimonials
          </motion.h2>
          
          <div 
            className="testimonials-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className="testimonial-nav prev"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="testimonial-wrapper">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  className="testimonial-card"
                  variants={testimonialVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Quote icon with company logo */}
                  <div className="testimonial-quote-icon">
                    <span style={{ fontSize: '24px' }}>
                      {currentTestimonialData.companyLogo}
                    </span>
                  </div>

                  {/* Star rating with animation */}
                  <StarRating rating={currentTestimonialData.rating} />

                  {/* Testimonial text with highlighted words */}
                  <div className="testimonial-text">
                    <p>
                      {currentTestimonialData.text.split(currentTestimonialData.highlight).map((part, index, array) => (
                        <React.Fragment key={index}>
                          {part}
                          {index < array.length - 1 && (
                            <span 
                              style={{
                                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: '600'
                              }}
                            >
                              {currentTestimonialData.highlight}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>

                  {/* Author info with enhanced styling */}
                  <motion.div 
                    className="testimonial-author"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div 
                      className="author-avatar"
                      style={{ background: currentTestimonialData.bgColor }}
                    >
                      <span className="author-initials">
                        {currentTestimonialData.initials}
                      </span>
                    </div>
                    <div className="author-info">
                      <h4 className="author-name">{currentTestimonialData.name}</h4>
                      <p className="author-title">{currentTestimonialData.title}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button 
              className="testimonial-nav next"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Enhanced dots indicator */}
          <motion.div 
            className="testimonials-dots"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>

          {/* Enhanced progress bar */}
          <div className="testimonial-progress">
            <motion.div 
              className="progress-bar"
              style={{
                width: `${progress}%`,
                transition: 'width 0.1s linear'
              }}
            />
          </div>

          {/* Statistics section */}
          <motion.div 
            className="testimonials-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '60px',
              marginTop: '60px',
              padding: '30px 0',
              borderTop: '1px solid var(--border-color)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ 
                fontSize: '2.5rem', 
                margin: '0 0 8px 0',
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '800'
              }}>
                100%
              </h3>
              <p style={{ 
                fontSize: '0.9rem', 
                color: 'var(--text-secondary)', 
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: '600'
              }}>
                Recommendation Rate
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ 
                fontSize: '2.5rem', 
                margin: '0 0 8px 0',
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '800'
              }}>
                3+
              </h3>
              <p style={{ 
                fontSize: '0.9rem', 
                color: 'var(--text-secondary)', 
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: '600'
              }}>
                Industry Leaders
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ 
                fontSize: '2.5rem', 
                margin: '0 0 8px 0',
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '800'
              }}>
                5★
              </h3>
              <p style={{ 
                fontSize: '0.9rem', 
                color: 'var(--text-secondary)', 
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: '600'
              }}>
                Average Rating
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;