import React, { useRef } from 'react';
import '../styles/navbar.css';
import logo from '../assets/logo.png';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function DecodeText({ text, duration = 600 }) {
  const spanRef = useRef(null);

  const animate = () => {
    const el = spanRef.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = text;
      return;
    }

    // Prevent overlapping animations
    if (el._rafId) cancelAnimationFrame(el._rafId);

    const target = text;
    const len = target.length;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const revealCount = Math.floor(progress * len);

      let out = '';
      for (let i = 0; i < len; i++) {
        const ch = target[i];
        const isAnimatable = /[A-Za-z0-9]/.test(ch);
        if (i < revealCount || !isAnimatable) {
          out += ch;
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      el.textContent = out;

      if (progress < 1) {
        el._rafId = requestAnimationFrame(tick);
      } else {
        el.textContent = target;
        el._rafId = null;
      }
    };

    el._rafId = requestAnimationFrame(tick);
  };

  return (
    <span
      className="decode"
      ref={spanRef}
      onMouseEnter={animate}
      aria-hidden="true"
    >
      {text}
    </span>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <ul className="nav-links">
        <li>
          <a href="#about" aria-label="About">
            <DecodeText text="About" />
          </a>
        </li>
        <li>
          <a href="#projects" aria-label="Projects">
            <DecodeText text="Projects" />
          </a>
        </li>
        <li>
          <a href="#contact" aria-label="Contact">
            <DecodeText text="Contact" />
          </a>
        </li>
      </ul>
      <button
        className="resume-btn"
        onClick={() => window.open('/resume.pdf', '_blank')}
      >
        Experiences
      </button>
    </nav>
  );
}

export default Navbar;