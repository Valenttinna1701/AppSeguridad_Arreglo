import React, { useState } from 'react';
import './style/HoraLlegada.css';


const HoraLlegada = () => {
  const [horaLlegada, setHoraLlegada] = useState(null);

  const registrarHora = () => {
    const horaActual = new Date().toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setHoraLlegada(horaActual);
  };

  return (
    <div className="hora-llegada">
      <h2>Registrar Hora de Llegada</h2>
      <button onClick={registrarHora}>Registrar Hora</button>
      {horaLlegada && <p>Hora registrada: {horaLlegada}</p>}
    </div>
  );
};

export default HoraLlegada;
