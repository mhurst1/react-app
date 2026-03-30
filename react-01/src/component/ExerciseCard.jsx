// Matthew Hurst | CSCE 242

import "./ExerciseCard.css";

export default function ExerciseCard({ img, name, description, link }) {
  return (
    <a className="exercise-card" href={link || "/tutorials"} target="_blank" rel="noopener noreferrer">
      <div className="exercise-frames">
        <img src={img} alt={name} />
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </a>
  );
}
