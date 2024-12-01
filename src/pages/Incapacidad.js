import React, { useState } from 'react';

// Componente para registrar las incapacidades
const Incapacidad = () => {
  const [tipo, setTipo] = useState('incapacidad');  // Incapacidad o permiso
  const [fecha, setFecha] = useState('');
  const [justificacion, setJustificacion] = useState('');
  
  // Maneja el registro
  const handleRegistro = () => {
    const nuevoRegistro = {
      tipo,
      fecha,
      justificacion,
    };

    // Recuperar los registros previos del localStorage
    let registros = JSON.parse(localStorage.getItem('registrosIncapacidad')) || [];
    registros.push(nuevoRegistro);

    // Guardar nuevamente los registros en localStorage
    localStorage.setItem('registrosIncapacidad', JSON.stringify(registros));

    // Limpiar los campos del formulario
    setTipo('incapacidad');
    setFecha('');
    setJustificacion('');
  };

  return (
    <div>
      <h3>Registrar Incapacidad/Permiso</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleRegistro(); }}>
        <div>
          <label>
            Tipo de Registro:
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="incapacidad">Incapacidad</option>
              <option value="permiso">Permiso</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Fecha:
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </label>
        </div>

        <div>
          <label>
            Justificación Médica:
            <textarea 
              value={justificacion} 
              onChange={(e) => setJustificacion(e.target.value)} 
              placeholder="Detalles sobre la incapacidad"
            />
          </label>
        </div>

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Incapacidad;
