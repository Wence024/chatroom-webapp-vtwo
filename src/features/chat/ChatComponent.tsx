import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { ref as firebaseRef, push, query, orderByChild, limitToLast, onValue } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, realtimeDb } from '../../firebase/firebaseConfig';
import PollModal from '../poll/PollModal';
import { Send, Vote } from 'lucide-react';
import '../../styles/ChatComponent.css';

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
  const [showPollModal, setShowPollModal] = useState(false);
  const endOfMessagesRef = useRef<HTMLAnchorElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const messagesRef = query(firebaseRef(realtimeDb, 'messages'), orderByChild('createdAt'), limitToLast(50));
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messages = data ? Object.entries(data).map(([id, msg]) => ({ id, ...msg as Message })) : [];
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await push(firebaseRef(realtimeDb, 'messages'), {
      text: newMessage,
      createdAt: Date.now(),
      uid: user?.uid,
    });

    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <h2 className="chat-header text-light">Chat</h2>
      <ListGroup 
        className="message-list bg-dark" 
        ref={messagesContainerRef}
      >
        {messages.map((msg, index) => (
          <ListGroup.Item 
            key={msg.id} 
            ref={index === messages.length - 1 ? endOfMessagesRef : null}
            className={`message-item ${msg.uid === user?.uid ? 'message-item-self' : 'message-item-other'}`}
          >
            {msg.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={sendMessage} className="form-container">
        <div className="d-flex">
          <Form.Control
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="form-control bg-dark text-light border-secondary"
          />
          <Button variant="primary" type="submit" className="send-button">
            <Send size={20} />
          </Button>
          <Button variant="secondary" onClick={() => setShowPollModal(true)}>
            <Vote size={20} />
          </Button>
        </div>
      </Form>
      <PollModal show={showPollModal} handleClose={() => setShowPollModal(false)} />
    </div>
  );
};

export default Chat;
