import { useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import "../styles/projectsection.css";
import macBookAirCC from "../assets/MacBook_AIR_CC.png";

const projectData = [
  {
    title: "CryptoCoach-AI",
    description:
      "In this project I combined two of my biggest interests, AI and crypto. I was curious how real chatbots are built, so I coded CryptoCoach AI, a simple assistant that answers basic questions about crypto and memecoins. Along the way I learned a lot about APIs, connected a React frontend to a Node and Express backend, and got my first real taste of backend work which was challenging but also rewarding. There is still plenty to improve, but this marks the start of my journey.",
    image: macBookAirCC,
    githubLink: "https://github.com/RichardHoleva/ai-crypto-coach.git",
    demoLink: "https://richardholeva.github.io/ai-crypto-coach",
  },

    {
    title: "CryptoCoach-AI",
    description:
      "In this project I combined two of my biggest interests, AI and crypto. I was curious how real chatbots are built, so I coded CryptoCoach AI, a simple assistant that answers basic questions about crypto and memecoins. Along the way I learned a lot about APIs, connected a React frontend to a Node and Express backend, and got my first real taste of backend work which was challenging but also rewarding. There is still plenty to improve, but this marks the start of my journey.",
    image: macBookAirCC,
    githubLink: "https://github.com/RichardHoleva/ai-crypto-coach.git",
    demoLink: "https://richardholeva.github.io/ai-crypto-coach",
  },

    {
    title: "CryptoCoach-AI",
    description:
      "In this project I combined two of my biggest interests, AI and crypto. I was curious how real chatbots are built, so I coded CryptoCoach AI, a simple assistant that answers basic questions about crypto and memecoins. Along the way I learned a lot about APIs, connected a React frontend to a Node and Express backend, and got my first real taste of backend work which was challenging but also rewarding. There is still plenty to improve, but this marks the start of my journey.",
    image: macBookAirCC,
    githubLink: "https://github.com/RichardHoleva/ai-crypto-coach.git",
    demoLink: "https://richardholeva.github.io/ai-crypto-coach",
  },

    {
    title: "CryptoCoach-AI",
    description:
      "In this project I combined two of my biggest interests, AI and crypto. I was curious how real chatbots are built, so I coded CryptoCoach AI, a simple assistant that answers basic questions about crypto and memecoins. Along the way I learned a lot about APIs, connected a React frontend to a Node and Express backend, and got my first real taste of backend work which was challenging but also rewarding. There is still plenty to improve, but this marks the start of my journey.",
    image: macBookAirCC,
    githubLink: "https://github.com/RichardHoleva/ai-crypto-coach.git",
    demoLink: "https://richardholeva.github.io/ai-crypto-coach",
  },

    {
    title: "CryptoCoach-AI",
    description:
      "In this project I combined two of my biggest interests, AI and crypto. I was curious how real chatbots are built, so I coded CryptoCoach AI, a simple assistant that answers basic questions about crypto and memecoins. Along the way I learned a lot about APIs, connected a React frontend to a Node and Express backend, and got my first real taste of backend work which was challenging but also rewarding. There is still plenty to improve, but this marks the start of my journey.",
    image: macBookAirCC,
    githubLink: "https://github.com/RichardHoleva/ai-crypto-coach.git",
    demoLink: "https://richardholeva.github.io/ai-crypto-coach",
  },

    {
    title: "CryptoCoach-AI",
    description:
      "In this project I combined two of my biggest interests, AI and crypto. I was curious how real chatbots are built, so I coded CryptoCoach AI, a simple assistant that answers basic questions about crypto and memecoins. Along the way I learned a lot about APIs, connected a React frontend to a Node and Express backend, and got my first real taste of backend work which was challenging but also rewarding. There is still plenty to improve, but this marks the start of my journey.",
    image: macBookAirCC,
    githubLink: "https://github.com/RichardHoleva/ai-crypto-coach.git",
    demoLink: "https://richardholeva.github.io/ai-crypto-coach",
  },

    {
    title: "CryptoCoach-AI",
    description:
      "In this project I combined two of my biggest interests, AI and crypto. I was curious how real chatbots are built, so I coded CryptoCoach AI, a simple assistant that answers basic questions about crypto and memecoins. Along the way I learned a lot about APIs, connected a React frontend to a Node and Express backend, and got my first real taste of backend work which was challenging but also rewarding. There is still plenty to improve, but this marks the start of my journey.",
    image: macBookAirCC,
    githubLink: "https://github.com/RichardHoleva/ai-crypto-coach.git",
    demoLink: "https://richardholeva.github.io/ai-crypto-coach",
  },
];

function ProjectsSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

useEffect(() => {
  const trackEl = trackRef.current;
  const sectionEl = sectionRef.current;
  if (!trackEl || !sectionEl) return;

  const card = trackEl.querySelector(".project");
  const cardWidth = card ? card.offsetWidth : trackEl.clientWidth;
  const totalCards = trackEl.querySelectorAll(".project").length;

  let currentIndex = 0;
  let isScrolling = false;

const onWheel = (e) => {
const sectionRect = sectionEl.getBoundingClientRect();
const tolerance = 100; // px of leeway

const pinnedInView =
  sectionRect.top <= tolerance && sectionRect.bottom >= window.innerHeight - tolerance;

if (!pinnedInView) return;
  const atStart = currentIndex === 0;
const atEnd = currentIndex === totalCards - 1;
const scrollingForward = e.deltaY > 0;

const fullyAtEnd =
  atEnd &&
  Math.ceil(trackEl.scrollLeft + trackEl.clientWidth) >= trackEl.scrollWidth - 2;

const canScrollHoriz =
  (scrollingForward && !fullyAtEnd) || (!scrollingForward && !atStart);

  if (canScrollHoriz) {
    e.preventDefault();

    if (isScrolling) return;
    isScrolling = true;

    currentIndex = scrollingForward
      ? Math.min(currentIndex + 1, totalCards - 1)
      : Math.max(currentIndex - 1, 0);

    trackEl.scrollTo({
      left: currentIndex * cardWidth,
      behavior: "smooth",
    });

    setTimeout(() => {
      isScrolling = false;
    }, 600);
  }
  // if atEnd and scrolling forward => fall through to Contact
};

  window.addEventListener("wheel", onWheel, { passive: false });
  return () => window.removeEventListener("wheel", onWheel);
}, []);

  return (
    <section ref={sectionRef} className="projects-section" id="projects">
      <div ref={trackRef} className="projects-track">
        {projectData.map((proj, i) => (
          <section key={i} className="project">
            <ProjectCard {...proj} />
          </section>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;