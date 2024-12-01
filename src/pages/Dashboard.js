import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './style/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

 // Función para cerrar sesión y redirigir al home
 const handleLogout = () => {
  localStorage.removeItem('userRole');  // Elimina el role del usuario del almacenamiento
  navigate('/');  // Redirige al home page (ruta principal)
};

  // Verifica si el usuario está autenticado antes de mostrar el Dashboard
  const userRole = localStorage.getItem('userRole');
  if (!userRole) {
    navigate('/login');  // Si no está autenticado, redirige al login
    return null;
  }

  return (
    <div className="dashboard">
      <nav className="nav">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <Link to="hora-llegada">Hora de Llegada</Link>
          </li>
          <li>
            <Link to="incapacidad">Registrar Incapacidad</Link>
          </li>
          {/* Mostrar "Registros de Incapacidades" solo si el usuario es admin */}
          {userRole === 'admin' && (
            <li>
              <Link to="registros-incapacidad">Registros de Incapacidades</Link>
            </li>
          )}
        </ul>
        {/* Botón de Cerrar Sesión */}
        <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
      </nav>

      <div className="content">
        <h2>Bienvenido al Dashboard</h2>

        <div className="card-container">
          <div className="card">
            <h3>Hora de Llegada</h3>
            <p>Registra la hora de llegada de los empleados.</p>
            <Link to="hora-llegada">Ver más</Link>
          </div>

          <div className="card">
            <h3>Registrar Incapacidad</h3>
            <p>Ingresa la información de incapacidades de los empleados.</p>
            <Link to="incapacidad">Ver más</Link>
          </div>

          {/* Mostrar la tarjeta de "Registros de Incapacidades" solo si el usuario es admin */}
          {userRole === 'admin' && (
            <div className="card">
              <h3>Registros de Incapacidades</h3>
              <p>Consulta los registros de incapacidades anteriores.</p>
              <Link to="registros-incapacidad">Ver más</Link>
            </div>
            
                    )}
          {/* Mostrar la tarjeta de "Registros de Incapacidades" solo si el usuario es admin */}
          {userRole === 'admin' && (
            <div className="card">
              <h3>Empleados</h3>
              <p>Registra nuevos empleados aquí</p>
              <Link to="registrar-empleado">Ver más</Link> {/* Aquí va la ruta para la página de registro */}
            </div>
          )}

 
          
        </div>

        {/* Este es el lugar donde se renderizan las rutas hijas */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
