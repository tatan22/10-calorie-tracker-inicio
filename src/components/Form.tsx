import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import { useActivity } from "../hooks/useActivity";

interface Feedback {
  message: string;
  type: "success" | "error" | "";
}

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form() {
  const { state, dispatch } = useActivity();
  const [activity, setActivity] = useState<Activity>(initialState);
  const [feedback, setFeedback] = useState<Feedback>({ message: "", type: "" });

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.find(
        (stateActivity) => stateActivity.id === state.activeId
      );
      if (selectedActivity) setActivity(selectedActivity);
    }
  }, [state.activeId, state.activities]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch({ type: "save-activity", payload: { newActivity: activity } });
      setFeedback({
        message: "Datos guardados correctamente!",
        type: "success",
      });
      setActivity({ ...initialState, id: uuidv4() });
      setTimeout(() => setFeedback({ message: "", type: "" }), 3000);
    } catch (error) {
      setFeedback({
        message: "Hubo un error al guardar los datos. Inténtalo de nuevo.",
        type: "error",
      });
      setTimeout(() => setFeedback({ message: "", type: "" }), 3000);
    }
  };

  const feedbackClass =
    feedback.type === "success"
      ? "bg-green-100 border border-green-200 text-green-700"
      : feedback.type === "error"
      ? "bg-red-100 border border-red-200 text-red-700"
      : "";

  return (
    <form
      className="max-w-md mx-auto mt-10 space-y-6 bg-white shadow-lg p-8 rounded-xl border border-gray-200"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-gray-700 text-center">
        Agrega tu Actividad
      </h2>

      {feedback.message && (
        <div className={`${feedbackClass} p-3 rounded-md text-center`}>
          {feedback.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <label htmlFor="category" className="font-medium text-gray-600">
          Categoría:
        </label>
        <select
          id="category"
          className="border border-gray-300 p-2 rounded-lg w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <label htmlFor="name" className="font-medium text-gray-600">
          Actividad:
        </label>
        <input
          id="name"
          type="text"
          className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ej. Comida, Jugo, Ensalada, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <label htmlFor="calories" className="font-medium text-gray-600">
          Calorías:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Calorías. ej. 300 o 500"
          value={activity.calories === 0 ? "" : activity.calories}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50"
        disabled={!isValidActivity()}
      >
        {activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
      </button>
    </form>
  );
}
