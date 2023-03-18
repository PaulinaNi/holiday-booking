import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../components/button/button.component";

export default function RequestHoliday() {
 let { state } = useLocation();
 console.log(state)

 const [holidayForm, setHolidayForm] = useState({
  employeeId: state.id,
 })

 const handleSubmit = event => {
  event.preventDefault();
  console.log(holidayForm)
 }

 return (
  <section>
   <p>Holiday Request Form</p>
   <form onSubmit={handleSubmit}>
    <div>
     <label htmlFor="startDate">From:</label>
     <input type="date" name="startDate" id="startDate" />
    </div>
    <div>
     <label htmlFor="endDate">To:</label>
     <input type="date" name="endDate" id="endDate" />
    </div>
    <Button text='Send' />
   </form>
  </section>
 )
}