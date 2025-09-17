import '../styles/Intro.css';
import { useEffect, useRef, useState } from 'react';
import rhImage from '../assets/rh.png';
import AnimatedText from '../components/AnimatedText'; // added

function Intro() {
  const bubbleRef = useRef(null);
  const circleRef = useRef(null); // new ref for the circle container
  const [showBubble, setShowBubble] = useState(false); // added

  useEffect(() => {
    const bubble = bubbleRef.current;
    const circle = circleRef.current;
    if (!bubble || !circle) return;

    let animationId;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const movementRange = window.innerWidth < 768 ? 60 : 200;

    const handleMouseMove = (e) => {
      if (!hasFinePointer) return;
      const rect = bubble.getBoundingClientRect();
      const bubbleCenterX = rect.left + rect.width / 2;
      const bubbleCenterY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - bubbleCenterX) / window.innerWidth;
      const deltaY = (e.clientY - bubbleCenterY) / window.innerHeight;
      
      mouseX = deltaX * movementRange;
      mouseY = deltaY * movementRange;
    };

    const animate = () => {
      // Smooth lerp towards mouse position
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      
      // Add floating effect
      const floatY = Math.sin(Date.now() * 0.001) * 3;
      
      bubble.style.transform = `translate(${currentX}px, ${currentY + floatY}px)`;
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    // Directional reveal with full coverage
    const img = circle.querySelector('.bubble-image');

    const calcMaxRadius = (x, y, rect) => {
      const corners = [
        [0, 0],
        [rect.width, 0],
        [0, rect.height],
        [rect.width, rect.height],
      ];
      let max = 0;
      for (const [cx, cy] of corners) {
        const d = Math.hypot(cx - x, cy - y);
        if (d > max) max = d;
      }
      return max + 6; // small buffer
    };

    const reveal = (e) => {
      if (!img) return;
      const rect = circle.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const radius = calcMaxRadius(x, y, rect);
      img.classList.remove('reversing');
      img.style.transition = 'none';
      img.style.clipPath = `circle(0px at ${x}px ${y}px)`;
      void img.offsetWidth; // reflow
      img.style.transition = 'clip-path 0.6s ease-out';
      img.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
    };

    const hide = (e) => {
      if (!img) return;
      const rect = circle.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      img.classList.add('reversing');
      img.style.transition = 'clip-path 0.45s ease-in';
      img.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    };

    const handleEnter = (e) => reveal(e);
    const handleLeave = (e) => hide(e);

    circle.addEventListener('pointerenter', handleEnter);
    circle.addEventListener('pointerleave', handleLeave);
    if (hasFinePointer) {
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      animate();
    }
    
    return () => {
      circle.removeEventListener('pointerenter', handleEnter);
      circle.removeEventListener('pointerleave', handleLeave);
      if (hasFinePointer) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        if (animationId) cancelAnimationFrame(animationId);
      }
    };
  }, []);
  
  return (
    <div className="intro-container">
      <AnimatedText text="RICHARD HOLEVA." onComplete={() => setShowBubble(true)} /> {/* added onComplete */}
      
      <div
        className={`bubble bubble-delayed ${showBubble ? 'visible' : ''}`} // modified classes
        ref={bubbleRef}
      >
        <svg className="rotating-text" width="350" height="350" viewBox="0 0 350 350">
          <defs>
            <path
              id="circle-path"
              d="M 175, 175 m -135, 0 a 135,135 0 1,1 270,0 a 135,135 0 1,1 -270,0"
            />
          </defs>
          <text className="circle-text">
            <textPath href="#circle-path">
              • EXPLORE MORE • EXPLORE MORE • EXPLORE MORE
            </textPath>
          </text>
        </svg>
        
        <div className="bubble-circle" ref={circleRef}>
          <img 
            src={rhImage} 
            alt="Profile" 
            className="bubble-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Intro;
