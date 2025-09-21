import '../styles/AnimatedText.css';
import '../styles/Intro.css';
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

const AnimatedText = forwardRef(function AnimatedText(
  { text, className = 'intro-title', stagger = 0.15, onComplete },
  ref
) {
  const variants = ['fade', 'rotate', 'scale', 'blur', 'flip'];
  const charDuration = 0.9375; // must match CSS animation-duration
  const timeoutRef = useRef(null);
  const completedRef = useRef(false);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (!onComplete) return;
    const totalMs = ((text.length - 1) * stagger + charDuration + 0.2) * 1000; // extra buffer
    timeoutRef.current = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, totalMs);
    return () => clearTimeout(timeoutRef.current);
  }, [text, stagger, onComplete, charDuration]);

  function skipAnimation() {
    if (skipped) return;
    setSkipped(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (onComplete && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  }

  useImperativeHandle(ref, () => ({
    skip: skipAnimation
  }), [skipped, onComplete]);

  // NEW: global page click -> skip animation
  useEffect(() => {
    if (skipped) return;
    const handle = () => skipAnimation();
    window.addEventListener('click', handle, { once: true });
    return () => window.removeEventListener('click', handle);
  }, [skipped]);

  return (
    <h1
      className={`${className} ${skipped ? 'skip-anim' : ''}`}
      aria-label={text}
    >
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
});

export default AnimatedText;
