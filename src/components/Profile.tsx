import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { updateProfile, signOut } from 'firebase/auth';

const Profile: React.FC = () => {
  const [user] = useAuthState(auth);
  const [isEditing, setIsEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || '');

  const handleUpdateProfile = async () => {
    if (user) {
      try {
        await updateProfile(user, { displayName: newDisplayName });
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      }
    }
  };

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
          {isEditing ? (
            <Form onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }}>
              <Form.Group className="mb-3">
                <Form.Label>Display Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">Save</Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
            </Form>
          ) : (
            <>
              <p>Display Name: {user.displayName || 'Not set'}</p>
              <Button variant="primary" onClick={() => setIsEditing(true)}>Update Profile</Button>
            </>
          )}
          <Button variant="danger" onClick={handleSignOut} className="mt-3">Sign Out</Button>
        </>
      )}
    </div>
  );
};

export default Profile;