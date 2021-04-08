import React from "react";
// import DatePicker from "react-date-picker";
import { useState, useEffect, useRef } from "react";
//Service Pricing Components
import CoupePrice from "./CoupePrice";
import HatchbackPrice from "./HatchbackPrice";
import SuvPrice from "./SuvPrice";

export default function AppointmentScheduler() {
  //Service Variables
  const [vehicleType, setVehicleType] = useState("");
  const [price, setPrice] = useState(0);
  //Scheduling Variables
  const [dateOfApp, setDateOfApp] = useState("");
  const [time, setTime] = useState("");
  const previousDate = usePrevious(dateOfApp);
  const [unavailableEight, setUnavailableEight] = useState(false);
  const [unavailableNoon, setUnavailableNoon] = useState(false);
  const [appointmentsMade, setAppointmentsMade] = useState([]);
  const [scheduledNoon, setscheduledNoon] = useState(0);
  const [scheduledEight, setScheduledEight] = useState(0);
  const [blackedOut, setBlackedOut] = useState(false);
  const [email, setEmail] = useState("");
  const [matchEmail, setMatchEmail] = useState("");

  //   const isWeekday = date => {
  //     const day = getDay(date);
  //     return day !== 0 && day !== 6;
  //   }
  //prevents user from scheduling appointment for a date in the past
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

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  //   function noWeekends(dateString) {
  //       console.log("I'm Hit Ked")
  //     const day = (new Date(dateString)).getDay();
  //     if (day === 0 || day === 6 ) {
  //       setBlackedOut(true);
  //     }
  //     setBlackedOut(false);
  //   }

  function dateChangeHandle(evt) {
    setDateOfApp(evt.target.value);
    setTime("");
    setUnavailableEight(false);
    setUnavailableNoon(false);
    // noWeekends()
  }

  function vehicleChangeHandle(evt) {
    setVehicleType(evt.target.value);
    setPrice(0);
  }

  function emailChangeHandle(evt) {
    setEmail(evt.target.value);
  }

  function emailMatchChangeHandle(evt) {
    setMatchEmail(evt.target.value);
  }

  function alertOnSubmit() {
    alert("Your appointment has been successfully booked");
    
  }

  useEffect(() => {
    if (dateOfApp !== previousDate) {
      fetch(`/api/`)
        .then((res) => res.json())
        .then((appointmentList) => {
          setAppointmentsMade(appointmentList);
        });
    }
    blackOut();
  });

  let appointmentArr = [];
  appointmentsMade &&
    appointmentsMade.forEach((appointment) => {
      appointmentArr.push(appointment);
    });

  function blackOut() {
    let scheduleArrEight = [];
    let scheduleArrNoon = [];
    setScheduledEight(0);
    setscheduledNoon(0);
    appointmentArr.forEach((appointment) => {
      if (
        appointment.appointmentDate === dateOfApp &&
        appointment.timeOfApp === "8:00am"
      ) {
        scheduleArrEight.push(appointment);
        console.log("eight", scheduleArrEight);
        setScheduledEight(scheduleArrEight.length);
        if (scheduleArrEight.length > 3) {
          setUnavailableEight(true);
        }
      }
      if (
        appointment.appointmentDate === dateOfApp &&
        appointment.timeOfApp === "12:00pm"
      ) {
        scheduleArrNoon.push(appointment);
        console.log("noon arr", scheduleArrNoon);
        setscheduledNoon(scheduleArrNoon.length);

        if (scheduleArrNoon.length > 3) {
          setUnavailableNoon(true);
        }
      }
    });
  }

  return (
    <div id="appointment-scheduler-container">
      <h2 id="schedule-header">Schedule an Appointment</h2>
      <form method="POST" action="/api" id="schedule-form" onSubmit={alertOnSubmit}>
        <container id="form-name">
          <span className="first-name">
            First Name: <br />
            <input type="text" name="firstName" required />
          </span>
          <span>
            Last Name: <br />
            <input type="text" name="lastName" required />
          </span>
        </container>

        <br />
        <container id="email-form">
          <span id="email">
            Email: <br />
            <input
              type="email"
              name="email"
              required
              onChange={emailChangeHandle}
            />
          </span>
          <br />
          <span>
            Confirm Email: <br />
            <input
              type="email"
              name="confirmEmail"
              required
              onChange={emailMatchChangeHandle}
            />
          </span>
        </container>
        {email !== matchEmail && <div id="email-match">Emails Must Match</div>}
        <br />
        <label>
          Phone Number (###-###-####): <br />{" "}
          <input
            type="tel"
            name="phoneNumber"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
        </label>
        <br />
        <label>
          <input type="checkbox" name="detailWorksList" value="Yes" />
          Yes, please add me to the Detail Works e-mail list!
        </label>
        <label>
          <input type="checkbox" name="spectrumList" value="Yes" />
          Yes, please add me to the Spectrum e-mail list!
        </label>
        <br />
        <label>
          Make, Year, and Model of your vehicle: <br />
          <input type="text" name="vehicleMake" required />
        </label>
        <br />
        <label>
          Vehicle Type: <br />
          <select name="vehicleType" onChange={vehicleChangeHandle}>
            <option value="select vehicle type">Select Vehicle Type</option>
            <option value="coupe/sedan">Coupe/Sedan</option>
            <option value="hatchback/crossover">Hatchback/Crossover</option>
            <option value="suv/truck/minivan">SUV/Truck/Minivan</option>
          </select>
        </label>
        {vehicleType === "coupe/sedan" && (
          <CoupePrice price={price} setPrice={setPrice} />
        )}
        {vehicleType === "hatchback/crossover" && (
          <HatchbackPrice price={price} setPrice={setPrice} />
        )}
        {vehicleType === "suv/truck/minivan" && (
          <SuvPrice price={price} setPrice={setPrice} />
        )}
        <br />
        <label>
          Additional Notes or Request: <br />
          <input type="text" name="additionalNotes" />
        </label>
        <br />
        <container id="date-time">
          <span id="day">
            Select a Day: <br />
            <input
              id="calender"
              type="date"
              name="appointmentDate"
              min={today}
              onChange={(evt) => dateChangeHandle(evt)}
              required
            />
          </span>
          <br />
          <span>
            Select a Time: <br />
            <select
              name="timeOfApp"
              onChange={(evt) => setTime(evt.target.value)}
              value={time}
              required
            >
              <option value="">Select A Time</option>
              <option value="8:00am" disabled={unavailableEight}>
                8:00am
              </option>
              <option value="12:00pm" disabled={unavailableNoon}>
                12:00pm
              </option>
            </select>
          </span>
        </container>
        {dateOfApp && (
          <h6>There are {4 - scheduledEight} appointments remaining at 8:00am</h6>
        )}
        {dateOfApp && (
          <h6>There are {4 - scheduledNoon} appointments remaining at 12:00pm</h6>
        )}
        <br />
        {price > 0 && <h4>Your total is ${price}</h4>}
        <input type="hidden" name="price" value={price} />
        <input
          class="submit"
          type="submit"
          value="Schedule Appointment"
          style={{ width: "15vw" }}
          disabled={email !== matchEmail}
          
        />
      </form>
    </div>
  );
}
