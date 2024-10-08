import React, { useState } from 'react';
import { Button, Container, Row, Col, Card, Form, Image } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import NavBar from '../../components/Navbar';
import Footer from '../../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function PassengerRegister() {
  // State to manage form data
  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    nic: '',
    phone: '',
    address: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/passenger/register', formData); // Update with your backend route
      console.log(response.data);

      // Display a success notification using SweetAlert 2
      Swal.fire({
        title: 'Success!',
        text: `Passenger registered successfully! An email has been sent to ${formData.email} with your login details.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });

    } catch (error) {
      console.error('There was an error registering the passenger:', error);

      // Display an error notification using SweetAlert 2
      Swal.fire({
        title: 'Error!',
        text: 'Failed to register passenger. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

 

  return (
    <div>
      <NavBar />

      <Container fluid className="p-5">
        <Card className="text-black m-5" style={{ borderRadius: '25px', boxShadow: '0 4px 30px rgba(0,0,0,0.1)' }}>
          <Card.Body>
            <Row>
              <Col md={10} lg={6} className="order-2 order-lg-1 d-flex flex-column align-items-center">
                <h1 className="text-center fw-bold mb-4" style={{ color: 'red' }}>Sign up</h1>

                <Form onSubmit={handleSubmit} className="w-100">
                  <div className="d-flex flex-row align-items-center mb-4">
                    <FaEnvelope size={24} className="me-3" />
                    <Form.Control type="email"
                      placeholder="Enter Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-0 rounded shadow-sm"
                      style={{ height: '50px' }} />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <FaUser size={24} className="me-3" />
                    <Form.Control type="text"
                      placeholder="Enter Your Full Name"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      required
                      className="border-0 rounded shadow-sm"
                      style={{ height: '50px' }} />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <FaUser size={24} className="me-3" />
                    <Form.Control type="text"
                      placeholder="Enter Your NIC Number"
                      name="nic"
                      value={formData.nic}
                      onChange={handleInputChange}
                      required
                      className="border-0 rounded shadow-sm"
                      style={{ height: '50px' }} />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <FaPhone size={24} className="me-3" />
                    <Form.Control type="text"
                      placeholder="Enter Your Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="border-0 rounded shadow-sm"
                      style={{ height: '50px' }} />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <FaEnvelope size={24} className="me-3" />
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="border-0 rounded shadow-sm"
                      style={{ height: '50px' }} />
                  </div>

                  <div className="text-center">
                    <Button variant="primary" size="lg" type="submit" className="mb-4 rounded" style={{ height: '50px', width: '100%' }}>Register</Button>
                  </div>
                </Form>

      
              </Col>

              <Col md={10} lg={6} className="order-1 order-lg-2 d-flex align-items-center">
                <Card className="border-0" style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <Image src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" fluid />
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </div>
  );
}

