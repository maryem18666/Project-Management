import React, { useState } from "react";

const DocumentUpload = ({ projectId }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("Veuillez sélectionner un fichier avant de continuer.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`http://localhost:3000/projects/${projectId}/upload`, {
        method: "POST",
        body: formData,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      if (response.ok) {
        setUploadMessage("Fichier téléchargé avec succès !");
        setUploadProgress(0);
        setFile(null); // Réinitialise le champ de fichier
      } else {
        setUploadMessage("Erreur lors du téléchargement du fichier.");
      }
    } catch (error) {
      console.error("Erreur lors du téléchargement :", error);
      setUploadMessage("Une erreur est survenue lors du téléchargement.");
    }
  };

  return (
    <div className="p-4 border rounded shadow-lg">
      <h4 className="mb-3 font-semibold">Ajouter un fichier pour le projet</h4>
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="mb-3 block w-full text-gray-700 bg-gray-200 border rounded p-2" 
      />
      <button 
        onClick={handleUpload} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Télécharger le fichier
      </button>
      {uploadProgress > 0 && (
        <div className="mt-3">
          <progress value={uploadProgress} max="100" className="w-full h-2 bg-green-200" />
          <p className="text-center text-sm text-gray-600 mt-1">
            {uploadProgress}% téléchargé
          </p>
        </div>
      )}
      {uploadMessage && (
        <p className={`mt-3 text-center ${uploadMessage.includes("succès") ? "text-green-500" : "text-red-500"}`}>
          {uploadMessage}
        </p>
      )}
    </div>
  );
};

export default DocumentUpload;
