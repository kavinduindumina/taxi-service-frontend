import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Experience.css'; // Import your custom CSS

const Experience = () => {
    return (
        <Container id="experience-container" className="my-5">
            <Row className="align-items-center">
                <Col md={6}>
                    <img 
                        id="experience-image"
                        src="https://img.freepik.com/premium-vector/car-sharing-service-concept_108855-3874.jpg?uid=R69228054&ga=GA1.1.1964497489.1705394537&semt=ais_hybrid" 
                        alt="Illustration of a person standing next to a yellow taxi with a cityscape in the background" 
                        className="img-fluid" 
                    />
                </Col>
                <Col md={6} className="mt-4 mt-md-0">
                    <h1 id="experience-title">
                        Elevate Your Taxi Experience <span id="highlight-text-yellow">With Ride-</span>Sharing.
                    </h1>
                    <p id="experience-description">
                        At City Taxi, we prioritize your comfort and convenience, ensuring a seamless journey every time.
                    </p>
                    <div id="experience-features">
                        <div id="feature-item-1" className="feature-item">
                            <i id="feature-icon-1" className="fas fa-check-circle text-yellow-500"></i>
                            <div>
                                <h2 id="feature-title-1" className="feature-title">Safety First</h2>
                                <p id="feature-description-1" className="feature-description">
                                    Your safety is our top priority; all our drivers are thoroughly vetted and trained for your peace of mind.
                                </p>
                            </div>
                        </div>
                        <div id="feature-item-2" className="feature-item">
                            <i id="feature-icon-2" className="fas fa-check-circle text-yellow-500"></i>
                            <div>
                                <h2 id="feature-title-2" className="feature-title">Affordable Prices</h2>
                                <p id="feature-description-2" className="feature-description">
                                    Enjoy competitive rates without compromising on quality, making your rides budget-friendly.
                                </p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Experience;
