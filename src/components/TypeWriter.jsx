import React from "react";
import { Typewriter } from "react-simple-typewriter";

function TypewriterText() {
  return (
    <span style={{ color: "#8fd6b3", fontSize: "1.5rem", display: "inline-block", marginTop: "2rem" }}>
      <Typewriter
        words={['develop cool shit ' , 'explore the unknown ', 'push boundaries ','create things that make the world better place ', ' be swaggy ' ] }
        loop={false}
        cursor
        cursorStyle="_"
        typeSpeed={80}
        deleteSpeed={30}
        delaySpeed={1000}
      />
    </span>
  );
}

export default TypewriterText;

