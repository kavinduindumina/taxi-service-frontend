import {
  Button,
  ButtonGroup,
  Form,
  InputGroup,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
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

  // Prices per kilometer for different vehicle types
  const vehiclePrices = {
    economy: 1.5,  // $1.5 per km
    premium: 2.5,  // $2.5 per km
    suv: 3.5,      // $3.5 per km
  };

  const originRef = useRef();
  const destinationRef = useRef();

  // Fetch drivers from a backend (optionally with a fallback to static drivers)
  useEffect(() => {
    async function fetchDrivers() {
      try {
        const response = await axios.get('http://localhost:3000/api/drivers');
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching drivers from database:', error);
        // Fallback to static list of drivers
        setDrivers([
          { id: 1, name: 'Sumane', phone: '123-456-7890', rating: 4.8 },
          { id: 2, name: 'Sirisena', phone: '987-654-3210', rating: 4.5 },
          { id: 3, name: 'Mainda Mahathiya', phone: '555-123-4567', rating: 4.9 },
          { id: 4, name: 'Gota', phone: '666-789-4321', rating: 4.6 },
          { id: 5, name: 'Sajiiii', phone: '444-555-6666', rating: 4.7 },
        ]);
      }
    }

    fetchDrivers();
  }, []);

  // Define the handleBack function
function handleBack() {
  navigate('/CallOperatorDashboard'); // Adjust this route as necessary
}

  // Check if Google Maps is loaded
  if (!isLoaded) {
    return <div>Loading...</div>;
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
  
      const distanceInKm = parseFloat(results.routes[0].legs[0].distance.text.replace(' km', ''));
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
  
      const calculatedPriceInUsd = distanceInKm * vehiclePrices[selectedVehicle];
      const usdToLkrRate = 330; // Example conversion rate from USD to LKR
      const calculatedPriceInLkr = calculatedPriceInUsd * usdToLkrRate;
      setPrice(calculatedPriceInLkr.toFixed(2));
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
    originRef.current.value = '';
    destinationRef.current.value = '';
  }

  // Confirm the booking
  function confirmBooking() {
    if (!selectedDriver) {
      alert('Please select a driver before confirming the booking');
      return;
    }

    alert(`Booking confirmed! Ride from ${originRef.current.value} to ${destinationRef.current.value} with driver ${selectedDriver}. Total price: LKR ${price}`);
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
              <option value="economy">Economy</option>
              <option value="premium">Premium</option>
              <option value="suv">SUV</option>
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

        {/* Driver Selection */}
        {directionsResponse && (
          <>
            <Row className="mb-3">
              <Col>
                <Form.Select
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
    </div>
  );
}

export default RideBooking;