import { useEffect, useState } from "react";
import React from "react";
import NavBar from "./NavBar"
import UpdateAppointment from "./UpdateAppointment";
import Cancel from "./Cancel";
import moment from "moment";

export default function AppointmentPage(props) {
  const [appointmentMade, setAppointmentMade] = useState({});
  const [updateClick, setUpdateClick] = useState(false);
  const [cancelClick, setCancelClick] = useState(false);

  function updateAppointmentHandler() {
    setUpdateClick(!updateClick);
  }

  function cancelClickHandler() {
    setCancelClick(!cancelClick);
  }
  useEffect(() => {
    if (appointmentMade.id !== props.match.params.id) {
      fetch(`/api/${props.match.params.id}`)
        .then((res) => res.json())
        .then((appointmentList) => {
          setAppointmentMade(appointmentList);
        });
    }
  }); 


  return (
    <div id="appointment-page-container">
       <div>
       <NavBar logOut={props.logOut}/>
       </div>
       <div>
      <div id="appointment-page-header"><h2 >Update or Cancel This Appointment</h2></div>
      <div id="appointment-container">
        <h4>Day: {appointmentMade.appointmentDate}</h4>
        <p>Time: {appointmentMade.timeOfApp}</p>
        <p>First Name: {appointmentMade.firstName}</p>
        <p>Last Name: {appointmentMade.lastName}</p>
        <p>Phone Number: {appointmentMade.phoneNumber}</p>
        <p>Email: {appointmentMade.email}</p>
        <p>Signed up for Detail Works e-mail List: {appointmentMade.detailWorksList}</p>
        <p>Signed up for Spectrum e-mail List: {appointmentMade.spectrumList}</p>
        <p>Vehicle Make, Year, Model: {appointmentMade.vehicleMake}</p>
        <p>Vehicle Type: {appointmentMade.vehicleType}</p>
       { appointmentMade.service && <p>Services: {appointmentMade.service.join(", ")}</p>}
        <p>
          Appointment Made On:{moment(appointmentMade.dateAppMade).format("l")}
        </p>
        <button onClick={updateAppointmentHandler}>Update Appointment</button>
        {updateClick && <UpdateAppointment appointmentMade={appointmentMade} />}
        <button onClick={cancelClickHandler}>Cancel Appointment</button>
        {cancelClick && (
          <Cancel
            appointmentMade={appointmentMade}
            cancelClickHandler={cancelClickHandler}
          />
        )}
        </div>
      </div>
    </div>
  );
}
