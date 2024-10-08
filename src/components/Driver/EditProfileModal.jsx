import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditProfileModal = ({
  show,
  handleClose,
  editName,
  setEditName,
  editEmail,
  setEditEmail,
  editUsername,
  setEditUsername,
  editNic,
  setEditNic,
  editPhone,
  setEditPhone,
  editAddress,
  setEditAddress,
  driverId, // Add driverId to identify the driver to be updated
}) => {
  
  const handleSaveChanges = async () => {
    try {
      // Prepare the data to be sent to the backend
      const data = {
        email: editEmail,
        fullName: editName,
        username: editUsername,
        nic: editNic,
        phone: editPhone,
        address: editAddress
      };

      // Send a POST/PUT request to the backend to update the profile
      const response = await axios.put(`http://localhost:3000/api/v1/driver/update-profile/${driverId}`, {
        data
      });

      // Show success message using SweetAlert
      Swal.fire({
        title: 'Success!',
        text: 'Driver profile updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Close the modal after successful update
      handleClose();
    } catch (error) {
      // Handle errors
      console.error('Error updating the profile:', error);

      // Show error message using SweetAlert
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update the driver profile. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formUsername" className="mt-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formNic" className="mt-3">
            <Form.Label>NIC</Form.Label>
            <Form.Control
              type="text"
              value={editNic}
              onChange={(e) => setEditNic(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPhone" className="mt-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formAddress" className="mt-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Update 
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
