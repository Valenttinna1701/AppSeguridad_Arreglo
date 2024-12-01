import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';  // Ruta correcta al componente Login
import Dashboard from './pages/Dashboard'; // Componente Dashboard
import './App.css'; // Asegúrate de que la ruta sea correcta


function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal que será la Home Page */}
        <Route path="/" element={
          <div className="home-page">
            <header className="home-header">
              <h1>Bienvenido a la Empresa de Gestión de Horarios</h1>
              <p>Gestiona tus horarios de trabajo de manera eficiente y fácil.</p>
              <Link to="/login">
                <button className="login-button">Iniciar Sesión</button>
              </Link>
            </header>
            <section className="home-info">
              <p>Somos una empresa que te ayuda a gestionar tus horarios laborales de forma eficiente. Controla el acceso, registra tus horas de entrada y mantén todo organizado.</p>
            </section>
          </div>
        } />

        {/* Rutas para Login y Dashboard */}
        <Route path="/login" element={<Login />} />
        <Route path="/empleado/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
