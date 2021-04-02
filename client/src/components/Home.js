import React from "react";
import DatePicker from "react-date-picker";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [vehicleType, setVehicleType] = useState("");
  //Scheduling Variables
  const [dateOfApp, setDateOfApp] = useState("");
  const [time, setTime] = useState("");
  const previousTime = usePrevious(time);
  const previousDate = usePrevious(dateOfApp);
  const [unavailableEight, setUnavailableEight] = useState(false);
  const [unavailableNoon, setUnavailableNoon] = useState(false);
  const [appointmentsMade, setAppointmentsMade] = useState([]);
  const [scheduledNoon, setscheduledNoon] = useState(0);
  const [scheduledEight, setScheduledEight] = useState(0);
  const [blackedOut, setBlackedOut] = useState(false);
  const [value, onChange] = useState(new Date());

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
  console.log(vehicleType);
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
          <select name="vehicleType" onChange={vehicleChangeHandle}>
            <option value="select vehicle type">Select Vehicle Type</option>
            <option value="coupe/sedan">Coupe/Sedan</option>
            <option value="hatchback/crossover">Hatchback/Crossover</option>
            <option value="suv/truck/minivan">SUV/Truck/Minivan</option>
          </select>
        </label>

        {vehicleType === "coupe/sedan" && <h5>Coupe/Sedan Base Services</h5>}
        {vehicleType === "coupe/sedan" && (
          <label>
            <input type="checkbox" name="service" value="Interior Detailing" />
            Interior Detailing: $120
          </label>
        )}
        {vehicleType === "coupe/sedan" && (
          <label>
            <input type="checkbox" name="service" value="Exterior Detailing" />
            Exterior Detailing: $100
          </label>
        )}
        {vehicleType === "coupe/sedan" && (
          <label>
            <input
              type="checkbox"
              name="services"
              value="Interior/Exterior Combo Detailing"
            />
            Interior/Exterior Combo Detailing: $185
          </label>
        )}
        {vehicleType === "coupe/sedan" && (
          <h5>Interior Add-On Services for Coupes/Sedans:</h5>
        )}
        {vehicleType === "coupe/sedan" && (
          <label>
            <input type="checkbox" name="service" value="Machine Shampoo" />
            Machine Shampoo: $50
          </label>
        )}
        {vehicleType === "coupe/sedan" && (
          <label>
            <input type="checkbox" name="service" value="Pet Hair Removal" />
            Pet Hair Removal: $50
          </label>
        )}
        {vehicleType === "coupe/sedan" && (
          <label>
            <input type="checkbox" name="service" value="Headliner Cleaned" />
            Headliner Cleaned: $30
          </label>
        )}
        {vehicleType === "coupe/sedan" && (
          <label>
            <input type="checkbox" name="service" value="Major Stain Removal" />
            Major Stain Removal: $100
          </label>
        )}
        {vehicleType === "coupe/sedan" && (
          <label>
            <input type="checkbox" name="service" value="Deodorize" />
            Deodorize: $30
          </label>
        )}
        {vehicleType === "coupe/sedan" && (
          <label>
            <input type="checkbox" name="service" value="None Requested" />
            None Requested
          </label>
        )}
        {vehicleType === "coupe/sedan" && (
          <h5>Exterior Add-Ons for Coupes/Sedans:</h5>
        )}
        {vehicleType === "coupe/sedan" && (
          <label>
            <input
              type="checkbox"
              name="service"
              value="Headlight Restoration"
            />
            Headlight Restoration: $40
          </label>
        )}
        {vehicleType === "coupe/sedan" && (
          <label>
            <input type="checkbox" name="service" value="Claybar Service" />
            Claybar Service: $100
          </label>
        )}
        {vehicleType === "coupe/sedan" && (
          <label>
            <input type="checkbox" name="service" value="Deluxe Exterior" />
            Deluxe Exterior (Claybar/Buff/Sealant) $400
          </label>
        )}
        {vehicleType === "coupe/sedan" && (
          <label>
            <input type="checkbox" name="service" value="None Requested" />
            None Requested
          </label>
        )}
        {vehicleType === "hatchback/crossover" && (
          <h5>Hatchback/Crossover Base Services</h5>
        )}
        {vehicleType === "hatchback/crossover" && (
          <label>
            <input type="checkbox" name="service" value="Interior Detailing" />
            Interior Detailing: $135
          </label>
        )}
        {vehicleType === "hatchback/crossover" && (
          <label>
            <input type="checkbox" name="service" value="Exterior Detailing" />
            Exterior Detailing: $120
          </label>
        )}
        {vehicleType === "hatchback/crossover" && (
          <label>
            <input
              type="checkbox"
              name="services"
              value="Interior/Exterior Combo Detailing"
            />
            Interior/Exterior Combo Detailing: $220
          </label>
        )}
        {vehicleType === "hatchback/crossover" && (
          <h5>Interior Add-On Services for Hatchback/Crossover:</h5>
        )}
        {vehicleType === "hatchback/crossover" && (
          <label>
            <input type="checkbox" name="service" value="Machine Shampoo" />
            Machine Shampoo: $60
          </label>
        )}
        {vehicleType === "hatchback/crossover" && (
          <label>
            <input type="checkbox" name="service" value="Pet Hair Removal" />
            Pet Hair Removal: $60
          </label>
        )}
        {vehicleType === "hatchback/crossover" && (
          <label>
            <input type="checkbox" name="service" value="Headliner Cleaned" />
            Headliner Cleaned: $30
          </label>
        )}
        {vehicleType === "hatchback/crossover" && (
          <label>
            <input type="checkbox" name="service" value="Major Stain Removal" />
            Major Stain Removal: $125
          </label>
        )}
        {vehicleType === "hatchback/crossover" && (
          <label>
            <input type="checkbox" name="service" value="Deodorize" />
            Deodorize: $30
          </label>
        )}
        {vehicleType === "hatchback/crossover" && (
          <label>
            <input type="checkbox" name="service" value="None Requested" />
            None Requested
          </label>
        )}
        {vehicleType === "hatchback/crossover" && (
          <h5>Exterior Add-Ons for Hatchback/Crossover:</h5>
        )}
        {vehicleType === "hatchback/crossover" && (
          <label>
            <input
              type="checkbox"
              name="service"
              value="Headlight Restoration"
            />
            Headlight Restoration: $40
          </label>
        )}
        {vehicleType === "hatchback/crossover" && (
          <label>
            <input type="checkbox" name="service" value="Claybar Service" />
            Claybar Service: $125
          </label>
        )}
        {vehicleType === "hatchback/crossover" && (
          <label>
            <input type="checkbox" name="service" value="Deluxe Exterior" />
            Deluxe Exterior (Claybar/Buff/Sealant) $450
          </label>
        )}
        {vehicleType === "hatchback/crossover" && (
          <label>
            <input type="checkbox" name="service" value="None Requested" />
            None Requested
          </label>
        )}
         {vehicleType === "suv/truck/minivan" && (
          <h5>SUV/Truck/Minivan Base Services</h5>
        )}
        {vehicleType === "suv/truck/minivan" && (
          <label>
            <input type="checkbox" name="service" value="Interior Detailing" />
            Interior Detailing: $150
          </label>
        )}
        {vehicleType === "suv/truck/minivan" && (
          <label>
            <input type="checkbox" name="service" value="Exterior Detailing" />
            Exterior Detailing: $130
          </label>
        )}
        {vehicleType === "suv/truck/minivan" && (
          <label>
            <input
              type="checkbox"
              name="services"
              value="Interior/Exterior Combo Detailing"
            />
            Interior/Exterior Combo Detailing: $245
          </label>
        )}
        {vehicleType === "suv/truck/minivan" && (
          <h5>Interior Add-On Services for SUV/Truck/Minivan:</h5>
        )}
        {vehicleType === "suv/truck/minivan" && (
          <label>
            <input type="checkbox" name="service" value="Machine Shampoo" />
            Machine Shampoo: $70
          </label>
        )}
        {vehicleType === "suv/truck/minivan" && (
          <label>
            <input type="checkbox" name="service" value="Pet Hair Removal" />
            Pet Hair Removal: $70
          </label>
        )}
        {vehicleType === "suv/truck/minivan" && (
          <label>
            <input type="checkbox" name="service" value="Headliner Cleaned" />
            Headliner Cleaned: $30
          </label>
        )}
        {vehicleType === "suv/truck/minivan" && (
          <label>
            <input type="checkbox" name="service" value="Major Stain Removal" />
            Major Stain Removal: $150
          </label>
        )}
        {vehicleType === "suv/truck/minivan" && (
          <label>
            <input type="checkbox" name="service" value="Deodorize" />
            Deodorize: $30
          </label>
        )}
        {vehicleType === "suv/truck/minivan" && (
          <label>
            <input type="checkbox" name="service" value="None Requested" />
            None Requested
          </label>
        )}
        {vehicleType === "suv/truck/minivan" && (
          <h5>Exterior Add-Ons for SUV/Truck/Minivan:</h5>
        )}
        {vehicleType === "suv/truck/minivan" && (
          <label>
            <input
              type="checkbox"
              name="service"
              value="Headlight Restoration"
            />
            Headlight Restoration: $40
          </label>
        )}
        {vehicleType === "suv/truck/minivan" && (
          <label>
            <input type="checkbox" name="service" value="Claybar Service" />
            Claybar Service: $150
          </label>
        )}
        {vehicleType === "suv/truck/minivan" && (
          <label>
            <input type="checkbox" name="service" value="Deluxe Exterior" />
            Deluxe Exterior (Claybar/Buff/Sealant) $500
          </label>
        )}
        {vehicleType === "suv/truck/minivan" && (
          <label>
            <input type="checkbox" name="service" value="None Requested" />
            None Requested
          </label>
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
            disabled={blackedOut}
            onChange={(evt) => dateChangeHandle(evt)}
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
        <input
          type="submit"
          value="Schedule Appointment"
          style={{ width: "15vw" }}
        />
      </form>
    </div>
  );
}
