// Matthew Hurst | CSCE 242

// fix jsons later

import { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import "./Exercises.css";

const EXERCISES_URL = "https://mhurst1.github.io/projects/part7/json/exercises.json";
const CATEGORIES = ["All", "Upper Body", "Lower Body", "Full Body"];

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    async function loadExercises() {
      try {
        const response = await fetch(EXERCISES_URL);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error("Error loading exercises:", error);
        setLoadError(true);
      }
    }
    loadExercises();
  }, []);

  const visibleExercises = activeCategory === "All"
    ? exercises
    : exercises.filter((ex) => ex.category === activeCategory);

  return (
    <div id="main-content">
      <Navbar />

      <main id="content">
        <section className="exercises-upper-section">
          <h1>Exercises</h1>
          <h2>Train Smart. Lift Strong.</h2>
          <p>
            Discover practical workouts designed to build strength, muscle, and skill.
            Follow proper technique, make consistent gains, and avoid wasting time in the gym.
          </p>
        </section>

        <nav id="workout-nav">
          {CATEGORIES.map((category) => (
            <button key={category} type="button" onClick={() => setActiveCategory(category)}>
              {category}
            </button>
          ))}
        </nav>

        <section className="middle-section">
          <section className="exercise-cards" id="exercise-list">
            {loadError ? (
              <p className="error">Exercise data could not be loaded.</p>
            ) : (
              visibleExercises.map((exercise, i) => (
                <a key={i} className="exercise-card" href={exercise.link || "/tutorials"} target="_blank" rel="noopener noreferrer">
                  <div className="exercise-frames">
                    <img src={exercise.img_name} alt={exercise.name} />
                    <h2>{exercise.name}</h2>
                    <p>{exercise.description}</p>
                  </div>
                </a>
              ))
            )}
          </section>
        </section>

        <section className="exercises-lower-section">
          <h1>Master the Basics. Crush Your Goals.</h1>
          <p>Follow our step by step video tutorials to improve form, increase strength, and avoid injury.</p>
          <a className="start-training-btn" href="/tutorials">Start Training</a>
        </section>
      </main>

      <footer id="main-footer"><p>© mhurst1</p></footer>
    </div>
  );
}