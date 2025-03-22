import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/CertificatesPage.css";

function CertificatesPage() {
  const [certificates] = useState([
    { id: 1, name: "AI Basics", date: "August 12, 2024", field: "ai-basics" },
    {
      id: 2,
      name: "Machine Learning",
      date: "September 03, 2024",
      field: "machine-learning",
    },
    {
      id: 3,
      name: "Deep Learning",
      date: "October 15, 2024",
      field: "deep-learning",
    },
  ]);

  const shareOnLinkedIn = (certificate) => {
    const linkedInURL = `https://www.linkedin.com/sharing/share-offsite/?url=https://yourplatform.com/certificates/${certificate.id}`;
    window.open(linkedInURL, "_blank");
  };

  const generateCertificate = (certificate) => {
    const input = document.getElementById(`certificate-${certificate.id}`);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");
      pdf.addImage(imgData, "PNG", 10, 10, 280, 150);
      pdf.save(`${certificate.name}-Certificate.pdf`);
    });
  };

  return (
    <div className="certificates-page">
      <header className="certificates-header">
        <h1>Your Achievements</h1>
        <p>Showcase and share your verified learning certificates.</p>
      </header>
      <section className="certificates-list">
        {certificates.length > 0 ? (
          certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="certificate-card"
              id={`certificate-${certificate.id}`}
            >
              <div className="certificate-template">
                <h2>Certificate of Completion</h2>
                <p>This is to certify that</p>
                <h3>[User's Name]</h3>
                <p>has successfully completed the</p>
                <h2>{certificate.name}</h2>
                <p>on {certificate.date}</p>
                <p className="signature">Authorized Signature</p>
              </div>
              <button
                className="share-btn"
                onClick={() => shareOnLinkedIn(certificate)}
              >
                Share on LinkedIn
              </button>
              <button
                className="download-btn"
                onClick={() => generateCertificate(certificate)}
              >
                Download Certificate
              </button>
            </div>
          ))
        ) : (
          <p>No certificates earned yet. Keep learning!</p>
        )}
      </section>
    </div>
  );
}

export default CertificatesPage;
