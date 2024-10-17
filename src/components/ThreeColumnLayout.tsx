import React from 'react';
import Chat from '../features/chat/ChatComponent';
import Profile from '../features/chat/ProfileComponent';
import OnlineUsers from './OnlineUsers';
import { Card } from 'react-bootstrap';

const ThreeColumnLayout: React.FC = () => {
  return (
    <div className="container-fluid bg-light" style={{ backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <div className="row p-3">
        <div className="col-md-3">
          <Card className="h-100">
            <Card.Body>
              <OnlineUsers />
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className="h-100">
            <Card.Body>
              <Chat />
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="h-100">
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