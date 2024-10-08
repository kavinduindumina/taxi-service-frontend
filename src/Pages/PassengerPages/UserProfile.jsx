import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import axios for API calls

const UserProfile = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNic] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(""); // State to store the error message
  const [passengerId , setPassengerId] = useState("");

  // Fetch user details on component load
  // Fetch user details on component load
useEffect(() => {
  setPassengerId(localStorage.getItem('passenger'));
  const id = passengerId && JSON.parse(passengerId).id; 
  console.log(id);
  const fetchPassengerDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/passenger/profile/${id}`);
     
        const passenger = response.data.message;
        setFullName(passenger.fullName);
        setEmail(passenger.email);
        setNic(passenger.nic);
        setPhone(passenger.phone);
        setAddress(passenger.address);
        setError("");
    } catch (err) {
      console.error("Error fetching passenger details: ", err);
      setError("Failed to fetch passenger details");
    }
  };

  fetchPassengerDetails();
}, [passengerId]);


  // Handle Update action
  const handleUpdate = () => {
    Swal.fire({
      title: 'Profile Updated!',
      text: 'Your profile information has been updated successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  // Handle Cancel action
  const handleCancel = () => {
    navigate('/PassengerDashboard');
  };

  return (
    <Container className="mt-5">
      <h1>User Profile</h1>
      {error && <p className="text-danger">{error}</p>} {/* Display error message */}
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
