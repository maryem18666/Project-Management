import React, { useEffect, useState } from "react";
import API from "../services/api";
import TaskTableAdmin from "./TaskTableAdmin";

const TasksTotal = () => {
  const [tasks, setTasks] = useState([]); // Liste des tâches
  const [filter, setFilter] = useState("all"); // Filtre actif ("all", "completed", "overdue")
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(""); // Gestion des erreurs
  const [editingTask, setEditingTask] = useState(null); // Tâche en cours d'édition

  // Récupération des tâches depuis l'API
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError("");
      try {
        const endpoint =
  filter === "all"
    ? "/taskstotal/"
    : `/taskstotal?status=${filter}`;


        const response = await API.get(endpoint);
        console.log("Données retournées :", response.data);
        setTasks(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des tâches.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [filter]);

  // Fonction pour éditer une tâche
  const handleEditTask = (task) => {
    setEditingTask(task);
  };
  

  // Fonction pour supprimer une tâche
  const handleDeleteTask = async (taskId) => {
    try {
      await API.delete(`/taskstotal/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Erreur lors de la suppression de la tâche :", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Liste Complète des Tâches</h2>

      
      <div className="mb-4 text-center">
        <button
          className={`btn mx-2 ${
            filter === "all" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("all")}
        >
          Toutes
        </button>
        <button
          className={`btn mx-2 ${
            filter === "completed" ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => setFilter("completed")}
        >
          Terminées
        </button>
        <button
          className={`btn mx-2 ${
            filter === "overdue" ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={() => setFilter("overdue")}
        >
          En retard
        </button>
      </div>

      {editingTask && (
  <div className="modal" style={{ display: "block" }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Modifier la tâche</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setEditingTask(null)}
          ></button>
        </div>
        <div className="modal-body">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await API.put(`/taskstotal/${editingTask._id}`, editingTask);
                setTasks((prevTasks) =>
                  prevTasks.map((task) =>
                    task._id === editingTask._id ? editingTask : task
                  )
                );
                setEditingTask(null);
              } catch (err) {
                console.error("Erreur lors de la mise à jour :", err);
              }
            }}
          >
            <div className="mb-3">
              <label className="form-label">Titre</label>
              <input
                type="text"
                className="form-control"
                value={editingTask.title}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, title: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Date d'échéance</label>
              <input
                type="date"
                className="form-control"
                value={new Date(editingTask.deadline)
                  .toISOString()
                  .substring(0, 10)}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    deadline: new Date(e.target.value),
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Statut</label>
              <select
                className="form-select"
                value={editingTask.status}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, status: e.target.value })
                }
              >
                <option value="in-progress">En cours</option>
                <option value="completed">Terminé</option>
                <option value="overdue">En retard </option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Sauvegarder
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
)}

      
      {loading ? (
        <div>Chargement des tâches...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <TaskTableAdmin
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          
        />
      )}
    </div>
  );
};

export default TasksTotal;
