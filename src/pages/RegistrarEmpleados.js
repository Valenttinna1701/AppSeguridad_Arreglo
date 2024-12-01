import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/RegistrarEmpleados.css';

const RegistrarEmpleado = () => {
  const navigate = useNavigate();
  
  // Estado para manejar los datos del formulario
  const [empleado, setEmpleado] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: '',
    puesto: '',
  });

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleado({
      ...empleado,
      [name]: value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Aquí puedes agregar la lógica para enviar los datos al backend o almacenarlos

    console.log('Empleado registrado:', empleado);
    
    // Redirigir a la página de empleados o al dashboard
    navigate('/admin/dashboard');
  };

  return (
    <div className="registrar-empleado">
      <h2>Registrar Nuevo Empleado</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={empleado.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={empleado.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={empleado.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={empleado.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={empleado.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="puesto">Puesto</label>
          <input
            type="text"
            id="puesto"
            name="puesto"
            value={empleado.puesto}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Registrar Empleado</button>
      </form>
    </div>
  );
};

export default RegistrarEmpleado;
