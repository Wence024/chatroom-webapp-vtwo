import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import ThreeColumnLayout from './components/ThreeColumnLayout';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';

const App: React.FC = () => {
  return (
    <Router>
        <Container fluid>
          <Header />
          <Routes>
            <Route path="/" element={<ProtectedRoute><ThreeColumnLayout /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Container>
    </Router>
  );
};

export default App;