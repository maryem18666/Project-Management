import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  console.log('form', form);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login",form);
      console.log(res,"test");
      localStorage.setItem("token", res.data.token);
      alert("Connexion réussie !");
      navigate("/Dash");
    } catch (error) {
  
      alert("Erreur lors de la connexion");
    }
  };
  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Image à gauche */}
      <div
        className="col-lg-6 col-md-6 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: "url('card3.c37960dc60ab32444a21dcb428471895.svg')", // Remplacez par l'URL de votre image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%',
        }}
      >
      </div>
  
      {/* Formulaire à droite */}
      <div className="col-lg-6 col-md-6 d-flex justify-content-center align-items-center bg-light">
        <div className="w-75">
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit} className="form-label">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mot de passe</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  
  
};

export default Login;
