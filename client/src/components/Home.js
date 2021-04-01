import React from "react";
//import DateTimePicker from 'react-datetime-picker'
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [hatchCrossOver, setHatchCrossOver] = useState(false);
  const [coupeSedan, setCoupeSedan] = useState(false);
  const [suvTruckVan, setSuvTruckVan] = useState(false);
  const [dateOfApp, setDateOfApp] = useState("");
  const [time, setTime] = useState("");
  const previousTime = usePrevious(time);
  const previousDate = usePrevious(dateOfApp);
  const [unavailableEight, setUnavailableEight] = useState(false);
  const [unavailableNoon, setUnavailableNoon] = useState(false);
  const [appointmentsMade, setAppointmentsMade] = useState([]);
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

  function dateChangeHandle(evt) {
    setDateOfApp(evt.target.value);
    setTime("");
    setUnavailableEight(false);
    setUnavailableNoon(false);
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
    appointmentArr.forEach((appointment) => {
      if (
        appointment.date === dateOfApp &&
        appointment.timeOfApp === "8:00am"
      ) {
        scheduleArrEight.push(appointment);
        if (scheduleArrEight.length > 3) {
          setUnavailableEight(true);
        }
      }
      if (
        appointment.date === dateOfApp &&
        appointment.timeOfApp === "12:00pm"
      ) {
        scheduleArrNoon.push(appointment);
        if (scheduleArrNoon.length > 3) {
          setUnavailableNoon(true);
        }
      }
    });
  }
  return (
    <div className="home-container">
      <h2 id="schedule-header">Schedule an Appointment</h2>
      <form method="POST" action="/api" id="schedule-form">
        <label>
          Name: <br />
          <input type="text" name="customerName" />
        </label>
        <br />

        <label>
          Phone Number: <br /> <input type="text" name="phoneNumber" />
        </label>
        <br />
        <label>
          Email: <br />
          <input type="text" name="email" />
        </label>
        <br />
        <label>
          Make, Year, and Model of your vehicle: <br />
          <input type="text" name="vehicleMake" />
        </label>
        <br />
        <label>
          Vehicle Type: <br />
          <select name="vehicleType">
            <option
              value="coupe/sedan"
              onClick={(evt) => setCoupeSedan(!coupeSedan)}
            >
              Coupe/Sedan
            </option>
            <option value="hatchback/crossover">Hatchback/Crossover</option>
            <option value="suv/truck/minivan">SUV/Truck/Minivan</option>
          </select>
        </label>
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
          />
        </label>
        <br />
        <label>
          Select a Time: <br />
          <select
            name="timeOfApp"
            onChange={(evt) => setTime(evt.target.value)}
            value={time}
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
        <br />
        <input
          type="submit"
          value="Schedule Appointment"
          style={{ width: "15vw" }}
        />
      </form>
    </div>
  );
}
