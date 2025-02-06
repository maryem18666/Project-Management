const express = require("express");
const router = express.Router();
const Task = require("../models/task");
// Récupérer toutes les tâches ou filtrer par statut
/*router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    let tasks;

    if (status === "completed") {
      tasks = await Task.find({ status: "completed" });
    } else if (status === "overdue") {
      tasks = await Task.find({
        deadline: { $lt: new Date() },
        status: { $ne: "completed" },
      });
    } else {
      tasks = await Task.find();
    }

    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des tâches." });
  }
});*/

// Récupérer toutes les tâches avec les informations de l'employé assigné
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    let tasks;

    if (status === "completed") {
      tasks = await Task.find({ status: "completed" }).populate("assignedTo", "name email");
    } else if (status === "overdue") {
      tasks = await Task.find({
        deadline: { $lt: new Date() },
        status: { $ne: "completed" },
      }).populate("assignedTo", "name email");
    } else {
      tasks = await Task.find().populate("assignedTo", "name email");
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des tâches." });
  }
});


// Récupérer les tâches d'un utilisateur spécifique
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Vérifier que l'ID est valide
    if (!userId) {
      return res.status(400).json({ message: "ID utilisateur requis." });
    }

    // Rechercher uniquement les tâches assignées à cet utilisateur
    const tasks = await Task.find({ assignedTo: userId }).populate("assignedTo", "name email");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des tâches de l'utilisateur." });
  }
});
/*
// Récupérer toutes les tâches ou filtrer par statut
router.get("/", async (req, res) => {
  try {
    const { status, assignedTo } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }
    if (assignedTo) {
      filter.assigned = assignedTo;
    }

    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res
      .status(500)
  }
});

*/

// Créer une nouvelle tâche
router.post("/", async (req, res) => {
  try {
    const { title, description, deadline, priority, status, assignedTo } = req.body;

    // Vérifier que les champs obligatoires sont remplis
    if (!title || !description || !deadline) {
      return res
        .status(400)
        .json({
          message: "Tous les champs obligatoires doivent être remplis !",
        });
    }

    const newTask = new Task({
      title,
      description,
      deadline,
      priority,
      status,
      assignedTo,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création de la tâche." });
  }
});

// Mettre à jour une tâche existante
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTask);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour de la tâche." });
  }
});

// Supprimer une tâche
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Tâche supprimée avec succès." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la tâche." });
  }
});

module.exports = router;
