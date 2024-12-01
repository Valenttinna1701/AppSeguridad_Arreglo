import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './style/RegistroIncapacidad.css'

const RegistrosIncapacidad = () => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('registrosIncapacidad')) || [];
    setRegistros(data);
  }, []);

  const generarExcel = () => {
    if (registros.length === 0) {
      alert('No hay registros para exportar');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(registros);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Registros');
    XLSX.writeFile(wb, `registros_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="registros-incapacidad">
      <h2>Registros de Incapacidades y Permisos</h2>
      {registros.length === 0 ? (
        <p>No hay registros disponibles</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Tipo</th>
              <th>Fecha</th>
              <th>Justificación</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr key={registro.id}>
                <td>{registro.nombreEmpleado}</td>
                <td>{registro.tipo}</td>
                <td>{new Date(registro.fecha).toLocaleDateString()}</td>
                <td>{registro.justificacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={generarExcel}>Exportar a Excel</button>
    </div>
  );
};

export default RegistrosIncapacidad;
