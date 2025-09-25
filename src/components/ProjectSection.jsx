import ProjectCard from "./ProjectCard";
import "../styles/projectsection.css";
import macBookAirCC from "../assets/MacBook_AIR_CC.png";

const projectData = [
  {
    title: "CrypCoach-AI",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa...",
    image: macBookAirCC,
    githubLink: "https://github.com/yourname/crypcoach-ai",
    demoLink: "https://crypcoach-ai.com",
    videoLink: "https://youtu.be/xyz",
  },
];

function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      {projectData.map((proj, i) => (
        <section key={i} className="project">
          <ProjectCard {...proj} />
        </section>
      ))}
    </section>
  );
}

export default ProjectsSection;