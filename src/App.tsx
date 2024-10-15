import React from 'react';
import { Container } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Chat from './components/Chat';
import Header from './components/Header';

const App: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <Container fluid className="p-0">
      <Header />
      {user ? <Chat /> : <Login />}
    </Container>
  );
};

export default App;