import React, { useState, useContext } from "react";
import SendMessage from "./SendMessage";
import MessageList from "./MessageList";


const Messages = () => {
  const { messages, setMessages, socket } = useContext();
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;

  // Liste d'exemple d'utilisateurs (à remplacer par une vraie source de données)
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  // Calcul des messages à afficher selon la pagination
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPages = Math.max(1, Math.ceil(messages.length / messagesPerPage));

  // Fonction pour marquer un message comme lu / non lu
  const handleMarkAsRead = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, read: !msg.read } : msg
      )
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Mes Messages</h2>

      {/* Passer la liste des utilisateurs à SendMessage */}
      <SendMessage setMessages={setMessages} socket={socket} users={users} /> 

      {/* Affichage des messages */}
      <MessageList
        messages={currentMessages}  // Passer les messages paginés
        onMarkAsRead={handleMarkAsRead}  // Fonction pour marquer comme lu/non lu
      />

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1 || messages.length === 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Précédent
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages || messages.length === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Messages;
