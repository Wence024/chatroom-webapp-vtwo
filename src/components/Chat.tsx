import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { ref, push, query, orderByChild, limitToLast, onValue } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, realtimeDb } from '../firebase';

interface Message {
  id: string;
  text: string;
  uid: string;
  createdAt: number;
}

const Chat: React.FC = () => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesRef = query(ref(realtimeDb, 'messages'), orderByChild('createdAt'), limitToLast(50));
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messages = data ? Object.entries(data).map(([id, msg]) => ({ id, ...msg as Message })) : [];
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await push(ref(realtimeDb, 'messages'), {
      text: newMessage,
      createdAt: Date.now(),
      uid: user?.uid,
    });

    setNewMessage('');
  };

  return (
    <div className="d-flex flex-column h-100">
      <h2 className="mb-3">Chat</h2>
      <ListGroup className="mb-3 flex-grow-1 overflow-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
        {messages.map((msg) => (
          <ListGroup.Item key={msg.id} className={msg.uid === user?.uid ? 'text-end' : ''}>
            {msg.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={sendMessage} className="mt-auto">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </div>
  );
};

export default Chat;