// Matthew Hurst | CSCE 242

import { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import "./MacroTracker.css";

const GOALS = [
  {
    key: "fat-loss",
    label: "Fat Loss",
    icon: "🔥",
    description: "500 kcal deficit · High protein to preserve muscle",
    calorieOffset: -500,
    macros: { protein: 0.40, carbs: 0.30, fat: 0.30 },
    accent: "goal-orange",
  },
  {
    key: "maintenance",
    label: "Maintenance",
    icon: "⚖️",
    description: "At TDEE · Balanced macros for health & performance",
    calorieOffset: 0,
    macros: { protein: 0.30, carbs: 0.40, fat: 0.30 },
    accent: "goal-teal",
  },
  {
    key: "muscle-gain",
    label: "Muscle Gain",
    icon: "💪",
    description: "300 kcal surplus · Higher carbs to fuel training",
    calorieOffset: 300,
    macros: { protein: 0.35, carbs: 0.45, fat: 0.20 },
    accent: "goal-blue",
  },
];

const ACTIVITY_LEVELS = [
  { key: "sedentary",   label: "Sedentary",        sub: "Little or no exercise",          factor: 1.2   },
  { key: "light",      label: "Lightly Active",    sub: "1–3 days/week",                  factor: 1.375 },
  { key: "moderate",   label: "Moderately Active", sub: "3–5 days/week",                  factor: 1.55  },
  { key: "very",       label: "Very Active",       sub: "6–7 days/week",                  factor: 1.725 },
];

const STORAGE_KEY = "macro_tracker_state";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function calcTDEE({ weightKg, heightCm, age, gender, activityFactor }) {
  const bmr = gender === "male"
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  return Math.round(bmr * activityFactor);
}

function calcTargets(tdee, goal) {
  const calories = tdee + goal.calorieOffset;
  return {
    calories,
    protein: Math.round((calories * goal.macros.protein) / 4),
    carbs:   Math.round((calories * goal.macros.carbs)   / 4),
    fat:     Math.round((calories * goal.macros.fat)     / 9),
  };
}

function toKg(weight, unit) {
  return unit === "lbs" ? weight / 2.205 : weight;
}


const EMPTY_FOOD = { name: "", calories: "", protein: "", carbs: "", fat: "" };

export default function MacroTracker() {
  const saved = loadState();

  const [activeGoal,    setActiveGoal]    = useState(saved?.activeGoal    ?? "fat-loss");
  const [stats, setStats] = useState(saved?.stats ?? {
    weight: "", heightFt: "", heightIn: "", age: "", activity: "moderate",
  });
  const [targets,  setTargets]  = useState(saved?.targets  ?? null);
  const [foodLog,  setFoodLog]  = useState(saved?.foodLog  ?? []);
  const [foodEntry, setFoodEntry] = useState(EMPTY_FOOD);
  const [foodErrors, setFoodErrors] = useState({});
  const [calcError, setCalcError] = useState("");

  // Persist on every change
  useEffect(() => {
    saveState({ activeGoal, stats, targets, foodLog });
  }, [activeGoal, stats, targets, foodLog]);

  function handleStatsChange(e) {
    const { name, value } = e.target;
    setStats((prev) => ({ ...prev, [name]: value }));
  }

  function handleCalculate() {
    setCalcError("");
    const weight = Number(stats.weight);
    const age    = Number(stats.age);
    const ft     = Number(stats.heightFt);
    const inches = Number(stats.heightIn);

    if (!weight || weight <= 0)         return setCalcError("Please enter a valid body weight.");
    if (!ft && !inches)                 return setCalcError("Please enter your height.");
    if (!age || age < 10 || age > 100)  return setCalcError("Please enter a valid age (10–100).");

    const weightKg  = toKg(weight, "lbs");
    const heightCm  = (ft * 12 + inches) * 2.54;
    const actLevel  = ACTIVITY_LEVELS.find((a) => a.key === stats.activity);
    const goal      = GOALS.find((g) => g.key === activeGoal);

    const tdee      = calcTDEE({ weightKg, heightCm, age, gender: "male", activityFactor: actLevel.factor });
    const newTargets = calcTargets(tdee, goal);
    setTargets({ ...newTargets, tdee });
  }

  function handleFoodChange(e) {
    const { name, value } = e.target;
    setFoodEntry((prev) => ({ ...prev, [name]: value }));
    if (foodErrors[name]) setFoodErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleAddFood(e) {
    e.preventDefault();
    const errors = {};
    if (!foodEntry.name.trim())                          errors.name     = "Required";
    if (!foodEntry.calories || foodEntry.calories < 0)   errors.calories = "Required";
    if (foodEntry.protein === "" || foodEntry.protein < 0) errors.protein = "Required";
    if (foodEntry.carbs   === "" || foodEntry.carbs < 0)   errors.carbs   = "Required";
    if (foodEntry.fat     === "" || foodEntry.fat < 0)     errors.fat     = "Required";
    if (Object.keys(errors).length) return setFoodErrors(errors);

    const entry = {
      id:       Date.now(),
      name:     foodEntry.name.trim(),
      calories: Number(foodEntry.calories),
      protein:  Number(foodEntry.protein),
      carbs:    Number(foodEntry.carbs),
      fat:      Number(foodEntry.fat),
    };
    setFoodLog((prev) => [...prev, entry]);
    setFoodEntry(EMPTY_FOOD);
    setFoodErrors({});
  }

  function removeFood(id) {
    setFoodLog((prev) => prev.filter((f) => f.id !== id));
  }

  function clearLog() { setFoodLog([]); }

  const totals = foodLog.reduce(
    (acc, f) => ({
      calories: acc.calories + f.calories,
      protein:  acc.protein  + f.protein,
      carbs:    acc.carbs    + f.carbs,
      fat:      acc.fat      + f.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  function pct(consumed, target) {
    if (!target) return 0;
    return Math.min(Math.round((consumed / target) * 100), 100);
  }

  const goalObj = GOALS.find((g) => g.key === activeGoal);

  return (
    <div id="main-content">
      <Navbar />

      <main id="tracker-content">

        <section className="tracker-hero">
          <h1>Macro Tracker</h1>
          <h2>Know What You Eat. Reach Your Goal.</h2>
          <p>Enter your stats, choose your goal, and log your daily food intake to see exactly where you stand.</p>
        </section>

        <section className="tracker-section">
          <h3 className="section-label">Step 1 — Choose Your Goal</h3>
          <div className="goal-cards">
            {GOALS.map((g) => (
              <button
                key={g.key}
                className={`goal-card ${g.accent} ${activeGoal === g.key ? "selected" : ""}`}
                onClick={() => { setActiveGoal(g.key); setTargets(null); }}
              >
                <span className="goal-icon">{g.icon}</span>
                <span className="goal-label">{g.label}</span>
                <span className="goal-desc">{g.description}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="tracker-section stats-section">
          <h3 className="section-label">Step 2 — Enter Your Stats</h3>

          <div className="stats-grid">

            <div className="stat-group">
              <label>Body Weight (lbs)</label>
              <input
                type="number"
                name="weight"
                placeholder="e.g. 175"
                value={stats.weight}
                onChange={handleStatsChange}
                min="0"
              />
            </div>

            <div className="stat-group">
              <label>Height</label>
              <div className="height-imperial">
                <input type="number" name="heightFt" placeholder="ft" value={stats.heightFt} onChange={handleStatsChange} min="0" max="8" />
                <input type="number" name="heightIn" placeholder="in" value={stats.heightIn} onChange={handleStatsChange} min="0" max="11" />
              </div>
            </div>

            <div className="stat-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                placeholder="e.g. 22"
                value={stats.age}
                onChange={handleStatsChange}
                min="10" max="100"
              />
            </div>

<div className="stat-group full-width">
              <label>Activity Level</label>
              <div className="activity-options">
                {ACTIVITY_LEVELS.map((a) => (
                  <button
                    key={a.key}
                    className={`activity-btn ${stats.activity === a.key ? "active" : ""}`}
                    onClick={() => setStats((p) => ({ ...p, activity: a.key }))}
                  >
                    <span className="activity-label">{a.label}</span>
                    <span className="activity-sub">{a.sub}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {calcError && <p className="calc-error">{calcError}</p>}
          <button className="calculate-btn" onClick={handleCalculate}>Calculate My Targets</button>
        </section>

        {/* ── Results ── */}
        {targets && (
          <section className="tracker-section results-section">
            <h3 className="section-label">Step 3 — Your Daily Targets</h3>

            <div className="results-grid">
              <div className="result-card calorie-card">
                <span className="result-number">{targets.calories.toLocaleString()}</span>
                <span className="result-unit">calories / day</span>
                <span className="result-note">TDEE: {targets.tdee.toLocaleString()} · Goal: {goalObj.label}</span>
              </div>
              <div className="result-card">
                <span className="result-number">{targets.protein}g</span>
                <span className="result-unit">Protein</span>
                <span className="result-note">{Math.round(goalObj.macros.protein * 100)}% of calories</span>
              </div>
              <div className="result-card">
                <span className="result-number">{targets.carbs}g</span>
                <span className="result-unit">Carbohydrates</span>
                <span className="result-note">{Math.round(goalObj.macros.carbs * 100)}% of calories</span>
              </div>
              <div className="result-card">
                <span className="result-number">{targets.fat}g</span>
                <span className="result-unit">Fat</span>
                <span className="result-note">{Math.round(goalObj.macros.fat * 100)}% of calories</span>
              </div>
            </div>
          </section>
        )}

        {targets && (
          <section className="tracker-section food-section">
            <h3 className="section-label">Step 4 — Log Today's Food</h3>

            {/* Progress bars */}
            <div className="progress-group">
              {[
                { label: "Calories", consumed: totals.calories, target: targets.calories, unit: "kcal", cls: "bar-cal" },
                { label: "Protein",  consumed: totals.protein,  target: targets.protein,  unit: "g",    cls: "bar-protein" },
                { label: "Carbs",    consumed: totals.carbs,    target: targets.carbs,    unit: "g",    cls: "bar-carbs" },
                { label: "Fat",      consumed: totals.fat,      target: targets.fat,      unit: "g",    cls: "bar-fat" },
              ].map(({ label, consumed, target, unit, cls }) => (
                <div key={label} className="progress-row">
                  <div className="progress-meta">
                    <span className="progress-label">{label}</span>
                    <span className="progress-values">
                      {consumed}<span className="progress-unit">{unit}</span>
                      {" / "}{target}<span className="progress-unit">{unit}</span>
                    </span>
                  </div>
                  <div className="progress-bar-track">
                    <div
                      className={`progress-bar-fill ${cls} ${consumed > target ? "over" : ""}`}
                      style={{ width: `${pct(consumed, target)}%` }}
                    />
                  </div>
                  <span className="progress-pct">{pct(consumed, target)}%</span>
                </div>
              ))}
            </div>

            {/* Add food form */}
            <form className="food-form" onSubmit={handleAddFood} noValidate>
              <div className="food-form-row">
                <div className="food-group wide">
                  <label>Food / Meal Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="e.g. Chicken breast, 6 oz"
                    value={foodEntry.name}
                    onChange={handleFoodChange}
                    className={foodErrors.name ? "err" : ""}
                  />
                  {foodErrors.name && <span className="food-err">{foodErrors.name}</span>}
                </div>
                <div className="food-group">
                  <label>Calories</label>
                  <input name="calories" type="number" placeholder="kcal" min="0" value={foodEntry.calories} onChange={handleFoodChange} className={foodErrors.calories ? "err" : ""} />
                  {foodErrors.calories && <span className="food-err">{foodErrors.calories}</span>}
                </div>
                <div className="food-group">
                  <label>Protein (g)</label>
                  <input name="protein" type="number" placeholder="g" min="0" value={foodEntry.protein} onChange={handleFoodChange} className={foodErrors.protein ? "err" : ""} />
                  {foodErrors.protein && <span className="food-err">{foodErrors.protein}</span>}
                </div>
                <div className="food-group">
                  <label>Carbs (g)</label>
                  <input name="carbs" type="number" placeholder="g" min="0" value={foodEntry.carbs} onChange={handleFoodChange} className={foodErrors.carbs ? "err" : ""} />
                  {foodErrors.carbs && <span className="food-err">{foodErrors.carbs}</span>}
                </div>
                <div className="food-group">
                  <label>Fat (g)</label>
                  <input name="fat" type="number" placeholder="g" min="0" value={foodEntry.fat} onChange={handleFoodChange} className={foodErrors.fat ? "err" : ""} />
                  {foodErrors.fat && <span className="food-err">{foodErrors.fat}</span>}
                </div>
              </div>
              <button type="submit" className="add-food-btn">+ Log Food</button>
            </form>

            {/* Food log list */}
            {foodLog.length > 0 && (
              <div className="food-log">
                <div className="food-log-header">
                  <span>Today's Log ({foodLog.length} item{foodLog.length !== 1 ? "s" : ""})</span>
                  <button className="clear-btn" onClick={clearLog}>Clear All</button>
                </div>
                <ul className="food-log-list">
                  {foodLog.map((f) => (
                    <li key={f.id} className="food-log-item">
                      <span className="food-log-name">{f.name}</span>
                      <div className="food-log-macros">
                        <span className="macro-chip cal-chip">{f.calories} kcal</span>
                        <span className="macro-chip pro-chip">{f.protein}g P</span>
                        <span className="macro-chip carb-chip">{f.carbs}g C</span>
                        <span className="macro-chip fat-chip">{f.fat}g F</span>
                      </div>
                      <button className="remove-food-btn" onClick={() => removeFood(f.id)} aria-label="Remove">&times;</button>
                    </li>
                  ))}
                </ul>
                <div className="food-log-totals">
                  <span className="totals-label">Daily Total</span>
                  <div className="food-log-macros">
                    <span className="macro-chip cal-chip">{totals.calories} kcal</span>
                    <span className="macro-chip pro-chip">{totals.protein}g P</span>
                    <span className="macro-chip carb-chip">{totals.carbs}g C</span>
                    <span className="macro-chip fat-chip">{totals.fat}g F</span>
                  </div>
                </div>
              </div>
            )}

          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}
