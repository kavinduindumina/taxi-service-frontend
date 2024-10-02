import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar'; // Assuming you have a Navbar component
import './AddPassenger.css'; // Add custom styling here if necessary

export default function AddPassenger() {
  const navigate = useNavigate();

  // State to hold passenger form inputs
  const [passengerData, setPassengerData] = useState({
    passengerName: '',
    nic: '',
    phone: '',
    startLocation: '',
    endLocation: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassengerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here, e.g., sending data to your backend or an API
    console.log('Passenger Data:', passengerData);

    // Optionally, navigate to another page after submission
    navigate('/CallOperatorDashboard');
  };

  // Handle back navigation
  const handleBack = () => {
    navigate('/CallOperatorDashboard'); // Navigate back to the dashboard
  };

  return (
    <>
      <Navbar /> {/* Add Navbar */}
      <Container className="add-passenger-container mt-5">
        <Row className="text-center mb-4">
          <Col>
            <h1 className="add-passenger-title">Add New Passenger</h1>
            <p className="add-passenger-subtitle">Please fill out the form below to add a new passenger.</p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="passengerName" className="mb-3">
                <Form.Label>Passenger Name</Form.Label>
                <Form.Control
                  type="text"
                  name="passengerName"
                  placeholder="Enter passenger name"
                  value={passengerData.passengerName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="nic" className="mb-3">
                <Form.Label>NIC</Form.Label>
                <Form.Control
                  type="text"
                  name="nic"
                  placeholder="Enter NIC"
                  value={passengerData.nic}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="phone" className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter phone"
                  value={passengerData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="startLocation" className="mb-3">
                <Form.Label>Start Location</Form.Label>
                <Form.Control
                  type="text"
                  name="startLocation"
                  placeholder="Enter Start Location"
                  value={passengerData.startLocation}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="endLocation" className="mb-3">
                <Form.Label>End Location</Form.Label>
                <Form.Control
                  type="text"
                  name="endLocation"
                  placeholder="Enter End Location"
                  value={passengerData.endLocation}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 mb-3">
                Add Passenger
              </Button>

              {/* Back Button */}
              <Button variant="secondary" className="w-100" onClick={handleBack}>
                Back
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}