import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

const Login: React.FC = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Welcome to Real-Time Chat</h2>
      <Form className="d-flex flex-column align-items-center">
        <Button variant="primary" onClick={signInWithGoogle} className="mb-3">
          Sign In with Google
        </Button>
      </Form>
    </Container>
  );
};

export default Login;