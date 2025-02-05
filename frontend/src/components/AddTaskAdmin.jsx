import React, { useState, useEffect } from "react";
import API from "../services/api";
import TaskPriority from './TaskPriority'; 
import { useNavigate } from "react-router-dom";

function AddTaskAdmin({ onTaskAdded }) { // onTaskAdded est une fonction pour rafraîchir la liste des tâches
  const [form, setForm] = useState({ title: "", description: "", deadline: "", priority: 'low'});
  const [assignedTo, setAssignedTo] = useState(""); // ID de l'employé assigné
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.deadline || !assignedTo) {
      alert("Tous les champs sont requis !");
      return;
    }

    const newTask = {
      ...form,
      assignedTo,
      status: "in-progress", // Statut par défaut
    };

    try {
      await API.post("/taskstotal", newTask);
      alert("Tâche ajoutée avec succès !");
      if (onTaskAdded) onTaskAdded(); // Rafraîchir la liste des tâches
      navigate("/taskstotal"); // Rediriger vers la liste des tâches
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
      alert("Erreur lors de l'ajout de la tâche");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get("/getall");
        setUsers(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Ajouter une tâche</h3>
      <form onSubmit={handleSubmit} className="w-75 mx-auto">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Titre de la tâche</label>
          <input type="text" name="title" id="title" value={form.title} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea name="description" id="description" value={form.description} onChange={handleChange} className="form-control" rows="4" required />
        </div>

        <div className="mb-3">
          <label htmlFor="deadline" className="form-label">Date limite</label>
          <input type="date" name="deadline" id="deadline" value={form.deadline} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label htmlFor="assignedTo" className="form-label">Assigné à</label>
          <select
            name="assignedTo"
            id="assignedTo"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="form-control"
            required
          >
            <option value="">Sélectionner un employé</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.name || user.email}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="priority" className="form-label">Priorité</label>
          <TaskPriority 
            priority={form.priority} 
            onChange={handleChange} // Assurez-vous que TaskPriority peut recevoir et gérer cette valeur
          />
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-success">Ajouter la tâche</button>
        </div>
      </form>
    </div>
  );
}

export default AddTaskAdmin;