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
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const total = projectData.length;

  // Keep a stable “viewport unit” height on mobile (address bar shrink)
  useEffect(() => {
    const setVH = () => {
      const h =
        window.visualViewport?.height ||
        document.documentElement.clientHeight ||
        window.innerHeight;
      document.documentElement.style.setProperty("--svh", `${h}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);
    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);

  // Set dynamic wrapper height based on number of slides
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const setHeight = () => {
      const h =
        window.visualViewport?.height ||
        document.documentElement.clientHeight ||
        window.innerHeight;
      el.style.height = `${h * total}px`;
    };
    setHeight();
    window.addEventListener("resize", setHeight);
    return () => window.removeEventListener("resize", setHeight);
  }, [total]);

  // Calculates the pixel width of one slide (use the sticky container, not window)
  const slideWidth = () =>
    trackRef.current?.parentElement?.getBoundingClientRect().width ||
    window.innerWidth;

  // Snap to a given index
  const goTo = (index) => {
    if (isAnimating) return;
    const sectionEl = sectionRef.current;
    const trackEl = trackRef.current;
    if (!sectionEl || !trackEl) return;

    const i = Math.max(0, Math.min(index, total - 1));
    const vh =
      window.visualViewport?.height ||
      document.documentElement.clientHeight ||
      window.innerHeight;

    setIsAnimating(true);
    // Respect prefers-reduced-motion
    const smooth =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    window.scrollTo({
      top: sectionEl.offsetTop + i * vh,
      behavior: smooth ? "smooth" : "auto",
    });

    setActiveIndex(i);

    // Hardware-accelerated translate, based on container width (prevents 100vw overflow issues)
    requestAnimationFrame(() => {
      trackEl.style.transform = `translate3d(${-i * slideWidth()}px,0,0)`;
    });

    // Match CSS transition duration (900ms) with a tiny buffer
    window.setTimeout(() => setIsAnimating(false), 950);
  };

  // Scroll + visibility hooks
  useEffect(() => {
    const sectionEl = sectionRef.current;
    const trackEl = trackRef.current;
    if (!sectionEl || !trackEl) return;

    const inViewport = () => {
      const r = sectionEl.getBoundingClientRect();
      const h =
        window.visualViewport?.height ||
        document.documentElement.clientHeight ||
        window.innerHeight;
      return r.top <= h / 2 && r.bottom >= h / 2;
    };

    const onScroll = () => {
      if (!hasEntered || isAnimating) return;
      const vh =
        window.visualViewport?.height ||
        document.documentElement.clientHeight ||
        window.innerHeight;
      const rel = window.scrollY - sectionEl.offsetTop;
      const idx = Math.max(0, Math.min(Math.round(rel / vh), total - 1));
      if (idx !== activeIndex) {
        trackEl.style.transform = `translate3d(${-idx * slideWidth()}px,0,0)`;
        setActiveIndex(idx);
      }
    };

    const onEnterCheck = () => {
      const inside = inViewport();
      if (inside && !hasEntered) {
        setHasEntered(true);
        trackEl.style.transform = `translate3d(0,0,0)`;
        setActiveIndex(0);
      } else if (!inside && hasEntered) {
        setHasEntered(false);
      }
    };

    // Mouse wheel snap (desktop)
    const onWheel = (e) => {
      if (!inViewport() || isAnimating) return;
      e.preventDefault();
      const dir = e.deltaY > 0 ? 1 : -1;
      goTo(activeIndex + dir);
    };

    // Touch swipe (mobile/tablet)
    let startX = 0;
    let startY = 0;
    let moved = false;

    const onTouchStart = (e) => {
      if (!inViewport()) return;
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      moved = false;
    };

    const onTouchMove = (e) => {
      if (!inViewport()) return;
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      // Horizontal swipe threshold, ignore vertical scroll
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        moved = true;
      }
    };

    const onTouchEnd = (e) => {
      if (!inViewport() || !moved) return;
      const changed = e.changedTouches[0];
      const dx = changed.clientX - startX;
      const dir = dx < 0 ? 1 : -1;
      goTo(activeIndex + dir);
    };

    // Keyboard (accessibility)
    const onKeyDown = (e) => {
      if (!inViewport()) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        goTo(activeIndex + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goTo(activeIndex - 1);
      }
    };

    sectionEl.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onEnterCheck, { passive: true });
    sectionEl.addEventListener("touchstart", onTouchStart, { passive: true });
    sectionEl.addEventListener("touchmove", onTouchMove, { passive: true });
    sectionEl.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    onEnterCheck(); // initial

    // Keep translate in sync if the container width changes
    const ro = new ResizeObserver(() => {
      trackEl.style.transform = `translate3d(${-activeIndex * slideWidth()}px,0,0)`;
    });
    ro.observe(trackEl.parentElement);

    return () => {
      sectionEl.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onEnterCheck);
      sectionEl.removeEventListener("touchstart", onTouchStart);
      sectionEl.removeEventListener("touchmove", onTouchMove);
      sectionEl.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      ro.disconnect();
    };
  }, [activeIndex, isAnimating, hasEntered, total]);

  return (
    <section ref={sectionRef} className="projects-section" id="projects" aria-label="Projects">
      <div className="projects-sticky">
        <div ref={trackRef} className="projects-track" role="list">
          {projectData.map((proj, i) => (
            <section
              key={i}
              className="project"
              role="listitem"
              aria-roledescription="slide"
              aria-label={`${proj.title} (${i + 1} of ${total})`}
            >
              <ProjectCard {...proj} />
            </section>
          ))}
        </div>

        {/* Navigation Bubbles */}
        <div className="project-nav-bubbles" role="tablist" aria-label="Project navigation">
          {projectData.map((_, i) => (
            <button
              key={i}
              className={`nav-bubble ${i === activeIndex ? "active" : ""}`}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === activeIndex}
              aria-controls={`project-slide-${i}`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
