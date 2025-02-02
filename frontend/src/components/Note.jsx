import React, { useState, useEffect } from "react";
import API from "../services/api";
import { FaPlus, FaTrashAlt } from "react-icons/fa"; // Ajouter des icônes

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState(""); // État pour les alertes
  const notesPerPage = 5;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await API.get("/notes");
        // Vérifier la réponse avant de l'utiliser
        console.log("Réponse de l'API:", response);
        if (response && response.data) {
          setNotes(response.data);
        } else {
          setAlert("Pas de notes trouvées.");
        }
      } catch (error) {
        // Afficher plus d'informations d'erreur
        if (error.response) {
          console.error("Erreur de la réponse API :", error.response);
          setAlert(`Erreur lors du chargement des notes : ${error.response.data.message || error.response.statusText}`);
        } else {
          console.error("Erreur lors de la requête API :", error);
          setAlert("Erreur inconnue lors du chargement des notes.");
        }
      }
    };
  
    fetchNotes();
  }, []);
  
  

  const handleAddNote = async () => {
    if (newNote.trim() === "") return;
    try {
      const response = await API.post("/notes", { content: newNote });
      setNotes([...notes, response.data]);
      setNewNote("");
      setAlert({ message: "Note ajoutée avec succès !", type: "success" });
      setTimeout(() => setAlert(""), 3000); // Masquer l'alerte après 3 secondes
    } catch (error) {
      setAlert({ message: "Erreur lors de l'ajout de la note.", type: "danger" });
      console.error("Erreur lors de l'ajout de la note :", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await API.delete(`/notes/${noteId}`);
      setNotes(notes.filter((note) => note.id !== noteId));
      setAlert({ message: "Note supprimée avec succès !", type: "success" });
      setTimeout(() => setAlert(""), 3000); // Masquer l'alerte après 3 secondes
    } catch (error) {
      setAlert({ message: "Erreur lors de la suppression de la note.", type: "danger" });
      console.error("Erreur lors de la suppression de la note :", error);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Notes</h2>
      
      {alert && (
        <div className={`alert alert-${alert.type}`}>{alert.message}</div>
      )}
      
      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Rechercher une note..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nouvelle note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddNote}>
            <FaPlus /> Ajouter
          </button>
        </div>
      </div>
      
      {currentNotes.length === 0 && <p>Aucune note à afficher.</p>}
      
      <ul className="list-group">
        {currentNotes.map((note) => (
          <li
            key={note.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {note.content}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteNote(note.id)}
            >
              <FaTrashAlt />
            </button>
          </li>
        ))}
      </ul>
      
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Précédent
        </button>
        <span>Page {currentPage}</span>
        <button
          className="btn btn-secondary"
          disabled={indexOfLastNote >= filteredNotes.length}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Notes;
