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

function MainPage() {
  const [visible, setVisible] = useState(false); // added

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true)); // added
    return () => cancelAnimationFrame(id);
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

      {/* About now full-bleed without wrapper */}
      <About />

      {/* Placeholder sections */}
      <section id="projects" className="section-block">
        <h2>Projects</h2>
        <p>/* placeholder projects content */</p>
      </section>
      <section id="contact" className="section-block">
        <h2>Contact</h2>
        <p>/* placeholder contact content */</p>
      </section>
    </div>
  );
}

export default MainPage;
