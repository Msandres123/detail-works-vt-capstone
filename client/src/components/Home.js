import React from "react";
import Logo from '../images/dw-horizontal.png'

//Service Pricing Components
import AppointmentScheduler from "./AppointmentScheduler";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <img id="logo" src={Logo} width="225" alt="Detail Works Logo" title="Detail Works Logo"/>
      </div>
      <AppointmentScheduler />
    </>
  );
}
