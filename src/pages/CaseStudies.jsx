// Matthew Hurst | CSCE 242

import { useState } from "react";
import "./CaseStudies.css";

const MIDDLE_STUDIES = [
  {
    img: "case-studies-1.jpg",
    title: "Creatine and Strength Gains",
    description: "How creatine supplementation enhances strength and muscle growth.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11547435/",
  },
  {
    img: "case-studies-2.jpg",
    title: "Creatine vs Placebo Study",
    description: "Study results comparing the effects of creatine vs a placebo on muscle gains.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10180745/",
  },
];

const LOWER_STUDIES = [
  {
    img: "case-studies-3.jpg",
    title: "Sleep & Muscle Recovery",
    description: "Impact of sleep quality on muscle recovery and growth",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9960533/",
  },
  {
    img: "case-studies-4.jpg",
    title: "Technique & Education",
    description: "Link between testosterone levels and muscle gains",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11195859/",
  },
  {
    img: "case-studies-5.jpg",
    title: "Nutrition Fundamentals",
    description: "Which supplements have been shown to aid muscle growth",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12655760/",
  },
];

export default function CaseStudies() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div id="main-content">
      <header id="main-header">
        <h1>Fitness Planner</h1>
        <button id="nav-toggle" aria-label="Toggle Navigation" onClick={() => setNavOpen((prev) => !prev)}>☰</button>
        <nav id="main-nav" className={navOpen ? "show" : ""}>
          <div><ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/exercises">Exercises</a></li>
            <li><a href="/nutrition">Nutrition</a></li>
            <li><a href="/tutorials">Tutorials</a></li>
            <li><a href="/case-studies">Case Studies</a></li>
          </ul></div>
        </nav>
      </header>

      <main id="content">
        <section className="case-upper-section">
          <h1>Case Studies</h1>
          <p>Explore the research-backed insights on muscle growth and fitness</p>
        </section>

        {MIDDLE_STUDIES.map((study, i) => (
          <section className="case-middle-section" key={i}>
            <div className="case-middle-frames">
              <img src={`${process.env.PUBLIC_URL}/images/${study.img}`} alt={study.title} />
              <div className="case-middle-frame-txt">
                <h2>{study.title}</h2>
                <p>{study.description}</p>
                <a href={study.link} target="_blank" rel="noopener noreferrer">
                  <button type="button">Read More</button>
                </a>
              </div>
            </div>
          </section>
        ))}

        <section className="case-lower-section">
          <h1>Factors Impacting Gains</h1>
          <section className="case-cards">
            {LOWER_STUDIES.map((study, i) => (
              <div className="case-lower-frames" key={i}>
                <img src={`${process.env.PUBLIC_URL}/images/${study.img}`} alt={study.title} />
                <h2>{study.title}</h2>
                <p>{study.description}</p>
                <a href={study.link} target="_blank" rel="noopener noreferrer">
                  <button type="button">Read More</button>
                </a>
              </div>
            ))}
          </section>
        </section>
      </main>

      <footer id="main-footer">
        <p>© mhurst1</p>
      </footer>
    </div>
  );
}