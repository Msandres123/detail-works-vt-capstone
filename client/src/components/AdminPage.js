import React from "react";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";


export default function AdminPage(props) {
  const [appointmentsMade, setAppointmentsMade] = useState([]);
  const [newAppointment, setNewAppointment] = useState(false)
  
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  
  if (dd < 10) {
    dd = '0' + dd
  }
  
  if (mm < 10) {
    mm = '0' + mm
  }

  today = yyyy + '-' + mm + '-' + dd;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userObj) => {
      if (userObj) {
        props.setUser(userObj)
      } 
    })
    })
  
  function newAppointmentClickHandler() {
    setNewAppointment(!newAppointment)
  }

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
  console.log("user at admin page is", props.user);
  return props.user ? (
    <div>
      <button onClick={newAppointmentClickHandler}>Create New Appointment</button>
      { newAppointment && <form method="POST" action="/adminapi" id="schedule-form">
                <label>Name: <input type="text" name="customerName" /></label>
          
                <label>Phone Number: <input type="text" name="phoneNumber"/></label>
                <label>Email: <input type="text" name="email" /></label>
                <label>Make, Year, and Model of your vehicle: <input type="text" name='vehicleMake' />
                </label>
                <label>Vehicle Type: <select name='vehicleType'>
                <option value="coupe/sedan" >Coupe/Sedan</option>
                <option value="hatchback/crossover">Hatchback/Crossover</option>
                <option value="suv/truck/minivan">SUV/Truck/Minivan</option>
                </select>
                </label>
                <label>Additional Notes or Request: <input type="text" name="additionalNotes"/></label>
                <label>Select a Day: <input id="calender" type="date" name="dateOfApp" min={today} /></label>
                <label>Select a Time: 
                    <select name="timeOfApp">
                        <option value="8:00am">8:00am</option>
                        <option value="12:00pm">12:00pm</option>
                    </select>
                </label>
                <input type="submit" value="Schedule Appointment" style={{ width: "15vw" }}/>
            </form> }
      <h1>Up-Coming Appointments</h1>
      {appointmentArr.map((appointment, index) => {
        return (
          <div id="appointment-container" key={index}>
            <h4>Day: {appointment.dateOfApp}</h4>
            <p>Time: {appointment.timeOfApp}</p>
            <p>Customer: {appointment.customerName}</p>
            <p>Phone Number: {appointment.phoneNumber}</p>
            <p>Email: {appointment.email}</p>
            <p>Vehicle Make, Year, Model: {appointment.vehicleMake}</p>
            <p>Vehicle Type: {appointment.vehicleType}</p>
            <p>Appointment Made On: {appointment.dateAppMade}</p>
            <Link to={`/admin/${appointment._id}`}>
              <button>Update or Cancel Appointment</button>
            </Link>
          </div>
        );
      })}
    </div>
  ) : ( 
   <Redirect to="/" />
  );
}
