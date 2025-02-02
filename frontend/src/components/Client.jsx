import React, { useEffect, useState } from "react";
import API from "../services/api"; // Assurez-vous que `API` pointe vers l'instance Axios configurée
import { Link } from "react-router-dom";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Récupération des clients au chargement
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        const response = await API.get("/clients");  // Assurez-vous que l'URL de votre API est correcte
        setClients(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des clients.", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Liste des Clients</h2>
      
      {/* Lien vers le formulaire d'ajout */}
      <div className="text-right mb-4">
        <Link to="/clients/add" className="btn btn-primary">Ajouter un Client</Link>
      </div>

      {/* Chargement des données */}
      {isLoading ? (
        <p className="text-center">Chargement des clients...</p>
      ) : (
        <div>
          {clients.length === 0 ? (
            <p className="text-center text-muted">Aucun client trouvé.</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client._id}>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Clients;
