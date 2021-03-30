import React from "react";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import moment from "moment";
// import exportCSV from './ExportCSV'

export default function AdminPage(props) {
  const [appointmentsMade, setAppointmentsMade] = useState([]);
  const [newAppointment, setNewAppointment] = useState(false);
  const [selected, setSelected] = useState("");
  // const [export, setExport] = useState(false)

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userObj) => {
      if (userObj) {
        props.setUser(userObj);
      }
    });
  });

  function newAppointmentClickHandler() {
    setNewAppointment(!newAppointment);
  }
  function handleChange(evt) {
    let target = evt.target;
    setSelected(target.value);
  }
  function search(evt) {
    evt.preventDefault();
    // url is made to fetch with the query params
    let url = `/search?${selected}=${evt.target[0].value}`;
    console.log(url);
    //fetching by using the URL
    fetch(url)
      .then((res) => res.json())
      .then((appointmentList) => {
        setAppointmentsMade(appointmentList);
      });
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
      <h2>Appointment details</h2>

      {/* to filter the entries according to their values */}
      <select name="selection" value={selected} onChange={handleChange}>
        <option value="">Search By</option>
        <option value="serviceName">Service Name</option>
        <option value="customerName">Customer Name</option>
        <option value="date">Date of Appointment</option>
      </select>
      <div className="search">
        {selected && (
          <form id="searchContainer" onSubmit={search}>
            <label>
              <input type="text" name="search" placeholder="Search:" />
            </label>
            <input type="submit" value="Search" />
          </form>
        )}
      </div>
      <Link to={"/admin"}>
        <button onClick="window.location.reload()" id="remove-all-filters">
          Remove All Filters
        </button>
      </Link>
      <button onClick={newAppointmentClickHandler}>
        Create New Appointment
      </button>
      <button onClick={props.logOut}>Sign Out</button>
      {newAppointment && (
        <form method="POST" action="/adminapi" id="schedule-form">
          <label>
            Name: <br />
            <input type="text" name="customerName" />
          </label>

          <label>
            Phone Number: <br />
            <input type="text" name="phoneNumber" />
          </label>
          <label>
            Email: <br />
            <input type="text" name="email" />
          </label>
          <label>
            Make, Year, and Model of your vehicle: <br />
            <input type="text" name="vehicleMake" />
          </label>
          <label>
            Vehicle Type: <br />
            <select name="vehicleType">
              <option value="coupe/sedan">Coupe/Sedan</option>
              <option value="hatchback/crossover">Hatchback/Crossover</option>
              <option value="suv/truck/minivan">SUV/Truck/Minivan</option>
            </select>
          </label>
          <label>
            Additional Notes or Request: <br />
            <input type="text" name="additionalNotes" />
          </label>
          <label>
            Select a Day: <br />
            <input
              id="calender"
              type="date"
              value={appointmentsMade.date}
              name="date"
              min={today}
            />
          </label>
          <label>
            Select a Time:
            <br />
            <select name="timeOfApp">
              <option value="8:00am">8:00am</option>
              <option value="12:00pm">12:00pm</option>
            </select>
          </label>
          <input
            type="submit"
            value="Schedule Appointment"
            style={{ width: "15vw" }}
          />
        </form>
      )}
      <h1>Up-Coming Appointments</h1>
      {appointmentArr.map((appointment, index) => {
        return (
          <div>
            <div id="appointment-container" key={index}>
              <h4>Day: {appointment.date}</h4>
              <p>Time: {appointment.timeOfApp}</p>
              <p>Customer: {appointment.customerName}</p>
              <p>Phone Number: {appointment.phoneNumber}</p>
              <p>Email: {appointment.email}</p>
              <p>Vehicle Make, Year, Model: {appointment.vehicleMake}</p>
              <p>Vehicle Type: {appointment.vehicleType}</p>
              <p>
                Appointment Made On:{" "}
                {moment(appointment.dateAppMade).format("l")}
              </p>
              <Link to={`/admin/${appointment._id}`}>
                <button>Update or Cancel Appointment</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <Redirect to="/" />
  );
}
