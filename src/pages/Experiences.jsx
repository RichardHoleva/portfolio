import React from "react";
import "../styles/experiences.css";

const CONTACT = {
  email: "richardholeva1012@gmail.com", // Replace with your actual email
  phone: "+421900000000", // Replace with your actual phone
  linkedin: "https://www.linkedin.com/in/your-handle", // Replace with your LinkedIn
  cv: "/cv.pdf", // put your CV file in /public as cv.pdf or update this path
};

export default function Experiences() {
  return (
    <main className="xp404">
      {/* moved back button outside the card */}
      <a
        href="/"
        className="back-btn"
        onClick={(e) => {
          e.preventDefault();
          if (window.history.length > 1) window.history.back();
          else window.location.href = "/";
        }}
        aria-label="Go back to portfolio"
      >
        ← Back
      </a>

      <section className="xp404-card" role="region" aria-labelledby="xp404-title">
        {/* removed back button from inside */}
        <h1 id="xp404-title" className="xp404-title">
          <span className="xp404-code" aria-hidden="true">404</span>
          Oops… no experiences yet!
        </h1>

        <p className="xp404-tagline">
          BUT! Don’t hesitate to reach out and change it 😉!
        </p>

        {/* removed styled copyable block; replaced with simple line */}
        <p className="contact-email-line">
          <strong>Email:</strong>{" "}
          <span className="contact-email">{CONTACT.email}</span>
        </p>
        <nav className="xp404-actions" aria-label="Contact options">
          <a className="btn outline" href="https://www.linkedin.com/in/richard-holeva-8621b8326" target="_blank" rel="noreferrer">LinkedIn me</a>
        </nav>

      </section>
    </main>
  );
}