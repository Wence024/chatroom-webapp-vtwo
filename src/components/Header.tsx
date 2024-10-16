import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Header: React.FC = () => {
  const [user] = useAuthState(auth);

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error("Sign out error:", error);
    });
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Real-Time Chat App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user ? (
            <>
              <Navbar.Text className="me-3">
                Signed in as: {user.email}
              </Navbar.Text>
              <Button variant="outline-light" onClick={handleSignOut}>Sign Out</Button>
            </>
          ) : (
            <Navbar.Text>Not signed in</Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;