import React from "react";
import { useState } from "react";
import CoupePrice from "./CoupePrice";
import HatchbackPrice from "./HatchbackPrice";
import SuvPrice from "./SuvPrice";

export default function UpdateAppointment(props) {
  
  const [updateFirstName, setUpdateFirstName] = useState(
    props.appointmentMade.firstName
  );
  const [updateLastName, setUpdateLastName] = useState(
    props.appointmentMade.lastName
  );
  const [updatePhoneNumber, setUpdatePhoneNumber] = useState(
    props.appointmentMade.phoneNumber
  );
  const [updateEmail, setUpdateEmail] = useState(props.appointmentMade.email);
  const [updateVehicleMake, setUpdateVehicleMake] = useState(
    props.appointmentMade.vehicleMake
  );
  const [updateVehicleType, setUpdateVehicleType] = useState(
    props.appointmentMade.vehicleType
  );
  const [updateAppointmentDate, setUpdateAppointmentDate] = useState(
    props.appointmentMade.appointmentDate
  );
  const [updateTimeOfApp, setUpdateTimeOfApp] = useState(
    props.appointmentMade.timeOfApp
  );
  const [updateAdditionalNotes, setUpdateAdditionalNotes] = useState(
    props.appointmentMade.additionalNotes
  );

  const [price, setPrice] = useState(0);

  return (
    <div>
      <form
        method="POST"
        action={`/api/${props.appointmentMade._id}`}
        id="schedule-form"
      >
        <label>
          First Name:{" "}
          <input
            type="text"
            name="firstName"
            value={updateFirstName}
            onChange={(evt) => setUpdateFirstName(evt.target.value)}
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="lastName"
            value={updateLastName}
            onChange={(evt) => setUpdateLastName(evt.target.value)}
          />
        </label>
        <label>
          Phone Number:{" "}
          <input
            type="text"
            name="phoneNumber"
            value={updatePhoneNumber}
            onChange={(evt) => setUpdatePhoneNumber(evt.target.value)}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="text"
            name="email"
            value={updateEmail}
            onChange={(evt) => setUpdateEmail(evt.target.value)}
          />
        </label>
        <label>
          Make, Year, and Model of your vehicle:{" "}
          <input
            type="text"
            name="vehicleMake"
            value={updateVehicleMake}
            onChange={(evt) => setUpdateVehicleMake(evt.target.value)}
          />
        </label>
        <label>
          Vehicle Type:{" "}
          <select
            name="vehicleType"
            value={updateVehicleType}
            onChange={(evt) => setUpdateVehicleType(evt.target.value)}
          >
            <option value="coupe/sedan">Coupe/Sedan</option>
            <option value="hatchback/crossover">Hatchback/Crossover</option>
            <option value="suv/truck/minivan">SUV/Truck/Minivan</option>
          </select>
        </label>
        {updateVehicleType === "coupe/sedan" && (
          <CoupePrice price={price} setPrice={setPrice} />
        )}
        {updateVehicleType === "hatchback/crossover" && (
          <HatchbackPrice price={price} setPrice={setPrice} />
        )}
        {updateVehicleType === "suv/truck/minivan" && (
          <SuvPrice price={price} setPrice={setPrice} />
        )}
        <label>
          Additional Notes or Request:{" "}
          <input
            type="text"
            name="additionalNotes"
            value={updateAdditionalNotes}
            onChange={(evt) => setUpdateAdditionalNotes(evt.target.value)}
          />
        </label>
        <label>
          Select a Day:{" "}
          <input
            type="date"
            name="appointmentDate"
            value={updateAppointmentDate}
            onChange={(evt) => setUpdateAppointmentDate(evt.target.value)}
          />
        </label>
        <label>
          Select a Time:
          <select
            name="timeOfApp"
            value={updateTimeOfApp}
            onChange={(evt) => setUpdateTimeOfApp(evt.target.value)}
          >
            <option value="8:00am">8:00am</option>
            <option value="12:00pm">12:00pm</option>
          </select>
        </label>
        <input type="hidden" name="price" value={price} />
        <input
          type="submit"
          value="Update Appointment"
          style={{ width: "15vw" }}
        />
      </form>
    </div>
  );
}
