import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import "../styles/SkillAssessmentPage.css";
import CodingChallenges from "./coding challenge";
import ProjectManager from "./Projects";
import QuizApp from "./QuizChallenge";

const SkillAssessmentPage = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

          <div
            className="tool-card"
            onClick={() => setActiveTool("gamification")}
          >
            <h2>🎮 Games</h2>
            <p>Track achievements and level up your skills</p>
          </div>

          <div className="tool-card" onClick={() => setActiveTool("projects")}>
            <h2>🛠️ Projects</h2>
            <p>Build & upload your own projects</p>
          </div>
        </div>
      ) : (
        <div className="tool-interface">
          <button
            className="back-btn"
            onClick={() => {
              setActiveTool(null);
              setSelectedCategory(null);
            }}
          >
            ← Back
          </button>

          {activeTool === "quiz" && !selectedCategory && (
            <div className="category-selector">
              <QuizApp />
            </div>
          )}

          {activeTool === "quiz" && selectedCategory && (
            <div className="quiz-interface"></div>
          )}

          {activeTool === "challenges" && (
            <div className="challenge-interface">
              <CodingChallenges />
            </div>
          )}
          {activeTool === "gamification" && (
            <div className="gamification-interface"></div>
          )}

          {activeTool === "projects" && (
            <div className="project-interface">
              <ProjectManager />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillAssessmentPage;
