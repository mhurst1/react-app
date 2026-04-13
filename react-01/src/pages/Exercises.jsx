// Matthew Hurst | CSCE 242

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import ExerciseCard from "../component/ExerciseCard";
import ExerciseModal from "../component/ExerciseModal";
import AddExerciseForm from "../component/AddExerciseForm";
import "./Exercises.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "https://fitness-server-xobi.onrender.com";
const EXERCISES_URL = `${SERVER_URL}/api/exercises`;
const CATEGORIES = ["All", "Upper Body", "Lower Body", "Full Body"];

export default function Exercises() {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loadError, setLoadError] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

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

  const closeModal = useCallback(() => setSelectedExercise(null), []);

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
            <button
              key={category}
              type="button"
              className={activeCategory === category ? "active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>

        <section className="middle-section">
          <section className="exercise-cards" id="exercise-list">
            {loadError ? (
              <p className="error">Exercise data could not be loaded.</p>
            ) : exercises.length === 0 ? (
              <p className="loading">Loading exercises...</p>
            ) : (
              visibleExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise._id}
                  img={`${SERVER_URL}/${exercise.img_name}`}
                  name={exercise.name}
                  description={exercise.description}
                  onClick={() => setSelectedExercise(exercise)}
                />
              ))
            )}
          </section>
        </section>

        <AddExerciseForm
          serverUrl={SERVER_URL}
          onExerciseAdded={(newEx) => setExercises((prev) => [...prev, newEx])}
        />

        <section className="exercises-lower-section">
          <h1>Master the Basics. Crush Your Goals.</h1>
          <p>Follow our step by step video tutorials to improve form, increase strength, and avoid injury.</p>
          <button className="start-training-btn" onClick={() => navigate("/my-workouts")}>Start Training</button>
        </section>
      </main>

      <Footer />

      {selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          serverUrl={SERVER_URL}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
