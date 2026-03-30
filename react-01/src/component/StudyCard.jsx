// Matthew Hurst | CSCE 242

import "./StudyCard.css";

export default function StudyCard({ img, title, description, link }) {
  return (
    <div className="case-lower-frames">
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button type="button">Read More</button>
      </a>
    </div>
  );
}
