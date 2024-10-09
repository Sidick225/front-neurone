import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assurez-vous d'importer axios
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validation des champs
    if (!email || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      // Envoi des informations d'identification à l'API
      const response = await axios.post('http://127.0.0.1:8300/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // Connexion réussie
        alert('Connexion réussie !');
        console.log(response);
        localStorage.setItem('token', response.data.access_token);
        navigate('/posts'); // Redirigez l'utilisateur vers la page des posts
      }
    } catch (error) {
      console.error("Erreur de connexion : ", error);
      setErrorMessage('Erreur lors de la connexion. Vérifiez vos informations d\'identification.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Se connecter
        </button>
        <p className="register-link">
          Pas encore inscrit ? <a href="/register">S'inscrire</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
