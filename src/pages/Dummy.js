import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Dummy() {
    const [startDate, setStartDate] = useState(new Date());
    console.log(startDate)
    return ( 
      <div>                                                     
    <DatePicker selected={startDate} onChange={date => setStartDate(date)}   isClearable />   
      </div>
  );
    }
export default Dummy;