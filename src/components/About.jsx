import React, { useEffect, useRef } from "react";
import "../styles/about.css";
import cowImg from "../assets/coww.jpg";
import swim from "../assets/after_swim.jpg";
import chill from "../assets/chill.jpg";
import duo from "../assets/duo_old.jpg";
import hikeGF from "../assets/hike_GF.jpg";
import sunsetF from "../assets/sunset_friends.jpg";
import brano from "../assets/brano.jpg";
import cousin from "../assets/cousin.jpg";
import crazyD from "../assets/crazy_denmark_hike.jpg";
import hikeUS from "../assets/hike_us.jpg";
import trio from "../assets/trio.jpg";
import triohike from "../assets/trio_hike.jpg";
import soloHike from "../assets/solo_hike_photo.jpg";
import snowman from "../assets/snowman.jpg";

/* Utility: split all text nodes into span.word, preserving existing inline markup */
function splitTextToWords(root) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.nodeValue && node.nodeValue.trim().length
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((textNode) => {
    const frag = document.createDocumentFragment();
    const text = textNode.nodeValue;
    const parts = text.split(/(\s+)/); // keep spaces as separate nodes
    for (let i = 0; i < parts.length; i++) {
      const chunk = parts[i];
      if (!chunk) continue;
      if (/^\s+$/.test(chunk)) {
        frag.appendChild(document.createTextNode(chunk));
      } else {
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = chunk;
        frag.appendChild(span);
      }
    }
    textNode.parentNode.replaceChild(frag, textNode);
  });
}

