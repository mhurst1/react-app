// Matthew Hurst | CSCE 242

import { useEffect } from "react";
import { useWorkout } from "../context/WorkoutContext";
import "./ExerciseModal.css";

export default function ExerciseModal({ exercise, serverUrl, onClose }) {
  const { addExercise, removeExercise, isInWorkout } = useWorkout();
  const saved = exercise ? isInWorkout(exercise._id) : false;
  // Close on Escape key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!exercise) return null;

  const imgSrc = `${serverUrl}/${exercise.img_name}`;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={exercise.name}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>

        <img src={imgSrc} alt={exercise.name} className="modal-img" />

        <div className="modal-body">
          <h2 className="modal-title">{exercise.name}</h2>

          <div className="modal-badges">
            <span className="badge category">{exercise.category}</span>
            <span className={`badge difficulty diff-${exercise.difficulty.toLowerCase()}`}>
              {exercise.difficulty}
            </span>
          </div>

          <div className="modal-detail">
            <span className="detail-label">Muscle Group</span>
            <span className="detail-value">{exercise.muscle_group}</span>
          </div>

          <div className="modal-detail">
            <span className="detail-label">Description</span>
            <span className="detail-value">{exercise.description}</span>
          </div>

          <button
            className={`modal-workout-btn ${saved ? "saved" : ""}`}
            onClick={() => saved ? removeExercise(exercise._id) : addExercise(exercise)}
          >
            {saved ? "✓ Added to My Workout" : "+ Add to My Workout"}
          </button>

        </div>
      </div>
    </div>
  );
}
