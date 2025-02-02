const express = require("express");
const router = express.Router();
const Message = require("../models/message");


// Récupérer tous les messages
router.get("/messages", async (req, res) => {
  try {
    const { receiver } = req.query;
    if (!receiver) {
      return res.status(400).json({ message: "Le destinataire est requis." });
    }
    
    const messages = await Message.find({ receiver });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});


// Ajouter un nouveau message
router.post("/", async (req, res) => {
  try {
    const { sender, content } = req.body;
    const message = new Message({ sender, content });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout du message" });
  }
});

// Mettre à jour l'état "lu" d'un message
router.put("/messages/:id/read", async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: "Message non trouvé." });
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});
/*
// Supprimer un message
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete(id);
    if (!message) return res.status(404).json({ error: "Message introuvable" });
    res.json({ message: "Message supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression du message" });
  }
});
*/

module.exports = router;
