import "../styles/projectcard.css";
import skuska from "../assets/skuska.mp4";
import { useRef, useState, useEffect, useCallback } from "react";

function ProjectCard({ title, description, image, githubLink, demoLink }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [canPlaySound, setCanPlaySound] = useState(false); // tracks first user interaction

  const playVideo = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  const pauseVideo = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;

    // On first intentional user action allow sound (if user already toggled mute manually, respect it)
    if (!canPlaySound) {
      setCanPlaySound(true);
      if (isMuted) {
        setIsMuted(false);
        v.muted = false;
      }
    }

    if (v.paused) playVideo();
    else pauseVideo();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !isMuted;
    setIsMuted(next);
    v.muted = next;
  };

  // Keep internal state in sync if user uses native controls (if ever added)
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleEnded = () => setIsPlaying(false);

  // Pause when out of view
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting && !v.paused) v.pause();
        });
      },
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // Ensure muted attribute reflects state (React sometimes lags if changed after load)
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = isMuted;
  }, [isMuted]);

  return (
    <div className="project-card">
      <div className="video-wrapper">
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
            muted={isMuted}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
          />
          <span className="play-icon" aria-hidden="true" />
        </button>

      </div>

      <div className="project-image">
        <img src={image} alt={title} />
      </div>

      <div className="project-content">
        <h2 className="project-title">{title}</h2>

        <p
          className="project-description"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="project-links" role="group" aria-label="Project links">
          <a href={githubLink} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={demoLink} target="_blank" rel="noopener noreferrer">
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;