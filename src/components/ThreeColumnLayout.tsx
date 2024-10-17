import React from 'react';
import Chat from '../features/chat/ChatComponent';
import Profile from '../features/chat/ProfileComponent';
import OnlineUsers from './OnlineUsers';
import { Card, Container, Row, Col } from 'react-bootstrap';

const ThreeColumnLayout: React.FC = () => {
  return (
    <Container fluid className='pt-4 h-100'>
      <Row>
        <Col md={3}>
          <Card className="h-100 bg-dark text-light">
            <Card.Body>
              <OnlineUsers />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 bg-dark text-light">
            <Card.Body>
              <Chat />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100 bg-dark text-light">
            <Card.Body>
              <Profile />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ThreeColumnLayout;
