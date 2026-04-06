// Matthew Hurst | CSCE 242

import "./ExerciseCard.css";

export default function ExerciseCard({ img, name, description, onClick }) {
  return (
    <button className="exercise-card" onClick={onClick} aria-label={`View details for ${name}`}>
      <div className="exercise-frames">
        <img src={img} alt={name} />
        <h2>{name}</h2>
        <p>{description}</p>
        <span className="view-details">View Details &rarr;</span>
      </div>
    </button>
  );
}
