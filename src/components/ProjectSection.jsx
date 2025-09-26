import { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import "../styles/projectsection.css";
import macBookAirCC from "../assets/MacBook_AIR_CC.png";
import iphonedd from "../assets/iphone_dd.png";
import bench from "../assets/banchscape.png";
import spilcafen from "../assets/spilcafen.png";

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
		title: "Dish-Delights",
		description:
			"24-Hour Exam Project – Built a responsive CRUD recipe website using HTML, CSS, and JavaScript. Users can create, edit, and delete recipes. Focused on matching my design, ensuring responsiveness, and submitting on time. Completed both the project and a written report. Intense but rewarding challenge that tested my coding and time-management skills.",
		image: iphonedd,
		githubLink: "https://github.com/RichardHoleva/exam.git",
		demoLink: "https://richardholeva.github.io/exam/",
	},

	{
		title: "BenchScape",
		description:
			"My first school exam project using HTML, CSS, and JavaScript. I built a website that reveals hidden benches around Aarhus where people can enjoy sunsets. As someone who loves sunsets, I wanted to create something personal while also helping others find quiet places to relax and unwind. It was a challenging project that pushed my coding skills, but in the end, I was proud to make it work.",
		image: bench,
		githubLink: "https://github.com/RichardHoleva/programovanie.git",
		demoLink: "https://richardholeva.github.io/programovanie",
	},

{
  title: "SpilCafeen",
  description:
    "Team project focused on designing and developing a website. I was responsible for the coding part, creating an admin page where staff could update the site with new board games. Learned how databases work in Firebase and gained hands-on experience implementing Firebase into projects.<br /><br />Email: aspilcafen@gmail.com<br />Password: admin123",
  image: spilcafen,
  githubLink: "https://github.com/RichardHoleva/admin.git",
  demoLink: "https://richardholeva.github.io/admin",
},



];

function ProjectsSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const totalProjects = projectData.length;

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const trackEl = trackRef.current;
    if (!sectionEl || !trackEl) return;

    function setDynamicHeight() {
      // Set section height to accommodate all projects
      const sectionHeight = window.innerHeight * totalProjects;
      sectionEl.style.height = `${sectionHeight}px`;
      return { sectionHeight };
    }

    let dims = setDynamicHeight();

    function scrollToProject(index) {
      if (isScrolling) return;
      
      const targetIndex = Math.max(0, Math.min(index, totalProjects - 1));
      const targetScroll = sectionEl.offsetTop + (targetIndex * window.innerHeight);
      
      setIsScrolling(true);
      
      // Scroll to the corresponding vertical position
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
      
      // Update the active index
      setActiveIndex(targetIndex);
      
      // Add a small delay before starting transform to sync better with scroll
      requestAnimationFrame(() => {
        // Apply the transform with hardware acceleration
        trackEl.style.transform = `translate3d(${-targetIndex * window.innerWidth}px,0,0)`;
      });
      
      // Reset scrolling flag after animation completes (match to CSS duration)
      setTimeout(() => setIsScrolling(false), 900);
    }

    function isInViewport() {
      const rect = sectionEl.getBoundingClientRect();
      return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
    }

    function handleScroll() {
      if (isScrolling) return;
      
      // Check if we've just entered the section
      const inViewport = isInViewport();
      
      // If we just entered the section, reset to the first project
      if (inViewport && !hasEntered) {
        setHasEntered(true);
        trackEl.style.transform = `translate3d(0,0,0)`;
        setActiveIndex(0);
        return;
      }
      
      // Only handle internal section scrolling if we're already in the section
      if (hasEntered) {
        // Calculate scroll position relative to the section
        const scrollPosition = window.scrollY - sectionEl.offsetTop;
        const newIndex = Math.max(0, Math.min(
          Math.round(scrollPosition / window.innerHeight),
          totalProjects - 1
        ));
        
        if (newIndex !== activeIndex) {
          trackEl.style.transform = `translate3d(${-newIndex * window.innerWidth}px,0,0)`;
          setActiveIndex(newIndex);
        }
      }
    }

    function handleWheel(e) {
      // Only handle wheel events if we're in the section
      if (!isInViewport() || isScrolling) return;
      
      e.preventDefault();
      
      // Determine scroll direction
      const direction = e.deltaY > 0 ? 1 : -1;
      scrollToProject(activeIndex + direction);
    }

    function onResize() {
      dims = setDynamicHeight();
      // Re-adjust to maintain correct position
      if (hasEntered) {
        trackEl.style.transform = `translate3d(${-activeIndex * window.innerWidth}px,0,0)`;
      }
    }

    // Reset when leaving the section
    function checkVisibility() {
      if (!isInViewport() && hasEntered) {
        setHasEntered(false);
      }
    }

    // Handle wheel events for snap scrolling
    sectionEl.addEventListener("wheel", handleWheel, { passive: false });
    
    // Handle regular scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", onResize);

    // Initial position check
    handleScroll();

    return () => {
      sectionEl.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, [activeIndex, isScrolling, hasEntered, totalProjects]);

  // Function to handle navigation bubble clicks
  function navigateToProject(index) {
    const sectionEl = sectionRef.current;
    const trackEl = trackRef.current;
    if (!sectionEl || !trackEl || isScrolling) return;
    
    const targetIndex = Math.max(0, Math.min(index, totalProjects - 1));
    const targetScroll = sectionEl.offsetTop + (targetIndex * window.innerHeight);
    
    setIsScrolling(true);
    
    // Scroll to the corresponding vertical position
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
    
    // Update the active index
    setActiveIndex(targetIndex);
    
    // Add a small delay before starting transform
    requestAnimationFrame(() => {
      trackEl.style.transform = `translate3d(${-targetIndex * window.innerWidth}px,0,0)`;
    });
    
    // Reset scrolling flag after animation completes
    setTimeout(() => setIsScrolling(false), 900);
  }

  return (
    <section ref={sectionRef} className="projects-section" id="projects">
      <div className="projects-sticky">
        <div ref={trackRef} className="projects-track">
          {projectData.map((proj, i) => (
            <section key={i} className="project">
              <ProjectCard {...proj} />
            </section>
          ))}
        </div>
        
        {/* Navigation Bubbles */}
        <div className="project-nav-bubbles">
          {projectData.map((_, i) => (
            <button
              key={i}
              className={`nav-bubble ${i === activeIndex ? 'active' : ''}`}
              onClick={() => navigateToProject(i)}
              aria-label={`Navigate to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;