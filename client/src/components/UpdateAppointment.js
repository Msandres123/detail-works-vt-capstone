import React from 'react'
import { useState } from 'react' 

export default function UpdateAppointment(props) {
    const [updateCustomerName, setUpdateCustomerName] = useState(props.appointmentMade.customerName)
const [updatePhoneNumber, setUpdatePhoneNumber] = useState(props.appointmentMade.phoneNumber)
const [updateEmail, setUpdateEmail] = useState(props.appointmentMade.email)
const [updateVehicleMake, setUpdateVehicleMake] = useState(props.appointmentMade.vehicleMake)
const [updateVehicleType, setUpdateVehcileType] = useState(props.appointmentMade.vheicleType)
const [updateDateOfApp, setUpdateDateOfApp] = useState(props.appointmentMade.dateOfApp)
const [updateTimeOfApp, setUpdateTimeOfApp] = useState(props.appointmentMade.timeOfApp)
const [updateAdditionalNotes, setUpdateAdditionalNotes] = useState(props.appointmentMade.additionalNotes)


    return (
        <div>
             <form method="POST" action={`/api/${props.appointmentMade._id}`} id="schedule-form">
                <label>Name: <input type="text" name="customerName" value={updateCustomerName} onChange={(evt) => setUpdateCustomerName(evt.target.value)}/></label>
          
                <label>Phone Number: <input type="text" name="phoneNumber" value={updatePhoneNumber} onChange={(evt) => setUpdatePhoneNumber(evt.target.value)}/></label>
                <label>Email: <input type="text" name="email" value={updateEmail} onChange={(evt) => setUpdateEmail(evt.target.value)}/></label>
                <label>Make, Year, and Model of your vehicle: <input type="text" name='vehicleMake' value={updateVehicleMake} onChange={(evt) => setUpdateVehicleMake(evt.target.value)}/>
                </label>
                <label>Vehicle Type: <select name='vehicleType' value={updateVehicleType} onChange={(evt) => setUpdateVehcileType(evt.target.value)}>
                <option value="coupe/sedan">Coupe/Sedan</option>
                <option value="hatchback/crossover">Hatchback/Crossover</option>
                <option value="suv/truck/minivan">SUV/Truck/Minivan</option>
                </select>
                </label>
                <label>Additional Notes or Request: <input type="text" name="additionalNotes" value={updateAdditionalNotes} onChange={(evt) => setUpdateAdditionalNotes(evt.target.value)}/></label>
                <label>Select a Day: <input type="date" name="dateOfApp" value={updateDateOfApp} onChange={(evt) => setUpdateDateOfApp(evt.target.value)}/></label>
                <label>Select a Time: 
                    <select name="timeOfApp" value={updateTimeOfApp} onChange={(evt) => setUpdateTimeOfApp(evt.target.value)}>
                        <option value="8:00am">8:00am</option>
                        <option value="12:00pm">12:00pm</option>
                    </select>
                </label>
                <input type="submit" value="Update Appointment" style={{ width: "15vw" }}/>
            </form>
        </div>
    )
}
