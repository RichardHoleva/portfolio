import React from "react";
import "../styles/contact.css";

export default function Contact() {
  return (
    <section id="contact" className="contact-wrap" aria-labelledby="contact-title">
      <div className="contact-center">
        <header className="contact-hero" role="banner">
          <h1 id="contact-title" className="contact-title">
            <span>Let’s connect</span>
            <span className="accent">Let’s connect</span>
          </h1>



          <div className="cta-row" role="group" aria-label="Contact actions">
            <a className="btn btn-primary" href="mailto:richardholeva1012@gmail.com">
              Email Me
            </a>
            <a
              className="btn btn-ghost"
              href="/Holeva_Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View Résumé
            </a>
          </div>

          <ul className="contact-links" aria-label="Social links">
            <li>
              <a href="https://www.linkedin.com/in/your-handle" target="_blank" rel="noreferrer">
                <span aria-hidden="true">↗</span> LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/your-handle" target="_blank" rel="noreferrer">
                <span aria-hidden="true">↗</span> GitHub
              </a>
            </li>
          </ul>
        </header>
      </div>

    </section>
  );
}