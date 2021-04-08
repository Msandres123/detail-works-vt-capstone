import React from "react";
// import DatePicker from "react-date-picker";
import { useState, useEffect, useRef } from "react";
//Service Pricing Components
import AppointmentScheduler from "./AppointmentScheduler"


export default function Home() {
  
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
