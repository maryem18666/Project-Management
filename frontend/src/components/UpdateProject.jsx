import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", deadline: "" });

  useEffect(() => {
    API.get(`/projects/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error("Erreur lors de la récupération du projet :", err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/projects/${id}`, form);
      alert("Projet mis à jour !");
      navigate("/projects");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Modifier le projet</h3>
      <input name="title" value={form.title} placeholder="Titre" onChange={handleChange} />
      <textarea name="description" value={form.description} placeholder="Description" onChange={handleChange} />
      <input name="deadline" type="date" value={form.deadline} onChange={handleChange} />
      <button type="submit">Mettre à jour</button>
    </form>
  );
}

export default UpdateProject;
