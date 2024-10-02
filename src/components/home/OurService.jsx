import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure you have Bootstrap CSS imported
import './OurService.css'; // Import your custom CSS

const OurService = () => {
    const services = [
        {
            title: "Ride Sharing",
            description: "Experience quick, reliable, and affordable transportation with City Taxi’s ride-sharing service, connecting you to friendly drivers nearby!.",
            image: "https://img.freepik.com/free-vector/man-with-map-smartphone-renting-car-driver-using-car-sharing-app-phone-searching-vehicle-vector-illustration-transport-transportation-urban-traffic-location-app-concept_74855-10109.jpg?uid=R69228054&ga=GA1.1.1964497489.1705394537&semt=ais_hybrid",
            icon: "fas fa-car",
        },
        {
            title: "Taxi Sharing",
            description: "Share your ride and cut costs with City Taxi’s convenient taxi-sharing option, designed for budget-friendly travel.",
            image: "https://img.freepik.com/premium-vector/online-ordering-taxi-car-rent-sharing-using-service-mobile-application_333239-104.jpg?uid=R69228054&ga=GA1.1.1964497489.1705394537&semt=ais_hybrid",
            icon: "fas fa-taxi",
        },
        {
            title: "Taxi Reserved",
            description: "Reserve your taxi in advance for a hassle-free journey, ensuring you get to your destination on time, every time.",
            image: "https://img.freepik.com/free-vector/man-looking-cab-mobile-app-screens_23-2148401214.jpg?uid=R69228054&ga=GA1.1.1964497489.1705394537&semt=ais_hybrid",
            icon: "fas fa-car-side",
        },
        {
            title: "Intercity Service",
            description: "Travel comfortably between cities with our intercity service, providing safe and efficient rides for your long-distance needs.",
            image: "https://img.freepik.com/premium-vector/online-ordering-taxi-car-rent-sharing-using-service-mobile-application_333239-104.jpg?uid=R69228054&ga=GA1.1.1964497489.1705394537&semt=ais_hybrid",
            icon: "fas fa-bus",
        },
    ];

    return (
        <Container className="py-5">
            <h2 id="our-services-title" className="text-center mb-4">Our Popular Services</h2>
            <p id="our-services-description" className="text-center mb-5">
                Experience quick, reliable, and affordable transportation with City Taxi’s ride-sharing service, connecting you to friendly drivers nearby!
            </p>
            <Row>
                {services.map((service, index) => (
                    <Col md={6} lg={3} key={index} className="mb-4">
                        <Card id="our-service-card">
                            <Card.Body className="d-flex flex-column">
                                <div id="service-icon-container" className="text-center mb-3">
                                    <div id="icon-circle">
                                        <i className={`${service.icon} text-white`}></i>
                                    </div>
                                </div>
                                <Card.Title id="service-title" className="text-center">{service.title}</Card.Title>
                                <Card.Text id="service-description" className="text-center">{service.description}</Card.Text>
                                <img id="service-image" className="img-fluid" src={service.image} alt={`Image of ${service.title}`} />
                                <div className="mt-auto text-center">
                                    <Button id="view-details-button" className="mt-3">
                                        View Details <i className="fas fa-arrow-right ml-2"></i>
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="text-center mt-4">
                <Button id="get-service-button" className="px-4 py-2">
                    Get A Service <i className="fas fa-arrow-right ml-2"></i>
                </Button>
            </div>
        </Container>
    );
};

export default OurService;
