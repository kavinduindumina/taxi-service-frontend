// LogoutButton.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const LogoutButton = () => {
  // Function to handle logout
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Logged Out!',
          'You have been logged out successfully.',
          'success'
        );
        window.location.href = './Home'; 
      }
    });
  };

  return (
    <Button variant="link" onClick={handleLogout}>
      <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
    </Button>
  );
};

export default LogoutButton;
