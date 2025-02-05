import React, { useEffect, useState } from "react";
import API from "../services/api";
import TaskTableAdmin from "./TaskTableAdmin";

const TasksTotal = ({ role, userId, handleEdit, handleDelete }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError("");
      try {
        const endpoint = role === "admin" ? "/taskstotal" : `/tasks/${userId}`;
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
            <TaskTableAdmin tasks={userTasks} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        ))
      ) : (
        <TaskTableAdmin tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default TasksTotal;
