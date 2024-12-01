import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaClock, FaUserPlus, FaCalendarCheck, FaChartLine } from 'react-icons/fa';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HoraLlegada from './pages/HoraLlegadas';
import Incapacidad from './pages/Incapacidad';
import RegistrosIncapacidad from './pages/RegistrosIncapacidad';
import RegistrarEmpleados from './pages/RegistrarEmpleados';
import './App.css';

function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Bienvenido a la Empresa de Gestión de Horarios</h1>
        <p>Gestiona tus horarios de trabajo de manera eficiente y fácil.</p>
        <Link to="/login">
          <button className="login-button">Iniciar Sesión</button>
        </Link>
      </header>

      <div className="features-container">
        <div className="feature-card">
          <FaClock className="feature-icon" />
          <h3>Control de Horarios</h3>
          <p>Sistema automatizado para registro de entradas y salidas del personal.</p>
        </div>
        <div className="feature-card">
          <FaUserPlus className="feature-icon" />
          <h3>Gestión de Personal</h3>
          <p>Administración eficiente de la información de empleados.</p>
        </div>
        <div className="feature-card">
          <FaCalendarCheck className="feature-icon" />
          <h3>Control de Incapacidades</h3>
          <p>Seguimiento detallado de incapacidades y ausencias.</p>
        </div>
        <div className="feature-card">
          <FaChartLine className="feature-icon" />
          <h3>Reportes y Análisis</h3>
          <p>Generación de informes y estadísticas en tiempo real.</p>
        </div>
      </div>

      <section className="home-info">
        <p>
          Somos una empresa líder en soluciones de gestión de recursos humanos.
          Nuestra plataforma te permite mantener un control eficiente de los horarios,
          incapacidades y registros de personal de manera sencilla y efectiva.
          Optimiza tus procesos y mejora la productividad de tu equipo.
        </p>
      </section>

      <footer className="home-footer">
        <p>© {new Date().getFullYear()} Empresa de Gestión de Horarios. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/dashboard" element={<Dashboard />}>
          <Route path="hora-llegada" element={<HoraLlegada />} />
          <Route path="incapacidad" element={<Incapacidad />} />
          <Route path="registros-incapacidad" element={<RegistrosIncapacidad />} />
          <Route path="registrar-empleado" element={<RegistrarEmpleados />} />
        </Route>

        <Route path="/empleado/dashboard" element={<Dashboard />}>
          <Route path="hora-llegada" element={<HoraLlegada />} />
          <Route path="incapacidad" element={<Incapacidad />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;