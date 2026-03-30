// Matthew Hurst | CSCE 242

import "./NutritionCard.css";

export default function NutritionCard({ img, alt, title, description }) {
  return (
    <div className="nutrition-frames">
      <img src={img} alt={alt} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
