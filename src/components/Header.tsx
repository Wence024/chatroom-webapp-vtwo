import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const [user] = useAuthState(auth);
  const { theme, toggleTheme } = useTheme();

  return (
    <Navbar bg={theme === 'light' ? 'light' : 'dark'} variant={theme === 'light' ? 'light' : 'dark'}>
      <Container>
        <Navbar.Brand href="#home">Real-Time Chat App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-primary" onClick={toggleTheme} className="me-3">
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
          <Navbar.Text>
            {user ? `Signed in as: ${user.email}` : 'Not signed in'}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;