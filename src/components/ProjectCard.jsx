import "../styles/projectcard.css";

function ProjectCard({ title, description, image, githubLink, demoLink, videoLink }) {
  return (
    <div className="project-card">
      <div className="project-image">
        <img src={image} alt={title} />
      </div>

      <div className="project-content">
        <h2 className="project-title">{title}</h2>

        {/* Float this so only the description wraps around it */}
        <a href={videoLink} target="_blank" rel="noopener noreferrer" className="video-circle">
          ▶
        </a>

        <p className="project-description">{description}</p>

        <div className="project-links">
          <a href={githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={demoLink} target="_blank" rel="noopener noreferrer">Live Demo</a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;