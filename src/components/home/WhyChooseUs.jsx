import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./WhyChooseUs.css"; // Optional for custom styling

const WhyChooseUs = () => {
    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={6} className="text-center">
                    <h2 id="why-choose-us-title">
                        Why <span id="highlight-text">Choose Us?</span>
                    </h2>
                    <p id="why-choose-us-description">
                        At City Taxi, we prioritize your comfort and safety above all else. Our professional drivers are
                        dedicated to providing a seamless travel experience, whether you're commuting to work or exploring
                        the city. With a commitment to punctuality, competitive rates, and an easy-to-use booking system,
                        we ensure that your journey is not just a ride but an enjoyable part of your day. Choose us for reliable,
                        friendly service that puts you first—because your journey matters.
                    </p>
                </Col>
            </Row>
            <Row className="mt-4">
                {[
                    "Expert Guidance",
                    "Free Customer Support",
                    "Affordable Prices",
                    "Easy & Fast Booking",
                    "Many Pickup Locations",
                    "No More Waiting"
                ].map((item, index) => (
                    <Col md={4} className="mb-4" key={index}>
                        <Card id="why-choose-us-card">
                            <Card.Body className="d-flex align-items-center">
                                <strong>
                                    <i className="fas fa-check" id="card-icon"></i>
                                    <span id="card-text">{item}</span>
                                </strong>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default WhyChooseUs;
