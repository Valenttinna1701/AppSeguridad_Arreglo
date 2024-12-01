import React, { useState } from 'react';
import './style/Incapacidad.css';

const Incapacidad = () => {
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [tipo, setTipo] = useState('incapacidad');
  const [fecha, setFecha] = useState('');
  const [justificacion, setJustificacion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');

  const handleRegistro = (e) => {
    e.preventDefault();

    // Validaciones
    if (!nombreEmpleado.trim()) {
      mostrarMensaje('Por favor ingresa el nombre del empleado.', 'error');
      return;
    }

    if (!fecha) {
      mostrarMensaje('Por favor selecciona una fecha.', 'error');
      return;
    }

    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();

    if (fechaSeleccionada > hoy) {
      mostrarMensaje('No puedes registrar una incapacidad para una fecha futura.', 'error');
      return;
    }

    if (!justificacion.trim()) {
      mostrarMensaje('Por favor proporciona una justificación.', 'error');
      return;
    }

    const nuevoRegistro = {
      id: Date.now(),
      nombreEmpleado,
      tipo,
      fecha,
      justificacion,
    };

    try {
      const registros = JSON.parse(localStorage.getItem('registrosIncapacidad')) || [];
      localStorage.setItem('registrosIncapacidad', JSON.stringify([...registros, nuevoRegistro]));

      // Limpiar formulario
      mostrarMensaje('Registro guardado exitosamente', 'success');
      limpiarFormulario();
    } catch (error) {
      mostrarMensaje('Error al guardar el registro. Intenta nuevamente.', 'error');
      console.error(error);
    }
  };

  const mostrarMensaje = (texto, tipo = 'info') => {
    setMensaje(texto);
    setTipoMensaje(tipo);

    // Limpiar mensaje después de 5 segundos
    setTimeout(() => {
      setMensaje('');
      setTipoMensaje('');
    }, 5000);
  };

  const limpiarFormulario = () => {
    setNombreEmpleado('');
    setFecha('');
    setJustificacion('');
    setTipo('incapacidad');
  };

  return (
    <div className="incapacidad">
      <h2>Registrar Incapacidad o Permiso</h2>
      
      {mensaje && (
        <div className={`mensaje ${tipoMensaje}`}>
          {mensaje}
        </div>
      )}
      
      <form onSubmit={handleRegistro} className="formulario-incapacidad">
        <div className="form-grupo">
          <label htmlFor="nombreEmpleado">Nombre del Empleado:</label>
          <input 
            type="text"
            id="nombreEmpleado"
            value={nombreEmpleado}
            onChange={(e) => setNombreEmpleado(e.target.value)}
            placeholder="Ingresa el nombre completo"
            required
          />
        </div>

        <div className="form-grupo">
          <label htmlFor="tipo">Tipo:</label>
          <select 
            id="tipo"
            value={tipo} 
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="incapacidad">Incapacidad</option>
            <option value="permiso">Permiso</option>
          </select>
        </div>

        <div className="form-grupo">
          <label htmlFor="fecha">Fecha:</label>
          <input 
            type="date" 
            id="fecha"
            value={fecha} 
            onChange={(e) => setFecha(e.target.value)} 
            max={new Date().toISOString().split('T')[0]}
            required 
          />
        </div>

        <div className="form-grupo">
          <label htmlFor="justificacion">Justificación:</label>
          <textarea
            id="justificacion"
            value={justificacion}
            onChange={(e) => setJustificacion(e.target.value)}
            placeholder="Describe el motivo de la incapacidad o permiso"
            required
            rows="4"
          />
        </div>

        <button type="submit" className="btn-registrar">
          Registrar Incapacidad
        </button>
      </form>
    </div>
  );
};

export default Incapacidad;