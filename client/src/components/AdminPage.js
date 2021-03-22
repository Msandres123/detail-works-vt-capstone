import React from "react";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom"


export default function AdminPage() {
  const [appointmentsMade, setAppointmentsMade] = useState([]);
 
  
  useEffect(() => {
    if (appointmentsMade.length === 0) {
      fetch("/api")
        .then((res) => res.json())
        .then((appointmentList) => {
          setAppointmentsMade(appointmentList);
        });
    }
  });

  let appointmentArr = [];

  appointmentsMade &&
    appointmentsMade.forEach((appointment) => {
      appointmentArr.push(appointment);
    });

  return (
    <div>
      <h1>Up-Coming Appointments</h1>
      {appointmentArr.map((appointment, index) => {
        return (
          <div id="appointment-container">
            <h4>Day: {appointment.dateOfApp}</h4>
            <p>Time: {appointment.timeOfApp}</p>
            <p>Customer: {appointment.customerName}</p>
            <p>Phone Number: {appointment.phoneNumber}</p>
            <p>Email: {appointment.email}</p>
            <p>Vehicle Make, Year, Model: {appointment.vehicleMake}</p>
            <p>Vehicle Type: {appointment.vehicleType}</p>
            <p>Appointment Made On: {appointment.dateAppMade}</p>
            <Link to={`/admin/${appointment._id}`}><button>Update or Cancel Appointment</button></Link>
          </div>
        );
      })}
    </div>
  );
}
