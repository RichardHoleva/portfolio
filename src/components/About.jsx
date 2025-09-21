import React from "react";
import "../styles/about.css";

const About = ({
  mainImage = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  backdropImage = "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80",
}) => {
  return (
    <section className="about" aria-label="About section">
      <div className="about__inner">
        <div className="about__text">
          <h1 className="about__title">
            <span className="gradient">Hello World!</span> I’m a
            <br />
            Front-end Developer &amp; UX/UI Designer from Slovakia, now based in Denmark.
          </h1>

          <p className="about__lead">
            I’m <span className="accent">passionate</span> about creating clean, intuitive, and{" "}
            <span className="accent">impactful</span> digital experiences.
          </p>

          <p className="about__lead">
            Outside of work, I enjoy sports, fashion, and <span className="accent underline">music</span>.
          </p>
        </div>

        <div className="about__media" aria-hidden="true">
          <img
            className="about__img about__img--back1"
            src={backdropImage || mainImage}
            alt=""
          />
          <img
            className="about__img about__img--main"
            src={mainImage}
            alt="Portrait"
          />
          <img
            className="about__img about__img--back2"
            src={backdropImage || mainImage}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default About;
