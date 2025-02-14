import React from "react";
import { FaEnvelope } from "react-icons/fa"; // Icône pour les messages

const MessageItem = ({ message, users, onMarkAsRead }) => {
  const sender = users.find((user) => user._id === message.senderId);

  return (
    <li className={`message-item ${message.read ? "message-read" : "message-unread"}`}>
      <div className="message-content">
        <FaEnvelope className="message-icon" />
        <strong>{sender ? sender.email : "Utilisateur inconnu"}:</strong> {message.content}
      </div>
      <button
        className={`mark-read-btn ${message.read ? "read" : "unread"}`}
        onClick={() => onMarkAsRead(message._id)} // Appel de la fonction passée en prop
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
        {messages.length > 0 ? (
          messages.map((msg) => (
            <MessageItem
              key={msg._id}
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
