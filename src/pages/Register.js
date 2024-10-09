import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [picture, setPicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Validation des champs
    if (!firstName || !lastName || !email || !age || !password || !confirmPassword) {
      alert("Tous les champs sont requis.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    if (age < 18) {
      alert("Vous devez avoir au moins 18 ans pour vous inscrire.");
      return;
    }

    if (password.length < 8) {
      alert("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    // Création d'un FormData pour l'envoi de données
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('age', age);
    formData.append('password', password);
    formData.append('password_confirmation', confirmPassword);
    if (picture) formData.append('picture', picture);

    try {
      // Envoi des données à l'API
      const response = await axios.post('http://127.0.0.1:8300/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Inscription réussie !');
        console.log(response);
        localStorage.setItem('token', response.data.access_token);
        navigate('/post');
      } else {
        setErrorMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    } catch (error) {
      console.error("Erreur d'inscription : ", error);
      if (error.response) {
        // Le serveur a répondu avec un code d'état
        setErrorMessage(error.response.data.message || 'Erreur lors de l\'inscription.');
      } else {
        // Autres erreurs
        setErrorMessage('Erreur de connexion au serveur.');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2048 * 1024) {
      setPicture(file);
    } else {
      alert('Le fichier image ne doit pas dépasser 2 Mo.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Inscription</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="input-group two-column">
          <input
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input-field"
          />
        </div>

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
            type="number"
            placeholder="Âge"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input-field"
            min="18"
          />
        </div>

        <div className="input-group two-column">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="input-field"
          />
          {picture && <p>Image sélectionnée : {picture.name}</p>}
        </div>

        <button className="register-button" onClick={handleRegister}>
          S'inscrire
        </button>

        <p className="login-link">
          Déjà inscrit ? <a href="/login">Se connecter</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
