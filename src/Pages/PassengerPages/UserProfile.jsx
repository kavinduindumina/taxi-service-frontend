import React, { useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Swal from 'sweetalert2'; // Import SweetAlert2

const UserProfile = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNic] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Function to handle update action
  const handleUpdate = () => {
    Swal.fire({
      title: 'Profile Updated!',
      text: 'Your profile information has been updated successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  // Function to handle cancel action
  const handleCancel = () => {
    navigate('/PassengerDashboard'); // Navigate to Passenger Dashboard
  };

  return (
    <Container className="mt-5">
      <h1>User Profile</h1>
      <Card>
        <Card.Body>
          <Card.Title>Your Information</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type="text" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>NIC</Form.Label>
              <Form.Control 
                type="text" 
                value={nic} 
                onChange={(e) => setNic(e.target.value)} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
              />
            </Form.Group>

            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="secondary" className="ms-2" onClick={handleCancel}>
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfile;
