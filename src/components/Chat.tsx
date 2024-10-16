import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import { ref, push, query, orderByChild, limitToLast, onValue } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, realtimeDb } from '../firebase';

interface Message {
  id: string;
  text: string;
  uid: string;
  displayName: string;
  createdAt: number;
}

interface ChatProps {
  roomId: string;
}

const Chat: React.FC<ChatProps> = ({ roomId }) => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesRef = query(ref(realtimeDb, `messages/${roomId}`), orderByChild('createdAt'), limitToLast(50));
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messages = data ? Object.entries(data).map(([id, msg]) => ({ id, ...msg as Message })) : [];
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [roomId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    await push(ref(realtimeDb, `messages/${roomId}`), {
      text: newMessage,
      createdAt: Date.now(),
      uid: user.uid,
      displayName: user.displayName || 'Anonymous',
    });

    setNewMessage('');
  };

  return (
    <Container className="mt-3">
      <ListGroup className="mb-3 chat-messages" style={{ height: '400px', overflowY: 'auto' }}>
        {messages.map((msg) => (
          <ListGroup.Item 
            key={msg.id} 
            className={`message-bubble ${msg.uid === user?.uid ? 'sent' : 'received'}`}
          >
            <strong>{msg.displayName}: </strong>{msg.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={sendMessage}>
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
    </Container>
  );
};

export default Chat;