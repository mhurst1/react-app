// Matthew Hurst | CSCE 242

import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import NutritionCard from "../component/NutritionCard";
import "./Nutrition.css";

import Nutrition1 from "../images/Nutrition-1.jpg";
import Nutrition2 from "../images/Nutrition-2.jpg";
import Nutrition3 from "../images/Nutrition-3.jpg";
import Nutrition4 from "../images/Nutrition-4.jpg";

const NUTRITION_CARDS = [
  { img: Nutrition1, alt: "Nutrition Fundamentals", title: "Nutrition Fundamentals", description: "Discover the basics of macro-nutrients, vitamins, and balanced eating." },
  { img: Nutrition2, alt: "Healthy Meal Planning", title: "Healthy Meal Planning", description: "Learn to prepare nutritious, balanced meals for the week." },
  { img: Nutrition3, alt: "Nutrient Timing", title: "Nutrient Timing", description: "Understand when to eat different types of foods for the best results." },
  { img: Nutrition4, alt: "Supplements and Wellness", title: "Supplements & Wellness", description: "Get insights into vitamins, minerals, and effective supplements." },
];

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
            {NUTRITION_CARDS.map((card, i) => (
              <NutritionCard key={i} img={card.img} alt={card.alt} title={card.title} description={card.description} />
            ))}
          </section>
        </section>

        <section className="nutrition-lower-section">
          <h1>Nutrition Guides & Tips</h1>
          <ul>
            <li>✅ Build balanced, satisfying meals</li>
            <li>✅ Manage Cravings and make healthy choices.</li>
            <li>✅ Hydration, timing, and wellness</li>
          </ul>
          <Link to="/macro-tracker" className="get-started-btn">Get Started</Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}