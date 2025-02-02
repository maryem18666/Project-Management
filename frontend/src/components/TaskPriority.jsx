import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown, FaExclamationCircle } from "react-icons/fa"; // Icônes pour les priorités

const TaskPriority = ({ taskId, initialPriority }) => {
  const [priority, setPriority] = useState(initialPriority || "low");

  useEffect(() => {
    setPriority(initialPriority); // Réinitialise la priorité si elle est modifiée en dehors de ce composant
  }, [initialPriority]);

  const handlePriorityChange = async (e) => {
    const newPriority = e.target.value;
    setPriority(newPriority);

    try {
      await fetch(`http://localhost:3000/AddTask/${taskId}/priority`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority: newPriority }),
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la priorité:", error);
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "high":
        return { color: "white", backgroundColor: "#e74c3c" }; // Rouge pour haute priorité
      case "medium":
        return { color: "white", backgroundColor: "#f39c12" }; // Jaune pour priorité moyenne
      case "low":
        return { color: "white", backgroundColor: "#2ecc71" }; // Vert pour basse priorité
      default:
        return { color: "black", backgroundColor: "#bdc3c7" };
    }
  };

  return (
    <div>
      <label htmlFor="priority" className="form-label">
        Priorité
      </label>
      <select
        id="priority"
        value={priority}
        onChange={handlePriorityChange}
        style={getPriorityStyles(priority)}
        className="form-select mb-3"
      >
        <option value="low">Basse</option>
        <option value="medium">Moyenne</option>
        <option value="high">Haute</option>
      </select>

      <div>
        <span
          style={getPriorityStyles(priority)}
          className="badge"
        >
          {priority === "high" && <FaExclamationCircle />} 
          {priority === "medium" && <FaArrowUp />} 
          {priority === "low" && <FaArrowDown />}
          {priority === "high" ? "Haute priorité" : priority === "medium" ? "Priorité moyenne" : "Basse priorité"}
        </span>
      </div>
    </div>
  );
};

export default TaskPriority;
