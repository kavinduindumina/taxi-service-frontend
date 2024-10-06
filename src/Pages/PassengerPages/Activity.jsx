import React from 'react';
import { Container, Table, Card } from 'react-bootstrap';
import { FaClock } from 'react-icons/fa';

const RecentBookings = () => {
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
              {/* This is where you will map over your booking data */}
              {/* Example:
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.pickup}</td>
                  <td>{booking.drop}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
              */}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecentBookings;
