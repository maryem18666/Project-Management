const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
  status: { type: String, enum: ["in-progress", "completed", "overdue"] },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null, // Permet d'éviter une erreur en cas de tâche non assignée
    required: false, 
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;

/*const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  status: { type: String, enum: ['in-progress', 'completed', 'overdue'] },
  assignedTo: { type: String, required: false }, 
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;*/
