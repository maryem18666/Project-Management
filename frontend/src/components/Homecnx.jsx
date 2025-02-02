import React from "react";
import { Link } from "react-router-dom";

const Homecnx = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="bg-dark text-white vh-100 p-3"
        style={{ width: "250px", position: "fixed", top: "0", left: "0" }}
      >
        <h4 className="text-center mb-4">Menu</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <Link to="/dashboard" className="nav-link text-white">
              <i className="bi bi-house-door me-2"></i> Tableau de bord
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link to="/dashboard/projects" className="nav-link text-white">
              <i className="bi bi-kanban me-2"></i> Projets
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link to="/AddTask" className="nav-link text-white">
              <i className="bi bi-kanban me-2"></i> Taches
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link to="/profile" className="nav-link text-white">
              <i className="bi bi-person me-2"></i> Mon Profil
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link to="/Notes" className="nav-link text-white">
              <i className="bi bi-kanban me-2"></i> Mes Notes
            </Link>
          </li>
          <li className="nav-item">
          <li className="nav-item mb-3">
            <Link to="/Messages" className="nav-link text-white">
              <i className="bi bi-kanban me-2"></i> Message
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link to="/Clients" className="nav-link text-white">
              <i className="bi bi-kanban me-2"></i> Clients
            </Link>
          </li>
            <Link to="/settings" className="nav-link text-white">
              <i className="bi bi-gear me-2"></i> Paramètres
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className="container"
        style={{ marginLeft: "250px", paddingTop: "50px" }}
      >
        <h2 className="mb-4">Bienvenue dans l'Application</h2>
        <p className="lead">
          Cette application vous permet de gérer vos projets, vos tâches et de
          collaborer efficacement avec votre équipe. Naviguez via le menu à
          gauche pour explorer les différentes fonctionnalités.
        </p>
        
        <div className="mt-5">
          <h4>Raccourcis</h4>
          <div className="d-flex gap-3">
            <Link to="/dashboard" className="btn btn-primary">
              Accéder au Tableau de bord
            </Link>
            <Link to="/projects" className="btn btn-success">
              Voir les Projets
            </Link>
            <Link to="/profile" className="btn btn-info text-white">
              Mon Profil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homecnx;
