import React, { useEffect, useState } from "react";
import { FaProjectDiagram, FaShoppingCart, FaTasks, FaUsers } from "react-icons/fa";
import API from "../services/api";

const DynamicStats = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
    totalClients: 0, // Ajout d'une statistique pour les clients si nécessaire
    totalMessages: 0, // Ajout pour les messages si nécessaire
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const projects = await API.get("/projects");
        const tasks = projects.data.flatMap((project) => project.tasks);
        const clients = await API.get("/clients"); // Exemple pour récupérer des clients
        const messages = await API.get("/messages"); // Exemple pour récupérer des messages

        const completedTasks = tasks.filter((task) => task.completed).length;
        const overdueTasks = tasks.filter(
          (task) => !task.completed && new Date(task.deadline) < new Date()
        ).length;

        setStats({
          totalProjects: projects.data.length,
          totalTasks: tasks.length,
          completedTasks,
          overdueTasks,
          totalClients: clients.data.length,
          totalMessages: messages.data.length,
        });
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques :", error);
      }
    };

    fetchStats();
  }, []);

  const dynamicStats = [
    { icon: <FaProjectDiagram />, value: stats.totalProjects, label: "Projets" },
    { icon: <FaShoppingCart />, value: stats.totalClients, label: "Clients" },
    { icon: <FaTasks />, value: stats.totalTasks, label: "Tâches totales" },
    { icon: <FaTasks />, value: stats.completedTasks, label: "Tâches terminées" },
    { icon: <FaTasks />, value: stats.overdueTasks, label: "Tâches en retard" },
    { icon: <FaUsers />, value: stats.totalMessages, label: "Messages" },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Statistiques dynamiques</h2>
      <div className="row">
        {dynamicStats.map((stat, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card shadow border-0 h-100">
              <div className="card-body d-flex align-items-center gap-4">
                <div className="display-4 text-primary">{stat.icon}</div>
                <div>
                  <h3 className="card-title">{stat.value}</h3>
                  <p className="card-text">{stat.label}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicStats;
