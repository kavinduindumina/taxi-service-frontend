import React from 'react'
import { useNavigate } from 'react-router-dom';  // Ensure useNavigate is imported
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowRight  } from 'react-icons/fa';

import Swal from 'sweetalert2';


export default function Logout() {

    const navigate = useNavigate();

    // Use useEffect to check for token and redirect if not found
    useEffect(() => {
      const token = localStorage.getItem('driverToken');
      if (!token) {
        // If no token is found, redirect to login
        navigate('/DriverLogin');
      }
    }, [navigate]);
  
  
    // Function to handle logout
    const handleLogout = () => {
      Swal.fire({
        title: 'Are you sure you want to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, log out',
        cancelButtonText: 'No, stay',
      }).then((result) => {
        if (result.isConfirmed) {
          // Clear the token from localStorage
          localStorage.clear();
  
          // Redirect to the login page
          navigate('/DriverLogin');
  
          // Optionally, show a success message
          Swal.fire('Logged out!', 'You have been logged out.', 'success');
        }
      });
    };


  return (
    <div>
       {/* Logout Button outside of NavBar */}
       <div className="d-flex justify-content-center p-5">
        <Button variant="danger" onClick={handleLogout} style={{ borderRadius: '50px', width:"120px" }} >
          Logout 
          <FaArrowRight  style={{ marginLeft: '8px' }} />
        </Button>
      </div>
    </div>
  )
}
