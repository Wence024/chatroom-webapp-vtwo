import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Button } from 'react-bootstrap';
import { signOut } from 'firebase/auth';

const Profile: React.FC = () => {
  const [user] = useAuthState(auth);

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error("Sign out error:", error);
    });
  };

  return (
    <div className="profile-section">
      <h3>Profile</h3>
      {user && (
        <>
          <p>Email: {user.email}</p>
          <p>Display Name: {user.displayName || 'Not set'}</p>
          <Button variant="primary" className="mb-2">Update Profile</Button>
          <Button variant="danger" onClick={handleSignOut}>Sign Out</Button>
        </>
      )}
    </div>
  );
};

export default Profile;