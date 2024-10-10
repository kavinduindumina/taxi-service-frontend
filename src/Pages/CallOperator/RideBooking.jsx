import {
  Button,
  ButtonGroup,
  Form,
  InputGroup,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Modal,
  Card,
  ListGroup
} from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const center = { lat: 48.8584, lng: 2.2945 };

function RideBooking() {
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.AIzaSyApHYUH5MfQaCitqMVVbp58DkPYExV6Iw8, 
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState('economy');
  const [selectedDriver, setSelectedDriver] = useState(''); // Track selected driver
  const [drivers, setDrivers] = useState([]); // List of drivers
  const [selectedPassenger, setSelectedPassenger] = useState(''); // Track selected passenger
  const [passengers, setPassengers] = useState([]); // List of passengers
  const [showCarModal, setShowCarModal] = useState(false); // Modal visibility for cars
  const [availableCars, setAvailableCars] = useState([]); // List of available cars
  const [selectedCar, setSelectedCar] = useState(''); // Selected car

  // Prices per kilometer and per minute for different vehicle types
  const vehicleRates = {
    economy: { costPerKilometer: 70, costPerMinute: 50 }, // Example rates for Bike
    premium: { costPerKilometer: 100, costPerMinute: 80 }, // Example rates for Tuk Tuk
    suv: { costPerKilometer: 200, costPerMinute: 120 }, // Example rates for Car
  };

  const originRef = useRef();
  const destinationRef = useRef();

  // Fetch drivers and passengers from a backend (optionally with a fallback to static data)
  useEffect(() => {
    async function fetchDriversAndPassengers() {
      try {
        const [driverResponse, passengerResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/drivers'),
          axios.get('http://localhost:3000/api/passengers'),
        ]);

        setDrivers(driverResponse.data);
        setPassengers(passengerResponse.data);
      } catch (error) {
        console.error('Error fetching data from database:', error);
        // Fallback to static list of drivers and passengers
        setDrivers([
          { id: 1, name: 'Kavindu', phone: '0757225442', rating: 5.0 },
          { id: 2, name: 'Indumina', phone: '0771330645', rating: 5.0 },
        ]);
        setPassengers([
          { id: 1, name: 'Nethmi' },
          { id: 2, name: 'KGK Indumina' },
          { id: 3, name: 'Prabhath' },
          { id: 4, name: 'Inushki' },
          { id: 5, name: 'Nirasha' },

        ]);
      }
    }

    fetchDriversAndPassengers();
  }, []);

  // Fetch available cars when car is selected
  useEffect(() => {
    if (selectedVehicle === 'suv') {
      // Simulate fetching available cars (replace with API call if needed)
      setAvailableCars([
        { id: 1, name: 'Alto', number: 'CAS-1234' },
        { id: 2, name: 'Eon', number: 'CAR-5678' },
        { id: 3, name: 'Aqua', number: 'CAR-9876' },
      ]);
      setShowCarModal(true); // Show the car selection modal
    }
  }, [selectedVehicle]);

  // Close car modal
  const closeCarModal = () => {
    setShowCarModal(false);
  };

  // Handle car selection
  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setShowCarModal(false); // Close modal after selecting the car
  };

  // Define the handleBack function
  function handleBack() {
    navigate('/CallOperatorDashboard'); // Adjust this route as necessary
  }

  // Check if Google Maps is loaded
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Calculate cost based on distance, duration, and vehicle type
  function calculateCost(distance, duration, vehicleType) {
    const rates = vehicleRates[vehicleType] || {};
    const distanceValue = parseFloat(distance.replace(/ km/, '').replace(',', '.'));
    const durationValue = parseFloat(duration.replace(/ mins/, '').replace(',', '.'));

    const totalCost = rates.costPerKilometer * distanceValue + rates.costPerMinute * durationValue;
    return isNaN(totalCost) ? 0 : totalCost.toFixed(2);
  }

  // Calculate route and price
  async function calculateRoute() {
    if (!originRef.current.value || !destinationRef.current.value) {
      alert('Please enter both origin and destination');
      return;
    }

    try {
      const directionsService = new window.google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);

      const distanceText = results.routes[0].legs[0].distance.text;
      const durationText = results.routes[0].legs[0].duration.text;

      setDistance(distanceText);
      setDuration(durationText);

      const calculatedPrice = calculateCost(distanceText, durationText, selectedVehicle);
      setPrice(calculatedPrice);
    } catch (error) {
      console.error('Error calculating route:', error);
      alert('Error calculating route. Please try again.');
    }
  }

  // Clear route and input fields
  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setPrice(0);
    setSelectedDriver('');
    setSelectedPassenger('');
    setSelectedCar(''); // Reset selected car
    originRef.current.value = '';
    destinationRef.current.value = '';
  }

  // Confirm the booking
  function confirmBooking() {
    if (!selectedDriver || !selectedPassenger || (selectedVehicle === 'suv' && !selectedCar)) {
      alert('Please select all options before confirming the booking');
      
      return;
    }
    Swal.fire({
      icon: 'success',
      title: 'Ride Booked!',
      text: 'Your ride has been successfully booked.',
      showConfirmButton: false,
      timer: 1500,
    });
    return;

    //alert(`Booking confirmed! Ride from ${originRef.current.value} to ${destinationRef.current.value} with driver ${selectedDriver}, passenger ${selectedPassenger}, and vehicle ${selectedCar ? selectedCar.name : selectedVehicle}. Total price: LKR ${price}`);
  }

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%' }}>
        {/* Google Map */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{ zoomControl: false, streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
      <div style={{ padding: '16px', borderRadius: '8px', margin: '16px', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', minWidth: '600px', position: 'relative', zIndex: 1 }}>
        <Row className="mb-3">
          <Col>
            <InputGroup>
              <Autocomplete>
                <Form.Control type="text" placeholder="Origin" ref={originRef} />
              </Autocomplete>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <Autocomplete>
                <Form.Control type="text" placeholder="Destination" ref={destinationRef} />
              </Autocomplete>
            </InputGroup>
          </Col>
          <Col xs="auto">
            <ButtonGroup>
              <Button variant="success" onClick={calculateRoute}>Calculate Route</Button>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip-top">Clear Route</Tooltip>}
              >
                <Button variant="danger" onClick={clearRoute}>
                  <FaTimes />
                </Button>
              </OverlayTrigger>
              <Button variant="info" onClick={handleBack}>
                Back
              </Button>
            </ButtonGroup>
          </Col>
        </Row>

        {/* Vehicle and Price Section */}
        <Row className="mb-3">
          <Col xs="auto">
            <Form.Select
              onChange={(e) => setSelectedVehicle(e.target.value)}
              value={selectedVehicle}
            >
              <option value="">Select vehicle</option>
              <option value="economy">Bike</option>
              <option value="premium">Tuk Tuk</option>
              <option value="suv">Car</option>
            </Form.Select>
          </Col>
          <Col>
            <span>Distance: {distance}</span>
          </Col>
          <Col>
            <span>Duration: {duration}</span>
          </Col>
          <Col>
            <span>Total Price: LKR {price}</span>
          </Col>
        </Row>

        {/* Passenger Selection */}
        {directionsResponse && (
          <>
            <Row className="mb-3">
              <Col>
                <Form.Select
                  onChange={(e) => setSelectedPassenger(e.target.value)}
                  value={selectedPassenger}
                >
                  <option value="">Select Passenger</option>
                  {passengers.map(passenger => (
                    <option key={passenger.id} value={passenger.name}>
                      {passenger.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            {/* Driver Selection */}
            <Row className="mb-3">
              <Col>
                <Form.Select
                  disabled={!selectedPassenger} // Disable the driver dropdown until a passenger is selected
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  value={selectedDriver}
                >
                  <option value="">Select Driver</option>
                  {drivers.map(driver => (
                    <option key={driver.id} value={driver.name}>
                      {driver.name} - {driver.phone} (Rating: {driver.rating})
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            {/* Confirm Booking Button */}
            <Row className="mb-3">
              <Col xs="auto">
                <Button variant="primary" onClick={confirmBooking}>
                  Confirm Booking
                </Button>
              </Col>
            </Row>

          </>
        )}
      </div>

      {/* Car Selection Modal */}
      <Modal show={showCarModal} onHide={closeCarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select a Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {availableCars.map((car) => (
              <Col md={4} key={car.id}>
                <Card
                  onClick={() => handleCarSelect(car)}
                  className={`mb-3 ${selectedCar === car ? 'border-primary' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) => e.currentTarget.classList.add('shadow-lg')}
                  onMouseLeave={(e) => e.currentTarget.classList.remove('shadow-lg')}
                >
                  <Card.Body>
                    <Card.Title>{car.name}</Card.Title>
                    <Card.Text>{car.number}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RideBooking;
