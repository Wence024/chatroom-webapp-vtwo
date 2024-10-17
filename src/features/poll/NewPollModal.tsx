import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { ref, set } from 'firebase/database';
import { realtimeDb } from '../../firebase/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseConfig';

interface NewPollModalProps {
  show: boolean;
  handleClose: () => void;
  onPollCreated: () => void;
}

const NewPollModal: React.FC<NewPollModalProps> = ({ show, handleClose, onPollCreated }) => {
  const [topic, setTopic] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState('');

  const [user] = useAuthState(auth);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || options.some(option => !option)) {
      setError('Please fill in all fields.');
      return;
    }

    const pollData = {
      topic,
      options: options.map(option => ({ text: option, votes: 0 })),
      createdBy: user?.uid,
      userVotes: {},
    };

    const pollRef = ref(realtimeDb, 'poll');
    await set(pollRef, pollData);
    onPollCreated();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="text-light">
      <Modal.Header closeButton className="bg-dark border-secondary">
        <Modal.Title className="text-light">Create New Poll</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Poll Topic</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter poll topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-dark text-light border-secondary"
            />
          </Form.Group>
          {options.map((option, index) => (
            <Form.Group key={index} className="mb-3">
              <Form.Label>Option {index + 1}</Form.Label>
              <Form.Control
                type="text"
                placeholder={`Enter option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="bg-dark text-light border-secondary"
              />
            </Form.Group>
          ))}
          <Button variant="secondary" onClick={addOption} className="me-2">
            Add Option
          </Button>
          <Button variant="primary" type="submit">
            Create Poll
          </Button>
        </Form>
        {error && <p className="text-danger">{error}</p>}
      </Modal.Body>
    </Modal>
  );
};

export default NewPollModal;
