// Matthew Hurst | CSCE 242

import "./TutorialCard.css";

export default function TutorialCard({ img, name, description, youtube }) {
  return (
    <section className="middle-section">
      <div className="middle-frame">
        <img src={img} alt={name} />
        <div className="middle-frame-txt">
          <h2>{name}</h2>
          <p>{description}</p>
          <a href={youtube} target="_blank" rel="noopener noreferrer">
            <button type="button">Watch on Youtube</button>
          </a>
        </div>
      </div>
    </section>
  );
}
