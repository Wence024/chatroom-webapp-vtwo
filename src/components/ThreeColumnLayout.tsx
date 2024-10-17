import React from 'react';
import Chat from './Chat';
import Profile from './Profile';
import { Card } from 'react-bootstrap';

const ThreeColumnLayout: React.FC = () => {
  return (
    <div className="container-fluid bg-light" style={{ backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <div className="row p-3">
        <div className="col-md-3">
          <Card className="h-100">
            <Card.Body>
              <h2 className="mb-4">Chat Rooms</h2>
              {/* Add chat room list here */}
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