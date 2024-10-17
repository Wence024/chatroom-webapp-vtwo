import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Signup from './components/Signup';
import Poll from './components/Poll';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import ThreeColumnLayout from './components/ThreeColumnLayout';

const App: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Container fluid className="p-0">
        <Header />
        <Routes>
          <Route path="/" element={<ProtectedRoute><ThreeColumnLayout /></ProtectedRoute>} />
          <Route path="/polls" element={<ProtectedRoute><Poll /></ProtectedRoute>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;