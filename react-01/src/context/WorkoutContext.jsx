// Matthew Hurst | CSCE 242

import { createContext, useContext, useState, useCallback } from "react";

const WorkoutContext = createContext(null);

const STORAGE_KEY = "my_workout_list";

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveToStorage(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function WorkoutProvider({ children }) {
  const [workout, setWorkout] = useState(loadFromStorage);

  const addExercise = useCallback((exercise) => {
    setWorkout((prev) => {
      if (prev.find((ex) => ex._id === exercise._id)) return prev;
      const updated = [...prev, exercise];
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const removeExercise = useCallback((id) => {
    setWorkout((prev) => {
      const updated = prev.filter((ex) => ex._id !== id);
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const clearCategory = useCallback((category) => {
    setWorkout((prev) => {
      const updated = prev.filter((ex) => ex.category !== category);
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const isInWorkout = useCallback(
    (id) => workout.some((ex) => ex._id === id),
    [workout]
  );

  return (
    <WorkoutContext.Provider value={{ workout, addExercise, removeExercise, clearCategory, isInWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  return useContext(WorkoutContext);
}
