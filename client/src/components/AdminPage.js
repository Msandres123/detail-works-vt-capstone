//imports from react
import React from "react";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {app, auth} from "./FirebaseAuth"

// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/database";
import moment from "moment";
import AppointmentScheduler from "./AppointmentScheduler";
import NavBar from "./NavBar";
const json2csv = require("json2csv").parse;

/*------------------------------------------------------------------------------------*/

export default function AdminPage(props) {
  const [appointmentsMade, setAppointmentsMade] = useState([]);
  const [newAppointment, setNewAppointment] = useState(false);
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  /*------------------------------------------------------------------------------------*/
  useEffect(() => {
    auth.onAuthStateChanged((userObj) => {
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
  // Function to filter the items,the query from server and get the results
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
  function startChangeHandler(evt) {
    setStartDate(evt.target.value);
  }
  function endChangeHandler(evt) {
    setEndDate(evt.target.value);
  }
  function Download(evt) {
    evt.preventDefault();
    let fields = [
      "firstName",
      "lastName",
      "email",
      "appointmentDate",
      "detailWorksList",
      "spectrumList",
    ];

    let downloadCSV = `/csv?startDate=${startDate}&endDate=${endDate}`;
    fetch(downloadCSV)
      .then((res) => res.json())
      .then((appointmentList) => {
        //convert the data fetched as csv
        let csv = json2csv(appointmentList, { fields });
        //.csv cannot be sent directly as a file to be downloaded , so here we are converting csv to a file
        let contentType = "text/csv";
        let csvFile = new Blob([csv], { type: contentType });

        //creating a URL to download the file with all the required fields fetched from the database
        const url = window.URL.createObjectURL(csvFile);
        let a = document.createElement("a");
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
  return props.user ? (
    <div id="admin-page">
      <NavBar logOut={props.logOut} />
      <div className="admin-container">
        <div className="admin-header">
          <div id="search-container">
            <h2>Appointment Search Filter</h2>

            <form value={search} onChange={searchChange} onSubmit={searchQuery}>
              <input type="text" name="search" placeholder="Search:" />

              <button type="submit" value="Search">
                Search
              </button>
            </form>
            {/*------------------------------------------------------------------------------------*/}
            {/* to filter the entries according to their values */}
            <div id="Filter">
              {selected && (
                <form id="FilterContainer" onSubmit={filter}>
                  <label>
                    <input type="text" name="filter" placeholder="Filter:" />
                  </label>
                  <input type="submit" value="Filter" />
                </form>
              )}
              <select name="selection" value={selected} onChange={handleChange}>
                <option value="">Filter By</option>
                <option value="service">Service Name</option>
                <option value="lastName">Last Name</option>
                <option value="appointmentDate">Date of Appointment</option>
              </select>

              <Link to={"/admin"}>
                <button
                  onClick={"window.location.reload()"}
                  id="remove-all-filters"
                >
                  Remove All Filters
                </button>
              </Link>
            </div>
            {/*------------------------------------------------------------------------------------*/}
            <div id="export-details">
              <h2>Export Appointment Details</h2>
              <form method="GET" action="/csv" onSubmit={Download}>
                <input
                  type="date"
                  onChange={startChangeHandler}
                  name="startDate"
                  placeholder="From:"
                />
                <input
                  type="date"
                  onChange={endChangeHandler}
                  name="endDate"
                  placeholder="To:"
                />

                <button type="submit">Export as CSV</button>
              </form>
            </div>
            {/*------------------------------------------------------------------------------------*/}
            <div id="admin-buttons-container">
              <div>
                <button onClick={newAppointmentClickHandler}>
                  Create New Appointment
                </button>

                <button onClick={props.logOut}>Sign Out</button>
              </div>

              {newAppointment && (
                <div id="admin-scheduler-container">
                  {" "}
                  <AppointmentScheduler />{" "}
                </div>
              )}
            </div>

            {/*------------------------------------------------------------------------------------*/}
            <div id="data-container">
              <h1>Up-Coming Appointments</h1>
              {appointmentArr.map((appointment, index) => {
                return (
                  <div id="appointment-container" key={index}>
                    <h4>Day: {appointment.appointmentDate}</h4>
                    <h5>Time: {appointment.timeOfApp}</h5>
                    <p>First Name: {appointment.firstName}</p>
                    <p>Last Name: {appointment.lastName}</p>
                    <p>Phone Number: {appointment.phoneNumber}</p>
                    <p>Email: {appointment.email}</p>
                    {appointment.detailWorksList === "Yes" ? (
                      <p>
                        Signed up for Detail Works e-mail List:{" "}
                        {appointment.detailWorksList}
                      </p>
                    ) : (
                      <p>Signed up for Detail Works e-mail List: No </p>
                    )}
                    {appointment.spectrumList === "Yes" ? (
                      <p>
                        Signed up for Spectrum e-mail List:{" "}
                        {appointment.spectrumList}
                      </p>
                    ) : (
                      <p>Signed up for Spectrum e-mail List: No </p>
                    )}
                    <p>Vehicle Make, Year, Model: {appointment.vehicleMake}</p>
                    <p>Vehicle Type: {appointment.vehicleType}</p>
                    <p>Services: {appointment.service}</p>
                    <p>Price: ${appointment.price}</p>
                    <p>
                      Appointment Made On:{" "}
                      {moment(appointment.dateAppMade).format("l")}
                    </p>
                    <Link to={`/admin/${appointment._id}`}>
                      <button>Update or Cancel Appointment</button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div> ): (
  <Redirect to=""/> ) 
}
