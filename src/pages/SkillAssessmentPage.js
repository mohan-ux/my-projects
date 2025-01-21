import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import "../styles/SkillAssessmentPage.css";

// Temporary quiz data
const quizData = [
  {
    id: 1,
    question: "What is JavaScript?",
    options: ["Language", "Animal", "Car", "Food"],
    answer: "Language",
  },
  {
    id: 2,
    question: "What is React?",
    options: ["Framework", "Library", "Language", "Tool"],
    answer: "Library",
  },
  {
    id: 3,
    question: "What is HTML?",
    options: [
      "Programming Language",
      "Markup Language",
      "Styling Language",
      "Database",
    ],
    answer: "Markup Language",
  },
  // Add more questions here
];

// Temporary coding challenges
const codingChallenges = [
  {
    id: 1,
    title: "Reverse a String",
    description: "Write a function to reverse a string.",
    testCases: [
      { input: "hello", output: "olleh" },
      { input: "world", output: "dlrow" },
    ],
  },
  {
    id: 2,
    title: "Sum of Array",
    description: "Write a function to calculate the sum of an array.",
    testCases: [
      { input: [1, 2, 3], output: 6 },
      { input: [4, 5, 6], output: 15 },
    ],
  },
  // Add more challenges here
];

const SkillAssessmentPage = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    score: 0,
    selectedOption: null,
    isSubmitted: false,
  });
  const [challengeState, setChallengeState] = useState({
    code: "",
    progress: 0,
    currentChallenge: 0,
    output: "",
  });
  const [projectState, setProjectState] = useState({
    projects: [],
    newProject: {
      name: "",
      code: "",
      type: "", // 'create' or 'upload'
    },
  });

  // Quiz handlers
  const handleQuizNext = () => {
    if (quizState.currentQuestion < quizData.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        selectedOption: null,
        isSubmitted: false,
      }));
    } else {
      alert(
        `Quiz completed! Your score: ${quizState.score}/${quizData.length}`
      );
      setQuizState({
        currentQuestion: 0,
        score: 0,
        selectedOption: null,
        isSubmitted: false,
      });
      setActiveTool(null);
    }
  };

  const handleOptionSelect = (option) => {
    setQuizState((prev) => ({
      ...prev,
      selectedOption: option,
    }));
  };

  const handleQuizSubmit = () => {
    const { selectedOption, currentQuestion } = quizState;
    const correctAnswer = quizData[currentQuestion].answer;

    if (selectedOption === correctAnswer) {
      setQuizState((prev) => ({
        ...prev,
        score: prev.score + 1,
        isSubmitted: true,
      }));
    } else {
      setQuizState((prev) => ({
        ...prev,
        isSubmitted: true,
      }));
    }
  };

  // Challenge handlers
  const handleCodeChange = (value) => {
    setChallengeState((prev) => ({
      ...prev,
      code: value,
    }));
  };

  const handleRunCode = () => {
    const { code, currentChallenge } = challengeState;
    const challenge = codingChallenges[currentChallenge];

    try {
      const userFunction = new Function(`return ${code}`)();
      const results = challenge.testCases.map((testCase) => ({
        input: testCase.input,
        expected: testCase.output,
        actual: userFunction(testCase.input),
      }));

      setChallengeState((prev) => ({
        ...prev,
        output: results,
        progress: prev.progress + 25, // Increment progress
      }));
    } catch (error) {
      setChallengeState((prev) => ({
        ...prev,
        output: `Error: ${error.message}`,
      }));
    }
  };

  const handleNextChallenge = () => {
    if (challengeState.currentChallenge < codingChallenges.length - 1) {
      setChallengeState((prev) => ({
        ...prev,
        currentChallenge: prev.currentChallenge + 1,
        code: "",
        output: "",
      }));
    } else {
      alert("All challenges completed!");
      setChallengeState({
        code: "",
        progress: 0,
        currentChallenge: 0,
        output: "",
      });
      setActiveTool(null);
    }
  };

  // Project handlers
  const handleProjectCreate = () => {
    if (projectState.newProject.name) {
      setProjectState((prev) => ({
        ...prev,
        projects: [
          ...prev.projects,
          {
            id: Date.now(),
            ...prev.newProject,
          },
        ],
        newProject: { name: "", code: "", type: "" },
      }));
    }
  };

  return (
    <div className="skill-assessment-page">
      <header className="skill-assessment-header">
        <h1>Skill Assessment</h1>
        <p>Test and improve your skills through various challenges</p>
      </header>

      {!activeTool ? (
        <div className="tool-selector">
          <div className="tool-card" onClick={() => setActiveTool("quiz")}>
            <h2>📝 Quiz</h2>
            <p>Test your knowledge with random questions</p>
          </div>

          <div
            className="tool-card"
            onClick={() => setActiveTool("challenges")}
          >
            <h2>💻 Challenges</h2>
            <p>Solve real-world coding problems</p>
          </div>

          <div className="tool-card" onClick={() => setActiveTool("projects")}>
            <h2>🛠️ Projects</h2>
            <p>Build & upload your own projects</p>
          </div>
        </div>
      ) : (
        <div className="tool-interface">
          <button className="back-btn" onClick={() => setActiveTool(null)}>
            ← Back
          </button>

          {activeTool === "quiz" && (
            <div className="quiz-interface">
              <div className="question-container">
                <h3>{quizData[quizState.currentQuestion].question}</h3>
                <div className="options-grid">
                  {quizData[quizState.currentQuestion].options.map(
                    (option, i) => (
                      <button
                        key={i}
                        className={`option-btn ${
                          quizState.selectedOption === option ? "selected" : ""
                        }`}
                        onClick={() => handleOptionSelect(option)}
                        disabled={quizState.isSubmitted}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </div>
              {quizState.isSubmitted && (
                <p>
                  {quizState.selectedOption ===
                  quizData[quizState.currentQuestion].answer
                    ? "Correct! 🎉"
                    : "Incorrect! 😢"}
                </p>
              )}
              <button
                className="nav-btn"
                onClick={
                  quizState.isSubmitted ? handleQuizNext : handleQuizSubmit
                }
              >
                {quizState.isSubmitted ? "Next Question" : "Submit Answer"}
              </button>
              <p>Score: {quizState.score}</p>
              <div className="quiz-progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `${
                      ((quizState.currentQuestion + 1) / quizData.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          )}

          {activeTool === "challenges" && (
            <div className="challenge-interface">
              <div className="editor-container">
                <h3>
                  {codingChallenges[challengeState.currentChallenge].title}
                </h3>
                <p>
                  {
                    codingChallenges[challengeState.currentChallenge]
                      .description
                  }
                </p>
                <MonacoEditor
                  height="400px"
                  language="javascript"
                  theme="vs-dark"
                  value={challengeState.code}
                  onChange={handleCodeChange}
                />
              </div>
              <div className="challenge-controls">
                <button className="submit-btn" onClick={handleRunCode}>
                  Run Code
                </button>
                <button className="nav-btn" onClick={handleNextChallenge}>
                  Next Challenge
                </button>
                <div className="progress-bar">
                  Progress: {challengeState.progress}%
                </div>
              </div>
              <div className="output-container">
                <h4>Output:</h4>
                <pre>{JSON.stringify(challengeState.output, null, 2)}</pre>
              </div>
            </div>
          )}

          {activeTool === "projects" && (
            <div className="project-interface">
              <div className="project-creation">
                <div className="creation-options">
                  <button
                    className={`option-btn ${
                      projectState.newProject.type === "create" ? "active" : ""
                    }`}
                    onClick={() =>
                      setProjectState((prev) => ({
                        ...prev,
                        newProject: { ...prev.newProject, type: "create" },
                      }))
                    }
                  >
                    🆕 New Project
                  </button>
                  <button
                    className={`option-btn ${
                      projectState.newProject.type === "upload" ? "active" : ""
                    }`}
                    onClick={() =>
                      setProjectState((prev) => ({
                        ...prev,
                        newProject: { ...prev.newProject, type: "upload" },
                      }))
                    }
                  >
                    📤 Upload Project
                  </button>
                </div>

                {projectState.newProject.type === "create" && (
                  <div className="editor-section">
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={projectState.newProject.name}
                      onChange={(e) =>
                        setProjectState((prev) => ({
                          ...prev,
                          newProject: {
                            ...prev.newProject,
                            name: e.target.value,
                          },
                        }))
                      }
                    />
                    <MonacoEditor
                      height="400px"
                      language="javascript"
                      theme="vs-dark"
                      value={projectState.newProject.code}
                      onChange={(value) =>
                        setProjectState((prev) => ({
                          ...prev,
                          newProject: { ...prev.newProject, code: value },
                        }))
                      }
                    />
                    <button className="save-btn" onClick={handleProjectCreate}>
                      Create Project
                    </button>
                  </div>
                )}

                {projectState.newProject.type === "upload" && (
                  <div className="upload-section">
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setProjectState((prev) => ({
                            ...prev,
                            newProject: {
                              ...prev.newProject,
                              name: file.name,
                              code: URL.createObjectURL(file),
                            },
                          }));
                        }
                      }}
                    />
                    <button
                      className="upload-btn"
                      onClick={handleProjectCreate}
                    >
                      Upload Project
                    </button>
                  </div>
                )}
              </div>

              <div className="project-list">
                <h3>Your Projects</h3>
                {projectState.projects.map((project) => (
                  <div key={project.id} className="project-item">
                    <h4>{project.name}</h4>
                    <div className="project-actions">
                      <button className="share-btn">Share on LinkedIn</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillAssessmentPage;
