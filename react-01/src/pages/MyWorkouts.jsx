// Matthew Hurst | CSCE 242

import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useWorkout } from "../context/WorkoutContext";
import "./MyWorkouts.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "https://fitness-server-xobi.onrender.com";

const SPLITS = {
  "Upper/Lower": {
    description: "Alternate upper and lower body days. Great for 4-day training weeks.",
    days: ["Upper Body Day", "Lower Body Day", "Full Body Day"],
  },
  "Push/Pull/Legs": {
    description: "Push (chest/shoulders/triceps), Pull (back/biceps), Legs. Ideal for 6-day weeks.",
    days: ["Push Day", "Pull Day", "Legs Day"],
  },
  "Arnold Split": {
    description: "Chest & Back, Shoulders & Arms, Legs. Arnold's classic 6-day routine.",
    days: ["Chest & Back", "Shoulders & Arms", "Legs"],
  },
  "Full Body": {
    description: "Train every muscle group each session. Perfect for 3-day weeks.",
    days: ["Full Body Workout"],
  },
};

const SCHEMES = [
  { label: "3 × 12", sets: 3, reps: 12, tag: "Hypertrophy" },
  { label: "4 × 8",  sets: 4, reps: 8,  tag: "Strength & Size" },
  { label: "5 × 5",  sets: 5, reps: 5,  tag: "Strength" },
];

const PUSH_KW  = ["chest", "shoulder", "tricep", "delt", "pec", "overhead", "incline", "decline", "press"];
const PULL_KW  = ["back", "bicep", "lat", "row", "pulldown", "curl", "rear", "rhomboid", "trap"];
const LEGS_KW  = ["quad", "hamstring", "glute", "calf", "calves", "leg", "squat", "lunge", "hip", "deadlift"];
const CB_KW    = ["chest", "back", "lat", "row", "pulldown", "pec", "fly", "deadlift", "rhomboid"];
const SA_KW    = ["shoulder", "tricep", "bicep", "delt", "arm", "curl", "overhead", "trap"];

function classifyExercise(exercise, splitName) {
  const mg  = (exercise.muscle_group || "").toLowerCase();
  const cat = exercise.category || "";
  const isLowerBody = cat === "Lower Body" || LEGS_KW.some((k) => mg.includes(k));

  switch (splitName) {
    case "Upper/Lower":
      if (cat === "Lower Body") return "Lower Body Day";
      if (cat === "Full Body")  return "Full Body Day";
      return "Upper Body Day";

    case "Full Body":
      return "Full Body Workout";

    case "Push/Pull/Legs":
      if (isLowerBody) return "Legs Day";
      if (PULL_KW.some((k) => mg.includes(k))) return "Pull Day";
      if (PUSH_KW.some((k) => mg.includes(k))) return "Push Day";
      return cat === "Upper Body" ? "Push Day" : "Legs Day";

    case "Arnold Split":
      if (isLowerBody) return "Legs";
      if (SA_KW.some((k) => mg.includes(k)) && !CB_KW.some((k) => mg.includes(k)))
        return "Shoulders & Arms";
      return "Chest & Back";

    default:
      return "Other";
  }
}

export default function MyWorkouts() {
  const { workout, removeExercise } = useWorkout();
  const [activeSplit,  setActiveSplit]  = useState("Upper/Lower");
  const [activeScheme, setActiveScheme] = useState(SCHEMES[0]);

  const split = SPLITS[activeSplit];

  // Group saved exercises into the correct days for the active split
  const grouped = Object.fromEntries(split.days.map((d) => [d, []]));
  workout.forEach((ex) => {
    const day = classifyExercise(ex, activeSplit);
    if (grouped[day] !== undefined) grouped[day].push(ex);
  });

  const totalExercises = workout.length;

  return (
    <div id="main-content">
      <Navbar />

      <main id="workouts-content">

        <section className="workouts-hero">
          <h1>My Workouts</h1>
          <h2>Build Your Plan. Train with Purpose.</h2>
          <p>
            Choose a training split and set/rep scheme below. Add exercises from the 
            Exercises page to build your plan.
          </p>
        </section>

        <section className="selectors-wrapper">

          <div className="selector-block">
            <h3 className="selector-heading">Training Split</h3>
            <div className="selector-row">
              {Object.keys(SPLITS).map((name) => (
                <button
                  key={name}
                  className={`selector-btn ${activeSplit === name ? "active" : ""}`}
                  onClick={() => setActiveSplit(name)}
                >
                  {name}
                </button>
              ))}
            </div>
            <p className="split-description">{split.description}</p>
          </div>

          <div className="selector-block">
            <h3 className="selector-heading">Set / Rep Scheme</h3>
            <div className="selector-row">
              {SCHEMES.map((s) => (
                <button
                  key={s.label}
                  className={`selector-btn scheme-btn ${activeScheme.label === s.label ? "active" : ""}`}
                  onClick={() => setActiveScheme(s)}
                >
                  <span className="scheme-main">{s.label}</span>
                  <span className="scheme-tag">{s.tag}</span>
                </button>
              ))}
            </div>
          </div>

        </section>

        {totalExercises === 0 ? (
          <section className="empty-state">
            <div className="empty-icon">&#9998;</div>
            <p className="empty-text">Your workout plan is empty.</p>
            <p className="empty-sub">Head to the Exercises page, click any exercise, and hit "Add to My Workout".</p>
            <Link to="/exercises" className="browse-btn">Browse Exercises</Link>
          </section>
        ) : (

          /* ── Day columns ── */
          <section className={`days-grid cols-${split.days.length}`}>
            {split.days.map((day) => {
              const exercises = grouped[day];
              return (
                <div key={day} className="day-card">

                  <div className="day-header">
                    <h2 className="day-name">{day}</h2>
                    <span className="day-scheme-badge">
                      {activeScheme.sets} sets &times; {activeScheme.reps} reps
                    </span>
                  </div>

                  {exercises.length === 0 ? (
                    <p className="day-empty">No exercises added for this day yet.</p>
                  ) : (
                    <ul className="exercise-list">
                      {exercises.map((ex) => (
                        <li key={ex._id} className="exercise-row">
                          <img
                            src={ex.img_url || `${SERVER_URL}/${ex.img_name}`}
                            alt={ex.name}
                            className="row-img"
                          />
                          <div className="row-info">
                            <span className="row-name">{ex.name}</span>
                            <span className="row-muscle">{ex.muscle_group}</span>
                            <span className={`row-diff diff-${ex.difficulty.toLowerCase()}`}>
                              {ex.difficulty}
                            </span>
                          </div>
                          <div className="row-right">
                            <span className="row-scheme">
                              {activeScheme.sets}&times;{activeScheme.reps}
                            </span>
                            <button
                              className="remove-btn"
                              aria-label={`Remove ${ex.name}`}
                              onClick={() => removeExercise(ex._id)}
                            >
                              &times;
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              );
            })}
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}
