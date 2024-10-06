import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import NavBar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';
import './CallOperatorLogin.css';  // Custom styles for the enhanced login page

export default function CallOperatorLogin() {
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userName || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete!',
        text: 'Please enter both User Name and password.',
        showConfirmButton: true,
      });
      return;
    }

    Swal.fire({
      title: 'Logging in...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.post('http://localhost:3000/api/v1/phone-operator/login', {
        userName,
        password,
      });

      const { token } = response.data;

      Swal.fire({
        icon: 'success',
        title: 'Login successful!',
        text: 'Welcome, Call Operator!',
        showConfirmButton: false,
        timer: 2000,
      });

      localStorage.setItem('callOperatorToken', token);

      setTimeout(() => {
        window.location.href = '/CallOperatorDashboard';
      }, 2000);

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login failed!',
        text: error.response?.data?.message || 'Please try again.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="call-operator-login">
      <NavBar />
      <Container fluid className="login-container">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="login-box shadow-lg p-5 rounded">
              <h3 className="text-center mb-4 text-primary">Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your User Name"
                    size="lg"
                    value={userName}
                    onChange={(e) => setuserName(e.target.value)}
                    required
                    className="custom-input"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="custom-input"
                  />
                </Form.Group>

                <div className="d-flex justify-content-between mb-3">
                  <Form.Check type="checkbox" label="Remember me" />
                  <a href="!#" className="text-decoration-none">Forgot password?</a>
                </div>

                <div className="text-center">
                  <Button variant="success" type="submit" size="lg" className="w-100">
                    Log In
                  </Button>
                </div>
                
              {/* /* Add button to navigate to Ride Booking */}
              <div className="text-center mt-4">
                <Link to="/CallOperatorDashboard">
                  <Button variant="primary" size="lg">
                    Call Operator Dashboard
                  </Button>
                </Link>
              </div>

                <div className="text-center mt-3">
                  <p className="small fw-bold">
                    Don’t have an account? <a href="./CallOperatorRegister" className="link-primary">Register here</a>
                  </p>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}