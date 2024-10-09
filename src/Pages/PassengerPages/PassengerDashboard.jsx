import React, { useRef, useState, useEffect } from 'react';
import { GoogleMap, Marker, Autocomplete, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import { Button, Form, Container, Row, Col, Card, Modal, ListGroup, Image } from 'react-bootstrap';
import { FaTimes, FaMotorcycle, FaCar, FaTaxi } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../Styles/PassengerDashboard.css';
import NavBar from '../../components/Navbar';
import Footer from '../../components/Footer';

const center = { lat: 6.927079, lng: 79.861244 };

export default function PassengerDashboard() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'Api-key',
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [cost, setCost] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(center);
  const [currentPlaceName, setCurrentPlaceName] = useState('');
  const [vehicleType, setVehicleType] = useState('Tuk');
  const [availableVehicles, setAvailableVehicles] = useState({ Tuk: [], Bike: [], Car: [] });
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [passengerId , setPassengerId] = useState("");
  const destinationRef = useRef();

  useEffect(() => {
    setPassengerId(localStorage.getItem('passenger'));
    if (navigator.geolocation && isLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setCurrentLocation(location);

          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                setCurrentPlaceName(results[0].formatted_address);
              }
            }
          });
        },
        () => {
          console.log('Geolocation not supported or permission denied.');
        }
      );
    }
  }, [isLoaded]);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/vehicle/get-vehicle-details', { vehicleType });
        setAvailableVehicles((prevState) => ({
          ...prevState,
          [vehicleType]: response.data.message,
        }));
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    }

    fetchVehicles();
  }, [vehicleType]);

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setCost(0);
    if (destinationRef.current) {
      destinationRef.current.value = '';
    }
    if (map) {
      map.panTo(currentLocation);
      map.setZoom(15);
    }
  }

  function calculateCost(distance, vehicleType) {
    const rates = {
      Tuk: { costPerKilometer: 100, costPerMinute: 100 },
      Bike: { costPerKilometer: 70, costPerMinute: 70 },
      Car: { costPerKilometer: 200, costPerMinute: 200 },
    };

    const distanceValue = parseFloat(distance.replace(/ km/, '').replace(',', '.'));
    const durationValue = parseFloat(duration.replace(/ mins/, '').replace(',', '.'));

    const selectedRate = rates[vehicleType];
    const totalCost = selectedRate.costPerKilometer * distanceValue + selectedRate.costPerMinute * durationValue;
   
    return isNaN(totalCost) ? 0 : totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  async function calculateRoute(destination) {
    if (!destination) return;

    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setCost(0);

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: currentLocation,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    if (results && results.routes.length) {
      setDirectionsResponse(results);
      const distance = results.routes[0].legs[0].distance.text;
      const duration = results.routes[0].legs[0].duration.text;
      const calculatedCost = calculateCost(distance, vehicleType);
      setCost(calculatedCost);
      setDistance(distance);
      setDuration(duration);
    }
  }

  function confirmVehicleSelection() {
    setShowModal(false);
  }

  async function handleBookRide() {
    const id = passengerId && JSON.parse(passengerId).id; 
    if (!selectedVehicle) {
      alert("Please select a vehicle before booking.");
      return;
    }
    const calculatedCost = calculateCost(distance, vehicleType);
    const finalcost = String(calculatedCost); // Ensure this is a string
    const bookingData = {
      passengerId: id, // Assuming you have the passenger ID from the session or state
      currentPlaceName,
      destination: destinationRef.current.value,
      distance,
      duration,
      cost: finalcost,
      vehicleId: 1, // Assuming vehicle number is used as vehicle ID
      //vehicleId: selectedVehicle.vehicleNumber,
     
    };
   
        console.log('cost isfscsfs :',finalcost);
        console.log('vehicleId is :', selectedVehicle.vehicleNumber);

        try {
          const response = await axios.post('http://localhost:3000/api/v1/passenger/book-ride', bookingData);
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Ride Booked!',
              text: 'Your ride has been successfully booked.',
              showConfirmButton: false,
              timer: 1500,
            });

            window.location.href = '/Scheduleride';
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Failed!',
              text: 'Failed to book the ride.',
            });
          }
        } catch (error) {
          console.error('Error booking ride:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to book the ride.',
          });
        }
      }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Container fluid className="flex-grow-1 p-0">
        <Row style={{ height: '60vh' }}>
          <GoogleMap
            center={currentLocation}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={currentLocation} />
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
          </GoogleMap>
        </Row>

        <Row className="justify-content-center align-items-center py-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">Book a Ride</Card.Title>
                <Form>
                  <Row className="mb-3">
                    <Col>
                      <Form.Label>PICKUP</Form.Label>
                      <Form.Group controlId="formCurrentLocation">
                        <Form.Control type="text" value={currentPlaceName} readOnly />
                      </Form.Group>
                    </Col>
                    <Col xs={2} className="d-flex justify-content-center align-items-center">
                      <Button
                        variant="outline-danger"
                        onClick={clearRoute}
                        className="clear-button"
                        style={{ padding: '6px 12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <FaTimes />
                      </Button>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <Form.Label>DROP</Form.Label>
                      <Form.Group controlId="formDestination">
                        <Autocomplete
                          onPlaceChanged={() => {
                            const destination = destinationRef.current.value;
                            calculateRoute(destination);
                          }}
                        >
                          <Form.Control type="text" ref={destinationRef} placeholder="Enter destination" />
                        </Autocomplete>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    {['Tuk', 'Bike', 'Car'].map((type) => (
                      <Col key={type} md={4}>
                        <Card
                          border={vehicleType === type ? 'primary' : 'light'}
                          className="text-center cursor-pointer"
                          onClick={() => {
                            setVehicleType(type);
                            setShowModal(true);
                          }}
                        >
                          <Card.Body>
                            {type === 'Tuk' && <FaTaxi size={30} />}
                            {type === 'Bike' && <FaMotorcycle size={30} />}
                            {type === 'Car' && <FaCar size={30} />}
                            <Card.Title className="mt-2">{type}</Card.Title>
                            <Card.Text>Cost: LKR {calculateCost(distance, type)}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  {distance && (
                    <Card className="mb-3">
                      <Card.Body>
                        <Row>
                          <Col>
                            <p className="mb-1"><strong>Distance:</strong> {distance}</p>
                            <p className="mb-1"><strong>Duration:</strong> {duration}</p>
                            <p className="mb-1"><strong>Cost:</strong> LKR {calculateCost(distance, vehicleType)}</p>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  )}

                  <Button variant="primary" onClick={handleBookRide} disabled={!distance}>
                    Book Now
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />

      {/* Modal to show available vehicles */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select a Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {availableVehicles[vehicleType]?.map((vehicle, index) => (
              <ListGroup.Item
                key={index}
                onClick={() => setSelectedVehicle(vehicle)}
                active={selectedVehicle?.vehicleNumber === vehicle.vehicleNumber}
              >
                <Row className="align-items-center">
                <Col xs={3}>
                    <Image src={vehicle.ImagePath} rounded fluid />
                  </Col>
                  <Col>
                    <h6>{vehicle.vehicleNumber}</h6>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={confirmVehicleSelection} disabled={!selectedVehicle}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
