import React from "react";
// import DatePicker from "react-date-picker";
import { useState, useEffect, useRef } from "react";
//Service Pricing Components
import AppointmentScheduler from "./AppointmentScheduler"

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
  const [scheduledNoon, setScheduledNoon] = useState(0);
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
    setScheduledNoon(0);
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
        setScheduledNoon(scheduleArrNoon.length);

        if (scheduleArrNoon.length > 3) {
          setUnavailableNoon(true);
        }
      }
    });
  }


  
  return (
    <>
    <div className="home-container">
      <h1 id="app-header">Detail Works VT</h1>
        <h3>Detail Works Appointment Scheduler</h3>
        Please book your appointment with Detail Works, a Spectrum Enterprise,
        using the below form. We are located at 22 Avenue C, Williston, VT 05495
        in a large blue building on the corner of Avenue C and Industrial
        Avenue.
        <h3>
          PLEASE NOTE OUR DROP OFF AND PICK UP PROCEDURE HAS CHANGED DUE TO
          COVID-19.
        </h3>
        <h3>
          Please drop off your vehicle at 22 Avenue C, Williston VT and leave
          your keys in the overnight drop box located at the front of our
          building facing Avenue C. Once you’ve dropped your vehicle off call,
          text, or email us and we will retrieve your car for service. Once your
          vehicle is completed we will call you for payment and with pickup
          instructions. Early drop-offs are welcome and appreciated.
        </h3>
        <h3>
          Comments, questions, or concerns? Give us a call! Our number is (802)
          497-2296.
        </h3>
        </div>
      <AppointmentScheduler/>
      </>
    
  );
}
