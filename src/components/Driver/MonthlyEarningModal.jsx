import React from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

const MonthlyEarningModal = ({ show, handleClose, rideDetails }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ride Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {rideDetails ? (
          <Table bordered>
            <thead>
              <tr>
                <th>Ride ID</th>
                <th>Pickup Location</th>
                <th>Drop Location</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{rideDetails.id}</td>
                <td>{rideDetails.pickup}</td>
                <td>{rideDetails.drop}</td>
                <td>{rideDetails.cost}</td>
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

export default MonthlyEarningModal;
