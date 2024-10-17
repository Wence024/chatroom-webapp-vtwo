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
      <h2 className="mb-4">Profile</h2>
      {user && (
        <>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Display Name:</strong> {user.displayName || 'Not set'}</p>
          <Button variant="primary" className="mb-2 w-100">Update Profile</Button>
          <Button variant="danger" onClick={handleSignOut} className="w-100">Sign Out</Button>
        </>
      )}
    </div>
  );
};

export default Profile;