import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import axios from 'axios';

const RideModal = ({ show, handleClose }) => {
  const [rideDetails, setRideDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch ride details when the modal is opened
  useEffect(() => {
    const fetchRideDetails = async () => {
      if (show) {
        setLoading(true);
        setError(null);

        try {
          const response = await axios.get('http://localhost:3000/api/v1/driver/ride-details');
          const data = response.data;
console.log(data);
          // Assuming the API returns an array of ride details, and you're displaying the first one
          setRideDetails(data[0]); // Adjust as per your data structure
        } catch (err) {
          console.error('Error fetching ride details:', err);
          setError('Failed to fetch ride details.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRideDetails();
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ride Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : rideDetails ? (
          <Table bordered>
            <thead>
              <tr>
                <th>Ride ID</th>
                <th>Pickup Location</th>
                <th>Drop Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{rideDetails.id}</td>
                <td>{rideDetails.pickupLocation}</td>
                <td>{rideDetails.dropLocation}</td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <p>No ride details available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RideModal;
