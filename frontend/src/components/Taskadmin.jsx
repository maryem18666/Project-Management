import React, { useEffect, useState } from "react";
import API from "../services/api";
import TaskTableAdmin from "./TaskTableAdmin";
import TasksTable from "./TasksTable";

const TaskAdmin = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //const role = localStorage.getItem("userRole");
  const role="admin";
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError("");

      try {
        const endpoint = role === "admin" ? "/taskstotal" : `/task/${userId}`;
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
      const user =
  typeof task.assignedTo === "object"
    ? task.assignedTo.email || "Non assigné"
    : "Non assigné";

      if (!acc[user]) acc[user] = [];
      acc[user].push(task);
      return acc;
    }, {});
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        {role === "admin" ? "Suivi des tâches des employés" : "Vos tâches assignées"}
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
