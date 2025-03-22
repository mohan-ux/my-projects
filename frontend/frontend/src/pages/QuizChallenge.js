import React, { useState } from "react";

const topics = {
  webDevelopment: {
    name: "Web Development",
    icon: "🌐",
    topics: {
      html: {
        name: "HTML",
        questions: [
          {
            id: 1,
            question: "What does HTML stand for?",
            options: [
              "Hyper Text Markup Language",
              "High Text Machine Language",
              "Hyper Transfer Markup Language",
              "High Transfer Machine Language",
            ],
            answer: "Hyper Text Markup Language",
          },
          {
            id: 2,
            question: "Which tag is used to define an unordered list in HTML?",
            options: ["<ul>", "<ol>", "<li>", "<list>"],
            answer: "<ul>",
          },
          {
            id: 3,
            question: "What is the purpose of the <!DOCTYPE html> declaration?",
            options: [
              "Specifies the HTML version",
              "Creates a new HTML document",
              "Defines the document type",
              "Starts HTML coding",
            ],
            answer: "Specifies the HTML version",
          },
        ],
      },
      react: {
        name: "React",
        questions: [
          {
            id: 1,
            question: "What is JSX?",
            options: [
              "JavaScript XML",
              "Java Syntax Extension",
              "JavaScript XHR",
              "Java System Extension",
            ],
            answer: "JavaScript XML",
          },
          {
            id: 2,
            question: "Which hook is used for side effects in React?",
            options: ["useEffect", "useState", "useContext", "useReducer"],
            answer: "useEffect",
          },
          {
            id: 3,
            question: "What is the virtual DOM?",
            options: [
              "A lightweight copy of the actual DOM",
              "A direct copy of HTML",
              "A browser feature",
              "A CSS framework",
            ],
            answer: "A lightweight copy of the actual DOM",
          },
        ],
      },
      css: {
        name: "CSS",
        questions: [
          {
            id: 1,
            question: "What does CSS stand for?",
            options: [
              "Cascading Style Sheets",
              "Computer Style Sheets",
              "Creative Style Sheets",
              "Colorful Style Sheets",
            ],
            answer: "Cascading Style Sheets",
          },
          {
            id: 2,
            question: "Which property is used to change the text color?",
            options: ["color", "text-color", "font-color", "text-style"],
            answer: "color",
          },
          {
            id: 3,
            question: "What is the box model in CSS?",
            options: [
              "Content, padding, border, margin",
              "Header, body, footer",
              "Div, span, paragraph",
              "Width, height, depth",
            ],
            answer: "Content, padding, border, margin",
          },
        ],
      },
    },
  },

  appDevelopment: {
    name: "App Development",
    icon: "📱",
    topics: {
      reactNative: {
        name: "React Native",
        questions: [
          {
            id: 1,
            question: "What is the difference between React Native and React?",
            options: [
              "React Native is for mobile apps, React is for web apps",
              "React Native is newer than React",
              "React Native is only for iOS",
              "React Native is only for Android",
            ],
            answer: "React Native is for mobile apps, React is for web apps",
          },
          {
            id: 2,
            question: "What is a Bridge in React Native?",
            options: [
              "Interface between native and JavaScript code",
              "Navigation component",
              "Styling component",
              "Testing framework",
            ],
            answer: "Interface between native and JavaScript code",
          },
        ],
      },
      androidDev: {
        name: "Android Development",
        questions: [
          {
            id: 1,
            question: "What is Kotlin?",
            options: [
              "Modern programming language for Android",
              "Database system",
              "Testing framework",
              "UI design tool",
            ],
            answer: "Modern programming language for Android",
          },
          {
            id: 2,
            question: "What is an Activity in Android?",
            options: [
              "Single screen in an app",
              "Background process",
              "Database query",
              "Testing module",
            ],
            answer: "Single screen in an app",
          },
        ],
      },
    },
  },

  qaEngineering: {
    name: "QA Engineering",
    icon: "🔍",
    topics: {
      automationTesting: {
        name: "Automation Testing",
        questions: [
          {
            id: 1,
            question: "What is Selenium used for?",
            options: [
              "Web application testing",
              "Mobile testing",
              "Database testing",
              "Network testing",
            ],
            answer: "Web application testing",
          },
          {
            id: 2,
            question: "What is TestNG?",
            options: [
              "Testing framework",
              "Programming language",
              "Database system",
              "Web server",
            ],
            answer: "Testing framework",
          },
        ],
      },
      manualTesting: {
        name: "Manual Testing",
        questions: [
          {
            id: 1,
            question: "What is a test case?",
            options: [
              "Set of conditions to verify functionality",
              "Bug report",
              "Code review",
              "User story",
            ],
            answer: "Set of conditions to verify functionality",
          },
          {
            id: 2,
            question: "What is regression testing?",
            options: [
              "Testing after code changes",
              "First time testing",
              "Performance testing",
              "Security testing",
            ],
            answer: "Testing after code changes",
          },
        ],
      },
    },
  },

  dataScience: {
    name: "Data Science",
    icon: "📊",
    topics: {
      python: {
        name: "Python for Data Science",
        questions: [
          {
            id: 1,
            question: "What is pandas used for?",
            options: [
              "Data manipulation and analysis",
              "Web development",
              "Game development",
              "Mobile development",
            ],
            answer: "Data manipulation and analysis",
          },
          {
            id: 2,
            question: "What is NumPy?",
            options: [
              "Numerical computing library",
              "Web framework",
              "Testing tool",
              "Database system",
            ],
            answer: "Numerical computing library",
          },
        ],
      },
      machinelearning: {
        name: "Machine Learning",
        questions: [
          {
            id: 1,
            question: "What is supervised learning?",
            options: [
              "Learning with labeled data",
              "Learning without data",
              "Learning with unlabeled data",
              "Learning with partial data",
            ],
            answer: "Learning with labeled data",
          },
          {
            id: 2,
            question: "What is a neural network?",
            options: [
              "Connected nodes processing data",
              "Database system",
              "Network protocol",
              "Programming language",
            ],
            answer: "Connected nodes processing data",
          },
        ],
      },
    },
  },

  cybersecurity: {
    name: "Cybersecurity",
    icon: "🔒",
    topics: {
      networkSecurity: {
        name: "Network Security",
        questions: [
          {
            id: 1,
            question: "What is a firewall?",
            options: [
              "Network security system",
              "Antivirus software",
              "Operating system",
              "Web browser",
            ],
            answer: "Network security system",
          },
          {
            id: 2,
            question: "What is encryption?",
            options: [
              "Data conversion to secure format",
              "Data compression",
              "Data deletion",
              "Data backup",
            ],
            answer: "Data conversion to secure format",
          },
        ],
      },
      webSecurity: {
        name: "Web Security",
        questions: [
          {
            id: 1,
            question: "What is XSS?",
            options: [
              "Cross-site scripting attack",
              "Programming language",
              "Security protocol",
              "Network type",
            ],
            answer: "Cross-site scripting attack",
          },
          {
            id: 2,
            question: "What is HTTPS?",
            options: [
              "Secure HTTP protocol",
              "Programming language",
              "Database type",
              "Operating system",
            ],
            answer: "Secure HTTP protocol",
          },
        ],
      },
    },
  },

  cloudComputing: {
    name: "Cloud Computing",
    icon: "☁️",
    topics: {
      aws: {
        name: "Amazon Web Services",
        questions: [
          {
            id: 1,
            question: "What is Amazon EC2?",
            options: [
              "Virtual server in the cloud",
              "Database service",
              "Storage service",
              "Networking service",
            ],
            answer: "Virtual server in the cloud",
          },
          {
            id: 2,
            question: "What is AWS Lambda?",
            options: [
              "Serverless computing service",
              "Database service",
              "Storage solution",
              "Load balancer",
            ],
            answer: "Serverless computing service",
          },
        ],
      },
      azure: {
        name: "Microsoft Azure",
        questions: [
          {
            id: 1,
            question: "What is Azure Functions?",
            options: [
              "Serverless compute service",
              "Storage service",
              "Database service",
              "Networking tool",
            ],
            answer: "Serverless compute service",
          },
          {
            id: 2,
            question: "What is Azure DevOps?",
            options: [
              "Development collaboration platform",
              "Cloud storage",
              "Virtual machine",
              "Database service",
            ],
            answer: "Development collaboration platform",
          },
        ],
      },
    },
  },

  devOps: {
    name: "DevOps",
    icon: "⚙️",
    topics: {
      containerization: {
        name: "Containerization",
        questions: [
          {
            id: 1,
            question: "What is Docker?",
            options: [
              "Container platform",
              "Operating system",
              "Programming language",
              "Database system",
            ],
            answer: "Container platform",
          },
          {
            id: 2,
            question: "What is Kubernetes?",
            options: [
              "Container orchestration platform",
              "Programming language",
              "Database system",
              "Web server",
            ],
            answer: "Container orchestration platform",
          },
        ],
      },
      cicd: {
        name: "CI/CD",
        questions: [
          {
            id: 1,
            question: "What is Jenkins?",
            options: [
              "Automation server",
              "Database",
              "Programming language",
              "Operating system",
            ],
            answer: "Automation server",
          },
          {
            id: 2,
            question: "What is GitLab CI?",
            options: [
              "CI/CD platform",
              "Version control",
              "Code editor",
              "Testing framework",
            ],
            answer: "CI/CD platform",
          },
        ],
      },
    },
  },

  artificialIntelligence: {
    name: "Artificial Intelligence",
    icon: "🤖",
    topics: {
      deepLearning: {
        name: "Deep Learning",
        questions: [
          {
            id: 1,
            question: "What is a neural network?",
            options: [
              "Machine learning model based on brain structure",
              "Database system",
              "Programming language",
              "Cloud service",
            ],
            answer: "Machine learning model based on brain structure",
          },
          {
            id: 2,
            question: "What is CNN?",
            options: [
              "Convolutional Neural Network",
              "Computer Network Node",
              "Central Network News",
              "Compressed Network Node",
            ],
            answer: "Convolutional Neural Network",
          },
        ],
      },
      nlp: {
        name: "Natural Language Processing",
        questions: [
          {
            id: 1,
            question: "What is tokenization in NLP?",
            options: [
              "Breaking text into smaller units",
              "Encrypting text",
              "Compressing text",
              "Translating text",
            ],
            answer: "Breaking text into smaller units",
          },
          {
            id: 2,
            question: "What is sentiment analysis?",
            options: [
              "Determining text emotional tone",
              "Grammar checking",
              "Spell checking",
              "Text translation",
            ],
            answer: "Determining text emotional tone",
          },
        ],
      },
    },
  },

  dataEngineering: {
    name: "Data Engineering",
    icon: "🔧",
    topics: {
      etl: {
        name: "ETL Processes",
        questions: [
          {
            id: 1,
            question: "What is ETL?",
            options: [
              "Extract Transform Load",
              "Error Track Log",
              "End To Load",
              "Easy Transfer Link",
            ],
            answer: "Extract Transform Load",
          },
          {
            id: 2,
            question: "What is data warehousing?",
            options: [
              "Central repository for data",
              "Data deletion",
              "Data encryption",
              "Data compression",
            ],
            answer: "Central repository for data",
          },
        ],
      },
      bigData: {
        name: "Big Data",
        questions: [
          {
            id: 1,
            question: "What is Hadoop?",
            options: [
              "Distributed computing framework",
              "Programming language",
              "Database system",
              "Web server",
            ],
            answer: "Distributed computing framework",
          },
          {
            id: 2,
            question: "What is Apache Spark?",
            options: [
              "Data processing engine",
              "Web framework",
              "Database system",
              "Operating system",
            ],
            answer: "Data processing engine",
          },
        ],
      },
    },
  },

  blockchainDevelopment: {
    name: "Blockchain Development",
    icon: "⛓️",
    topics: {
      smartContracts: {
        name: "Smart Contracts",
        questions: [
          {
            id: 1,
            question: "What is Solidity?",
            options: [
              "Smart contract programming language",
              "Database system",
              "Operating system",
              "Web framework",
            ],
            answer: "Smart contract programming language",
          },
          {
            id: 2,
            question: "What is Ethereum?",
            options: [
              "Blockchain platform",
              "Programming language",
              "Database system",
              "Operating system",
            ],
            answer: "Blockchain platform",
          },
        ],
      },
      cryptography: {
        name: "Cryptography",
        questions: [
          {
            id: 1,
            question: "What is a hash function?",
            options: [
              "One-way data transformation",
              "Data compression",
              "Data encryption",
              "Data storage",
            ],
            answer: "One-way data transformation",
          },
          {
            id: 2,
            question: "What is public key cryptography?",
            options: [
              "Asymmetric encryption system",
              "Password system",
              "Database security",
              "Network protocol",
            ],
            answer: "Asymmetric encryption system",
          },
        ],
      },
    },
  },

  gamesDevelopment: {
    name: "Games Development",
    icon: "🎮",
    topics: {
      unity: {
        name: "Unity Development",
        questions: [
          {
            id: 1,
            question: "What is Unity?",
            options: [
              "Game development engine",
              "Programming language",
              "Operating system",
              "Web browser",
            ],
            answer: "Game development engine",
          },
          {
            id: 2,
            question: "What language is used in Unity?",
            options: ["C#", "Java", "Python", "JavaScript"],
            answer: "C#",
          },
        ],
      },
      unreal: {
        name: "Unreal Engine",
        questions: [
          {
            id: 1,
            question: "What is Unreal Engine?",
            options: [
              "3D game engine",
              "Web framework",
              "Database system",
              "Operating system",
            ],
            answer: "3D game engine",
          },
          {
            id: 2,
            question: "What is Blueprint in Unreal Engine?",
            options: [
              "Visual scripting system",
              "3D modeling tool",
              "Audio editor",
              "Physics engine",
            ],
            answer: "Visual scripting system",
          },
        ],
      },
    },
  },

  databaseManagement: {
    name: "Database Management",
    icon: "🗄️",
    topics: {
      sql: {
        name: "SQL Databases",
        questions: [
          {
            id: 1,
            question: "What is a primary key?",
            options: [
              "Unique identifier for records",
              "Foreign key reference",
              "Table name",
              "Column name",
            ],
            answer: "Unique identifier for records",
          },
          {
            id: 2,
            question: "What is normalization?",
            options: [
              "Database organization process",
              "Data encryption",
              "Data compression",
              "Data backup",
            ],
            answer: "Database organization process",
          },
        ],
      },
      nosql: {
        name: "NoSQL Databases",
        questions: [
          {
            id: 1,
            question: "What is MongoDB?",
            options: [
              "Document database",
              "SQL database",
              "File system",
              "Operating system",
            ],
            answer: "Document database",
          },
          {
            id: 2,
            question: "What is Redis?",
            options: [
              "In-memory data store",
              "File system",
              "Web server",
              "Operating system",
            ],
            answer: "In-memory data store",
          },
        ],
      },
    },
  },

  systemAdministration: {
    name: "System Administration",
    icon: "💻",
    topics: {
      linux: {
        name: "Linux Administration",
        questions: [
          {
            id: 1,
            question: "What is systemd?",
            options: [
              "System and service manager",
              "Text editor",
              "Web server",
              "Database system",
            ],
            answer: "System and service manager",
          },
          {
            id: 2,
            question: "What is a daemon?",
            options: [
              "Background process",
              "User interface",
              "File system",
              "Network protocol",
            ],
            answer: "Background process",
          },
        ],
      },
      networking: {
        name: "Network Administration",
        questions: [
          {
            id: 1,
            question: "What is a subnet?",
            options: [
              "Network division",
              "Internet protocol",
              "Web server",
              "Database system",
            ],
            answer: "Network division",
          },
          {
            id: 2,
            question: "What is DHCP?",
            options: [
              "IP address assignment protocol",
              "Security protocol",
              "Web protocol",
              "File transfer protocol",
            ],
            answer: "IP address assignment protocol",
          },
        ],
      },
    },
  },

  embeddedSystems: {
    name: "Embedded Systems",
    icon: "🔌",
    topics: {
      microcontrollers: {
        name: "Microcontrollers",
        questions: [
          {
            id: 1,
            question: "What is Arduino?",
            options: [
              "Microcontroller platform",
              "Operating system",
              "Programming language",
              "Database system",
            ],
            answer: "Microcontroller platform",
          },
          {
            id: 2,
            question: "What is Raspberry Pi?",
            options: [
              "Single-board computer",
              "Operating system",
              "Programming language",
              "Database system",
            ],
            answer: "Single-board computer",
          },
        ],
      },
      iot: {
        name: "Internet of Things",
        questions: [
          {
            id: 1,
            question: "What is MQTT?",
            options: [
              "IoT communication protocol",
              "Programming language",
              "Database system",
              "Operating system",
            ],
            answer: "IoT communication protocol",
          },
          {
            id: 2,
            question: "What is edge computing?",
            options: [
              "Local data processing",
              "Cloud computing",
              "Database system",
              "Network protocol",
            ],
            answer: "Local data processing",
          },
        ],
      },
    },
  },

  networkEngineering: {
    name: "Network Engineering",
    icon: "🌐",
    topics: {
      protocols: {
        name: "Network Protocols",
        questions: [
          {
            id: 1,
            question: "What is TCP/IP?",
            options: [
              "Internet protocol suite",
              "Programming language",
              "Operating system",
              "Database system",
            ],
            answer: "Internet protocol suite",
          },
          {
            id: 2,
            question: "What is DNS?",
            options: [
              "Domain name system",
              "Data storage",
              "Security protocol",
              "Programming language",
            ],
            answer: "Domain name system",
          },
        ],
      },
      security: {
        name: "Network Security",
        questions: [
          {
            id: 1,
            question: "What is a VPN?",
            options: [
              "Virtual Private Network",
              "Visual Program Network",
              "Virtual Program Node",
              "Visual Private Node",
            ],
            answer: "Virtual Private Network",
          },
          {
            id: 2,
            question: "What is SSL/TLS?",
            options: [
              "Security protocols",
              "Programming languages",
              "Operating systems",
              "Database systems",
            ],
            answer: "Security protocols",
          },
        ],
      },
    },
  },
};

