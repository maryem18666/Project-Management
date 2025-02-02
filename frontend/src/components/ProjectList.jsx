import React, { useEffect, useState } from "react";
import API from "../services/api";


function ProjectList({ refreshKey }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Vérification de la réponse de l'API
    API.get("/projects")
      .then((res) => {
        console.log("Projets récupérés:", res.data);  // Vérifiez les données retournées
        setProjects(res.data);
      })
      .catch((err) => {
        
        alert("Une erreur est survenue lors de la récupération des projets.");
      });
  }, [refreshKey]);  // La dépendance refreshKey permet de recharger la liste si nécessaire

  // Supprimer un projet
  const deleteProject = async (projectId) => {
    console.log("ID du projet à supprimer :", projectId);
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?");
    if (!confirmDelete) return;
  
    try {
      await API.delete(`/projects/${projectId}`);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId)
      );
      alert("Projet supprimé avec succès.");
    } catch (err) {
      console.error("Erreur lors de la suppression du projet :", err);
      alert("Échec de la suppression du projet.");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Liste des projets</h3>
      {projects.length === 0 ? (
        <div className="alert alert-warning text-center">
          Aucun projet trouvé.
        </div>
      ) : (
        <div className="row">
          
          {projects.map((project) => (
            <div className="col-lg-4 col-md-6 mb-4" key={project._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h4 className="card-title">{project.title}</h4>
                  <p className="card-text">{project.description}</p>
                  <p className="card-text">
                    <strong>Deadline :</strong> {new Date(project.deadline).toLocaleDateString()}
                  </p>
                  <button
                   className="btn btn-danger"
                      onClick={() => deleteProject(project._id)} // Utilisez `_id` ici également
                  >
                     Supprimer
                  </button>
                </div>
              </div>
            </div>
            
          ))}
        </div>
        
      )}
    </div>
  );
}

export default ProjectList;
