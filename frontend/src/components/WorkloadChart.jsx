import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import API from "../services/api";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const WorkloadChart = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État d'erreur

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les utilisateurs
        const userResponse = await API.get("/getall");
        setUsers(userResponse.data);
  
        // Récupérer les projets
        const response = await API.get("/projects");
        const allTasks = response.data.flatMap(project => project.tasks);
  
        console.log("Tâches récupérées depuis l'API :", allTasks);
  
        // Associer chaque tâche à son utilisateur
        const tasksWithUsers = allTasks.map(task => {
          const user = users.find(user => user._id === task.assignedTo?._id);
          return user ? { ...task, assignedTo: user.email } : task;
        });
  
        console.log("Tâches associées aux utilisateurs :", tasksWithUsers);
        setTasks(tasksWithUsers);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des tâches :", error);
        setError("Erreur de chargement des données.");
        setLoading(false);
      }
    };
  
    fetchData();
  }, [users]); // L'effet dépend de `users`
  if (loading) {
    return <p>Chargement des tâches...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Calculer le nombre de tâches par utilisateur
  const taskCounts = tasks.reduce((acc, task) => {
    if (task.assignedTo) {
      acc[task.assignedTo] = (acc[task.assignedTo] || 0) + 1;
    }
    return acc;
  }, {});
  
  console.log("Nombre de tâches par utilisateur :", taskCounts);

  const generateColors = (count) => {
    const colors = [
      "rgba(75, 192, 192, 0.2)",
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
    ];
    return [...colors, ...colors].slice(0, count);
  };

  const backgroundColors = generateColors(Object.keys(taskCounts).length);
  const borderColors = backgroundColors.map(color => color.replace("0.2", "1"));

  const chartData = {
    labels: Object.keys(taskCounts),
    datasets: [
      {
        label: "Tâches assignées",
        data: Object.values(taskCounts),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };
  console.log("Données du graphique :", chartData);
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Charge de travail des membres de l'équipe",
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", padding: "20px" }}>
      <h4 className="text-center text-lg font-bold mb-4">Suivi de la charge de travail</h4>
      {Object.keys(taskCounts).length > 0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p className="text-center text-gray-600">Aucune tâche assignée pour le moment.</p>
      )}
    </div>
  );
};

export default WorkloadChart;
