import React from 'react';
import { Container, Navbar, Nav, Button, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './Header.css';

export default function Header() {
  return (
    <div>

      {/* <Navbar bg="warning" variant="light" expand="lg" id="header-navbar" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#">
            <i className="fas fa-taxi"></i><strong> City Taxi</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">About Us</Nav.Link>
              <Nav.Link href="#">Services</Nav.Link>
              <Nav.Link href="#">Pages</Nav.Link>
              <Nav.Link href="#">Blog</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
            </Nav>
            <div className="d-flex">
              <Button variant="outline-dark" className="me-2">
                Book Now
              </Button>
              <Button variant="dark">Get Started</Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}

      <section id="hero-section" className="text-center">
        <Container id="head-container">
          <Row className="align-items-center">
            <Col md={6} id="hero-content">
              <h1 className="display-4">Join the Ride-Sharing Revolution</h1>
              <p className="lead">
                Discover the most reliable and convenient ride-sharing service in your city.
              </p>
              <div className="input-group mb-3">
                <Form.Control
                  aria-label="Pickup location"
                  placeholder="Pickup location"
                  type="text"
                />
                <span className="input-group-text">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <Form.Control
                  aria-label="Drop location"
                  placeholder="Drop location"
                  type="text"
                />
                <span className="input-group-text">
                  <i id="location-icon" className="fas fa-map-marker-alt"></i>
                </span>
              </div>
              <Button variant="dark">Find A Taxi</Button>
            </Col>
            <Col md={6}>
              <img
                alt="Taxi Illustration"
                className="img-fluid"
                src="https://img.freepik.com/premium-vector/taxi-driver-with-car-isolated-cartoon-character_82574-2543.jpg?uid=R69228054&ga=GA1.1.1964497489.1705394537&semt=ais_hybrid"
              />
            </Col>
          </Row>
          <div id="happy-rider">
            <img alt="Happy Rider 1" src="https://img.freepik.com/free-photo/portrait-successful-man-having-stubble-posing-with-broad-smile-keeping-arms-folded_171337-1267.jpg?uid=R69228054&ga=GA1.1.1964497489.1705394537&semt=ais_hybrid" width="40" />
            <img alt="Happy Rider 2" src="https://img.freepik.com/premium-photo/man-with-glasses-shirt-that-says-he-is-posing-photo_1249303-8468.jpg?uid=R69228054&ga=GA1.1.1964497489.1705394537&semt=ais_hybrid" width="40" />
            <img alt="Happy Rider 3" src="https://img.freepik.com/premium-photo/free-photo-bohemian-man-with-his-arms-crossed_1296777-4198.jpg?uid=R69228054&ga=GA1.1.1964497489.1705394537&semt=ais_hybrid" width="40" />
            <span>Happy Rider</span>
            <i className="fas fa-arrow-right" id="arrow"></i>
          </div>
        </Container>
      </section>
    </div>
  )
}
