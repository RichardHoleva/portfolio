import React, { useEffect, useState } from 'react'; 
import Navbar from '../components/Navbar';
import TypeWriter from '../components/TypeWriter'; 
import FlipText from '../components/Fliptext';
import '../styles/MainPage.css';
import czzImg from '../assets/czz.png';
import figmaImg from '../assets/figma.png';
import htmlImg from '../assets/htmll.png';
import jsImg from '../assets/javas.png';
import psImg from '../assets/photoshop.png';
import reactImg from '../assets/reactss.png';
import About from '../components/About';
import ProjectSection from '../components/ProjectSection';
import Contact from '../components/Contact'; // added

function MainPage() {
  const [visible, setVisible] = useState(false); // added
  // show "back to top" when scrolled down
  const [showToTop, setShowToTop] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true)); // added
    return () => cancelAnimationFrame(id);
  }, []);

  // toggle button on scroll
  useEffect(() => {
    const onScroll = () => setShowToTop(window.scrollY > 250);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialize
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`main-page ${visible ? 'page-visible' : ''}`}> {/* modified */}
      <Navbar />

      {/* Intro / Hero Section */}
      <section className="intro">
          <FlipText />
          <p className='typewriter-text'>I was born to <TypeWriter /></p>
        <h2 className="intro-role">
        </h2>

        {/* Tech Stack icons */}
        <div className="tech-stack">
          {/* Use imported image modules */}
          <img className="tech" src={figmaImg} alt="Figma" />
          <img className="tech" src={czzImg} alt="czz" />
          <img className="tech" src={htmlImg} alt="HTML" />
          <img className="tech" src={jsImg} alt="JavaScript" />
          <img className="tech" src={reactImg} alt="React" />
          <img className="tech" src={psImg} alt="Photoshop" />
        </div>
      </section>
      
      <About />
      
      <ProjectSection />

      {/* replaced placeholder with Contact */}
      <Contact />
      {/* Back to Top button */}
      <button
        type="button"
        className={`back-to-top ${showToTop ? 'show' : ''}`}
        aria-label="Back to top"
        title="Back to top"
        onClick={() => {
          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
        }}
      >
        <span className="back-to-top__icon">↑</span>
      </button>
    </div>
  );
}

export default MainPage;
