import React from 'react';
import Chat from '../features/chat/ChatComponent';
import Profile from '../features/chat/ProfileComponent';
import OnlineUsers from './OnlineUsers';
import { Card, Container, Row, Col } from 'react-bootstrap';

const ThreeColumnLayout: React.FC = () => {
  return (
    <Container fluid className='pt-4 h-100'>
      <Row>
        <Col xl={3} className="d-none d-xl-block mb-3">
          <Card className="h-100 bg-dark text-light">
            <Card.Body>
              <OnlineUsers />
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={8} xl={6} className="mb-3">
          <Card className="h-100 bg-dark text-light">
            <Card.Body>
              <Chat />
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={4} lg={4} xl={3}>
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
