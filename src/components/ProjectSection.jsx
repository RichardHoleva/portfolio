import ProjectCard from "./ProjectCard";
import "../styles/projectsection.css";
import macBookAirCC from "../assets/MacBook_AIR_CC.png";

const projectData = [
  {
    title: "CrypCoach-AI",
    description:
      "In this project I combined two of my biggest interests, AI and crypto. I was curious how real chatbots are built, so I coded CryptoCoach AI, a simple assistant that answers basic questions about crypto and memecoins. Along the way I learned a lot about APIs, connected a React frontend to a Node and Express backend, and got my first real taste of backend work which was challenging but also rewarding. There is still plenty to improve, but this marks the start of my journey.",
    image: macBookAirCC,
    githubLink: "https://github.com/yourname/crypcoach-ai",
    demoLink: "https://richardholeva.github.io/ai-crypto-coach",
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