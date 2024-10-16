import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Chat from './components/Chat';
import Header from './components/Header';
import Profile from './components/Profile';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  const [user] = useAuthState(auth);
  const [currentRoom, setCurrentRoom] = useState('general');
  const rooms = ['general', 'random', 'tech'];

  return (
    <ThemeProvider>
      <Router>
        <Container fluid className="p-0">
          <Header />
          {user ? (
            <Row>
              <Col md={3}>
                <ListGroup>
                  {rooms.map((room) => (
                    <ListGroup.Item
                      key={room}
                      active={currentRoom === room}
                      onClick={() => setCurrentRoom(room)}
                      style={{ cursor: 'pointer' }}
                    >
                      {room}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col md={6}>
                <Chat roomId={currentRoom} />
              </Col>
              <Col md={3}>
                <Profile />
              </Col>
            </Row>
          ) : (
            <Login />
          )}
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;