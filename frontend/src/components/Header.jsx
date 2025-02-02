import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Mon Application</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/homecnx">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Tableau de bord</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/projects">Projets</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Mon profil</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
