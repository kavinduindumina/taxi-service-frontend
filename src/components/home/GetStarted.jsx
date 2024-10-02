import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure you have Bootstrap CSS imported
import './GetStarted.css'; // Import your custom CSS

const GetStarted = () => {
    return (
        <Container id="get-started-container" className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-white">
            <h1 id="get-started-title" className="text-3xl font-bold text-center mb-4">
                How To <span id="highlight">Get Started</span>
            </h1>
            <p id="get-started-description" className="text-center text-gray-600 mb-4">
                Getting started with City Taxi is easy! Just follow these simple steps to enjoy a seamless ride experience.
            </p>
            <Row id="get-started-steps" className="justify-content-center">
                <Step 
                    number="01" 
                    title="Create Your Account" 
                    description="Sign up for a City Taxi account in minutes to unlock a world of convenient transportation options." 
                />
                <Arrow />
                <Step 
                    number="02" 
                    title="Find A Taxi" 
                    description="Use our user-friendly app to quickly locate available taxis in your area, tailored to your needs." 
                />
                <Arrow />
                <Step 
                    number="03" 
                    title="Meet Your Driver" 
                    description="Once booked, get details about your driver and their vehicle to ensure a smooth pickup experience." 
                />
                <Arrow />
                <Step 
                    number="04" 
                    title="Enjoy Your Trip" 
                    description="Sit back, relax, and enjoy your ride with City Taxi, where your comfort and safety are our top priorities." 
                />
            </Row>
        </Container>
    );
};

const Step = ({ number, title, description }) => {
    return (
        <Col id={`step-${number}`} md={2} className="step mb-4 d-flex flex-column align-items-center">
            <Card id={`card-step-${number}`} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <div id={`step-number-${number}`} className="bg-yellow-500 text-white font-bold rounded-circle w-100 text-center mb-4">
                    {number}
                </div>
                <h2 id={`step-title-${number}`} className="text-lg font-bold mb-2 text-center">{title}</h2>
                <p id={`step-description-${number}`} className="text-gray-600 text-center">{description}</p>
            </Card>
        </Col>
    );
};

const Arrow = () => {
    return (
        <Col id="arrow-container" className="d-flex justify-content-center align-items-center mb-4">
            <i id="arrow-icon" className="fas fa-arrow-right text-gray-400 text-2xl arrow"></i>
        </Col>
    );
};

export default GetStarted;

