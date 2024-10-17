import React from 'react';
import Chat from './Chat';
import Profile from './Profile';

const ThreeColumnLayout: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-3">
          {/* Left column content */}
          <h2>Chat Rooms</h2>
          {/* Add chat room list here */}
        </div>
        <div className="col-md-6 p-3">
          <Chat />
        </div>
        <div className="col-md-3 p-3">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnLayout;