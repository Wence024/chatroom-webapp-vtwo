import React, { useState, useEffect } from 'react';
import { ref, set, onValue } from 'firebase/database';
import { realtimeDb } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Button, Container, Form } from 'react-bootstrap';
import "../styles/Auth.css"

interface PollOption {
  text: string;
  votes: number;
}

interface PollData {
  topic: string;
  options: PollOption[];
  createdBy: string;
}

const Poll: React.FC = () => {
  const [user] = useAuthState(auth);
  const [pollData, setPollData] = useState<PollData | null>(null);
  const [topic, setTopic] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);

  useEffect(() => {
    const pollRef = ref(realtimeDb, 'poll');
    const unsubscribe = onValue(pollRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPollData(data);
      }
    });

    return () => unsubscribe();
  }, []);

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
      });
      setTopic('');
      setOptions(['', '']);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center auth--container">
        <div className="w-100 auth--div">
        <h2 className="mb-4">Create Poll</h2>
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

        {pollData && (
          <div className="mt-4">
            <h3>{pollData.topic}</h3>
            <ul className="list-group">
              {pollData.options.map((option, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {option.text}
                  <span className="badge bg-primary rounded-pill">{option.votes}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Poll;