import React, { useEffect, useState } from 'react';
import TaskPriority from './TaskPriority';  // Composant pour gérer la priorité des tâches
import { FaTrash } from 'react-icons/fa';

const ProjectTasks = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Récupérer les tâches associées à un projet spécifique depuis le backend
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/projects/${projectId}/tasks`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Erreur lors du chargement des tâches:", error);
      }
    };

    fetchTasks();
  }, [projectId]);

  const deleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter((task) => task.id !== taskId)); // Met à jour la liste des tâches après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche:", error);
    }
  };

  return (
    <div>
      <h3>Tâches du projet</h3>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{task.title}</h5>
              <p>{task.description}</p>
              <small>{task.deadline}</small>
            </div>
            <div>
              <TaskPriority taskId={task.id} initialPriority={task.priority} />
              <button
                onClick={() => deleteTask(task.id)}
                className="btn btn-danger btn-sm ms-2"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectTasks;
