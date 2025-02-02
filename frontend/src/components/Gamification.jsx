import React, { useState } from "react";

const Gamification = () => {
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);

  const badgeMilestones = [
    { points: 50, name: "Débutant" },
    { points: 100, name: "Intermédiaire" },
    { points: 200, name: "Expert" },
    { points: 500, name: "Maître" },
  ];

  const completeTask = () => {
    const newPoints = points + 10;
    setPoints(newPoints);

    // Ajouter des badges uniquement si le seuil est atteint
    badgeMilestones.forEach((milestone) => {
      if (newPoints >= milestone.points && !badges.includes(milestone.name)) {
        setBadges([...badges, milestone.name]);
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Gamification</h2>

      <div className="card shadow p-4 mb-4">
        <h3 className="text-center">Votre score : <strong>{points}</strong> points</h3>
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={completeTask}>
            Compléter une tâche (+10 points)
          </button>
        </div>
      </div>

      <div className="card shadow p-4">
        <h4 className="mb-3">Badges obtenus :</h4>
        {badges.length > 0 ? (
          <ul className="list-group">
            {badges.map((badge, index) => (
              <li key={index} className="list-group-item">
                🏆 {badge}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Aucun badge obtenu pour l'instant. Commencez à compléter des tâches !</p>
        )}
      </div>
    </div>
  );
};

export default Gamification;
