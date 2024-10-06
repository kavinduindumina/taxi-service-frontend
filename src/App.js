import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import React from'react';
import './App.css';
import DriverLogin from './Pages/DriverPages/DriverLogin';
import Home from './Pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import DriverRegister from './Pages/DriverPages/DriverRegister';
import DriverDashboard from './Pages/DriverPages/DriverDashboard';
import PassengerLogin from './Pages/PassengerPages/PassengerLogin';
import PassengerRegister from './Pages/PassengerPages/PassengerRegister';
import Scheduleride from './Pages/PassengerPages/Scheduleride';
import PassengerDashboard from './Pages/PassengerPages/PassengerDashboard';
import UserProfile from './Pages/PassengerPages/UserProfile';
import CallOperatorLogin from './Pages/CallOperator/CallOperatorLogin';
import RideBooking from './Pages/CallOperator/RideBooking';  
import { createRoot } from 'react-dom/client';
import CallOperatorDashboard from './Pages/CallOperator/CallOperatorDashboard';
import AddPassenger from './Pages/CallOperator/AddPassenger';
import ManagePassengerDetails from './Pages/CallOperator/ManagePassengerDetails';
import Activity from './Pages/PassengerPages/Activity';


// Get the root DOM element
const rootElement = document.getElementById('root');

// Create the root and render the application
const root = createRoot(rootElement);

root.render(
    <App />
);
function App() {
  
  return (
    
    <div className="App">
      <BrowserRouter>
      <Routes>     
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Home" element={<Home/>}></Route>
        <Route path="/DriverLogin" element={<DriverLogin/>}></Route>
        <Route path="/DriverRegister" element={<DriverRegister/>}></Route>
        <Route path="/DriverDashboard" element={<DriverDashboard/>}></Route>
        <Route path="/PassengerLogin" element={<PassengerLogin/>}></Route>
        <Route path="/PassengerRegister" element={<PassengerRegister/>}></Route>
        <Route path="/PassengerDashboard" element={<PassengerDashboard />}></Route>
        <Route path="/Scheduleride" element={<Scheduleride />}></Route>
        <Route path="/Activity" element={<Activity />}></Route>
        <Route path="/CallOperatorLogin" element={<CallOperatorLogin />}></Route>
        <Route path="/RideBooking" element={<RideBooking />}></Route>
        <Route path="/CallOperatorDashboard" element={<CallOperatorDashboard />}></Route>
        <Route path="/AddPassenger" element={<AddPassenger />}></Route>
        <Route path="/ManagePassengerDetails" element={<ManagePassengerDetails />}></Route>
        <Route path="/UserProfile" element={<UserProfile />} /> 
        

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
