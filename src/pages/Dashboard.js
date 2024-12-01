import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Table, Alert } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import './style/Dashboard.css';

const Dashboard = () => {
  // Estados para manejo de registros
  const [horaLlegada, setHoraLlegada] = useState(null);
  const [tipo, setTipo] = useState('incapacidad');
  const [fecha, setFecha] = useState('');
  const [justificacion, setJustificacion] = useState('');
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [registrosIncapacidad, setRegistrosIncapacidad] = useState([]);

  // Estados para validación y feedback
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [esAdmin, setEsAdmin] = useState(false);

  // Función mejorada para generar Excel
  const generarExcel = () => {
    if (registrosIncapacidad.length === 0) {
      setError('No hay registros para exportar');
      return;
    }

    try {
      const data = registrosIncapacidad.map(registro => ({
        Empleado: registro.nombreEmpleado,
        Tipo: registro.tipo.charAt(0).toUpperCase() + registro.tipo.slice(1),
        Fecha: new Date(registro.fecha).toLocaleDateString(),
        Justificación: registro.justificacion
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      
      // Ajustar el ancho de las columnas
      ws['!cols'] = [
        { wch: 20 },  // Empleado
        { wch: 10 },  // Tipo
        { wch: 15 },  // Fecha
        { wch: 50 }   // Justificación
      ];

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Registros de Incapacidades');
      XLSX.writeFile(wb, `registros_incapacidades_${new Date().toISOString().split('T')[0]}.xlsx`);
      
      setSuccess('Archivo Excel generado exitosamente');
    } catch (err) {
      setError('Error al generar el archivo Excel');
      console.error(err);
    }
  };

  // Función mejorada para registrar hora
  const registrarHora = () => {
    const horaActual = new Date();
    const formatoHora = horaActual.toLocaleTimeString('es-MX', {
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true
    });
    setHoraLlegada(formatoHora);
  };

  // Validación de registro de incapacidad
  const handleRegistroIncapacidad = (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!nombreEmpleado.trim()) {
      setError('El nombre del empleado es obligatorio');
      return;
    }

    if (!fecha) {
      setError('Debe seleccionar una fecha');
      return;
    }

    if (!justificacion.trim()) {
      setError('La justificación es obligatoria');
      return;
    }

    const nuevoRegistro = {
      id: Date.now(), // Añadir un ID único
      nombreEmpleado: nombreEmpleado.trim(),
      tipo,
      fecha,
      justificacion: justificacion.trim(),
      fechaRegistro: new Date().toISOString()
    };

    try {
      // Recuperar y actualizar registros
      const registros = JSON.parse(localStorage.getItem('registrosIncapacidad')) || [];
      const registrosActualizados = [...registros, nuevoRegistro];

      localStorage.setItem('registrosIncapacidad', JSON.stringify(registrosActualizados));
      setRegistrosIncapacidad(registrosActualizados);

      // Limpiar formulario y mostrar éxito
      setNombreEmpleado('');
      setTipo('incapacidad');
      setFecha('');
      setJustificacion('');
      setSuccess('Registro guardado exitosamente');
      setError('');
    } catch (err) {
      setError('Error al guardar el registro');
      console.error(err);
    }
  };

  // Cargar registros y verificar rol de admin
  useEffect(() => {
    try {
      const registros = JSON.parse(localStorage.getItem('registrosIncapacidad')) || [];
      setRegistrosIncapacidad(registros);

      const userRole = localStorage.getItem('userRole');
      setEsAdmin(userRole === 'admin');
    } catch (err) {
      console.error('Error al cargar registros', err);
      setError('No se pudieron cargar los registros');
    }
  }, []);

  // Función para eliminar un registro (solo para admin)
  const eliminarRegistro = (id) => {
    if (!esAdmin) {
      setError('No tienes permisos para eliminar registros');
      return;
    }

    const confirmacion = window.confirm('¿Estás seguro de eliminar este registro?');
    if (confirmacion) {
      try {
        const registrosActualizados = registrosIncapacidad.filter(registro => registro.id !== id);
        
        localStorage.setItem('registrosIncapacidad', JSON.stringify(registrosActualizados));
        setRegistrosIncapacidad(registrosActualizados);
        setSuccess('Registro eliminado exitosamente');
      } catch (err) {
        setError('Error al eliminar el registro');
        console.error(err);
      }
    }
  };

  return (
    <div className="dashboard">
      {/* Mostrar alertas de error y éxito */}
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

      <Row>
        <Col md={12} className="text-center">
          <Card>
            <Card.Body>
              <Card.Title>Sistema de Control de Acceso</Card.Title>
              <Button onClick={registrarHora} variant="primary">
                Registrar Hora de Llegada
              </Button>

              {horaLlegada && (
                <div className="hora-llegada">
                  Hora de llegada registrada: {horaLlegada}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12} className="text-center">
          <Card>
            <Card.Body>
              <Card.Title>Registrar Incapacidad/Permiso</Card.Title>
              <form onSubmit={handleRegistroIncapacidad}>
                <div>
                  <label>Nombre del Empleado:</label>
                  <input
                    type="text"
                    value={nombreEmpleado}
                    onChange={(e) => setNombreEmpleado(e.target.value)}
                    placeholder="Nombre completo"
                    required
                  />
                </div>

                <div>
                  <label>Tipo de Registro:</label>
                  <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="incapacidad">Incapacidad</option>
                    <option value="permiso">Permiso</option>
                  </select>
                </div>

                <div>
                  <label>Fecha:</label>
                  <input 
                    type="date" 
                    value={fecha} 
                    onChange={(e) => setFecha(e.target.value)} 
                    max={new Date().toISOString().split('T')[0]}
                    required 
                  />
                </div>

                <div>
                  <label>Justificación:</label>
                  <textarea 
                    value={justificacion} 
                    onChange={(e) => setJustificacion(e.target.value)} 
                    placeholder="Detalles de la incapacidad o permiso"
                    required
                  />
                </div>

                <Button type="submit" variant="success">Registrar</Button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabla de registros para administrador */}
      {esAdmin && (
        <Row>
          <Col md={12} className="text-center">
            <Card>
              <Card.Body>
                <Card.Title>Registros de Incapacidades y Permisos</Card.Title>
                {registrosIncapacidad.length === 0 ? (
                  <p>No hay registros disponibles</p>
                ) : (
                  <>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>Empleado</th>
                          <th>Tipo</th>
                          <th>Fecha</th>
                          <th>Justificación</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {registrosIncapacidad.map((registro) => (
                          <tr key={registro.id}>
                            <td>{registro.nombreEmpleado}</td>
                            <td>{registro.tipo}</td>
                            <td>{new Date(registro.fecha).toLocaleDateString()}</td>
                            <td>{registro.justificacion}</td>
                            <td>
                              <Button 
                                variant="danger" 
                                size="sm" 
                                onClick={() => eliminarRegistro(registro.id)}
                              >
                                Eliminar
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Button onClick={generarExcel} variant="success">
                      Exportar a Excel
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Dashboard;