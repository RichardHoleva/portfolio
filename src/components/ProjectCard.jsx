import "../styles/projectcard.css";
import skuska from "../assets/skuska_a.mp4";
import { useRef, useState } from "react";

function ProjectCard({ title, description, image, githubLink, demoLink }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  };

  return (
    <div className="project-card">
      {/* Video bubble pinned to the card's top-right corner */}
      <button
        type="button"
        className={`video-circle ${isPlaying ? "is-playing" : ""}`}
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        <video
          ref={videoRef}
          src={skuska}
          preload="metadata"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
        <span className="play-icon">▶</span>
      </button>

      <div className="project-image">
        <img src={image} alt={title} />
      </div>

      <div className="project-content">
        <h2 className="project-title">{title}</h2>

          <p className="project-description" dangerouslySetInnerHTML={{ __html: description }} />

        <div className="project-links">
          <a href={githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={demoLink} target="_blank" rel="noopener noreferrer">Live Demo</a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;