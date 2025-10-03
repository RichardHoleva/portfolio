import React, { useRef, useEffect, useState } from 'react';
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
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [overlayClosing, setOverlayClosing] = useState(false);

  useEffect(() => {
    const calcProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const doc = scrollHeight - clientHeight;
      const pct = doc > 0 ? (scrollTop / doc) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, pct)));
    };

    const onScrollOrResize = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        calcProgress();
      });
    };

    calcProgress();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const closeMenu = () => {
    setOverlayClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setOverlayClosing(false);
    }, 300);
  };

  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu();
    } else {
      setMenuOpen(true);
    }
  };

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 680 && menuOpen) {
        setMenuOpen(false);
        setOverlayClosing(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  // Prevent scroll when menu is open (mobile)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      {/* Scroll progress bar */}
      <div className="scroll-progress" aria-hidden="true">
        <div
          className="scroll-progress__bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="nav-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* Burger menu button for mobile */}
      <button
        className={`burger${menuOpen ? ' open' : ''}`}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="nav-links"
        onClick={toggleMenu}
      >
        <span className="burger-bar" />
        <span className="burger-bar" />
        <span className="burger-bar" />
      </button>

      {/* Nav links, responsive */}
      <ul
        className={`nav-links${menuOpen ? ' open' : ''}`}
        id="nav-links"
        role="menu"
        aria-hidden={!menuOpen && window.innerWidth <= 680}
        onClick={() => { if (menuOpen) closeMenu(); }}
      >
        <li>
          <a href="#about" aria-label="About" role="menuitem">
            <DecodeText text="About" />
          </a>
        </li>
        <li>
          <a href="#projects" aria-label="Projects" role="menuitem">
            <DecodeText text="Projects" />
          </a>
        </li>
        <li>
          <a href="#contact" aria-label="Contact" role="menuitem">
            <DecodeText text="Contact" />
          </a>
        </li>
        <li>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Experiences"
            role="menuitem"
          >
            <DecodeText text="Experiences" />
          </a>
        </li>
      </ul>
      {/* Mobile menu overlay */}
      {(menuOpen || overlayClosing) && (
        <div 
          className={`nav-overlay${overlayClosing ? ' closing' : ''}`} 
          onClick={closeMenu} 
        />
      )}
    </nav>
  );
}

export default Navbar;