import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Auth = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      history.push('/dashboard');
    } else {
      alert('Erreur lors de l\'authentification');
    }
  };

  return (
    <div className="container">
      <h1>{isLogin ? 'Se connecter' : 'Créer un compte'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{isLogin ? 'Se connecter' : 'S\'inscrire'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Pas de compte ? Créez-en un' : 'Déjà un compte ? Connectez-vous'}
      </button>
    </div>
  );
};

export default Auth;
