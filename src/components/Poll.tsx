import React, { useState, useEffect } from 'react';
import { ref, push, update, remove, onValue } from 'firebase/database';
import { realtimeDb } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

interface PollItem {
  id: string;
  text: string;
  votes: number;
}

interface PollData {
  id: string;
  topic: string;
  items: PollItem[];
  createdBy: string;
}

const Poll: React.FC = () => {
  const [user] = useAuthState(auth);
  const [polls, setPolls] = useState<PollData[]>([]);
  const [newPollTopic, setNewPollTopic] = useState('');
  const [newPollItem, setNewPollItem] = useState('');
  const [selectedPoll, setSelectedPoll] = useState<PollData | null>(null);

  useEffect(() => {
    const pollsRef = ref(realtimeDb, 'polls');
    const unsubscribe = onValue(pollsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const pollList = Object.entries(data).map(([key, value]: [string, any]) => ({
          id: key,
          ...value,
        }));
        setPolls(pollList);
      }
    });

    return () => unsubscribe();
  }, []);

  const createPoll = () => {
    if (newPollTopic && user) {
      const pollsRef = ref(realtimeDb, 'polls');
      push(pollsRef, {
        topic: newPollTopic,
        items: [],
        createdBy: user.uid,
      });
      setNewPollTopic('');
    }
  };

  const addPollItem = () => {
    if (selectedPoll && newPollItem) {
      const pollRef = ref(realtimeDb, `polls/${selectedPoll.id}/items`);
      push(pollRef, {
        text: newPollItem,
        votes: 0,
      });
      setNewPollItem('');
    }
  };

  const vote = (pollId: string, itemId: string) => {
    if (user) {
      const itemRef = ref(realtimeDb, `polls/${pollId}/items/${itemId}`);
      update(itemRef, {
        votes: (selectedPoll?.items.find(item => item.id === itemId)?.votes || 0) + 1,
      });
    }
  };

  const deletePoll = (pollId: string) => {
    if (user && (user.uid === selectedPoll?.createdBy || user.email === 'admin@example.com')) {
      const pollRef = ref(realtimeDb, `polls/${pollId}`);
      remove(pollRef);
      setSelectedPoll(null);
    }
  };

  const deletePollItem = (itemId: string) => {
    if (selectedPoll && user && (user.uid === selectedPoll.createdBy || user.email === 'admin@example.com')) {
      const itemRef = ref(realtimeDb, `polls/${selectedPoll.id}/items/${itemId}`);
      remove(itemRef);
    }
  };

  return (
    <div className="poll-container">
      <h2>Polls</h2>
      <div>
        <input
          type="text"
          value={newPollTopic}
          onChange={(e) => setNewPollTopic(e.target.value)}
          placeholder="New poll topic"
        />
        <button onClick={createPoll}>Create Poll</button>
      </div>
      <ul>
        {polls.map((poll) => (
          <li key={poll.id} onClick={() => setSelectedPoll(poll)}>
            {poll.topic}
          </li>
        ))}
      </ul>
      {selectedPoll && (
        <div>
          <h3>{selectedPoll.topic}</h3>
          <ul>
            {selectedPoll.items.map((item) => (
              <li key={item.id}>
                {item.text} - Votes: {item.votes}
                <button onClick={() => vote(selectedPoll.id, item.id)}>Vote</button>
                {(user?.uid === selectedPoll.createdBy || user?.email === 'admin@example.com') && (
                  <button onClick={() => deletePollItem(item.id)}>Delete</button>
                )}
              </li>
            ))}
          </ul>
          <div>
            <input
              type="text"
              value={newPollItem}
              onChange={(e) => setNewPollItem(e.target.value)}
              placeholder="New poll item"
            />
            <button onClick={addPollItem}>Add Item</button>
          </div>
          {(user?.uid === selectedPoll.createdBy || user?.email === 'admin@example.com') && (
            <button onClick={() => deletePoll(selectedPoll.id)}>Delete Poll</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Poll;