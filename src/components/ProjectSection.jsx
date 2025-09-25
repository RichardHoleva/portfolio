import ProjectCard from "./ProjectCard";
import "../styles/projectsection.css";

const projectData = [
  {
    title: "CrypCoach-AI",
    description: "AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.AI-driven crypto coaching platform.",
    image: "/assets/crypcoach-ai.png",
    githubLink: "https://github.com/yourname/crypcoach-ai",
    demoLink: "https://crypcoach-ai.com",
    videoLink: "https://youtu.be/xyz"
  },

  // ...more projects
];

function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <h1 className="projects-header">My Projects</h1>
      {projectData.map((proj, index) => (
        <ProjectCard key={index} {...proj} />
      ))}
    </section>
  );
}

export default ProjectsSection;
