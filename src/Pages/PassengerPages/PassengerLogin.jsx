import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaLock } from 'react-icons/fa';
import NavBar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';
import Logo1 from '../../Images/Logo1.png';

export default function PassengerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    Swal.fire({
      title: 'Logging in...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.post('http://localhost:3000/api/v1/passenger/login', {
        email,
        password,
      });
      const { token, user } = response.data.message;

      Swal.fire({
        icon: 'success',
        title: 'Login successful!',
        text: `Welcome to City Taxi Service!`,
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });

      localStorage.setItem('passengerToken', token);
      localStorage.setItem('passenger', JSON.stringify(user));
      window.location.href = '/PassengerDashboard';
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login failed!',
        text: error.response?.data?.message || 'Please try again.',
        showConfirmButton: true,
        confirmButtonText: 'Retry',
      });
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: 'linear-gradient(135deg, #fdfbfb, #ebedee)' }}>
      <NavBar />
      <Container fluid className="flex-grow-1 d-flex align-items-center py-5">
        <Row className="w-100 justify-content-center">
          <Col md={6} lg={5} className="mb-4 mb-md-0 d-flex align-items-center justify-content-center">
          <img
              src={Logo1} // Corrected the src attribute
              alt="Logo"
              className="img-fluid" // Use Bootstrap class for fluid images
              style={{ maxWidth: '100%', height: 'auto', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
            />
          </Col>
          <Col md={6} lg={5}>
            <div className="bg-white p-5 rounded-3 shadow-lg" style={{ boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)' }}>
              <h2 className="text-center mb-4" style={{ color: 'red', fontWeight: '600' }}>Welcome to City Taxi Service</h2>

              <div className="d-flex justify-content-center mb-4">
                <Button variant="outline-primary" className="me-2 rounded-circle p-2" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                  <FaFacebookF />
                </Button>
                <Button variant="outline-info" className="me-2 rounded-circle p-2" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                  <FaTwitter />
                </Button>
                <Button variant="outline-primary" className="rounded-circle p-2" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                  <FaLinkedinIn />
                </Button>
              </div>
              <div className="d-flex align-items-center mb-4">
                <hr className="flex-grow-1" />
                <span className="px-3 text-muted">Or login with</span>
                <hr className="flex-grow-1" />
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-muted">Email address</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-primary text-white d-flex align-items-center justify-content-center">
                      <FaEnvelope />
                    </span>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="py-2"
                      style={{ borderRadius: '0 0.375rem 0.375rem 0', border: '1px solid #d1d3e2' }}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="text-muted">Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-primary text-white d-flex align-items-center justify-content-center">
                      <FaLock />
                    </span>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="py-2"
                      style={{ borderRadius: '0 0.375rem 0.375rem 0', border: '1px solid #d1d3e2' }}
                    />
                  </div>
                </Form.Group>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check type="checkbox" label="Remember me" id="rememberMe" />
                  <a href="#!" className="text-primary text-decoration-none">Forgot password?</a>
                </div>
                <Button variant="primary" type="submit" className="w-100 mb-3 py-2" style={{ borderRadius: '0.375rem' }}>
                  Login
                </Button>
                <p className="text-center mb-0">
                  Don't have an account? <a href="./PassengerRegister" className="text-primary text-decoration-none">Register</a>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
