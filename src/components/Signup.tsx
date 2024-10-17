import React, { useState } from 'react';
import { Button, Card, Form, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import "../styles/Auth.css";

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }

    try {
      setError('');
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name});
      navigate('/login');
    } catch (error) {
      console.error("Signup error:", error);
      setError("Failed to create an account. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center auth--container">
        <div className="w-100 auth--div">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSignup}>
                <Form.Group id="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </Form.Group>
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </Form.Group>
                <Form.Group id="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </Form.Group>
                <Form.Group id="passwordConfirm" className="mb-3">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
                  Sign Up
                </Button>
              </Form>
              <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log in</Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Signup;
