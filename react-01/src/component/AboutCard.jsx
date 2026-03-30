// Matthew Hurst | CSCE 242

import "./AboutCard.css";

export default function AboutCard({ img, alt, title, description }) {
  return (
    <div className="about-frames">
      <img src={img} alt={alt} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
