import React, { useState } from "react";

const Profile = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    bio: "",
    profilePicture: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm({ ...form, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profil mis à jour !");
    console.log("Nouvelles informations :", form);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Mon Profil</h2>
      <div className="d-flex flex-column align-items-center">
        {/* Image de profil comme bouton */}
        <div className="mb-4 position-relative">
          <label htmlFor="profilePicture" className="position-relative">
            <div
              className="rounded-circle d-flex justify-content-center align-items-center"
              style={{
                width: "150px",
                height: "150px",
                cursor: "pointer",
                backgroundColor: "#f0f0f0",
                backgroundImage: `url(${form.profilePicture})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "2px solid #ddd",
                position: "relative",
              }}
            >
              {!form.profilePicture && (
                <span style={{ color: "#888" }}>Ajouter une photo</span>
              )}
            </div>
          </label>
          <input
            type="file"
            id="profilePicture"
            className="d-none"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        {/* Formulaire de mise à jour */}
        <form onSubmit={handleSave} className="w-75 mx-auto">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="form-control"
              placeholder="Entrez votre nom d'utilisateur"
              required
            />
          </div>
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
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bio" className="form-label">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="form-control"
              rows="3"
              placeholder="Écrivez quelque chose à propos de vous"
            ></textarea>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sauvegarder les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
