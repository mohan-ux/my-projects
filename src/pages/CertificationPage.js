import React from "react";
import "../styles/CertificatesPage.css";

function CertificatesPage() {
  return (
    <div className="certificates-page">
      <header className="certificates-header">
        <h1>Your Certificates</h1>
        <p>Display and share your achievements with verified certificates.</p>
      </header>
      <section className="certificates-list">
        <div className="certificate-card">
          <div className="certificate-image ai-basics"></div>
          <h2>AI Basics Certificate</h2>
          <p>Completed on: August 12, 2024</p>
        </div>
        <div className="certificate-card">
          <div className="certificate-image machine-learning"></div>
          <h2>Machine Learning Certificate</h2>
          <p>Completed on: September 03, 2024</p>
        </div>
        <div className="certificate-card">
          <div className="certificate-image deep-learning"></div>
          <h2>Deep Learning Certificate</h2>
          <p>Completed on: October 15, 2024</p>
        </div>
      </section>
    </div>
  );
}

export default CertificatesPage;
