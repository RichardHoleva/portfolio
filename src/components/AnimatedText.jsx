import '../styles/AnimatedText.css';
import '../styles/Intro.css';
import { useEffect } from 'react';

function AnimatedText({ text, className = 'intro-title', stagger = 0.15, onComplete }) {
  const variants = ['fade', 'rotate', 'scale', 'blur', 'flip'];
  const charDuration = 0.9375; // must match CSS animation-duration
  useEffect(() => {
    if (!onComplete) return;
    const totalMs = ((text.length - 1) * stagger + charDuration + 0.2) * 1000; // extra buffer
    const t = setTimeout(() => onComplete(), totalMs);
    return () => clearTimeout(t);
  }, [text, stagger, onComplete, charDuration]);

  return (
    <h1 className={className} aria-label={text}>
      {text.split('').map((ch, i) => {
        const variant = variants[i % variants.length];
        const delay = (i * stagger).toFixed(2) + 's';
        if (ch === ' ') {
          return (
            <span
              key={i}
              className={`char space variant-${variant}`}
              style={{ animationDelay: delay, '--char-i': i }}
            >
              &nbsp;
            </span>
          );
        }
        return (
          <span
            key={i}
            className={`char variant-${variant}`}
            style={{ animationDelay: delay, '--char-i': i }}
          >
            {ch}
          </span>
        );
      })}
    </h1>
  );
}

export default AnimatedText;
