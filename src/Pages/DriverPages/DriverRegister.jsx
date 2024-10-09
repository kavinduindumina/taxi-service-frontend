import React, { useState } from 'react';
import { Button, Container, Row, Col, Card, Form, Image } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import NavBar from '../../components/Navbar';
import Footer from '../../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import axios from 'axios';


export default function DriverRegister() {

  // State to manage form data
  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    username: '',
    nic: '',
    phone: '',
    address: '',
    password: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/driver/register', formData); // Update with your backend route
      console.log(response.data);

      // Display a success notification using SweetAlert 2
      Swal.fire({
        title: 'Success!',
        text: 'Driver registered successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      console.log(response.data);

    } catch (error) {
      console.error('There was an error registering the driver:', error);

      // Display an error notification using SweetAlert 2
      Swal.fire({
        title: 'Error!',
        text: 'Failed to register driver. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };


  return (
    <div>
      <NavBar />

      <Container fluid className="p-5">
      <h2 style={{
              color: 'orange', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}>Driver Registration</h2>
        <Card className="text-black m-5" style={{ borderRadius: '25px' }}>
          <Card.Body>
            <Row>
              <Col md={10} lg={6} className="order-2 order-lg-1 d-flex flex-column align-items-center">
                <h1 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</h1>

                <Form onSubmit={handleSubmit}>
                  <div className="d-flex flex-row align-items-center mb-4 w-100">
                    <FaEnvelope size={24} className="me-3" />
                    <Form.Control type="email"
                      placeholder="Enter Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4 w-100">
                    <FaUser size={24} className="me-3" />
                    <Form.Control type="text"
                      placeholder="Enter Your Full Name"
                      className="w-100"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4 w-100">
                    <FaUser size={24} className="me-3" />
                    <Form.Control type="text"
                      placeholder="Enter Your UserName"
                      className="w-100"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4 w-100">
                    <FaUser size={24} className="me-3" />
                    <Form.Control type="text"
                      placeholder="Enter Your NIC Number"
                      className="w-100"
                      name="nic"
                      value={formData.nic}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4 w-100">
                    <FaPhone size={24} className="me-3" />
                    <Form.Control type="text"
                      placeholder="Enter Your Phone Number"
                      className="w-100"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4 w-100">
                    <FaEnvelope size={24} className="me-3" />
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Address"
                      className="w-100"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4 w-100">
                    <FaLock size={24} className="me-3" />
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>


                <Button variant="warning"  size="lg" type="submit" className="mb-4">Register</Button>
                </Form>
                
              </Col>

              <Col md={10} lg={6} className="order-1 order-lg-2 d-flex align-items-center">
                <Image src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" fluid />
              </Col>
            </Row>
          </Card.Body>
        </Card>

      </Container>


      <Footer />

    </div>
  )
}
