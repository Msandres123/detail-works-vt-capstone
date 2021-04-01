import React from "react";

export default function calendar() {
  return (
    <div className="calendar-container">
      <div className="calendar">
        <div id="month"></div>
        <div id="weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div id="date">
            
        </div>
      </div>
    </div>
  );
}
