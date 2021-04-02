import React from "react";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import moment from "moment";

/*------------------------------------------------------------------------------------*/

export default function AdminPage(props) {
  const [appointmentsMade, setAppointmentsMade] = useState([]);
  const [newAppointment, setNewAppointment] = useState(false);
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("")

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
  /*------------------------------------------------------------------------------------*/
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userObj) => {
      if (userObj) {
        props.setUser(userObj);
      }
    });
  });
  /*------------------------------------------------------------------------------------*/
  function newAppointmentClickHandler() {
    setNewAppointment(!newAppointment);
  }
  /*------------------------------------------------------------------------------------*/
  function handleChange(evt) {
    let target = evt.target;
    setSelected(target.value);
  }
  function filter(evt) {
    evt.preventDefault();
    // url is made to fetch with the query params
    let url = `/filter?${selected}=${evt.target[0].value}`;
    console.log(url);
    //fetching by using the URL
    fetch(url)
      .then((res) => res.json())
      .then((appointmentList) => {
        setAppointmentsMade(appointmentList);
      });
  }
  /*------------------------------------------------------------------------------------*/
  function searchChange(evt) {
    let target = evt.target;
    setSearch(target.value);
  }

  function searchQuery(evt) {
    evt.preventDefault();
    let query = `/search?${search}=${evt.target[0].value}`;
    console.log(`query`, query);
    fetch(query)
      .then((res) => res.json())
      .then((appointmentList) => {
        setAppointmentsMade(appointmentList);
      });

    //console.log(search);
  }
  /*------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (appointmentsMade.length === 0) {
      fetch("/api")
        .then((res) => res.json())
        .then((appointmentList) => {
          setAppointmentsMade(appointmentList);
        });
    }
  });
  /*------------------------------------------------------------------------------------*/
  function startChangeHandler(evt){
    setStartDate(evt.target.value)
  }
  function endChangeHandler(evt){
    setEndDate(evt.target.value)
  }
  function Download(evt) {
    //window.location='/'
    evt.preventDefault();
    ;
    console.log(startDate);
     console.log(endDate);
    let downloadCSV = `/csv?startDate=${startDate}&endDate=${endDate}`;
    fetch(downloadCSV)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        console.log("urltest", url);
        let a = document.createElement("a");
        console.log(a);
        a.href = url;
        a.download = "Appointments.csv";
        a.click();
      });
  }
  /*------------------------------------------------------------------------------------*/
  let appointmentArr = [];
  appointmentsMade &&
    appointmentsMade.forEach((appointment) => {
      appointmentArr.push(appointment);
    });
  console.log("user at admin page is", props.user);
  /*------------------------------------------------------------------------------------*/
  
  
  
  
  
  /*------------------------------------------------------------------------------------*/
  return props.user ? (
    <div>
      <div className="admin-container">
        <div className="admin-header">
          <form method="GET" action="/csv" onSubmit={Download}>
            
              <input type="date" onChange={startChangeHandler} name="startDate" placeholder="From:" />  
              <input type="date" onChange={endChangeHandler}name="endDate" placeholder="To:" />
           
            <button type="submit">Export as CSV</button>
          </form>
        </div>
        {/*------------------------------------------------------------------------------------*/}
        <h2>Appointment details</h2>

        <form value={search} onChange={searchChange} onSubmit={searchQuery}>
          <input type="text" name="search" placeholder="Search:" />
          <button type="submit" value="Search">
            Search
          </button>
        </form>
        {/*------------------------------------------------------------------------------------*/}
        {/* to filter the entries according to their values */}
        <select name="selection" value={selected} onChange={handleChange}>
          <option value="">Filter By</option>
          <option value="serviceName">Service Name</option>
          <option value="customerName">Customer Name</option>
          <option value="date">Date of Appointment</option>
        </select>
        <div className="Filter">
          {selected && (
            <form id="FilterContainer" onSubmit={filter}>
              <label>
                <input type="text" name="filter" placeholder="Filter:" />
              </label>
              <input type="submit" value="Filter" />
            </form>
          )}
        </div>
        <Link to={"/admin"}>
          <button onClick="window.location.reload()" id="remove-all-filters">
            Remove All Filters
          </button>
        </Link>
        {/*------------------------------------------------------------------------------------*/}
        <button onClick={newAppointmentClickHandler}>
          Create New Appointment
        </button>
        <button onClick={props.logOut}>Sign Out</button>
        {newAppointment && (
          <form method="POST" action="/adminapi" id="schedule-form">
            <label>
              Name: <input type="text" name="customerName" />
            </label>

            <label>
              Phone Number: <input type="text" name="phoneNumber" />
            </label>
            <label>
              Email: <input type="text" name="email" />
            </label>
            <label>
              Make, Year, and Model of your vehicle:{" "}
              <input type="text" name="vehicleMake" />
            </label>
            <label>
              Vehicle Type:{" "}
              <select name="vehicleType">
                <option value="coupe/sedan">Coupe/Sedan</option>
                <option value="hatchback/crossover">Hatchback/Crossover</option>
                <option value="suv/truck/minivan">SUV/Truck/Minivan</option>
              </select>
            </label>
            <label>
              Additional Notes or Request:{" "}
              <input type="text" name="additionalNotes" />
            </label>
            <label>
              Select a Day:{" "}
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
    </div>
  ) : (
    <Redirect to="/" />
  );
}
