// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Login.css'; // Asegúrate de que la ruta sea correcta

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Función para manejar el login
  const handleLogin = (e) => {
    e.preventDefault();

    // Aquí iría la lógica para verificar las credenciales
    if (email === 'admin@admin.com' && password === '123456') {
      localStorage.setItem('userRole', 'admin');
      navigate('/admin/dashboard');
    } else if (email === 'empleado@empleado.com' && password === '123456') {
      localStorage.setItem('userRole', 'empleado');
      navigate('/empleado/dashboard');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Iniciar Sesión</button>

        <div className="forgot-password">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
