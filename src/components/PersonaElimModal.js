import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const PersonaElimModal = ({ show, onHide, persona, fetchPersonas }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:7387/api/Persona/${persona.id}`);
      fetchPersonas();
      onHide();
    } catch (error) {
      console.error('Error deleting persona', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Persona</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro que deseas eliminar a {persona.nombre} {persona.apellido}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PersonaElimModal;
