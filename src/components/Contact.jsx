import React from "react";
import "../styles/contact.css";

export default function Contact() {
  return (
    <section id="contact" className="section-block contact-hero" aria-labelledby="contact-title">
      <div className="contact-hero-wrap">
        <div className="contact-hero-left">
          <h1 id="contact-title" className="contact-hero-title">
            <span className="line">Let's</span>
            <span className="line">Connect</span>
          </h1>
          <div className="contact-hero-subtext">
            <p>Let us know how we can help</p>
            <p>Don't let your vision wait, let's bring it to life</p>
          </div>
        </div>

        <div className="contact-hero-right" aria-hidden="true">
          <div className="contact-art">
            <div className="ring"></div>
            <div className="ring ring-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
