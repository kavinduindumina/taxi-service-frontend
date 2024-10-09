import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ListGroup, ProgressBar, Image } from 'react-bootstrap';
import { FaCar } from 'react-icons/fa';
import NavBar from '../../components/Navbar';
import Footer from '../../components/home/Footer';
import Logout from '../../components/Logout';
import EditProfileModal from '../../components/Driver/EditProfileModal';
import MapComponent from '../../components/Driver/MapComponent';
import RidesTable from '../../components/Driver/RidesTable';
import RegisterVehicle from '../../components/Driver/RegisterVehicle ';
import UpdateVehicle from '../../components/Driver/UpdateVehicle'
import ChatComponent from '../../components/Driver/ChatComponent';
import MonthlyEarningModal from '../../components/Driver/MonthlyEarningModal';
import RideModal from '../../components/Driver/RideModal';
import axios from 'axios';



export default function DriverDashboard() {
  const [driver, setDriver] = useState({ fullName: '', email: '', username: '', nic: '', phone: '', address: '' });
  const [vehicles, setVehicles] = useState({ ImagePath: '', vehicleNumber: '', vehicleModel: '' });
  const [showModal, setShowModal] = useState(false);  // Modal visibility state
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Control modal visibility
  const [selectedVehicleNumber, setSelectedVehicleNumber] = useState(''); // For storing selected vehicle number
  const [showEarningModal, setEarningShowModal] = useState(false);
  const [rideDetails, setRideDetails] = useState({});
  const [showRideListModal, setRideListModal] = useState(false);
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(null);

  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editNic, setEditNic] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [totalRideCount, setTotalRideCount] = useState('');
  const [totalEarnings, setTotalEarnings] = useState(0); // Add state for total earnings
  const [driverId, setDriverId] = useState('');
  const navigate = useNavigate();

  //--------------fetch driver------------------//
  useEffect(() => {
    const token = localStorage.getItem('driverToken');
    const userDetails = localStorage.getItem('UserDetails');
    const userDetailsParse = JSON.parse(userDetails)
    setDriverId(userDetailsParse.id)

    if (!token) {
      navigate('/DriverLogin'); // Redirect to login if no token is present
    } else {
      axios.post('http://localhost:3000/api/v1/driver/profile/', {
        driverId: userDetailsParse.id
      })
        .then(response => {
          const driverData = response.data.message;
          setDriver(driverData);

          // Set edit fields with fetched profile data
          setEditName(driverData.fullName);
          setEditEmail(driverData.email);
          setEditUsername(driverData.username);
          setEditNic(driverData.nic);
          setEditPhone(driverData.phone);
          setEditAddress(driverData.address);
        })
        .catch(error => {
          console.error('Error fetching driver profile:', error);
          navigate('/DriverDashboard'); // Redirect if there is an error
        });

      axios.post('http://localhost:3000/api/v1/driver/get-ride-count', {
        driverId: userDetailsParse.id
      })
        .then(res => {
          setTotalRideCount(res.data.message)
        }).catch(err => {
          console.log(err)
        })

      // Fetch Total Earnings
      axios.post('http://localhost:3000/api/v1/driver/total-earnings', {
        driverId: userDetailsParse.id
      })
        .then(res => {
          setTotalEarnings(res.data.message); // Set total earnings in state
        })
        .catch(err => {
          console.log(err);
        });


      // Fetch vehicles for the driver
      axios.post('http://localhost:3000/api/v1/vehicle/get-vehicles-by-driver', {
        driverId: userDetailsParse.id
      })
        .then(res => {
          setVehicles(res.data.data); // Set vehicles in state
          console.log(res.data.data); // Set vehicle
        })
        .catch(err => {
          console.log('Error fetching vehicle details:', err);
        });



    }
  }, [navigate]);

  // Handle modal open
  const handleShow = () => setShowModal(true);

  // Handle modal close
  const handleClose = () => setShowModal(false);


  // Handle modal open for vehicle registration
  const handleShowVehicleModal = () => setShowVehicleModal(true);

  // Handle modal close for vehicle registration  
  const handleCloseVehicleModal = () => setShowVehicleModal(false);

  // Handle modal open for vehicle update
  const handleShowUpdateModal = (vehicleNumber) => {
    setSelectedVehicleNumber(vehicleNumber); // Set selected vehicle number to update
    setShowUpdateModal(true); // Open the modal
  };

  const handleCloseUpdateModal = () => setShowUpdateModal(false); // Close the modal



  // Handle form submission (e.g., update profile)
  const handleSaveChanges = () => {
    // Add logic to save changes (e.g., send update request to backend)
    console.log('Updated name:', editName);
    console.log('Updated email:', editEmail);
    console.log('Updated username:', editUsername);
    console.log('Updated NIC:', editNic);
    console.log('Updated phone:', editPhone);
    console.log('Updated address:', editAddress);

    // Close the modal after saving
    setShowModal(false);
  };

  // Open the modal and fetch ride details from the API
  const handleViewDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:3000/api/v1/driver/ride-details');
      const data = response.data;
      console.log(data);

      // Assuming the API returns an array of rides, you can set the first ride as an example
      setRideDetails(data[0]); // Or map through the rides depending on your needs

      setEarningShowModal(true);
    } catch (err) {
      console.error('Error fetching ride details:', err);
      setError('Error fetching ride details.');
    } finally {
      setLoading(false);
    }
  };

  const EarningHandleClose = () => setEarningShowModal(false);

  //-----------ride lsit model-----------
  const handleViewRideDetails = () => {
    setRideListModal(true);
  };

  const handleCloseRideDetails = () => {
    setRideListModal(false);
  };


  return (
    <div>
      {/*Navigation Bar */}
      <NavBar />

      <Container fluid className="p-4" >
        <Row className="align-items-center" style={{ height: '100px' }}>

          {/*Vehicle Register Button */}
          <Col md={4} className="d-flex justify-content-center">
            <Button variant="warning" style={{ borderRadius: '50px' }} onClick={handleShowVehicleModal}>
              <FaCar style={{ marginRight: '8px' }} />
              Add Your Vehicle
            </Button>
          </Col>


          {/*Driver Dashboard Title */}
          <Col md={4} className="d-flex justify-content-center">
            <h2 style={{
              color: 'orange', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              Driver's Dashboard

            </h2>
          </Col>

          {/*Logout Button */}
          <Col md={4} className="d-flex justify-content-center">
            <Logout />
          </Col>
        </Row>




        {/* Summary Cards */}
        {/*------------------- Monthly Earnings Card ------------------------- */}
        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-center"
              style={{
                background: 'linear-gradient(125deg, #ffeaa7, #ffeaa7,  #ffeaa7)',
              }}>
              <Card.Body>
                <Card.Title>Monthly Earnings</Card.Title>
                <Card.Text>
                  <h3>Rs. {totalEarnings.toFixed(2)}</h3>
                </Card.Text>
                <Button variant="primary" onClick={handleViewDetails} disabled={loading}>
                  {loading ? 'Loading...' : 'View Details'}
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <MonthlyEarningModal
            show={showEarningModal}
            handleClose={EarningHandleClose}
            rideDetails={rideDetails}
          />


          {/*------------------- Total Ride Card------------------------- */}
          <Col md={4}>
            <Card className="text-center"
              style={{
                background: 'linear-gradient(125deg, #ffeaa7, #ffeaa7,  #ffeaa7)',
              }}>
              <Card.Body>
                <Card.Title>Total Rides</Card.Title>
                <Card.Text>
                  <h3>{
                    totalRideCount > 0 ? totalRideCount : "Loading"
                  }</h3>
                </Card.Text>
                <Button variant="success" onClick={handleViewRideDetails}>View History</Button>
              </Card.Body>
            </Card>
          </Col>
          {/* Ride Modal */}
          <RideModal show={showRideListModal} handleClose={handleCloseRideDetails} />

          {/*------------------- Ratings Card ------------------------- */}

          <Col md={4}>
            <Card className="text-center"
              style={{
                background: 'linear-gradient(125deg, #ffeaa7, #ffeaa7,  #ffeaa7)',
              }}>
              <Card.Body>
                <Card.Title>Rating</Card.Title>
                <Card.Text>
                  <h3>5.0 <span style={{ color: 'gold' }}>★</span></h3>
                </Card.Text>
                <Button variant="info">View Reviews</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>


        {/* Dashboard sections */}


        <Row>

          {/*Google Map  */}
          <Col md={8}>
            <MapComponent />
          </Col>

          <Col md={4}>


            <Card>
              <Card.Header>Driver Profile</Card.Header>
              <Card.Body className="text-center">
                {/* Display Driver's Profile Image */}
                <Image

                  src="https://cdn-icons-png.flaticon.com/512/8583/8583437.png"
                  roundedCircle
                  fluid
                  style={{ width: '120px', height: '120px' }}
                  alt="Driver Profile"
                />
                <p className="mt-3"><strong>Name: </strong>{driver?.fullName || 'Loading...'}</p>
                <p><strong>Email: </strong>{driver?.email || 'Loading...'}</p>
                <Button variant="warning" onClick={handleShow}>Edit Profile</Button>
              </Card.Body>
            </Card>

            <br />

            <Card className="mb-4">
              <Card.Header>Vehicle Details</Card.Header>
              <Card.Body className="text-center">
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <div key={vehicle.vehicleNumber} className="mb-3">
                      <UpdateVehicle
                        show={showUpdateModal} // Pass the modal visibility state
                        handleClose={handleCloseUpdateModal} // Pass the function to close the modal
                        vehicleNumber={selectedVehicleNumber} // Pass the selected vehicle number
                      />
                      {/* Display Vehicle Image */}
                      <Image
                        src={vehicle.ImagePath}
                        roundedCircle
                        fluid
                        style={{ width: '120px', height: '120px' }}
                        alt="Vehicle Details"
                      />
                      <p className="mt-3"><strong>Vehicle Number: </strong>{vehicle.vehicleNumber}</p>
                      <p><strong>Vehicle Type: </strong>{vehicle.vehicleModel}</p>
                      <Button variant="success" onClick={() => handleShowUpdateModal(vehicle.vehicleNumber)}>
                        <strong>Update</strong>
                      </Button>
                    </div>
                  ))
                ) : (
                  <p>Loading vehicles...</p>
                )}
              </Card.Body>
            </Card>


            {/* Use the EditProfileModal component */}
            <EditProfileModal
              show={showModal}
              handleClose={handleClose}
              editName={editName}
              setEditName={setEditName}
              editEmail={editEmail}
              setEditEmail={setEditEmail}
              editUsername={editUsername}
              setEditUsername={setEditUsername}
              editNic={editNic}
              setEditNic={setEditNic}
              editPhone={editPhone}
              setEditPhone={setEditPhone}
              editAddress={editAddress}
              setEditAddress={setEditAddress}
              handleSaveChanges={handleSaveChanges}
              driverId={driverId}
            />


            {/* Vehicle Registration Modal */}
            <RegisterVehicle
              show={showVehicleModal}
              handleClose={handleCloseVehicleModal}
            />
          </Col>



          <Col md={12} >
            <Card className="mb-4" style={{ padding: "15px" }}>

              <RidesTable />
            </Card>

          </Col>

        </Row>
      </Container>
      {/**/}<ChatComponent />
      <Footer />

    </div>
  );
}
