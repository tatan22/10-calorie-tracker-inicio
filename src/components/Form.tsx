import { useState, ChangeEvent, FormEvent, useEffect, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import { useActivity } from "../hooks/useActivity";

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form() {
  const { state, dispatch } = useActivity();
  const [activity, setActivity] = useState<Activity>(initialState);
  const caloriesInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const selectedActivity = state.activities.find((a) => a.id === state.activeId);
    if (selectedActivity) {
      setActivity(selectedActivity);
    }
  }, [state.activeId, state.activities]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const isNumberField = id === "category" || id === "calories";

    setActivity((prev) => ({
      ...prev,
      [id]: isNumberField ? +value : value,
    }));
  }, []);

  const handleFocus = () => {
    if (activity.calories === 0 && caloriesInputRef.current) {
      caloriesInputRef.current.value = "";
    }
  };

  const isValidActivity = () => {
    return activity.name.trim() !== "" && activity.calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({ ...initialState, id: uuidv4() });
  };

  return (
    <form className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6" onSubmit={handleSubmit}>
      {/* Categoría */}
      <div className="flex flex-col">
        <label htmlFor="category" className="font-semibold text-gray-700">Categoría:</label>
        <select
          className="border border-gray-300 p-3 rounded-lg w-full bg-white focus:outline-none focus:ring-2 focus:ring-gray-600"
          id="category"
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

      {/* Actividad */}
      <div className="flex flex-col">
        <label htmlFor="name" className="font-semibold text-gray-700">Actividad:</label>
        <input
          id="name"
          type="text"
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      {/* Calorías */}
      <div className="flex flex-col">
        <label htmlFor="calories" className="font-semibold text-gray-700">Calorías:</label>
        <input
          id="calories"
          type="number"
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Calorías. Ej. 300 o 500"
          ref={caloriesInputRef}
          value={activity.calories || ""}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
        disabled={!isValidActivity()}
      >
        {activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
      </button>
    </form>
  );
}
