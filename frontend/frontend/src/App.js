import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CertificationPage from "./pages/CertificationPage";
import LearningPage from "./pages/LearningPage";
import SkillAssessmentPage from "./pages/SkillAssessmentPage";
import Signin from "./pages/signin"; // Import Signin component
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/assessment" element={<SkillAssessmentPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/certification" element={<CertificationPage />} />
        <Route path="/signin" element={<Signin />} />{" "}
        {/* Add route for Signin */}
      </Routes>
    </Router>
  );
}

export default App;