const About = () => {
  const helloRef = useRef(null);
  const mediaRef = useRef(null);

  // Scroll wobble for "Hello World!"
  useEffect(() => {
    const el = helloRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY || document.documentElement.scrollTop;
        const offset = Math.sin(y * 0.012) * 12; // px
        const rot = Math.sin(y * 0.004) * 3; // deg
        const scale = 1 + Math.sin(y * 0.008) * 0.02;

        el.style.setProperty("--hello-y", `${offset.toFixed(2)}px`);
        el.style.setProperty("--hello-r", `${rot.toFixed(2)}deg`);
        el.style.setProperty("--hello-s", scale.toFixed(3));
        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      el.style.removeProperty("--hello-y");
      el.style.removeProperty("--hello-r");
      el.style.removeProperty("--hello-s");
    };
  }, []);

  // One-time word-by-word entrance animation (no hover)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const containers = Array.from(document.querySelectorAll("[data-hover-fill]"));
    if (!containers.length) return;

    containers.forEach((el) => {
      if (!el.__splitDone) {
        splitTextToWords(el);
        el.__splitDone = true;
      }
      const words = el.querySelectorAll(".word");
      words.forEach((w, i) => w.style.setProperty("--wi", i));
    });

    if (reduce) {
      containers.forEach((el) => {
        el.querySelectorAll(".word").forEach((w) => {
          w.style.opacity = "1";
          w.style.transform = "none";
          w.style.filter = "none";
        });
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            if (!el.__animatedOnce) {
              el.classList.add("is-animating");
              el.__animatedOnce = true; // animate just once
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    containers.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // swipe stack
  useEffect(() => {
    const container = mediaRef.current;
    if (!container) return;

    const imgs = Array.from(container.querySelectorAll(".about__img"));
    if (imgs.length < 2) return;

    let stack = imgs.slice();

    // make visual order match stack; assign z-index by depth
    const refreshStack = () => {
      const depthBase = 1000;
      stack.forEach((el, i) => {
        el.classList.remove(
          "is-front",
          "is-back",
          "is-dragging",
          "swipe-out-left",
          "swipe-out-right"
        );
        el.style.zIndex = String(depthBase - i);
        if (i === 0) el.classList.add("is-front");
        else el.classList.add("is-back");

        el.style.transform = "";
        el.style.transition = "";
      });

      // Keep DOM in stack order (front first). Now z-index controls layering reliably.
      stack.forEach((el) => container.appendChild(el));
    };

    refreshStack();

    let startX = 0;
    let dx = 0;
    let dragging = false;
    let frontEl = null;
    let activePointerId = null;

    const threshold = () => Math.max(48, container.clientWidth * 0.22);

    const onPointerDown = (e) => {
      if (e.button != null && e.button !== 0) return;
      if (activePointerId !== null) return;
      frontEl = stack[0];
      if (!frontEl) return;
      dragging = true;
      startX = e.clientX;
      dx = 0;
      activePointerId = e.pointerId ?? 1;
      frontEl.classList.add("is-dragging");
      frontEl.setPointerCapture?.(activePointerId);
    };

    const onPointerMove = (e) => {
      if (!dragging || !frontEl) return;
      if (activePointerId !== null && e.pointerId !== activePointerId) return;
      dx = e.clientX - startX;
      const rot = Math.max(-14, Math.min(14, dx * 0.04));
      frontEl.style.transform = `translateX(${dx}px) rotate(${rot}deg)`;
      e.preventDefault();
    };

    const moveFrontToBack = () => {
      const moved = stack.shift();
      if (moved) stack.push(moved);
      refreshStack();
    };

    const endDrag = () => {
      activePointerId = null;
      dragging = false;
      dx = 0;
      frontEl = null;
    };

    const onPointerUp = (e) => {
      if (!dragging || !frontEl) return;
      if (activePointerId !== null && e.pointerId !== activePointerId) return;

      const t = threshold();
      const shouldSwipe = Math.abs(dx) > t;
      const el = frontEl;

      el.classList.remove("is-dragging");

      if (shouldSwipe) {
        const dir = dx > 0 ? "right" : "left";
        el.classList.add(`swipe-out-${dir}`);
        const done = () => {
          el.classList.remove(`swipe-out-${dir}`);
          el.removeEventListener("transitionend", done);
          moveFrontToBack();
          endDrag();
        };
        el.addEventListener("transitionend", done);
      } else {
        el.style.transition = "transform 200ms ease";
        el.style.transform = "";
        const clear = () => {
          el.style.transition = "";
          el.removeEventListener("transitionend", clear);
          endDrag();
        };
        el.addEventListener("transitionend", clear);
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <section id="about" className="about" aria-label="About section">
      <div className="about__inner">
        <div className="about__text">
          <h1 className="about__title">
            <span
              ref={helloRef}
              className="about__title-line about__title-line--hello gradient"
            >
              Hello World!
            </span>
            <span className="about__title-line about__title-line--role">
              Design-minded Front-End Developer
            </span>
          </h1>

          <p className="about__lead hover-fill" data-hover-fill>
            I’m Richard, 21. I build <span className="accent">clean</span>,{" "}
            <span className="accent">intuitive</span>, and{" "}
            <span className="accent">fast</span> web experiences with UX, UI, and craft at the center.
          </p>

          <p className="about__lead hover-fill" data-hover-fill>
            I care about details that make interfaces feel alive<span className="mark">thoughtful interactions</span>, accessible patterns, and honest performance.
          </p>

          <p className="about__lead hover-fill" data-hover-fill>
            Off-screen, I chase fresh air—hiking, lifting, and any activity that makes me feel alive beyond the screen. I love traveling, meeting new people, and learning the culture of every place I visit. Friends keep me grounded along the way.
          </p>

          <nav className="about__links" aria-label="Profiles">
            <a
              className="btn"
              href="https://github.com/RichardHoleva"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              GitHub
            </a>
            <a
              className="btn"
              href="https://www.linkedin.com/in/richard-holeva-8621b8326"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
          </nav>
        </div>

        <div className="about__media" aria-hidden="true" ref={mediaRef}>
          <img className="about__img" src={crazyD} alt="Crazy Denmark hike" />
          <img className="about__img" src={hikeGF} alt="Hiking with girlfriend" />
          <img className="about__img" src={chill} alt="Chilling" />
          <img className="about__img" src={duo} alt="Old photo together" />
          <img className="about__img" src={cowImg} alt="With cow" />
          <img className="about__img" src={sunsetF} alt="Sunset with friends" />
          <img className="about__img" src={brano} alt="Swimming" />
          <img className="about__img" src={soloHike} alt="Solo hike" />
          <img className="about__img" src={swim} alt="Swim" />
          <img className="about__img" src={hikeUS} alt="Hiking in the US" />
          <img className="about__img" src={trio} alt="Trio" />
          <img className="about__img" src={triohike} alt="Trio Hike" />
          <img className="about__img" src={cousin} alt="Cousin" />
          <img className="about__img" src={snowman} alt="Snowman" />
        </div>
      </div>
    </section>
  );
};

export default About;
