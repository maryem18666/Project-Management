import React, { useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa"; // Icône pour les messages

const MessageItem = ({ message, users, onMarkAsRead }) => {
  const [sender, setSender] = useState(null);

  useEffect(() => {
    // Trouver l'utilisateur correspondant à senderId dans la liste des utilisateurs
    const foundSender = Array.isArray(users) ? users.find((user) => user._id === message.senderId) : null;

    if (foundSender) {
      setSender(foundSender);
    }
  }, [message.senderId, users]);

  return (
    <li className={`message-item ${message.read ? "message-read" : "message-unread"}`}>
      <div className="message-content">
        <FaEnvelope className="message-icon" />
        <strong>{sender ? sender.email : "Utilisateur inconnu"}:</strong> {message.content}
      </div>
      <button
        className={`mark-read-btn ${message.read ? "read" : "unread"}`}
        onClick={() => onMarkAsRead(message._id)}
      >
        {message.read ? "Marquer comme non lu" : "Marquer comme lu"}
      </button>
    </li>
  );
};

const MessageList = ({ messages, users, onMarkAsRead }) => {
  return (
    <div className="message-list-container">
     <ul className="message-list">
  {Array.isArray(messages) && messages.length > 0 ? (
    messages.map((msg, index) => (
      <MessageItem 
        key={msg._id || index} // Utiliser msg._id si disponible, sinon l'index
        message={msg} 
        users={users} 
        onMarkAsRead={onMarkAsRead} 
      />
    ))
  ) : (
    <li>Aucun message reçu.</li>
  )}
</ul>
 
    </div>
  );
};

export default MessageList;
