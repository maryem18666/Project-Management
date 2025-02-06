import React, { useEffect, useState } from "react";

import TasksTable from "./TasksTable";
import TaskTableAdmin from "./TaskTableAdmin";

import API from "../services/api";

const TaskAdmin = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Récupérer le rôle et l'ID utilisateur après le montage du composant
    const storedRole = localStorage.getItem("userRole");
    console.log("🚀 ~ useEffect ~ storedRole:", storedRole)
    const storedUserId = localStorage.getItem("userId");
    console.log("🚀 ~ useEffect ~ storedUserId:", storedUserId)

    setRole(storedRole);
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (!role || !userId) return; // Ne pas exécuter si role ou userId est null

    const fetchTasks = async () => {
      setLoading(true);
      setError("");

      try {
        const endpoint =
          role === "admin" ? "/taskstotal" : `/taskstotal/${userId}`;
        const response = await API.get(endpoint);
        setTasks(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des tâches.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [role, userId]);

  const groupTasksByUser = () => {
    return tasks.reduce((acc, task) => {
      const user = task.assignedTo?.email || "Non assigné";
      if (!acc[user]) acc[user] = [];
      acc[user].push(task);
      return acc;
    }, {});
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        {role === "admin"
          ? "Suivi des tâches des employés"
          : "Vos tâches assignées"}
      </h2>

      {loading ? (
        <div>Chargement...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : role === "admin" ? (
        Object.entries(groupTasksByUser()).map(([user, userTasks]) => (
          <div key={user} className="mb-4">
            <h3>{user}</h3>
            <TaskTableAdmin tasks={userTasks} />
          </div>
        ))
      ) : (
        <TasksTable tasks={tasks} />
      )}
    </div>
  );
};

export default TaskAdmin;
