import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { ref, onValue } from 'firebase/database';
import { realtimeDb } from '../firebase';

interface OnlineUser {
  id: string;
  displayName: string;
}

const OnlineUsers: React.FC = () => {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  useEffect(() => {
    const usersRef = ref(realtimeDb, 'onlineUsers');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const users = data ? Object.entries(data).map(([id, user]) => ({ id, ...user as OnlineUser })) : [];
      setOnlineUsers(users);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2 className="mb-3">Online Users</h2>
      <ListGroup>
        {onlineUsers.map((user) => (
          <ListGroup.Item key={user.id}>
            {user.displayName}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default OnlineUsers;