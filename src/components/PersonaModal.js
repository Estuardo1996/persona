import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const PersonaModal = ({ show, onHide, persona, fetchPersonas }) => {
  const [formData, setFormData] = useState({
    nombre: persona ? persona.nombre : '',
    apellido: persona ? persona.apellido : '',
    email: persona ? persona.email : '',
    fechaNacimiento: persona ? persona.fechaNacimiento.split('T')[0] : '', // Convierte la fecha a YYYY-MM-DD para mostrarla
    direccion: persona ? persona.direccion : ''
  });

  const handleSubmit = async () => {
    try {
      const formattedFechaNacimiento = new Date(formData.fechaNacimiento).toISOString().split('T')[0]; // Convierte la fecha a formato YYYY-MM-DD

      const personaData = {
        ...formData,
        fechaNacimiento: formattedFechaNacimiento
      };

      if (persona) {
        // Actualizar persona
        await axios.put(`http://localhost:7387/api/Persona/${persona.id}`, { ...personaData, id: persona.id });
      } else {
        // Crear persona
        await axios.post('http://localhost:7387/api/Persona', personaData);
      }
      fetchPersonas();
      onHide();
    } catch (error) {
      console.error('Error saving persona', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{persona ? 'Editar Persona' : 'Agregar Persona'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={formData.nombre}
              onChange={e => setFormData({ ...formData, nombre: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              value={formData.apellido}
              onChange={e => setFormData({ ...formData, apellido: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha Nacimiento</Form.Label>
            <Form.Control
              type="date"
              value={formData.fechaNacimiento}
              onChange={e => setFormData({ ...formData, fechaNacimiento: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              value={formData.direccion}
              onChange={e => setFormData({ ...formData, direccion: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>{persona ? 'Actualizar' : 'Crear'}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PersonaModal;
