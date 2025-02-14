import React, { useState } from "react";

const Settings = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Validation des champs (par exemple, email et mot de passe)
    if (!form.email || !form.username) {
      alert("Le nom d'utilisateur et l'email sont obligatoires.");
      return;
    }

    if (form.password && form.password.length < 6) {
      alert("Le mot de passe doit comporter au moins 6 caractères.");
      return;
    }

    try {
      // Simuler l'appel à une API pour changer les paramètres
      const response = await fetch('http://localhost:3000/updateSettings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          name: form.username,
          password: form.password,
          role: form.role, // Ajouter cette partie si nécessaire
        }),
      });

      if (response.ok) {
        alert("Paramètres sauvegardés !");
        console.log("Paramètres mis à jour :", form);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de la mise à jour des paramètres");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour des paramètres");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Paramètres</h2>
      <form onSubmit={handleSave} className="w-75 mx-auto">
        {/* Nom d'utilisateur */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="form-control"
            placeholder="Entrez votre nom d'utilisateur"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Entrez votre email"
          />
        </div>

        {/* Mot de passe */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Nouveau mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Entrez un nouveau mot de passe"
          />
        </div>

        {/* Notifications */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="notifications"
            name="notifications"
            checked={form.notifications}
            onChange={handleChange}
            className="form-check-input"
          />
          <label htmlFor="notifications" className="form-check-label">
            Activer les notifications
          </label>
        </div>

        {/* Bouton Sauvegarder */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sauvegarder les paramètres
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
