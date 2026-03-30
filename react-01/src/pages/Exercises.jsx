// Matthew Hurst | CSCE 242

import { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import ExerciseCard from "../component/ExerciseCard";
import "./Exercises.css";

import ExerciseSquat from "../images/Exercises-Squat.jpg";
import ExerciseBench from "../images/Exercises-Bench.jpg";
import ExerciseDB from "../images/Exercises-DB.jpg";
import ExerciseLunge from "../images/Exercises-Lunge.jpg";
import ExerciseCrunch from "../images/Exercises-Crunch.jpg";
import ExercisePulldowns from "../images/Exercises-Pulldowns.jpg";
import ExerciseDeadlift from "../images/Exercises-Romainian-Deadlift.jpg";
import ExerciseOverheadPress from "../images/Exercises-Overhead-Press.jpg";

const EXERCISE_IMAGES = {
  "Exercises-Squat.jpg": ExerciseSquat,
  "Exercises-Bench.jpg": ExerciseBench,
  "Exercises-DB.jpg": ExerciseDB,
  "Exercises-Lunge.jpg": ExerciseLunge,
  "Exercises-Crunch.jpg": ExerciseCrunch,
  "Exercises-Pulldowns.jpg": ExercisePulldowns,
  "Exercises-Romainian-Deadlift.jpg": ExerciseDeadlift,
  "Exercises-Overhead-Press.jpg": ExerciseOverheadPress,
};

function resolveImage(imgPath) {
  const filename = imgPath.split("/").pop();
  return EXERCISE_IMAGES[filename] || imgPath;
}

// Get the JSON Data from my initial site 
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
                <ExerciseCard key={i} img={resolveImage(exercise.img_name)} name={exercise.name} description={exercise.description} link={exercise.link} />
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

      <Footer />
    </div>
  );
}