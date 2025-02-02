import React, { useState } from "react";
import API from "../services/api";  // Assurez-vous que l'instance d'API est correctement configurée
import { useNavigate } from "react-router-dom";

const AddClient = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Gestion du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs
    if (!name || !email || !phone) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    try {
      console.log("Données envoyées:", { name, email, phone });  // Vérifie les données envoyées

      // Envoi de la requête POST
      const response = await API.post("/clients", { name, email, phone });

      // Affiche la réponse pour s'assurer que le client est bien ajouté
      console.log("Réponse du serveur:", response.data);

      // Redirection vers la page des clients après l'ajout
      navigate("/clients");  
    } catch (error) {
      // Capture d'une erreur détaillée
      const errorMessage = error.response 
        ? error.response.data.message 
        : "Erreur inconnue";

      console.error("Erreur lors de l'ajout du client:", error);  // Log détaillé de l'erreur
      setError(`Erreur lors de l'ajout du client : ${errorMessage}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Ajouter un Client</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Téléphone</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddClient;
