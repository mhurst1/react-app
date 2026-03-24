// Matthew Hurst | CSCE 242

import Navbar from "../component/Navbar";
import "./Nutrition.css";

import Nutrition1 from "../images/Nutrition-1.jpg";
import Nutrition2 from "../images/Nutrition-2.jpg";
import Nutrition3 from "../images/Nutrition-3.jpg";
import Nutrition4 from "../images/Nutrition-4.jpg";

export default function Nutrition() {
  return (
    <div id="main-content">
      <Navbar />

      <main id="content">
        <section className="nutrition-upper-section">
          <h1>Nutrition</h1>
          <h2>Fuel Your Life With Food.</h2>
          <p>
            Master the fundamentals of nutrition for better health, more energy, and
            sustainable weight management. Get evidence-based, practical guidance to achieve your wellness goals.
          </p>
        </section>

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

        <section className="middle-section">
          <section className="nutrition-cards">
            <div className="nutrition-frames">
              <img src={Nutrition1} alt="Nutrition Fundamentals" />
              <h2>Nutrition Fundamentals</h2>
              <p>Discover the basics of macro-nutrients, vitamins, and balanced eating.</p>
            </div>
            <div className="nutrition-frames">
              <img src={Nutrition2} alt="Healthy Meal Planning" />
              <h2>Healthy Meal Planning</h2>
              <p>Learn to prepare nutritious, balanced meals for the week.</p>
            </div>
            <div className="nutrition-frames">
              <img src={Nutrition3} alt="Nutrient Timing" />
              <h2>Nutrient Timing</h2>
              <p>Understand when to eat different types of foods for the best results.</p>
            </div>
            <div className="nutrition-frames">
              <img src={Nutrition4} alt="Supplements and Wellness" />
              <h2>Supplements & Wellness</h2>
              <p>Get insights into vitamins, minerals, and effective supplements.</p>
            </div>
          </section>
        </section>

        <section className="nutrition-lower-section">
          <h1>Nutrition Guides & Tips</h1>
          <ul>
            <li>✅ Build balanced, satisfying meals</li>
            <li>✅ Manage Cravings and make healthy choices.</li>
            <li>✅ Hydration, timing, and wellness</li>
          </ul>
          <button type="button">Get Started</button>
        </section>
      </main>

      <footer id="main-footer"><p>© mhurst1</p></footer>
    </div>
  );
}