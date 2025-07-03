const projects = [
  {
    id: 1,
    title: "AI-Powered Automated Data Engineering Assistant (ADEA)",
    description: "An enterprise-grade AI solution achieving 90-95% reliability in production environments. Combines advanced ML algorithms with NLP to detect data pipeline anomalies.",
    technologies: ["OpenAI", "AWS", "Kubernetes", "PyTorch", "scikit-learn", "Docker", "Redis", "Prometheus", "Grafana"],
    details: [
      "Architected an enterprise-grade AI solution with 90-95% reliability in production environments",
      "Combined Isolation Forest via PyTorch/scikit-learn with NLP to detect data pipeline anomalies",
      "Deployed on AWS Lambda with Docker/Kubernetes for scalability and Redis caching",
      "Implemented real-time monitoring with Prometheus and Grafana dashboards",
      "Integrated with ChatGPT conversational interface, reducing debugging time by 60%"
    ],
    image: "/images/adea.svg",
    github: "https://github.com/AshutoshZawar/AI-Powered_Automated_Data_Engineering_Assistant",
    period: "Feb '25 – Mar '25",
    floorPrice: "1.34 ETH",
    totalPrice: "1.3M ETH"
  },
  {
    id: 2,
    title: "MERN Stack Financial Application",
    description: "Full-stack personal financial application using React.js UI, Express.js middleware for RESTful APIs and Node.js. Features JWT/bcrypt authentication and interactive Chart.js dashboards.",
    technologies: ["JavaScript", "React", "Node.js", "Express.js", "Chart.js", "MongoDB", "JWT", "bcrypt"],
    details: [
      "Built full-stack personal financial application with React.js UI",
      "Implemented Express.js middleware for RESTful APIs and Node.js backend",
      "Applied JWT/bcrypt authentication for secure user access",
      "Integrated Chart.js for interactive dashboards with agile data visualizations",
      "Connected MongoDB and established on DigitalOcean for robust backend services"
    ],
    image: "/images/mern.png",
    github: "https://github.com/AshutoshZawar/MERN-Stack-Project",
    period: "Oct '23 – Dec '23",
    floorPrice: "0.87 ETH",
    totalPrice: "0.9M ETH"
  },
  {
    id: 3,
    title: "Semiconductor Wafer Defect Detection",
    description: "Revolutionary semiconductor defect detection using advanced YOLO v8 and v5 models, achieving 96% accuracy and significantly streamlining complex quality control processes.",
    technologies: ["Python", "YOLO", "OpenCV", "NumPy", "TensorFlow", "Machine Learning"],
    details: [
      "Implemented advanced YOLO v8 and v5 models with 96% accuracy",
      "Streamlined complex quality control processes in semiconductor manufacturing",
      "Leveraged computer vision and machine learning for real-time micro-defect detection",
      "Automated detection with groundbreaking precision, reducing downtime",
      "Published in HTL Journal (High Technology Letters) with Impact Factor 2.7"
    ],
    image: "/images/semiconductor.jpg",
    github: "https://github.com/AshutoshZawar/Semiconductor-Wafer-Defect-Detection-Using-Deep-Learning",
    period: "Feb '23 – May '23",
    floorPrice: "1.15 ETH",
    totalPrice: "1.2M ETH"
  },
  {
    id: 4,
    title: "Financing System",
    description: "An online platform connecting small entrepreneurs with high-yield lenders, eliminating traditional banking barriers while implementing KYC verification and regulated interest rate systems.",
    technologies: ["JavaScript", "HTML/CSS", "MongoDB", "Node.js"],
    details: [
      "Created an online platform connecting entrepreneurs with high-yield lenders",
      "Eliminated traditional banking barriers with streamlined application process",
      "Implemented KYC verification and regulated interest rate systems",
      "Developed intuitive administrative dashboards for loan management",
      "Built secure database architecture ensuring data privacy and transaction integrity"
    ],
    image: "/images/financing.svg",
    github: "https://github.com/AshutoshZawar/",
    period: "Sept '22 – Dec '22",
    floorPrice: "0.78 ETH",
    totalPrice: "0.8M ETH"
  },
  {
    id: 5,
    title: "Stock Price Prediction",
    description: "LSTM Model implementation for successful stock price prediction and accurate financial forecasting, providing valuable insights for investment decisions.",
    technologies: ["Python", "Keras", "TensorFlow 2.0", "Matplotlib", "Sklearn", "LSTM"],
    details: [
      "Implemented LSTM (Long Short-Term Memory) neural network for time-series forecasting",
      "Processed historical stock data for training and validation",
      "Engineered features to improve prediction accuracy",
      "Created visualization dashboard for prediction results",
      "Developed model evaluation metrics to assess performance"
    ],
    image: "/images/stock.svg",
    github: "https://github.com/AshutoshZawar/",
    period: "Sept '21 – Dec '21",
    floorPrice: "0.65 ETH",
    totalPrice: "0.7M ETH"
  },
  {
    id: 6,
    title: "Fake Image Detection System",
    description: "A GUI system for detecting image modifications, integrating 5 advanced image processing techniques to check for inconsistencies in pixel compression levels and identify digital tampering with 92% detection rate.",
    technologies: ["Python", "Tkinter", "Webbrowser", "OpenCV", "ImageHash"],
    details: [
      "Built GUI for detecting image modifications using Tkinter",
      "Integrated 5 advanced image processing techniques",
      "Implemented algorithms to check pixel compression level inconsistencies",
      "Created functionality to compare image hash values for authenticity verification",
      "Achieved 92% detection rate for digitally tampered images"
    ],
    image: "/images/fake-image.svg",
    github: "https://github.com/AshutoshZawar/",
    period: "Sept '20 – Dec '20",
    floorPrice: "0.58 ETH",
    totalPrice: "0.6M ETH"
  },
  {
    id: 7,
    title: "VR Biometric Feedback System",
    description: "Immersive Unity VR environment responding in real-time to biometric inputs (breath and heart rate) from Empatica and Biopac devices using TCP/IP socket connections.",
    technologies: ["Unity", "VR", "C#", "TCP/IP", "Python", "Data Visualization"],
    details: [
      "Created immersive Unity VR environment with real-time biometric response",
      "Integrated breath and heart rate inputs from Empatica and Biopac devices",
      "Implemented TCP/IP socket connections for seamless data transfer",
      "Boosted research productivity by 25% through innovative feedback systems",
      "Opened new possibilities for stress management and therapeutic VR applications"
    ],
    image: "/images/vr-bio.svg",
    github: "https://github.com/AshutoshZawar/",
    period: "Mar '24 – Aug '24",
    floorPrice: "1.45 ETH",
    totalPrice: "1.5M ETH"
  }
];

export default projects;
