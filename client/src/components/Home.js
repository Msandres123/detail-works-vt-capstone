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
        

        <div className="home-container">
            <h1 id="app-header">Detail Works VT</h1>
            <h2 id="schedule-header">Schedule an Appointment</h2>
            <form method="POST" action="/api" id="schedule-form">
                <label>Name: <br/><input type="text" name="customerName" /></label><br/>
          
                <label>Phone Number: <br/> <input type="text" name="phoneNumber"/></label><br/>
                <label>Email: <br/><input type="text" name="email" /></label><br/>
                <label>Year, Make and Model of your vehicle: <br/><input type="text" name='vehicleMake' />
                </label><br/>
                <label>Vehicle Type: <br/><select name='vehicleType'>
                <option value="coupe/sedan" onClick={(evt) => setCoupeSedan(!coupeSedan)}>Coupe/Sedan</option>
                <option value="hatchback/crossover">Hatchback/Crossover</option>
                <option value="suv/truck/minivan">SUV/Truck/Minivan</option>
                </select>
                </label><br/>
                <label>Additional Notes or Request: <br/><input type="text" name="additionalNotes"/></label><br/>
                <label>Select a Day: <br/><input id="calender" type="date" name="date" min={today}  /></label><br/>
                <label>Select a Time: <br/>
                    <select name="timeOfApp">
                        <option value="8:00am">8:00am</option>
                        <option value="12:00pm">12:00pm</option>
                    </select>
                </label><br/>
                <input type="submit" value="Schedule Appointment" style={{ width: "200px", }}/>
            </form>
        </div>
    )
}
