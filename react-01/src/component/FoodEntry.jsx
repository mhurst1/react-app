// Matthew Hurst | CSCE 242

import "./FoodEntry.css";

export default function FoodEntry({ name, calories, protein, carbs, fats, onRemove }) {
  return (
    <div className="food-entry">
      <div className="food-entry-header">
        <h2>{name}</h2>
        <button className="food-entry-remove" type="button" onClick={onRemove} aria-label="Remove entry">✕</button>
      </div>
      <div className="food-entry-macros">
        <div className="macro-item">
          <span className="macro-value">{calories}</span>
          <span className="macro-label">Calories</span>
        </div>
        <div className="macro-item">
          <span className="macro-value">{protein}g</span>
          <span className="macro-label">Protein</span>
        </div>
        <div className="macro-item">
          <span className="macro-value">{carbs}g</span>
          <span className="macro-label">Carbs</span>
        </div>
        <div className="macro-item">
          <span className="macro-value">{fats}g</span>
          <span className="macro-label">Fats</span>
        </div>
      </div>
    </div>
  );
}
