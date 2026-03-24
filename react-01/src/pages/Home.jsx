// Matthew Hurst | CSCE 242

import { useState, useEffect } from "react";
import "./Home.css";

const CARDS_PER_VIEW = 3;
const INFLUENCERS_URL =
  "https://mhurst1.github.io/projects/part7/json/homepage.json";

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [influencers, setInfluencers] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loadError, setLoadError] = useState(false);

  // Fetch influencers on mount
  useEffect(() => {
    async function loadInfluencers() {
      try {
        const res = await fetch(INFLUENCERS_URL);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data = await res.json();
        setInfluencers(data);
      } catch (err) {
        console.error("Error loading influencers:", err);
        setLoadError(true);
      }
    }
    loadInfluencers();
  }, []);

  // Slideshow navigation
  function handlePrev() {
    if (influencers.length === 0) return;
    setStartIndex((prev) => (prev - 1 + influencers.length) % influencers.length);
  }

  function handleNext() {
    if (influencers.length === 0) return;
    setStartIndex((prev) => (prev + 1) % influencers.length);
  }

  // Build the visible cards
  const visibleCards = influencers.length > 0
    ? Array.from({ length: CARDS_PER_VIEW }, (_, i) => {
        const index = (startIndex + i) % influencers.length;
        return influencers[index];
      })
    : [];

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
              <li><a href="#">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/exercises">Exercises</a></li>
              <li><a href="/nutrition">Nutrition</a></li>
              <li><a href="/tutorials">Tutorials</a></li>
              <li><a href="/case-studies">Case Studies</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main id="content">

        {/* UPPER SECTION — Slideshow */}
        <section className="upper-section">
          <h1>
            Train Smarter. Move Better.<br />
            Get Stronger.
          </h1>

          <section className="slideshow-wrapper">
            <button
              className="slide-btn"
              id="prev-btn"
              aria-label="Previous influencers"
              onClick={handlePrev}
            >
              &#10094;
            </button>

            <section className="cards" id="influencer-list">
              {loadError ? (
                <p className="error">Influencer data could not be loaded.</p>
              ) : (
                visibleCards.map((influencer, i) => (
                  <a
                    key={i}
                    className="influencer-card"
                    href={influencer.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="upper-frame">
                      <img src={influencer.img_name} alt={influencer.name} />
                      <p>{influencer.name}</p>
                    </div>
                  </a>
                ))
              )}
            </section>

            <button
              className="slide-btn"
              id="next-btn"
              aria-label="Next influencers"
              onClick={handleNext}
            >
              &#10095;
            </button>
          </section>

          <p id="frame-description">
            Workout videos, expert tips, and proven training techniques from some of the
            most well-known and respected professionals in the fitness industry.
            Learn smarter movement, better form, and sustainable progress.
          </p>
        </section>

        {/* MIDDLE SECTION — Nutrition */}
        <section className="middle-section">
          <div id="middle-frame">
            <img
              src="https://www.blenderbottle.com/cdn/shop/articles/how-to-properly-use-creatine-for-optimal-results-641511.jpg?v=1741891268&width=2048"
              alt="Nutrition"
            />
            <a href="/nutrition">
              <button>Learn More</button>
            </a>
          </div>
          <div id="middle-frame-txt">
            <h2>Proper Nutrition</h2>
            <p>
              A balanced intake of protein, carbohydrates, and healthy fats supports energy,
              muscle growth, and overall health, helping you get the most out of every workout.
            </p>
          </div>
        </section>

        {/* LOWER SECTION — Workouts */}
        <section className="lower-section">
          <h2>Explore barbell-only workout videos you can do anytime, anywhere.</h2>
          <div id="lower-frame">
            <img src={`${process.env.PUBLIC_URL}/images/Barbell.jpg`} alt="Barbell workout" />
            <a href="/exercises">
              <button>Explore Workouts</button>
            </a>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer id="main-footer">
        <p>© mhurst1</p>
      </footer>

    </div>
  );
}
