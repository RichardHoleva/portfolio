import { useEffect, useState, useRef } from 'react';
import '../styles/CustomCursor.css';

function CustomCursor({ smoothness = 0.08 }) {
  // Fast dot (immediate)
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  // Slow bubble (animated)
  const [bubblePos, setBubblePos] = useState({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const easeRef = useRef(Math.min(Math.max(smoothness, 0.01), 0.5));

  useEffect(() => {
    easeRef.current = Math.min(Math.max(smoothness, 0.01), 0.5);
  }, [smoothness]);

  useEffect(() => {
    const CLICKABLE_SELECTOR =
      'a, button, input[type="button"], input[type="submit"], label, select, [role="button"], [onclick], .cursor-hover';

    const move = (e) => {
      const { clientX: x, clientY: y } = e;
      setDotPos({ x, y });
      targetRef.current = { x, y };

      const el = document.elementFromPoint(x, y);
      setHover(!!(el && el.closest(CLICKABLE_SELECTOR)));
    };

    const handleDown = () => setIsDown(true);
    const handleUp = () => setIsDown(false);
    const handleBlur = () => setIsDown(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('blur', handleBlur);

    const animate = () => {
      setBubblePos((prev) => {
        const nx = prev.x + (targetRef.current.x - prev.x) * easeRef.current;
        const ny = prev.y + (targetRef.current.y - prev.y) * easeRef.current;
        return { x: nx, y: ny };
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('blur', handleBlur);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        className={`custom-cursor ${hover ? 'is-hover' : ''} ${isDown ? 'is-down' : ''}`}
        style={{ transform: `translate3d(${bubblePos.x}px, ${bubblePos.y}px, 0)` }}
      />
      <div
        className={`custom-cursor-dot ${hover ? 'is-hover' : ''}`}
        style={{ transform: `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)` }}
      />
    </>
  );
}

export default CustomCursor;