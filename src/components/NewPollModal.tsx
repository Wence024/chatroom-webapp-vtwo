import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { realtimeDb } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Button, Form, Modal } from 'react-bootstrap';

interface NewPollModalProps {
  show: boolean;
  handleClose: () => void;
  onPollCreated: () => void; // Callback to notify when a poll is created
}

const NewPollModal: React.FC<NewPollModalProps> = ({ show, handleClose, onPollCreated }) => {
  const [user] = useAuthState(auth);
  const [topic, setTopic] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const createPoll = () => {
    if (user && topic && options.filter(opt => opt.trim() !== '').length >= 2) {
      const pollRef = ref(realtimeDb, 'poll');
      set(pollRef, {
        topic,
        options: options.filter(opt => opt.trim() !== '').map(opt => ({ text: opt, votes: 0 })),
        createdBy: user.uid,
        userVotes: {},
      });
      setTopic('');
      setOptions(['', '']);
      onPollCreated(); // Notify that a poll has been created
      handleClose(); // Close the modal
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Poll</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Poll Topic</Form.Label>
            <Form.Control
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter poll topic"
            />
          </Form.Group>
          {options.map((option, index) => (
            <Form.Group key={index} className="mb-3">
              <Form.Label>Option {index + 1}</Form.Label>
              <Form.Control
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Enter option ${index + 1}`}
              />
            </Form.Group>
          ))}
          <Button variant="secondary" onClick={addOption} className="me-2">
            Add Option
          </Button>
          <Button variant="primary" onClick={createPoll}>
            Create Poll
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewPollModal;
