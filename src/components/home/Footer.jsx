import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './Footer.css'; 

const Footer = () => {
    return (
        <footer id="footer" className="bg-black text-white py-5 footer-animation">
            <Container id="footer-container">
                <Row className="mb-4">
                    <Col xs={12} md={3}>
                        <div id="footer-brand" className="d-flex align-items-center mb-4">
                            <i id="footer-icon" className="fas fa-taxi text-yellow-500 text-2xl mr-2"></i>
                            <span id="footer-title" className="text-xl font-bold"> CityTaxi</span>
                        </div>
                        <p id="footer-description" className="footer-description">
                            At City Taxi, we believe in transforming urban transportation through our innovative ride-sharing platform. Our user-friendly app connects passengers with nearby drivers, making it easier than ever to book a ride at your fingertips. With a focus on affordability, safety, and convenience, we offer an unparalleled experience that caters to your travel needs.
                        </p>
                        <div id="social-icons" className="social-icons">
                            {['facebook-f', 'xing', 'skype', 'linkedin-in'].map((icon, index) => (
                                <a key={index} href="#" id={`social-icon-${index}`} className="social-icon"><i className={`fab fa-${icon}`}></i></a>
                            ))}
                        </div>
                    </Col>
                    <Col xs={12} md={3}>
                        <h3 id="services-title" className="text-lg font-bold mb-4">Our Services:</h3>
                        <ul id="services-list" className="list-unstyled">
                            {['Ride Sharing', 'Taxi Rentals', 'Intercity Service', 'Taxi Reserve'].map((service, index) => (
                                <li key={index} id={`service-item-${index}`} className="mb-2">
                                    <a href="#" className="text-gray-400 hover:underline">{service}</a>
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col xs={12} md={3}>
                        <h3 id="quick-links-title" className="text-lg font-bold mb-4">Quick Links:</h3>
                        <ul id="quick-links-list" className="list-unstyled">
                            {['Ride Sharing', 'Taxi Rentals', 'Intercity Service', 'Taxi Reserve'].map((link, index) => (
                                <li key={index} id={`quick-link-item-${index}`} className="mb-2">
                                    <a href="#" className="text-gray-400 hover:underline">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col xs={12} md={3}>
                        <h3 id="newsletter-title" className="text-lg font-bold mb-4">Newsletter:</h3>
                        <Form id="newsletter-form">
                            <Form.Group>
                                <Form.Control id="newsletter-email" type="email" placeholder="Enter your email:" className="bg-gray-800 text-white border border-gray-700" />
                            </Form.Group>
                            <Button id="subscribe-button" variant="warning" className="footer-button w-100 mb-2">Subscribe Now</Button>
                            <Form.Group className="form-check">
                                <Form.Check id="newsletter-agree" type="checkbox" label="I agree to email receive." />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <div id="footer-copyright" className="text-center text-gray-500">
                    © All rights reserved. Made by || <a href="#" className="text-yellow-500 hover:underline">CityTaxi</a>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
