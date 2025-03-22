import React, { useState } from "react";
import "../styles/HomePage.css";

function HomePage() {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleLearnMore = () => {
    alert("Redirecting to the course page...");
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Your AI Learning Hub</h1>
          <p className="hero-subtitle">
            Redefine learning with cutting-edge AI technologies and tailored
            solutions.
          </p>
          <button
            className="hero-button"
            onClick={() => alert("Starting your journey...")}
          >
            Start Your Journey
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">Why Choose Us?</h2>
        <div className="features-container">
          {[
            {
              icon: "/icons/path.svg",
              title: "Personalized Learning Paths",
              description:
                "Discover courses designed to match your goals and learning pace.",
            },
            {
              icon: "/icons/video.svg",
              title: "Interactive Video Lessons",
              description:
                "Engaging, AI-generated content with real-time feedback.",
            },
            {
              icon: "/icons/chatbot.svg",
              title: "AI-Powered Assistance",
              description:
                "Receive instant guidance and support from our intelligent chatbot.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${
                expandedCard === index ? "expanded" : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="feature-icon"
              />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              {expandedCard === index && (
                <div className="expanded-content">
                  <p>Additional details about {feature.title.toLowerCase()}.</p>
                  <button className="learn-more-btn" onClick={handleLearnMore}>
                    Learn More
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
