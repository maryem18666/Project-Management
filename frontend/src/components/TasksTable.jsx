import React from "react";

const TasksTable = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="mt-4">
      
      <h3 className="mb-4">Mes tâches</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">À faire</th>
              <th scope="col">Date d'échéance</th>
              <th scope="col">Statut</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{new Date(task.deadline).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        task.status === "completed"
                          ? "bg-success"
                          : task.status === "overdue"
                          ? "bg-danger"
                          : "bg-warning"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => onEdit(task)}
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(task._id)}
                      >
                        🗑️ Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
                
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Aucune tâche disponible.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksTable;
