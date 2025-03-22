import { useState, useEffect, useRef } from "react";
import "../styles/LearningPage.css";
import AICyberBackground from "../pages/ModernCyberBackground";
import Dashboard from "./Dashboard";

const App = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    age: "",
    experience: "",
    selectedCourse: "",
  });

  const [isLearningStarted, setIsLearningStarted] = useState(false);
  const [recommendedFields, setRecommendedFields] = useState([]);
  const [selectedField, setSelectedField] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [code, setCode] = useState("// Write your code here\n");
  const [output, setOutput] = useState("Compiled output will appear here.");
  const [tasks, setTasks] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [progress, setProgress] = useState({
    taskCompletion: 0,
    learningProgress: 0,
    challenges: 0,
    streak: 0,
  });

  const [editorWidth, setEditorWidth] = useState(30);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);
  const editorRef = useRef(null);
  const resizeHandleRef = useRef(null);

  // Custom courses based on field
  const customCourses = {
    "AI Basics": [
      "Introduction to AI",
      "Machine Learning Fundamentals",
      "Neural Networks Basics",
    ],
    "Web Development": [
      "HTML & CSS",
      "JavaScript Basics",
      "React Fundamentals",
    ],
    "Game Development": ["Unity Basics", "Game Design", "3D Modeling"],
    "Machine Learning": ["Python for ML", "Deep Learning", "Computer Vision"],
    "Full-Stack Development": [
      "Frontend Masters",
      "Backend Architecture",
      "Database Design",
    ],
    "Data Analysis": [
      "SQL Mastery",
      "Data Visualization",
      "Statistical Analysis",
    ],
    "Deep Learning": [
      "Advanced Neural Networks",
      "Natural Language Processing",
      "Reinforcement Learning",
    ],
    "Cloud Computing": [
      "AWS Fundamentals",
      "Azure Basics",
      "Cloud Architecture",
    ],
    Blockchain: [
      "Cryptocurrency Basics",
      "Smart Contracts",
      "DApp Development",
    ],
  };

  const courseVideos = {
    "Introduction to AI": "https://www.youtube.com/embed/JMUxmLyrhSk",
    "Machine Learning Fundamentals":
      "https://www.youtube.com/embed/ukzFI9rgwfU",
    "Neural Networks Basics": "https://www.youtube.com/embed/aircAruvnKk",
    "HTML & CSS": "https://www.youtube.com/embed/G3e-cpL7ofc",
    "JavaScript Basics": "https://www.youtube.com/embed/W6NZfCO5SIk",
    "React Fundamentals": "https://www.youtube.com/embed/Ke90Tje7VS0",
    "Unity Basics": "https://www.youtube.com/embed/gB1F9G0JXOo",
    "Python for ML": "https://www.youtube.com/embed/KNAWp2S3w94",
    "Frontend Masters": "https://www.youtube.com/embed/0ohtVzCSHqs",
    "SQL Mastery": "https://www.youtube.com/embed/HXV3zeQKqGY",
    "Advanced Neural Networks": "https://www.youtube.com/embed/Ih5Mr93E-2c",
    "AWS Fundamentals": "https://www.youtube.com/embed/3hLmDS179YE",
    "Cryptocurrency Basics": "https://www.youtube.com/embed/rYQgy8QDEBI",
    default: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  };

  const courseSpecificResponses = {
    "Introduction to AI": {
      concepts:
        "AI concepts include machine learning, neural networks, and deep learning. What specific topic would you like to explore?",
      examples:
        "Here's an example of AI in action: a spam detection system using natural language processing.",
      help: "I can help you understand AI fundamentals. What's challenging you?",
    },
    "JavaScript Basics": {
      concepts:
        "JavaScript fundamentals include variables, functions, loops, and objects. What would you like to learn about?",
      examples:
        "Here's a simple JavaScript example: let count = 0; count++; // Increments count by 1",
      help: "I can help with JavaScript syntax and concepts. What's giving you trouble?",
    },
    "Neural Networks Basics": {
      concepts:
        "Neural networks consist of layers, neurons, weights, and activation functions. Which concept interests you?",
      examples:
        "Here's a simple neural network for digit recognition using TensorFlow.",
      help: "I can explain neural network architectures. What part is unclear?",
    },
  };

  useEffect(() => {
    if (editorRef.current && !resizeHandleRef.current) {
      const handle = document.createElement("div");
      handle.classList.add("resize-handle");
      editorRef.current.appendChild(handle);
      resizeHandleRef.current = handle;

      return () => {
        if (resizeHandleRef.current) {
          resizeHandleRef.current.remove();
        }
      };
    }
  }, []);

  // Handle resize functionality
  useEffect(() => {
    let isResizing = false;

    const handleMouseDown = (e) => {
      isResizing = true;
      document.body.style.cursor = "se-resize";
    };

    const handleMouseMove = (e) => {
      if (!isResizing || !editorRef.current) return;

      const newHeight =
        e.clientY - editorRef.current.getBoundingClientRect().top;
      const newWidth =
        e.clientX - editorRef.current.getBoundingClientRect().left;

      editorRef.current.style.height = `${newHeight}px`;
      editorRef.current.style.width = `${newWidth}px`;
    };

    const handleMouseUp = () => {
      isResizing = false;
      document.body.style.cursor = "default";
    };

    if (resizeHandleRef.current) {
      resizeHandleRef.current.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        if (resizeHandleRef.current) {
          resizeHandleRef.current.removeEventListener(
            "mousedown",
            handleMouseDown
          );
        }
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, []);

  // Drag functionality for code editor
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startWidth.current = editorWidth;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    const containerWidth = document.querySelector(".app-container").offsetWidth;
    const newWidth = startWidth.current - (delta / containerWidth) * 100;
    setEditorWidth(Math.min(Math.max(newWidth, 20), 80));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Function to render circular progress
  const CircularProgress = ({ value, label, color }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const progress = ((100 - value) / 100) * circumference;
    const handleCodeExecution = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/compile", {
          // Replace with your backend URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: selectedLanguage,
            code,
          }),
        });

        const data = await response.json();
        if (data.error) {
          setOutput(`Error: ${data.error}`);
        } else {
          setOutput(data.output);
        }
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
    };

    return (
      <div className="circular-progress">
        <svg width="80" height="80" className="circular-chart">
          <circle className="circle-bg" cx="40" cy="40" r={radius} />
          <circle
            className="circle"
            cx="40"
            cy="40"
            r={radius}
            strokeDasharray={`${progress} ${circumference}`}
            style={{ stroke: color }}
          />
          <text x="40" y="40" className="percentage">
            {value}%
          </text>
          <text x="40" y="50" className="label">
            {label}
          </text>
        </svg>
      </div>
    );
  };

  // Recommend fields based on experience
  const recommendFields = () => {
    const fieldMap = {
      Beginner: ["AI Basics", "Web Development", "Game Development"],
      Intermediate: [
        "Machine Learning",
        "Full-Stack Development",
        "Data Analysis",
      ],
      Advanced: ["Deep Learning", "Cloud Computing", "Blockchain"],
    };
    return fieldMap[userDetails.experience] || [];
  };

  // Calculate progress with enhanced metrics
  const calculateProgress = (currentTasks) => {
    const completedTasks = currentTasks.filter((task) => task.completed).length;
    const taskCompletionRate =
      currentTasks.length > 0
        ? Math.round((completedTasks / currentTasks.length) * 100)
        : 0;

    const challengesCompleted = Math.min(completedTasks * 10, 100);
    const streakCount = Math.min(completedTasks * 5, 100);

    setProgress({
      taskCompletion: taskCompletionRate,
      learningProgress: Math.round(
        taskCompletionRate * 0.7 + streakCount * 0.3
      ),
      challenges: challengesCompleted,
      streak: streakCount,
    });
  };

  // Enhanced task management
  const handleToggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : null,
            }
          : task
      )
    );
    calculateProgress(tasks);
  };

  // Chat handling functionality
  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      sender: "User",
      message: chatInput,
      timestamp: new Date().toLocaleTimeString(),
    };

    const generateAIResponse = (message) => {
      const course = userDetails.selectedCourse;
      const courseResponses = courseSpecificResponses[course] || {};
      const lowercaseMessage = message.toLowerCase();

      if (lowercaseMessage.includes("concept")) {
        return (
          courseResponses.concepts ||
          "Let me explain the key concepts for this course."
        );
      } else if (lowercaseMessage.includes("example")) {
        return (
          courseResponses.examples ||
          "Here's a relevant example for your course."
        );
      } else if (lowercaseMessage.includes("help")) {
        return (
          courseResponses.help ||
          "I'm here to help! What specific aspect are you struggling with?"
        );
      }

      return `I understand you're learning ${course}. How can I assist you with your studies?`;
    };

    const aiMessage = {
      sender: "AI",
      message: generateAIResponse(chatInput),
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatMessages([...chatMessages, userMessage, aiMessage]);
    setChatInput("");
  };

  // Code execution with syntax highlighting
  const getCodeStyle = () => {
    return {
      backgroundColor: "#1e1e1e",
      color: "#d4d4d4",
      padding: "15px",
      borderRadius: "8px",
      fontFamily: "monospace",
      fontSize: "14px",
      lineHeight: "1.5",
      border: "1px solid #333",
    };
  };

  const handleCodeExecution = async () => {
    try {
      // For non-JavaScript languages
      if (selectedLanguage !== "javascript") {
        const response = await fetch("http://127.0.0.1:5000/compile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: selectedLanguage,
            code,
            testCases: [], // Add relevant test cases if available
          }),
        });

        const data = await response.json();
        setOutput(data.output || data.error);
      } else {
        // Client-side JavaScript execution
        const result = eval(code);
        setOutput(result?.toString() || "Code executed successfully");
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };
  const handleStartLearning = () => {
    if (selectedField && userDetails.selectedCourse) {
      setIsLearningStarted(true);
      const initialTasks = [
        `Complete ${userDetails.selectedCourse} introduction`,
        `Practice ${userDetails.selectedCourse} fundamentals`,
        `Build first project in ${userDetails.selectedCourse}`,
        `Take ${userDetails.selectedCourse} assessment`,
      ].map((text, index) => ({
        id: Date.now() + index,
        text,
        completed: false,
        dueDate: new Date(Date.now() + (index + 1) * 86400000),
      }));

      setTasks(initialTasks);
      calculateProgress(initialTasks);

      setChatMessages([
        {
          sender: "AI",
          message: `Welcome to ${userDetails.selectedCourse}! I'm your AI learning assistant. How can I help you get started?`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } else {
      alert("Please select both a field and a course to start learning!");
    }
  };

  return !isLearningStarted ? (
    <div className="app initial-screen">
      <AICyberBackground />
      <div class="background-wrapper">
        <div class="neural-grid"></div>

        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>

        <div class="binary-rain" id="binaryRain"></div>

        <div id="neuralConnections"></div>
      </div>
      <div className="welcome-container">
        <h1>AI-Powered Learning Platform</h1>
        <form
          className="user-details-form"
          onSubmit={(e) => {
            e.preventDefault();
            const fields = recommendFields();
            setRecommendedFields(fields);
          }}
        >
          <input
            type="text"
            placeholder="Name"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={userDetails.age}
            onChange={(e) =>
              setUserDetails({ ...userDetails, age: e.target.value })
            }
            required
          />
          <select
            value={userDetails.experience}
            onChange={(e) =>
              setUserDetails({ ...userDetails, experience: e.target.value })
            }
            required
          >
            <option value="">Select Experience Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <button className="sumbit" type="submit">
            Submit
          </button>
        </form>

        {recommendedFields.length > 0 && (
          <div className="field-selection">
            <h2>Select Your Learning Path</h2>
            <div className="field-options">
              {recommendedFields.map((field, index) => (
                <div key={index} className="field-card">
                  <input
                    type="radio"
                    id={`field-${index}`}
                    name="field"
                    value={field}
                    onChange={(e) => {
                      setSelectedField(e.target.value);
                      setUserDetails({ ...userDetails, selectedCourse: "" });
                    }}
                  />
                  <label htmlFor={`field-${index}`}>{field}</label>
                </div>
              ))}
            </div>

            {selectedField && (
              <div className="course-selection">
                <h3>Select Course</h3>
                <div className="course-options">
                  {customCourses[selectedField].map((course, index) => (
                    <div key={index} className="course-card">
                      <input
                        type="radio"
                        id={`course-${index}`}
                        name="course"
                        value={course}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            selectedCourse: e.target.value,
                          })
                        }
                      />
                      <label htmlFor={`course-${index}`}>{course}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleStartLearning}
              className="start-learning-btn"
              disabled={!selectedField || !userDetails.selectedCourse}
            >
              Start Learning
            </button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="app">
      <header className="app-header">
        <h1>Learning Platform - {userDetails.selectedCourse}</h1>
        <div className="user-info">
          <span className="span">Welcome, {userDetails.name}!</span>
          <button
            onClick={() => setIsLearningStarted(false)}
            className="change-course-btn"
          >
            Change Course
          </button>
        </div>
      </header>

      <div className="app-container">
        <div
          className="learning-section"
          style={{ width: `${100 - editorWidth}%` }}
        >
          <div className="video-player">
            <h2>Course Content</h2>
            <iframe
              src={
                courseVideos[userDetails.selectedCourse] || courseVideos.default
              }
              title="Course Video"
              allowFullScreen
              className="video-frame"
            />
          </div>

          <div className="chatbot">
            <h2>AI Assistant</h2>
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${msg.sender.toLowerCase()}`}
                >
                  <div className="message-content">{msg.message}</div>
                  <div className="message-timestamp">{msg.timestamp}</div>
                </div>
              ))}
            </div>
            <div className="chat-input-container">
              <input
                type="text"
                placeholder="Ask a question..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleChatSubmit()}
              />
              <button className="send" onClick={handleChatSubmit}>
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="resize-handle" onMouseDown={handleMouseDown}></div>

        <div
          className="code-editor"
          ref={editorRef}
          style={{ width: `${editorWidth}%` }}
        >
          <h2>Code Playground</h2>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="language-select"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="csharp">C#</option>
            <option value="typescript">TypeScript</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
            <option value="swift">Swift</option>
            <option value="kotlin">Kotlin</option>
            <option value="r">R</option>
            <option value="dart">Dart</option>
            <option value="scala">Scala</option>
            <option value="perl">Perl</option>
            <option value="haskell">Haskell</option>
            <option value="lua">Lua</option>
            <option value="elixir">Elixir</option>
            <option value="sql">SQL</option>
            <option value="shell">Shell Script</option>
            <option value="matlab">MATLAB</option>
            <option value="objectivec">Objective-C</option>
            <option value="groovy">Groovy</option>
            <option value="fsharp">F#</option>
            <option value="coffeescript">CoffeeScript</option>
            <option value="clojure">Clojure</option>
            <option value="vbnet">VB.NET</option>
            <option value="assembly">Assembly</option>
            <option value="julia">Julia</option>
            <option value="fortran">Fortran</option>
            <option value="lisp">Lisp</option>
            <option value="ada">Ada</option>
            <option value="pascal">Pascal</option>
          </select>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={getCodeStyle()}
            className="code-textarea"
          />
          <button onClick={handleCodeExecution} className="run-button">
            Run Code
          </button>
          <div className="output-container">
            <h4>Output:</h4>
            <pre>{output}</pre> {}
          </div>
        </div>
      </div>
      <Dashboard />
    </div>
  );
};

export default App;
