import React from 'react'
//import DateTimePicker from 'react-datetime-picker'
import { useState } from 'react'

export default function Home() {
    const [hatchCrossOver, setHatchCrossOver] = useState(false)
    const [coupeSedan, setCoupeSedan] = useState(false)
    const [suvTruckVan, setSuvTruckVan] = useState(false)

   
    
    //prevents user from scheduling appointment for a date in the past
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    
    if (dd < 10) {
      dd = '0' + dd
    }
    
    if (mm < 10) {
      mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
   
   
    return (
        

        <div>
            <h2 id="schedule-header">Schedule an Appointment</h2>
            <form method="POST" action="/api" id="schedule-form">
                <label>Name: <input type="text" name="customerName" /></label>
          
                <label>Phone Number: <input type="text" name="phoneNumber"/></label>
                <label>Email: <input type="text" name="email" /></label>
                <label>Make, Year, and Model of your vehicle: <input type="text" name='vehicleMake' />
                </label>
                <label>Vehicle Type: <select name='vehicleType'>
                <option value="coupe/sedan" onClick={(evt) => setCoupeSedan(!coupeSedan)}>Coupe/Sedan</option>
                <option value="hatchback/crossover">Hatchback/Crossover</option>
                <option value="suv/truck/minivan">SUV/Truck/Minivan</option>
                </select>
                </label>
                <label>Additional Notes or Request: <input type="text" name="additionalNotes"/></label>
                <label>Select a Day: <input id="calender" type="date" name="dateOfApp" min={today}  /></label>
                <label>Select a Time: 
                    <select name="timeOfApp">
                        <option value="8:00am">8:00am</option>
                        <option value="12:00pm">12:00pm</option>
                    </select>
                </label>
                <input type="submit" value="Schedule Appointment" style={{ width: "15vw" }}/>
            </form>
        </div>
    )
}
