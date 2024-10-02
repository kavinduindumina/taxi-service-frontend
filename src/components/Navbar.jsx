import React, { useState } from 'react';
import { Navbar, Container, Nav, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faHistory } from '@fortawesome/free-solid-svg-icons'; // Import faHistory for Recent Activities
import PassengerLogout from './PassengerLogout';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../Images/logo.jpg';

// NavBar Component Code
export default function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  // Define the paths where the buttons should be displayed
  const showAuthButtons = location.pathname === '/PassengerDashboard' || location.pathname === '/ScheduledRide';

  // Function to navigate to the User Profile page
  const handleUserProfileClick = () => {
    navigate('/UserProfile'); // Navigate to UserProfile page
  };

  // Function to navigate to the Recent Activities page
  const handleRecentActivitiesClick = () => {
    navigate('/Activity'); // Navigate to Activity page
  };

  return (
    <Navbar expanded={expanded} expand="lg" bg="light" variant="light">
      <Container fluid>
        <Image 
          src={logo}
          alt=""
          width="50" 
          height="50"
          className="d-inline-block align-top" /> 
        
        <Navbar.Brand href="#">
          City Taxi
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="navbarScroll" 
          onClick={() => setExpanded(expanded ? false : "expanded")} 
        />
        
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="./Home">Home</Nav.Link>
            <Nav.Link href="#">Services</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="./PassengerLogin">Passengers</Nav.Link>
            <Nav.Link href="./DriverLogin">Drivers</Nav.Link>
            <Nav.Link href="./CallOperatorLogin">Call Operator</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center">
            {showAuthButtons && (
              <>
                {/* Button for Recent Activities */}
                <Button variant="link" className="me-3" onClick={handleRecentActivitiesClick}>
                  <FontAwesomeIcon icon={faHistory} size="lg" /> {/* faHistory Icon for Recent Activities */}
                </Button>

                {/* Button for User Profile */}
                <Button variant="link" className="me-3" onClick={handleUserProfileClick}>
                  <FontAwesomeIcon icon={faUserCircle} size="lg" />
                </Button>

                <PassengerLogout />
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
