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
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Navbar from '../../components/Navbar';

const center = { lat: 48.8584, lng: 2.2945 };

function RideBooking() {
  const navigate = useNavigate(); // Initialize the navigate hook

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.AIzaSyApHYUH5MfQaCitqMVVbp58DkPYExV6Iw8,
    libraries: ['places'],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState('economy');

  // Prices per kilometer for different vehicle types
  const vehiclePrices = {
    economy: 1.5,  // Example: $1.5 per km
    premium: 2.5,  // Example: $2.5 per km
    suv: 3.5,      // Example: $3.5 per km
  };

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  if (!isLoaded) {
    return <div>Loading...</div>; // Temporary loading state
  }

  // Calculate route and price
  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
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
  
      // Calculate price in USD and convert to LKR
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
    originRef.current.value = '';
    destinationRef.current.value = '';
  }

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%' }}>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
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
              <Button variant="success" onClick={calculateRoute}>
                Calculate Route
              </Button>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip-top">Clear Route</Tooltip>}
              >
                <Button variant="danger" onClick={clearRoute}>
                  <FaTimes />
                </Button>
              </OverlayTrigger>
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

        <Row>
          <Col xs="auto">
            <Button
              variant="primary"
              onClick={() => {
                // Check if geolocation is available in the browser
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const { latitude, longitude } = position.coords;

                      // Pan the map to the user's live location and set zoom level
                      map.panTo({ lat: latitude, lng: longitude });
                      map.setZoom(15);
                    },
                    (error) => {
                      console.error("Error getting location:", error);
                      alert("Unable to retrieve your location. Please enable location services.");
                    }
                  );
                } else {
                  alert("Geolocation is not supported by your browser.");
                }
              }}
            >
              <FaLocationArrow /> Current Location
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              variant="info"
              onClick={() => navigate('/CallOperatorDashboard')}
            >
              Back
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default RideBooking;