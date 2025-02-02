const { sendNotification, sendEmailReminder } = require("../server");

// Exemple : Notification lorsqu'une tâche est assignée ou mise à jour
const updateTask = async (req, res) => {
  const { taskId, assignedTo, title, deadline } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });

    if (updatedTask) {
      sendNotification(assignedTo, `Votre tâche "${title}" a été mise à jour.`);
      
      const user = await User.findById(assignedTo);
      if (user && user.email) {
        sendEmailReminder(user.email, "Rappel de tâche", `Votre tâche "${title}" arrive à échéance le ${deadline}`);
      }
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