const QuizApp = () => {
  const [view, setView] = useState("categories");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setView("topics");
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setView("quiz");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const currentQuiz = topics[selectedCategory].topics[selectedTopic];

    if (selectedAnswer === currentQuiz.questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < currentQuiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setView("categories");
    setSelectedCategory(null);
    setSelectedTopic(null);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const renderCategories = () => (
    <div className="categories-container">
      <h1>Select a Category</h1>
      <div className="categories-grid">
        {Object.keys(topics).map((category) => (
          <div
            key={category}
            className="category-card"
            onClick={() => handleCategorySelect(category)}
          >
            <span className="category-icon">{topics[category].icon}</span>
            <h2>{topics[category].name}</h2>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTopics = () => (
    <div className="topics-container">
      <h1>{topics[selectedCategory].name} Topics</h1>
      <div className="topics-grid">
        {Object.keys(topics[selectedCategory].topics).map((topic) => (
          <div
            key={topic}
            className="topic-card"
            onClick={() => handleTopicSelect(topic)}
          >
            <h2>{topics[selectedCategory].topics[topic].name}</h2>
            <p>
              {topics[selectedCategory].topics[topic].questions.length}{" "}
              Questions
            </p>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={handleReset}>
        Back to Categories
      </button>
    </div>
  );

  const renderQuiz = () => {
    const currentQuiz = topics[selectedCategory].topics[selectedTopic];
    const currentQ = currentQuiz.questions[currentQuestion];

    return showResult ? (
      <div className="result-container">
        <h1>Quiz Complete!</h1>
        <p>
          Your Score: {score}/{currentQuiz.questions.length}
        </p>
        <button className="primary-button" onClick={handleReset}>
          Try Another Quiz
        </button>
      </div>
    ) : (
      <div className="quiz-container">
        <h1>{currentQuiz.name} Quiz</h1>
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${
                ((currentQuestion + 1) / currentQuiz.questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
        <div className="question-container">
          <h2>
            Question {currentQuestion + 1}/{currentQuiz.questions.length}
          </h2>
          <p>{currentQ.question}</p>
          <div className="options-container">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedAnswer === option ? "selected" : ""
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            className="primary-button"
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
          >
            {currentQuestion + 1 === currentQuiz.questions.length
              ? "Finish"
              : "Next"}
          </button>
        </div>
      </div>
    );
  };

  const getView = () => {
    switch (view) {
      case "topics":
        return renderTopics();
      case "quiz":
        return renderQuiz();
      default:
        return renderCategories();
    }
  };

  return (
    <div className="quiz-app">
      <style>
        {`
         
/* Compact Base Container */
.quiz-app {
  max-width: 900px;
  margin: 1rem auto;
  padding: 1.5rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-radius: 1.5rem;
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  min-height: auto;
}

/* Compact Category Grid - 4 columns */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 0.75rem;
  margin: 0.75rem 0;
}

/* Compact Category Cards */
.category-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  padding: 1.25rem;
  height: 120px;
  border: 1px solid rgba(59, 130, 246, 0.15);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.category-card:hover {
  transform: translateY(-3px);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 
    0 10px 20px -8px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(59, 130, 246, 0.2);
}

/* Category Icons */
.category-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #60a5fa;
}

/* Compact Quiz Container */
.quiz-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 1.25rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
  backdrop-filter: blur(12px);
}

/* Compact Question Container */
.question-container {
  background: rgba(42, 59, 83, 0.6);
  border-radius: 0.875rem;
  padding: 1.25rem;
  margin: 1rem 0;
  border: 1px solid rgba(59, 130, 246, 0.15);
}

/* Compact Options */
.options-container {
  display: grid;
  gap: 0.75rem;
  margin: 1rem 0;
}

.option-button {
  background: rgba(30, 41, 59, 0.8);
  padding: 0.875rem 1rem;
  border-radius: 0.625rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9375rem;
  position: relative;
  overflow: hidden;
}

.option-button::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.option-button:hover::after {
  opacity: 1;
}

.option-button.selected {
  background: linear-gradient(135deg, #1d4ed8, #2563eb);
  border-color: #60a5fa;
  color: white;
  transform: scale(1.02);
}

/* Compact Progress Bar */
.progress-bar {
  height: 4px;
  background: rgba(51, 65, 85, 0.4);
  border-radius: 2px;
  overflow: hidden;
  margin: 1rem 0;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  transition: width 0.3s ease;
  position: relative;
}

.progress::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: shimmer 2s infinite;
}

/* Compact Buttons */
.primary-button,
.back-button {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.primary-button:hover,
.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
}

/* Compact Result Container */
.result-container {
  max-width: 400px;
  margin: 1rem auto;
  padding: 1.5rem;
  text-align: center;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 1rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
  backdrop-filter: blur(12px);
}

/* Compact Typography */
h1 {
  font-size: 1.5rem;
  color: #f8fafc;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 600;
}

h2 {
  font-size: 1.125rem;
  color: #f1f5f9;
  margin: 0.5rem 0;
}

/* Compact Card Title */
.category-card h2 {
  font-size: 1rem;
  margin: 0;
  text-align: center;
}

/* Animations */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }

  .quiz-app {
    margin: 0.5rem;
    padding: 1rem;
  }

  .quiz-container,
  .result-container {
    padding: 1rem;
  }
}
  .topics-container {
  animation: slideIn 0.4s ease-out;
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
  margin: 1.5rem 0;
}

.topic-card {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(59, 130, 246, 0.15);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.topic-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.topic-card:hover {
  transform: translateY(-4px);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 
    0 12px 24px -8px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(59, 130, 246, 0.2);
}

.topic-card:hover::before {
  opacity: 1;
}

/* Enhanced Quiz Layout */
.quiz-container {
  animation: fadeScale 0.5s ease-out;
  background: rgba(30, 41, 59, 0.9);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(59, 130, 246, 0.1);
}

.question-container {
  animation: slideUp 0.4s ease-out;
  background: rgba(42, 59, 83, 0.7);
  backdrop-filter: blur(8px);
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.1),
    0 8px 16px -4px rgba(0, 0, 0, 0.2);
}

/* Enhanced Option Buttons */
.option-button {
  background: rgba(30, 41, 59, 0.9);
  backdrop-filter: blur(8px);
  box-shadow: 
    0 4px 8px -2px rgba(0, 0, 0, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
  transform-origin: center;
  will-change: transform;
}

.option-button:hover {
  transform: scale(1.02) translateY(-2px);
  background: rgba(37, 99, 235, 0.1);
}

.option-button.selected {
  animation: selectPulse 0.4s ease-out;
}

/* Enhanced Result Container */
.result-container {
  animation: popIn 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 
    0 24px 48px -12px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(59, 130, 246, 0.2);
}

/* New Animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes selectPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Enhanced Progress Bar */
.progress-bar {
  background: rgba(51, 65, 85, 0.6);
  backdrop-filter: blur(4px);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
}

.progress {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
}

/* Enhanced Typography */
.topic-card h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.5rem;
}

.topic-card p {
  color: #94a3b8;
  font-size: 0.875rem;
}

/* Additional Responsive Styles */
@media (max-width: 640px) {
  .topics-grid {
    grid-template-columns: 1fr;
  }
  
  .quiz-container {
    margin: 0.5rem;
    padding: 1rem;
  }
  
  .option-button {
    padding: 1rem;
  }
}
        `}
      </style>
      {getView()}
    </div>
  );
};

export default QuizApp;
