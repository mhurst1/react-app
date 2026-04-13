// Matthew Hurst | CSCE 242

import { useState } from "react";
import "./AddExerciseForm.css";

const CATEGORIES = ["Upper Body", "Lower Body", "Full Body"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

const EMPTY_FORM = {
  name: "",
  category: "",
  muscle_group: "",
  difficulty: "",
  description: "",
  img_url: "",
};

function validate(fields) {
  const errors = {};

  if (!fields.name.trim()) {
    errors.name = "Name is required.";
  } else if (fields.name.trim().length < 2 || fields.name.trim().length > 100) {
    errors.name = "Name must be between 2 and 100 characters.";
  }

  if (!fields.category) {
    errors.category = "Category is required.";
  } else if (!CATEGORIES.includes(fields.category)) {
    errors.category = "Please select a valid category.";
  }

  if (!fields.muscle_group.trim()) {
    errors.muscle_group = "Muscle group is required.";
  } else if (fields.muscle_group.trim().length < 2 || fields.muscle_group.trim().length > 100) {
    errors.muscle_group = "Muscle group must be between 2 and 100 characters.";
  }

  if (!fields.difficulty) {
    errors.difficulty = "Difficulty is required.";
  } else if (!DIFFICULTIES.includes(fields.difficulty)) {
    errors.difficulty = "Please select a valid difficulty.";
  }

  if (!fields.description.trim()) {
    errors.description = "Description is required.";
  } else if (fields.description.trim().length < 5 || fields.description.trim().length > 300) {
    errors.description = "Description must be between 5 and 300 characters.";
  }

  return errors;
}

export default function AddExerciseForm({ serverUrl, onExerciseAdded }) {
  const [fields, setFields] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { type: "success" | "error", message: string }

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitStatus(null);

    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const body = {
        name: fields.name.trim(),
        category: fields.category,
        muscle_group: fields.muscle_group.trim(),
        difficulty: fields.difficulty,
        description: fields.description.trim(),
      };
      if (fields.img_url.trim()) body.img_url = fields.img_url.trim();

      const response = await fetch(`${serverUrl}/api/exercises`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.error || errBody.message || `Server error: ${response.status}`);
      }

      const resBody = await response.json();
      // Server returns { success: true, exercise: { ... } }
      const newExercise = resBody.exercise ?? resBody;
      onExerciseAdded(newExercise);
      setFields(EMPTY_FORM);
      setErrors({});
      setSubmitStatus({ type: "success", message: `"${newExercise.name}" was added successfully!` });
    } catch (err) {
      setSubmitStatus({ type: "error", message: err.message || "Failed to add exercise. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="add-exercise-section">
      <h2 className="add-exercise-title">Add a New Exercise</h2>
      <p className="add-exercise-subtitle">Submit an exercise to the library. All fields are required.</p>

      <form className="add-exercise-form" onSubmit={handleSubmit} noValidate>

        <div className="form-group">
          <label htmlFor="ex-name">Exercise Name</label>
          <input
            id="ex-name"
            name="name"
            type="text"
            placeholder="e.g. Barbell Back Squat"
            value={fields.name}
            onChange={handleChange}
            maxLength={100}
            aria-describedby={errors.name ? "err-name" : undefined}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <span className="field-error" id="err-name">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ex-category">Category</label>
            <select
              id="ex-category"
              name="category"
              value={fields.category}
              onChange={handleChange}
              aria-describedby={errors.category ? "err-category" : undefined}
              className={errors.category ? "input-error" : ""}
            >
              <option value="">Select category…</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.category && <span className="field-error" id="err-category">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="ex-difficulty">Difficulty</label>
            <select
              id="ex-difficulty"
              name="difficulty"
              value={fields.difficulty}
              onChange={handleChange}
              aria-describedby={errors.difficulty ? "err-difficulty" : undefined}
              className={errors.difficulty ? "input-error" : ""}
            >
              <option value="">Select difficulty…</option>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errors.difficulty && <span className="field-error" id="err-difficulty">{errors.difficulty}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="ex-muscle">Muscle Group</label>
          <input
            id="ex-muscle"
            name="muscle_group"
            type="text"
            placeholder="e.g. Quadriceps, Glutes"
            value={fields.muscle_group}
            onChange={handleChange}
            maxLength={100}
            aria-describedby={errors.muscle_group ? "err-muscle" : undefined}
            className={errors.muscle_group ? "input-error" : ""}
          />
          {errors.muscle_group && <span className="field-error" id="err-muscle">{errors.muscle_group}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="ex-img">Image URL <span className="optional">(optional)</span></label>
          <input
            id="ex-img"
            name="img_url"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={fields.img_url}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ex-desc">
            Description
            <span className="char-count">{fields.description.length}/300</span>
          </label>
          <textarea
            id="ex-desc"
            name="description"
            placeholder="Describe the exercise, proper form, and any key cues…"
            value={fields.description}
            onChange={handleChange}
            maxLength={300}
            rows={4}
            aria-describedby={errors.description ? "err-desc" : undefined}
            className={errors.description ? "input-error" : ""}
          />
          {errors.description && <span className="field-error" id="err-desc">{errors.description}</span>}
        </div>

        {submitStatus && (
          <div className={`submit-status ${submitStatus.type}`} role="alert">
            {submitStatus.message}
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? "Adding…" : "Add Exercise"}
        </button>
      </form>
    </section>
  );
}
