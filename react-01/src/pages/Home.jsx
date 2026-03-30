// Matthew Hurst | CSCE 242

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // ← add this line
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import InfluencerCard from "../component/InfluencerCard";
import "./Home.css";
import BarbellImg from "../images/Barbell.jpg";

const CREATINE_IMG = "https://www.blenderbottle.com/cdn/shop/articles/how-to-properly-use-creatine-for-optimal-results-641511.jpg?v=1741891268&width=2048";


const CARDS_PER_VIEW = 3;
const INFLUENCERS_URL = "https://mhurst1.github.io/projects/part7/json/homepage.json";

export default function Home() {
  const [influencers, setInfluencers] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loadError, setLoadError] = useState(false);

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

  function handlePrev() {
    if (influencers.length === 0) return;
    setStartIndex((prev) => (prev - 1 + influencers.length) % influencers.length);
  }

  function handleNext() {
    if (influencers.length === 0) return;
    setStartIndex((prev) => (prev + 1) % influencers.length);
  }

  const visibleCards = influencers.length > 0
    ? Array.from({ length: CARDS_PER_VIEW }, (_, i) => influencers[(startIndex + i) % influencers.length])
    : [];

  return (
    <div id="main-content">
      <Navbar />

      <main id="content">
        <section className="upper-section">
          <h1>Train Smarter. Move Better.<br />Get Stronger.</h1>

          <section className="slideshow-wrapper">
            <button className="slide-btn" aria-label="Previous influencers" onClick={handlePrev}>&#10094;</button>
            <section className="cards" id="influencer-list">
              {loadError ? (
                <p className="error">Influencer data could not be loaded.</p>
              ) : (
                visibleCards.map((influencer, i) => (
                  <InfluencerCard key={i} img={influencer.img_name} name={influencer.name} youtube={influencer.youtube} />
                ))
              )}
            </section>
            <button className="slide-btn" aria-label="Next influencers" onClick={handleNext}>&#10095;</button>
          </section>

          <p id="frame-description">
            Workout videos, expert tips, and proven training techniques from some of the
            most well-known and respected professionals in the fitness industry.
            Learn smarter movement, better form, and sustainable progress.
          </p>
        </section>

        <section className="middle-section">
          <div id="middle-frame">
            <img src={CREATINE_IMG} alt="Nutrition" />
            <Link to="/nutrition"><button type="button">Learn More</button></Link>
          </div>
          <div id="middle-frame-txt">
            <h2>Proper Nutrition</h2>
            <p>
              A balanced intake of protein, carbohydrates, and healthy fats supports energy,
              muscle growth, and overall health, helping you get the most out of every workout.
            </p>
          </div>
        </section>

        <section className="lower-section">
          <h2>Explore barbell-only workout videos you can do anytime, anywhere.</h2>
          <div id="lower-frame">
            <img src={BarbellImg} alt="Barbell workout" />
            <Link to="/exercises"><button type="button">Explore Workouts</button></Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}