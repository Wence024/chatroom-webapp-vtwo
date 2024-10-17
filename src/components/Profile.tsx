import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Button } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import UpdateProfileModal from './UpdateProfileModal';

const Profile: React.FC = () => {
  const [user] = useAuthState(auth);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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
          <Button variant="primary" className="mb-2 w-100" onClick={() => setShowUpdateModal(true)}>Update Profile</Button>
          <Button variant="danger" onClick={handleSignOut} className="w-100">Sign Out</Button>
          <UpdateProfileModal show={showUpdateModal} handleClose={() => setShowUpdateModal(false)} />
        </>
      )}
    </div>
  );
};

export default Profile;