import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Table, Card } from 'react-bootstrap';
import { FaClock } from 'react-icons/fa';
import Swal from 'sweetalert2';

const RecentBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [passengerId , setPassengerId] = useState("");

  useEffect(() => {
    setPassengerId(localStorage.getItem('passenger'));
    const id = passengerId && JSON.parse(passengerId).id; 

    axios.post('http://localhost:3000/api/v1/passenger/ride-history', {
      passengerId: id, // This is a hardcoded passenger ID for now
    })
      .then((response) => {
        console.log(response.data.data);
        setBookings(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching passenger bookings: ', error);
      });
  }, [passengerId]);

  return (
    <Container fluid className="p-5">
      <Card className="text-black m-5" style={{ borderRadius: '15px', boxShadow: '0 4px 30px rgba(0,0,0,0.1)' }}>
        <Card.Body>
          <h1 className="text-center fw-bold mb-4" style={{ color: 'red' }}>
            Recent Booking Activities <FaClock />
          </h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Booking Date</th>
                <th>Pickup Location</th>
                <th>Drop-off Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
             {
              bookings.length > 0 ?
              bookings && 
              bookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{index + 1}</td>
                  <td>{booking.createdAt}</td>
                  <td>{booking.pickupLocation}</td>
                  <td>{booking.dropLocation}</td>
                  <td>{booking.status}</td>
                </tr>
              ))

              : <tr><td colSpan="5" className="text-center">No bookings found</td></tr>
            }
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecentBookings;
