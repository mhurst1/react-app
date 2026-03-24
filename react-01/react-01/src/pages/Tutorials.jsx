// Matthew Hurst | CSCE 242

import { useState } from "react";
import "./Tutorials.css";

const TUTORIALS = [
  {
    name: "Chris Bumstead (CBUM)",
    img: "tutorials-3.jpg",
    description:
      "Chris Bumstead (CBUM) is a multi-time Mr. Olympia Classic Physique champion known for structured bodybuilding training and consistent discipline.",
    youtube: "https://www.youtube.com/@ChrisBumstead",
  },
  {
    name: "Sam Sulek",
    img: "tutorials-1.jpg",
    description:
      "Sam Sulek shares long, unfiltered training sessions that highlight intensity, effort, and consistency in the gym. His videos demonstrate how hard work, frequent training, and staying consistent over time drive results.",
    youtube: "https://www.youtube.com/@sam_sulek",
  },
  {
    name: "Jeff Nippard",
    img: "tutorials-2.jpg",
    description:
      "Jeff Nippard teaches evidence-based training using biomechanics and research. His content breaks down exercises step-by-step and explains why they work, helping lifters train efficiently while reducing injury risk.",
    youtube: "https://www.youtube.com/@JeffNippard",
  },
];

export default function Tutorials() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div id="main-content">

      {/* HEADER */}
      <header id="main-header">
        <h1>Fitness Planner</h1>

        <button
          id="nav-toggle"
          aria-label="Toggle Navigation"
          onClick={() => setNavOpen((prev) => !prev)}
        >
          ☰
        </button>

        <nav id="main-nav" className={navOpen ? "show" : ""}>
          <div>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/exercises">Exercises</a></li>
              <li><a href="/nutrition">Nutrition</a></li>
              <li><a href="/tutorials">Tutorials</a></li>
              <li><a href="/case-studies">Case Studies</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <main id="content">

        {/* UPPER SECTION */}
        <section className="upper-section">
          <h1>Tutorials & Learning Center</h1>
          <p>
            Learn the proper technique, training science, and gym knowledge from trusted experts.
            Instead of guessing from random TikToks, these creators teach why you train - not just what to do.
          </p>
        </section>

        {/* TUTORIAL CARDS */}
        {TUTORIALS.map((t, i) => (
          <section className="middle-section" key={i}>
            <div className="middle-frame">
              <img
                src={`${process.env.PUBLIC_URL}/images/${t.img}`}
                alt={t.name}
              />
              <div className="middle-frame-txt">
                <h2>{t.name}</h2>
                <p>{t.description}</p>
                <a href={t.youtube} target="_blank" rel="noopener noreferrer">
                  <button type="button">Watch on Youtube</button>
                </a>
              </div>
            </div>
          </section>
        ))}

        {/* LOWER SECTION */}
        <section className="lower-section">
          <h1>🎯 How To Use This Page</h1>
          <ol>
            <li>Pick a goal (build muscle, lose fat, build strength)</li>
            <li>Choose a creator that matches your style</li>
            <li>Watch videos and learn before your workout</li>
            <li>Apply new concepts each training session.</li>
            <li>Learn how to implement cardio into your workouts</li>
            <li>Learn the science behind what makes your muscles grow</li>
          </ol>
        </section>

      </main>

      {/* FOOTER */}
      <footer id="main-footer">
        <p>© mhurst1</p>
      </footer>

    </div>
  );
}
