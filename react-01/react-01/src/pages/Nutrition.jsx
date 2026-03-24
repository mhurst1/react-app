// Matthew Hurst | CSCE 242

import { useState } from "react";
import "./Nutrition.css";

export default function Nutrition() {
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
          <h1>Nutrition</h1>
          <h2>Fuel Your Life With Food.</h2>
          <p>
            Master the fundamentals of nutrition for better health, more energy, and
            sustainable weight management. Get evidence-based, practical guidance to achieve your wellness goals.
          </p>
        </section>

        {/* VIDEO SECTION */}
        <section className="nutrition-video">
          <h1>Understanding Macronutrients</h1>
          <p>Learn how protein, carbohydrates, and fats affect muscle growth and performance.</p>
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/Dup-K8Qs5UI"
            title="What Are Macros? Everything You Need To Know"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </section>

        {/* CARDS SECTION */}
        <section className="middle-section">
          <section className="nutrition-cards">
            <div className="nutrition-frames">
              <img src={`${process.env.PUBLIC_URL}/images/Nutrition-1.jpg`} alt="Nutrition Fundamentals" />
              <h2>Nutrition Fundamentals</h2>
              <p>Discover the basics of macro-nutrients, vitamins, and balanced eating.</p>
            </div>

            <div className="nutrition-frames">
              <img src={`${process.env.PUBLIC_URL}/images/Nutrition-2.jpg`} alt="Healthy Meal Planning" />
              <h2>Healthy Meal Planning</h2>
              <p>Learn to prepare nutritious, balanced meals for the week.</p>
            </div>

            <div className="nutrition-frames">
              <img src={`${process.env.PUBLIC_URL}/images/Nutrition-3.jpg`} alt="Nutrient Timing" />
              <h2>Nutrient Timing</h2>
              <p>Understand when to eat different types of foods for the best results.</p>
            </div>

            <div className="nutrition-frames">
              <img src={`${process.env.PUBLIC_URL}/images/Nutrition-4.jpg`} alt="Supplements and Wellness" />
              <h2>Supplements & Wellness</h2>
              <p>Get insights into vitamins, minerals, and effective supplements.</p>
            </div>
          </section>
        </section>

        {/* LOWER SECTION */}
        <section className="lower-section">
          <h1>Nutrition Guides & Tips</h1>
          <ul>
            <li>✅ Build balanced, satisfying meals</li>
            <li>✅ Manage Cravings and make healthy choices.</li>
            <li>✅ Hydration, timing, and wellness</li>
          </ul>
          <button type="button">Get Started</button>
        </section>

      </main>

      {/* FOOTER */}
      <footer id="main-footer">
        <p>© mhurst1</p>
      </footer>

    </div>
  );
}
