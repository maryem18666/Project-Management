import React, { useState } from "react";
import { FaPlus, FaListAlt } from "react-icons/fa"; // Icônes pour améliorer l'apparence
import { Link, Routes, Route } from "react-router-dom";

import AddProject from "./AddProject";
import ProjectList from "./ProjectList";

import "./projectbar.css"; // Assure-toi que le fichier CSS est bien importé

function Projectbar() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Fonction pour rafraîchir les projets
  const refreshProjects = () => {
    setRefreshKey((prev) => prev + 1); // Augmente refreshKey pour forcer le rechargement
  };

  // Récupérer le rôle de l'utilisateur
  const userRole =
    typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
  console.log("🚀 ~ Projectbar ~ userRole:", userRole);

  return (
    <div className="container-fluid mt-4">
      {/* Barre d'options */}
      <div className="row mb-4">
        {/* Option "Voir les projets" (visible pour tous) */}
        <div className="col-md-6 col-12 mb-4">
          <div className="card shadow-lg border-0">
            <div className="card-body d-flex align-items-center justify-content-center gap-3">
              <FaListAlt className="display-4 text-primary" />
              <div>
                <h5 className="card-title">Voir les projets</h5>
                <p className="card-text">
                  Accédez à la liste complète des projets.
                </p>
                <Link
                  to="/projects"
                  className="btn btn-custom-info btn-lg w-100"
                  aria-label="Voir les projets"
                >
                  Voir les projets
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Option "Ajouter un projet" (visible uniquement pour l'admin) */}
        {userRole === "admin" && (
          <div className="col-md-6 col-12 mb-4">
            <div className="card shadow-lg border-0">
              <div className="card-body d-flex align-items-center justify-content-center gap-3">
                <FaPlus className="display-4 text-success" />
                <div>
                  <h5 className="card-title">Ajouter un projet</h5>
                  <p className="card-text">Créez un nouveau projet.</p>
                  <Link
                    to="/projects/add"
                    className="btn btn-custom-warning btn-lg w-100"
                    aria-label="Ajouter un projet"
                  >
                    Ajouter un projet
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Routes pour afficher les projets ou ajouter un projet */}
      <Routes>
        <Route
          path="/projects"
          element={<ProjectList refreshKey={refreshKey} />}
        />
        {userRole === "admin" && (
          <Route
            path="/projects/add"
            element={<AddProject onAdd={refreshProjects} />}
          />
        )}
      </Routes>
    </div>
  );
}

export default Projectbar;