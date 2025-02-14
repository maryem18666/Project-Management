const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// Route GET pour récupérer toutes les notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// Route POST pour ajouter une nouvelle note
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Le contenu est requis" });
    }
    const newNote = new Note({ content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// Route DELETE pour supprimer une note
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note non trouvée" });
    }
    res.json({ message: "Note supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

module.exports = router;
