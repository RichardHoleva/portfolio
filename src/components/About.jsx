import React, { useEffect, useRef } from "react";
import "../styles/about.css";

/* Utility: split all text nodes into span.char, preserving existing inline markup */
function splitTextToChars(root) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      // Only split nodes that contain non-whitespace
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
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === " ") {
        frag.appendChild(document.createTextNode(" "));
      } else {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = ch;
        frag.appendChild(span);
      }
    }
    textNode.parentNode.replaceChild(frag, textNode);
  });
}

const About = ({
  mainImage = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  backdropImage = "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80",
}) => {
  const helloRef = useRef(null);
  const mediaRef = useRef(null);

  // Scroll-reactive wobble for "Hello World!"
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

        // Tunable wobble params
        const offset = Math.sin(y * 0.012) * 12;   // px
        const rot = Math.sin(y * 0.004) * 3;       // deg
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

useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const containers = Array.from(document.querySelectorAll("[data-hover-fill]"));
    if (!containers.length) return;

    // Split once and set stagger indices
    containers.forEach((el) => {
      if (!el.__splitDone) {
        splitTextToChars(el);
        el.__splitDone = true;
      }
      const chars = el.querySelectorAll(".char");
      chars.forEach((c, i) => c.style.setProperty("--i", i));
    });

    if (reduce) {
      // No animation for reduced motion
      containers.forEach((el) => {
        el.querySelectorAll(".char").forEach((c) => {
          c.style.opacity = "1";
          c.style.transform = "none";
        });
      });
      return;
    }

    let current = 0; // index of paragraph to animate next (DOM order)
    const listeners = new Map();

    const maybeAnimate = () => {
      // Only animate one at a time, in order
      while (current < containers.length) {
        const el = containers[current];
        if (!el.__inView) break; // wait until this one is in view

        if (!el.classList.contains("is-animating") && !el.__done) {
          el.classList.add("is-animating");

          const chars = el.querySelectorAll(".char");
          const last = chars[chars.length - 1];

          const onEnd = (e) => {
            if (e.animationName !== "charFill") return;
            last.removeEventListener("animationend", onEnd);
            listeners.delete(el);
            el.__done = true;
            current += 1;
            // Try to animate the next one if it’s already in view
            maybeAnimate();
          };

          last.addEventListener("animationend", onEnd);
          listeners.set(el, onEnd);
        }
        break; // start only one at a time
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.__inView = entry.isIntersecting;
        });
        maybeAnimate();
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    containers.forEach((el) => io.observe(el));
    // Initial check (in case the first paragraph is already visible)
    maybeAnimate();

    return () => {
      io.disconnect();
      // Cleanup any pending listeners
      listeners.forEach((fn, el) => {
        const chars = el.querySelectorAll(".char");
        if (chars.length) chars[chars.length - 1].removeEventListener("animationend", fn);
      });
    };
  }, []);

  useEffect(() => {
    // Swipe-to-reorder (infinite) for the image stack
    const container = mediaRef.current;
    if (!container) return;

    const imgs = Array.from(container.querySelectorAll(".about__img"));
    if (imgs.length < 2) return;

    // Initialize roles once
    if (!imgs.some((el) => el.classList.contains("is-front"))) {
      imgs[0].classList.add("is-front");
      imgs[1].classList.add("is-back");
    }

    let startX = 0;
    let dx = 0;
    let dragging = false;
    let frontEl = null;

    const threshold = () => Math.max(48, container.clientWidth * 0.22);

    const onPointerDown = (e) => {
      if (e.button != null && e.button !== 0) return; // primary only
      frontEl = container.querySelector(".about__img.is-front");
      if (!frontEl) return;
      dragging = true;
      startX = e.clientX;
      dx = 0;
      frontEl.classList.add("is-dragging");
      frontEl.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!dragging || !frontEl) return;
      dx = e.clientX - startX;
      const rot = Math.max(-14, Math.min(14, dx * 0.04));
      frontEl.style.transform = `translateX(${dx}px) rotate(${rot}deg)`;
      e.preventDefault(); // keep horizontal drag smooth
    };

    const swapRoles = () => {
      const backEl = container.querySelector(".about__img.is-back");
      if (!frontEl || !backEl) return;

      // Current front goes to back
      frontEl.classList.remove("is-front");
      frontEl.style.transform = "";
      // Back comes to front
      backEl.classList.remove("is-back");
      backEl.classList.add("is-front");
      // Former front becomes back
      frontEl.classList.add("is-back");
    };

    const onPointerUp = () => {
      if (!dragging || !frontEl) return;
      const t = threshold();
      const dir = dx > t ? "right" : dx < -t ? "left" : null;

      frontEl.classList.remove("is-dragging");

      if (dir) {
        frontEl.classList.add(`swipe-out-${dir}`);
        const done = () => {
          frontEl.classList.remove(`swipe-out-${dir}`);
          swapRoles();
          frontEl.removeEventListener("transitionend", done);
          frontEl = null;
        };
        frontEl.addEventListener("transitionend", done);
      } else {
        // Snap back
        frontEl.style.transition = "transform 200ms ease";
        frontEl.style.transform = "";
        const clear = () => {
          if (frontEl) frontEl.style.transition = "";
          frontEl && frontEl.removeEventListener("transitionend", clear);
          frontEl = null;
        };
        frontEl && frontEl.addEventListener("transitionend", clear);
      }

      dragging = false;
      dx = 0;
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
            {/* first line */}
            <span
              ref={helloRef}
              className="about__title-line about__title-line--hello gradient"
            >
              Hello World!
            </span>
            {/* second line, smaller as requested */}
            <span className="about__title-line about__title-line--role">
              Design‑minded Front‑End Developer
            </span>
          </h1>

          <p className="about__lead hover-fill" data-hover-fill>
            I’m Richard, 21. I build <span className="accent">clean</span>, <span className="accent">intuitive</span>, and <span className="accent">fast</span> web experiences
            with a focus on UX/UI and craft.
          </p>

          <p className="about__lead hover-fill" data-hover-fill>
            I turn ideas into usable interfaces—<span className="mark">thoughtful interactions</span>, accessible patterns, and honest performance.
          </p>

          {/* profile links */}

          <p className="about__lead hover-fill" data-hover-fill>
            Outside of work: lifting, running, and hiking. Fashion and music shape my taste;
            travel and nature keep me grounded. I also geek out on new tech and personal finance.
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
              href="hhttps://www.linkedin.com/in/richard-holeva-8621b8326"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
          </nav>
        </div>

        <div className="about__media" aria-hidden="true" ref={mediaRef}>
          {/* main colored photo, slightly rotated, on top */}
          <img
            className="about__img about__img--main"
            src={mainImage}
            alt="Portrait"
          />
          {/* grayscale back photo, different angle behind */}
          <img
            className="about__img about__img--back"
            src={backdropImage || mainImage}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default About;