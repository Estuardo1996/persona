import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import PersonaModal from './PersonaModal';
import PersonaElimModal from './PersonaElimModal';

const PersonaList = () => {
  const [personas, setPersonas] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    try {
      const response = await axios.get('http://localhost:7387/api/Persona');
      setPersonas(response.data);
    } catch (error) {
      console.error('Error fetching personas', error);
    }
  };

  const handleEdit = (persona) => {
    setSelectedPersona(persona);
    setShowModal(true);
  };

  const handleDelete = (persona) => {
    setSelectedPersona(persona);
    setShowDeleteModal(true);
  };

  const handleCreate = () => {
    setSelectedPersona(null);
    setShowModal(true);
  };

  return (
    <div>
      <h1>Catálogo de Personas</h1>
      <Button onClick={handleCreate} className="mb-3">Agregar Persona</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Fecha Nacimiento</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map(persona => (
            <tr key={persona.id}>
              <td>{persona.nombre}</td>
              <td>{persona.apellido}</td>
              <td>{persona.email}</td>
              <td>{new Date(persona.fechaNacimiento).toLocaleDateString()}</td> {/* Mostrar fecha correctamente */}
              <td>{persona.direccion}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(persona)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(persona)} className="ml-2">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showModal && (
        <PersonaModal
          show={showModal}
          onHide={() => setShowModal(false)}
          persona={selectedPersona}
          fetchPersonas={fetchPersonas}
        />
      )}

      {showDeleteModal && (
        <PersonaElimModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          persona={selectedPersona}
          fetchPersonas={fetchPersonas}
        />
      )}
    </div>
  );
};

export default PersonaList;
