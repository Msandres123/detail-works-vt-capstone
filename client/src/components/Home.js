import React from "react";
// import DatePicker from "react-date-picker";
import { useState, useEffect, useRef } from "react";
//Service Pricing Components
import CoupePrice from "./CoupePrice";
import HatchbackPrice from "./HatchbackPrice";
import SuvPrice from "./SuvPrice";

export default function Home() {
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
  const [email, setEmail] = useState("")


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
    setPrice(0)
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
        appointment.date === dateOfApp &&
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
        appointment.date === dateOfApp &&
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

  function emailMatch () {
    
  }

  console.log(vehicleType);
  return (
    <div className="home-container">
      <h1 id="app-header">Detail Works VT</h1>
      <h3 id="appointment-scheduler-container"><h3>Detail Works Appointment Scheduler</h3>

Please book your appointment with Detail Works, a Spectrum Enterprise, using the below form. We are located at 22 Avenue C, Williston, VT 05495 in a large blue building on the corner of Avenue C and Industrial Avenue.

<h3>PLEASE NOTE OUR DROP OFF AND PICK UP PROCEDURE HAS CHANGED DUE TO COVID-19.</h3>

<h3>Please drop off your vehicle at 22 Avenue C, Williston VT and leave your keys in the overnight drop box located at the front of our building facing Avenue C. Once you’ve dropped your vehicle off call, text, or email us and we will retrieve your car for service. Once your vehicle is completed we will call you for payment and with pickup instructions. Early drop-offs are welcome and appreciated.</h3>

<h3>Comments, questions, or concerns? Give us a call! Our number is (802) 497-2296.</h3></h3>
      <h2 id="schedule-header">Schedule an Appointment</h2>
      <form method="POST" action="/api" id="schedule-form">
        <label>
          First Name: <br />
          <input type="text" name="firstName" required />
        </label>
        <br />
        <label>
          Last Name: <br />
          <input type="text" name="lastName" required />
        </label>
        <br />
        <label>
          Phone Number: <br /> <input type="text" name="phoneNumber" required />
        </label>
        <br />
        <label>
          Email: <br />
          <input type="email" name="email" required />
        </label>
        <br />
        <label>
          Confirm Email: <br />
          <input type="email" name="confirmEmail" required />
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
        <label>
          Select a Day: <br />
          <input
            id="calender"
            type="date"
            name="date"
            min={today}
            onChange={(evt) => dateChangeHandle(evt)}
            required
          />
        </label>
        {/* <DatePicker
        value={value}
        name="date"
        min={today}
        onChange={(evt) => dateChangeHandle(evt)}
      /> */}
        <br />
        <label>
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
        </label>
        {dateOfApp && (
          <h6>There are {4 - scheduledEight} appointments remaing at 8:00am</h6>
        )}
        {dateOfApp && (
          <h6>There are {4 - scheduledNoon} appointments remaing at 12:00pm</h6>
        )}
        <br />
        {price > 0 && <h4>Your total is ${price}</h4>}
        <input type="hidden" name="price" value={price} />
        <input
          type="submit"
          value="Schedule Appointment"
          style={{ width: "15vw" }}
        />
      </form>
    </div>
  );
}
