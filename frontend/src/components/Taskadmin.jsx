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
  const [editingTask, setEditingTask] = useState(null); // Tâche en cours d'édition

  useEffect(() => {
    // Récupérer le rôle et l'ID utilisateur après le montage du composant
    const storedRole = localStorage.getItem("userRole");
    const storedUserId = localStorage.getItem("userId");

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

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = async (updatedTask) => {
    try {
      await API.put(`/taskstotal/${updatedTask._id}`, updatedTask);
      setTasks(tasks.map(task => 
        task._id === updatedTask._id ? updatedTask : task
      ));
      setEditingTask(null); // Fermer le formulaire d'édition après mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      setTasks(tasks.filter(task => task._id !== taskId)); // Suppression optimiste
      await API.delete(`/taskstotal/${taskId}`);
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche", error);
      setTasks(prevTasks => [...prevTasks]); // Restaurer la tâche en cas d'erreur
    }
  };

  const groupTasksByUser = () => {
    return tasks.reduce((acc, task) => {
      if (!task || !task.assignedTo) return acc;
      const user = task.assignedTo.email || "Non assigné";
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
            <TaskTableAdmin
              tasks={userTasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        ))
      ) : (
        <TasksTable tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {/* Formulaire d'édition */}
      {editingTask && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier la tâche</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingTask(null)} // Fermer le modal
                ></button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate(editingTask); // Mise à jour de la tâche
                  }}
                >
                  <div className="mb-3">
                    <label className="form-label">Titre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingTask.title}
                      onChange={(e) =>
                        setEditingTask({
                          ...editingTask,
                          title: e.target.value,
                        })
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
                        setEditingTask({
                          ...editingTask,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="in-progress">En cours</option>
                      <option value="completed">Terminé</option>
                      <option value="overdue">En retard</option>
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
    </div>
  );
};

export default TaskAdmin;
