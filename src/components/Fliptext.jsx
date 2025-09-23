import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../styles/FlipText.css";

const FlipText = () => {
  const words = ["Multimedia Design Student", "Front-End Web Developer", "UX/UI Visual Designer"];
  const [rotation, setRotation] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [frontText, setFrontText] = useState(words[0]);
  const [backText, setBackText] = useState(words[1]);

  // longest word for reserving constant outer width
  const longestWord = words.reduce((a, b) => (a.length >= b.length ? a : b), "");

  // measure + animate width
  const measureRef = useRef(null);
  const [measureText, setMeasureText] = useState(words[0]);
  const [cardWidth, setCardWidth] = useState(undefined);

  useLayoutEffect(() => {
    if (measureRef.current) {
      setCardWidth(measureRef.current.offsetWidth);
    }
  }, [measureText]);

  useEffect(() => {
    const interval = setInterval(() => {
      // compute next visible word and start width transition immediately
      const nextVisibleIdx = (currentIndex + 1) % words.length;
      const nextVisibleWord = words[nextVisibleIdx];
      setMeasureText(nextVisibleWord); // triggers width measurement + animation

      // start flip rotation (width transition runs concurrently)
      setRotation((r) => r + 180);

      // after flip ends, swap visible face and prepare hidden face's next word
      setTimeout(() => {
        setShowFront((prevFrontVisible) => {
          const nowFrontVisible = !prevFrontVisible;

          setCurrentIndex(nextVisibleIdx);

          const nextIdx = (nextVisibleIdx + 1) % words.length;
          if (nowFrontVisible) {
            setBackText(words[nextIdx]);
          } else {
            setFrontText(words[nextIdx]);
          }
          return nowFrontVisible;
        });
      }, 600); // match CSS transition
    }, 2500);

    return () => clearInterval(interval);
  }, [currentIndex, words]);

  return (
    <h2 className="intro-role">
      {/* Standalone label (independent styling) */}
      <span className="iam-label">I am{" "}</span>

      <span className="flip-card-wrap">
        {/* ghost reserves the max width so "I am" doesn't shift */}
        <span className="flip-width-ghost" aria-hidden="true">
          {longestWord}
        </span>

        {/* hidden ghost used to measure current/next width with padding */}
        <span
          ref={measureRef}
          className="flip-width-ghost flip-width-measure"
          aria-hidden="true"
        >
          {measureText}
        </span>

        {/* the actual flipping card, absolutely positioned inside the wrapper */}
        <span
          className="flip-card"
          style={{
            transform: `rotateX(${rotation}deg)`,
            width: cardWidth, // number is fine; React sets 'px'
          }}
        >
          {/* hidden sizer (not used for width anymore, safe to keep) */}
          <span className="flip-sizer" aria-hidden="true">
            {showFront ? frontText : backText}
          </span>

          {/* faces */}
          <span className="flip-face front">{frontText}</span>
          <span className="flip-face back">{backText}</span>
        </span>
      </span>
    </h2>
  );
};

export default FlipText;