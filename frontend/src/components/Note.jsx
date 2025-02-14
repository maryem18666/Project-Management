import React, { useState, useEffect } from "react";
import API from "../services/api";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const notesPerPage = 5;

  // Récupérer les notes depuis le backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await API.get("/notes");
        if (response && response.data) {
          setNotes(response.data);
        } else {
          setAlert({ message: "Pas de notes trouvées.", type: "warning" });
        }
      } catch (error) {
        setAlert({
          message: "Erreur lors du chargement des notes.",
          type: "danger",
        });
        console.error("Erreur lors de la récupération des notes :", error);
      }
    };

    fetchNotes();
  }, []);

  // Ajouter une nouvelle note
  const handleAddNote = async () => {
    if (newNote.trim() === "") {
      setAlert({ message: "Le contenu de la note ne peut pas être vide.", type: "warning" });
      return;
    }
    try {
      const response = await API.post("/notes", { content: newNote });
      setNotes([...notes, response.data]);
      setNewNote("");
      setAlert({ message: "Note ajoutée avec succès !", type: "success" });
      setTimeout(() => setAlert({ message: "", type: "" }), 3000);
    } catch (error) {
      setAlert({ message: "Erreur lors de l'ajout de la note.", type: "danger" });
      console.error("Erreur lors de l'ajout de la note :", error);
    }
  };

  // Supprimer une note
  const handleDeleteNote = async (noteId) => {
    try {
      await API.delete(`/notes/${noteId}`);
      setNotes(notes.filter((note) => note._id !== noteId)); // Utiliser _id au lieu de id
      setAlert({ message: "Note supprimée avec succès !", type: "success" });
      setTimeout(() => setAlert({ message: "", type: "" }), 3000);
    } catch (error) {
      setAlert({ message: "Erreur lors de la suppression de la note.", type: "danger" });
      console.error("Erreur lors de la suppression de la note :", error);
    }
  };

  // Filtrer les notes en fonction de la recherche
  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Notes</h2>

      {alert.message && (
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
            key={note._id} // Utiliser _id au lieu de id
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {note.content}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteNote(note._id)} // Utiliser _id au lieu de id
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