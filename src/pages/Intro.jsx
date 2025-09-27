import '../styles/Intro.css';
import { useEffect, useRef, useState } from 'react';
import rhImage from '../assets/rh.png';
import AnimatedText from '../components/AnimatedText'; 
import { Link, useNavigate } from 'react-router-dom';

function Intro() {
  const bubbleRef = useRef(null);
  const circleRef = useRef(null);
  const [showBubble, setShowBubble] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const bubble = bubbleRef.current;
    const circle = circleRef.current;
    if (!bubble || !circle) return;

    // rešpektuj prefer-reduced-motion a pointer
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    let animationId;
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    // dynamický pohybový rozsah podľa šírky okna
    const getMovementRange = () => (window.innerWidth < 768 ? 60 : 200);
    let movementRange = getMovementRange();

    const handleResize = () => { movementRange = getMovementRange(); };

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
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      const floatY = Math.sin(Date.now() * 0.001) * 3;
      bubble.style.transform = `translate(-50%, -50%) translate(${currentX}px, ${currentY + (reduced ? 0 : floatY)}px)`;
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => { mouseX = 0; mouseY = 0; };

    // Directional reveal (ponechané)
    const img = circle.querySelector('.bubble-image');
    const calcMaxRadius = (x, y, rect) => {
      const corners = [[0,0],[rect.width,0],[0,rect.height],[rect.width,rect.height]];
      let max = 0;
      for (const [cx, cy] of corners) max = Math.max(max, Math.hypot(cx - x, cy - y));
      return max + 6;
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
      void img.offsetWidth;
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

    circle.addEventListener('pointerenter', reveal);
    circle.addEventListener('pointerleave', hide);

    if (hasFinePointer && !reduced) {
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('resize', handleResize);
      // dôležité: transform obsahuje už translate(-50%, -50%) – viď CSS
      animationId = requestAnimationFrame(animate);
    } else {
      // keď nie je myš alebo je reduced-motion: zaisti centrovanie
      bubble.style.transform = 'translate(-50%, -50%)';
    }

    return () => {
      circle.removeEventListener('pointerenter', reveal);
      circle.removeEventListener('pointerleave', hide);
      if (hasFinePointer && !reduced) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('resize', handleResize);
        if (animationId) cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const handleNavigate = (e) => {
    e.preventDefault();
    if (leaving) return;
    setLeaving(true);
  };

  return (
    <div className="intro-container">
      <AnimatedText text="<RICHARD HOLEVA./>" onComplete={() => setShowBubble(true)} />

      <div className={`bubble bubble-delayed ${showBubble ? 'visible' : ''}`} ref={bubbleRef}>
        <svg className="rotating-text" viewBox="0 0 350 350" aria-hidden="true">
          <defs>
            <path id="circle-path" d="M 175, 175 m -135, 0 a 135,135 0 1,1 270,0 a 135,135 0 1,1 -270,0" />
          </defs>
          <text className="circle-text">
            <textPath href="#circle-path">• EXPLORE MORE • EXPLORE MORE • EXPLORE MORE</textPath>
          </text>
        </svg>

        <div className="bubble-circle" ref={circleRef}>
          <Link to="/main" onClick={handleNavigate}>
            <img src={rhImage} alt="Profile" className="bubble-image" />
          </Link>
        </div>
      </div>

      <div
        className={`page-transition-overlay ${leaving ? 'active' : ''}`}
        onTransitionEnd={(e) => {
          if (leaving && e.propertyName === 'opacity') navigate('/main');
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export default Intro;
