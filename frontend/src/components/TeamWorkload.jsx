import React, { useState, useEffect } from "react";
import WorkloadChart from "./WorkloadChart";
import API from "../services/api";

const TeamWorkload = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Ajout de l'état de chargement
  const [error, setError] = useState(null); // Ajout de l'état d'erreur

  // Charger les tâches depuis l'API
  useEffect(() => {
    API.get("/projects")
      .then((response) => {
        const allTasks = response.data.flatMap((project) => project.tasks);
        console.log("Tâches récupérées :", allTasks);
        setTasks(allTasks);
        setLoading(false); // Changer l'état à false quand les données sont chargées
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des tâches :", error);
        setError("Erreur de chargement des données.");
        setLoading(false); // Changer l'état à false même en cas d'erreur
      });
  }, []);

  // Affichage conditionnel en fonction de l'état de chargement ou d'erreur
  if (loading) {
    return <p>Chargement des tâches...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      
      <WorkloadChart tasks={tasks} />
    </div>
  );
};

export default TeamWorkload;
