import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagePassengerDetails.css'; 

const ManagePassengerDetails = () => {
  const [passengers, setPassengers] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPassengers = async () => {
      const data = [
        { id: 1, email: 'nethmi.com', fullName: 'Nethmi', userName: 'nethmi_n', nic: '200050301058', phone: '076-4016954', address: '24, Richmond Hill, Galle' },
        { id: 2, email: 'indumina.com', fullName: 'KGK Indumina', userName: 'indumina_d', nic: '20028283789239', phone: '077-1330645', address: '17, Elliot Rd, Galle' },
        { id: 3, email: 'chinthaka.com', fullName: 'Chinthaka', userName: 'chinthaka_c', nic: '19978283789239', phone: '076-4016954', address: '45, Baddegama Rd, Galle' },
        { id: 4, email: 'inushki.com', fullName: 'Inushki', userName: 'inushki_i', nic: '20014870903', phone: '072-37627463', address: '78, Labuduwa Rd, Galle' },
        { id: 5, email: 'nirasha.com', fullName: 'Nirasha', userName: 'nirasha_i', nic: '19995874902', phone: '078-50617387', address: '45, Matara Rd, Galle' },




      ];
      setPassengers(data);
    };
    fetchPassengers();
  }, []);

  const handleEdit = (id) => {
    console.log('Edit passenger with ID:', id);
    // Add your logic for editing passenger
  };

  const handleDelete = (id) => {
    console.log('Delete passenger with ID:', id);
    // Add your logic for deleting passenger
  };

  return (
    <div className="manage-passenger-container">
      <h2>Manage Passenger Details</h2>

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate('/CallOperatorDashboard')}>
        Back
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>NIC</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((passenger) => (
            <tr key={passenger.id}>
              <td>{passenger.id}</td>
              <td>{passenger.email}</td>
              <td>{passenger.fullName}</td>
              <td>{passenger.userName}</td>
              <td>{passenger.nic}</td>
              <td>{passenger.phone}</td>
              <td>{passenger.address}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(passenger.id)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(passenger.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePassengerDetails;