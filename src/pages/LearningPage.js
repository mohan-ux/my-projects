import React from "react";
import "../styles/LearningPage.css";

function LearningPage() {
  return (
    <div className="learning-page">
      <header className="learning-header">
        <h1>Explore Our Learning Modules</h1>
        <p>
          Discover our expertly crafted learning paths designed to enhance your
          skills.
        </p>
      </header>
      <section className="modules">
        <div className="module-card">
          <div className="module-image module1"></div>
          <h2>Module 1: AI Basics</h2>
          <p>
            Get started with the fundamentals of Artificial Intelligence,
            including basic concepts and introductory techniques.
          </p>
          <a href="#" className="btn">
            Start Learning
          </a>
        </div>
        <div className="module-card">
          <div className="module-image module2"></div>
          <h2>Module 2: Machine Learning</h2>
          <p>
            Dive deep into machine learning algorithms and techniques, with
            practical examples and exercises.
          </p>
          <a href="#" className="btn">
            Start Learning
          </a>
        </div>
        <div className="module-card">
          <div className="module-image module3"></div>
          <h2>Module 3: Deep Learning</h2>
          <p>
            Explore neural networks and deep learning models, with advanced
            topics and hands-on projects.
          </p>
          <a href="#" className="btn">
            Start Learning
          </a>
        </div>
      </section>
      <section className="featured-instructors">
        <h2>Featured Instructors</h2>
        <div className="instructor-card">
          <div className="instructor-image instructor1"></div>
          <h3>Dr. Jane Doe</h3>
          <p>AI Specialist with 20 years of experience in the field.</p>
        </div>
        <div className="instructor-card">
          <div className="instructor-image instructor2"></div>
          <h3>Prof. John Smith</h3>
          <p>Machine Learning Expert and author of several textbooks.</p>
        </div>
        <div className="instructor-card">
          <div className="instructor-image instructor3"></div>
          <h3>Dr. Alice Johnson</h3>
          <p>
            Deep Learning researcher with a focus on neural network
            architectures.
          </p>
        </div>
      </section>
      <section className="testimonials">
        <h2>What Our Learners Say</h2>
        <div className="testimonial-card">
          <p>
            "The AI Basics module provided me with a solid foundation in AI.
            Highly recommend!"
          </p>
          <h4>- Sarah Lee</h4>
        </div>
        <div className="testimonial-card">
          <p>
            "The Machine Learning course was comprehensive and hands-on. Loved
            the projects!"
          </p>
          <h4>- Michael Brown</h4>
        </div>
        <div className="testimonial-card">
          <p>
            "Deep Learning with practical applications was eye-opening. Great
            learning experience."
          </p>
          <h4>- Emily Davis</h4>
        </div>
      </section>
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>What prerequisites do I need?</h3>
          <p>
            Basic understanding of programming and mathematics is recommended.
          </p>
        </div>
        <div className="faq-item">
          <h3>How long does each module take?</h3>
          <p>
            Each module is designed to be completed in 4-6 weeks, depending on
            your pace.
          </p>
        </div>
        <div className="faq-item">
          <h3>Can I get a certificate?</h3>
          <p>
            Yes, a certificate of completion is awarded after finishing each
            module.
          </p>
        </div>
      </section>
    </div>
  );
}

export default LearningPage;
