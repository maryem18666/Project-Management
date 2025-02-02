import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import DocumentUpload from "./DocumentUpload";

function AddProject({ onAdd }) {
  const [form, setForm] = useState({ title: "", description: "", deadline: "" });
  const [tasks, setTasks] = useState([{ title: "", assignedTo: "" }]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], [field]: value };
    setTasks(updatedTasks);
  };

  const addTaskField = () => {
    setTasks([...tasks, { title: "", assignedTo: "" }]);
  };

  const removeTaskField = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.deadline) {
      alert("Tous les champs du projet sont requis !");
      return;
    }

    if (tasks.length === 0 || tasks.some(task1 => !task1.title || !task1.assignedTo)) {
      alert("Toutes les tâches doivent avoir un titre et une personne assignée !");
      return;
    }

    // Vérifier les données avant l'envoi
    console.log("Données à envoyer :", { ...form, tasks });

    try {
      await API.post("/projects/add", { ...form, tasks });
      alert("Projet ajouté avec succès !");
      if (onAdd) onAdd(); // Rafraîchir la liste des projets
      navigate("/projects");
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet :", error);
      alert("Erreur lors de l'ajout du projet");
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
      <h3 className="text-center mb-4">Ajouter un projet</h3>

      <form onSubmit={handleSubmit} className="w-75 mx-auto">
        {/* Titre du projet */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Titre du projet</label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Entrez le titre du projet"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            name="description"
            id="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Décrivez le projet"
            rows="4"
            required
          />
        </div>

        {/* Date limite */}
        <div className="mb-3">
          <label htmlFor="deadline" className="form-label">Date limite</label>
          <input
            type="date"
            name="deadline"
            id="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Tâches du projet */}
        <div className="mb-3">
          <h5>Tâches du projet</h5>

          {tasks.map((task1, index) => (
            <div key={index} className="card shadow-sm mb-3">
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor={`task-title-${index}`} className="form-label">
                    Titre de la tâche
                  </label>
                  <input
                    id={`task-title-${index}`}
                    type="text"
                    placeholder="Titre de la tâche"
                    value={task1.title}
                    onChange={(e) => handleTaskChange(index, "title", e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <select
                    id={`task-assignedTo-${index}`}
                    value={task1.assignedTo}
                    onChange={(e) => handleTaskChange(index, "assignedTo", e.target.value)}
                    className="form-control"
                    required
                  >
                    <option value="">Sélectionner un utilisateur</option>
                    {users.length > 0 ? (
                      users.map(user => (
                        <option key={user._id} value={user._id}>
                          {user.email}
                        </option>
                      ))
                    ) : (
                      <option disabled>Aucun utilisateur disponible</option>
                    )}
                  </select>
                </div>
                <button
                  type="button"
                  className="btn btn-danger w-100"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Êtes-vous sûr de vouloir supprimer la tâche "${task1.title}" ?`
                      )
                    ) {
                      removeTaskField(index);
                    }
                  }}
                >
                  Supprimer cette tâche
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-outline-primary w-100 mt-3"
            onClick={addTaskField}
          >
            + Ajouter une tâche
          </button>
        </div>

        <DocumentUpload />

        {/* Bouton de soumission */}
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-success">
            Ajouter le projet
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;