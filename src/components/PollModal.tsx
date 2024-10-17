import React, { useState, useEffect } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { realtimeDb } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Button, Modal } from 'react-bootstrap';
import NewPollModal from './NewPollModal'; // Import the NewPollModal

interface PollOption {
  text: string;
  votes: number;
}

interface PollData {
  topic: string;
  options: PollOption[];
  createdBy: string;
  userVotes: { [userId: string]: number };
}

interface PollModalProps {
  show: boolean;
  handleClose: () => void;
}

const PollModal: React.FC<PollModalProps> = ({ show, handleClose }) => {
  const [user] = useAuthState(auth);
  const [pollData, setPollData] = useState<PollData | null>(null);
  const [showNewPollModal, setShowNewPollModal] = useState(false);

  // Function to fetch poll data
  const fetchPollData = () => {
    const pollRef = ref(realtimeDb, 'poll');
    onValue(pollRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPollData(data);
      }
    });
  };

  useEffect(() => {
    fetchPollData(); // Fetch poll data on mount

    // Cleanup function to unsubscribe from the listener
    return () => {
      const pollRef = ref(realtimeDb, 'poll');
      onValue(pollRef, () => {}); // Unsubscribe
    };
  }, []);

  const vote = (optionIndex: number) => {
    if (user && pollData) {
      const userVotes = { ...pollData.userVotes };
      const previousVote = userVotes[user.uid];

      if (previousVote !== undefined) {
        pollData.options[previousVote].votes -= 1;
      }

      pollData.options[optionIndex].votes += 1;
      userVotes[user.uid] = optionIndex;

      const pollRef = ref(realtimeDb, 'poll');
      set(pollRef, { ...pollData, userVotes });
    }
  };

  const clearVote = () => {
    if (user && pollData) {
      const userVotes = { ...pollData.userVotes };
      const previousVote = userVotes[user.uid];

      if (previousVote !== undefined) {
        pollData.options[previousVote].votes -= 1;
        delete userVotes[user.uid];

        const pollRef = ref(realtimeDb, 'poll');
        set(pollRef, { ...pollData, userVotes });
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Poll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pollData ? (
            <div>
              <h3>{pollData.topic}</h3>
              <ul className="list-group">
                {pollData.options.map((option, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {option.text}
                    <span className="badge bg-primary rounded-pill">{option.votes}</span>
                    <Button variant="success" size="sm" onClick={() => vote(index)}>Vote</Button>
                  </li>
                ))}
              </ul>
              <Button variant="danger" className="mt-2" onClick={clearVote}>
                Clear Vote
              </Button>
            </div>
          ) : (
            <p>No poll data available.</p>
          )}
          <Button variant="secondary" className="mt-3" onClick={() => setShowNewPollModal(true)}>
            Create New Poll
          </Button>
        </Modal.Body>
      </Modal>

      <NewPollModal 
        show={showNewPollModal} 
        handleClose={() => setShowNewPollModal(false)} 
        onPollCreated={fetchPollData} // Call fetchPollData to refresh poll data
      />
    </>
  );
};

export default PollModal;
