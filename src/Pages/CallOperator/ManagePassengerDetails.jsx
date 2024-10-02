import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagePassengerDetails.css'; 

const ManagePassengerDetails = () => {
  const [passengers, setPassengers] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    
    const fetchPassengers = async () => {
      
      const data = [
        { id: 1, email: 'oshadan@icloud.com', fullName: 'Oshada Wickramasinghe', userName: 'oshada_n', nic: '2001278436782', phone: '123-456-7890', address: '24, Richmond Hill, Galle' },
        { id: 2, email: 'mithilad@outlook.com', fullName: 'Mithila Damruwan', userName: 'mithila_d', nic: '29908283789239', phone: '897-237-675', address: '17, Elliot Rd, Galle' },
      ];

      setPassengers(data);
    };

    fetchPassengers();
  }, []);

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
            <th>FullName</th>
            <th>Username</th>
            <th>NIC</th>
            <th>Phone</th>
            <th>Address</th>
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

  const handleEdit = (id) => {
    console.log('Edit passenger with ID:', id);
    // Add your logic for editing passenger
  };

  const handleDelete = (id) => {
    console.log('Delete passenger with ID:', id);
    // Add your logic for deleting passenger
  };
};

export default ManagePassengerDetails;