// Matthew Hurst | CSCE 242

import "./FeaturedStudy.css";

export default function FeaturedStudy({ img, title, description, link }) {
  return (
    <section className="case-middle-section">
      <div className="case-middle-frames">
        <img src={img} alt={title} />
        <div className="case-middle-frame-txt">
          <h2>{title}</h2>
          <p>{description}</p>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <button type="button">Read More</button>
          </a>
        </div>
      </div>
    </section>
  );
}
