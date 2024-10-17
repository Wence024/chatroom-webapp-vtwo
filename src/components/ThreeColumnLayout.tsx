import React from 'react';
import Chat from '../features/chat/ChatComponent';
import Profile from '../features/chat/ProfileComponent';
import OnlineUsers from './OnlineUsers';
import { Card } from 'react-bootstrap';

const ThreeColumnLayout: React.FC = () => {
  return (
    <div className="container-fluid" style={{ minHeight: '100vh', paddingTop: '20px' }}>
      <div className="row">
        <div className="col-md-3">
          <Card className="h-100 bg-dark text-light">
            <Card.Body>
              <OnlineUsers />
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className="h-100 bg-dark text-light">
            <Card.Body>
              <Chat />
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="h-100 bg-dark text-light">
            <Card.Body>
              <Profile />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnLayout;