import React from "react";
import { FaTasks, FaProjectDiagram, FaStickyNote, FaUsers, FaEnvelope, FaCogs } from "react-icons/fa";
import { Link } from "react-router-dom";
import './sidebar.css' ;
const Sidebar = () => {
  return (
    <div className="d-flex flex-column sidebar vh-100 p-3 shadow-lg">
      <h2 className="text-center mb-4">Managem</h2>
      <ul className="nav flex-column">
        <li className="nav-item mb-3">
            <FaTasks className="me-2" />
            Tableau de bord
        </li>
        <li className="nav-item mb-3">
          <Link to="/projectsbar" className="nav-link text-white d-flex align-items-center">
            <FaProjectDiagram className="me-2" />
            Projets
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/AddTask" className="nav-link text-white d-flex align-items-center">
            <FaTasks className="me-2" />
            Taches
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/Note" className="nav-link text-white d-flex align-items-center">
            <FaStickyNote className="me-2" />
            Mes Notes
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/clients" className="nav-link text-white d-flex align-items-center">
            <FaUsers className="me-2" />
            Clients
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/messages" className="nav-link text-white d-flex align-items-center">
            <FaEnvelope className="me-2" />
            Messages
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/settings" className="nav-link text-white d-flex align-items-center">
            <FaCogs className="me-2" />
            Paramètres
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
