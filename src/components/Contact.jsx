import React from "react";
import "../styles/contact.css";

export default function Contact() {
  return (
    <section id="contact" className="contact-wrap" aria-labelledby="contact-title">
      <div className="contact-center">
        <header className="contact-hero" role="banner">
          {/* Added big green "Let's connect" */}
          <div className="contact-connect-big" aria-hidden="true">Let’s connect</div>
          <h1 id="contact-title" className="contact-title">
            <span>Let’s connect</span>
          </h1>

          <div className="cta-row" role="group" aria-label="Contact actions">
            <a className="btn btn-primary" href="https://www.linkedin.com/in/richard-holeva-8621b8326">
              Linkedin me
            </a>
            <a
              className="btn btn-ghost"
              href="/Holeva_Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View Resume
            </a>
          </div>

        </header>
      </div>

    </section>
  );
}