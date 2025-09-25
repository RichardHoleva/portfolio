import React from "react";
import "../styles/experiences.css";

const CONTACT = {
  email: "your.email@example.com",
  phone: "+421900000000",
  linkedin: "https://www.linkedin.com/in/your-handle",
  cv: "/cv.pdf", // put your CV file in /public as cv.pdf or update this path
};

export default function Experiences() {
  return (
    <main className="xp404">
      <ul className="xp404-confetti" aria-hidden="true">
        <li>✨</li><li>⭐</li><li>💼</li><li>🚧</li><li>🧠</li><li>⚙️</li>
        <li>✨</li><li>⭐</li><li>💼</li><li>🚧</li><li>🧠</li><li>⚙️</li>
      </ul>

      <section className="xp404-card" role="region" aria-labelledby="xp404-title">
        <div className="xp404-emoji" aria-hidden="true">🙈</div>

        <h1 id="xp404-title" className="xp404-title">
          <span className="xp404-code" aria-hidden="true">404</span>
          Oops… no experiences yet!
        </h1>

        <p className="xp404-tagline">
          This page is still leveling up. Don’t hesitate to reach out—happy to share my story and CV!
        </p>

        <nav className="xp404-actions" aria-label="Contact options">
          <a className="btn primary" href={`mailto:${CONTACT.email}`}>Email me</a>
          <a className="btn outline" href={`tel:${CONTACT.phone}`}>Call</a>
          <a className="btn outline" href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn ghost" href={CONTACT.cv} target="_blank" rel="noreferrer">Download CV</a>
        </nav>

        <p className="xp404-note">
          Tip: You can rename this page later to showcase real experience. For now, enjoy the sparkles ✨
        </p>
      </section>
    </main>
  );
}