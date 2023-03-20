import './requestHoliday.style.css'

//react and react router imports
import { useState } from "react"
import { useLocation } from "react-router-dom"

//components imports
import Button from "../../components/button/button.component"
import MessageWindow from '../../components/messageWindow/messageWindow.component'

//db imports
import { db } from '../../firebase.config'
import { collection, addDoc } from "firebase/firestore"

//react-data-range imports
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRange } from 'react-date-range'

export default function RequestHoliday() {
 //react-data-range set up
 const selectedDateSnap = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
 }
 const [selectedDate, setSelectedDate] = useState([selectedDateSnap])

 //passing employee data from profileCard component so app will know which employee is reqesting holiday 
 let { state } = useLocation();

 const holidayFormSnap = {
  employeeId: state.id,
  comment: '',
  accepted: false,
  rejected: false,
 }
 const [holidayForm, setHolidayForm] = useState(holidayFormSnap)

 const [isHolidayFormSent, setIsHolidayFormSent] = useState(false)

 const handleMessageWindowComponent = () => {
  setIsHolidayFormSent(false)
  setHolidayForm(holidayFormSnap)
  setSelectedDate([selectedDateSnap])
 }

 const handleInput = event => {
  let value = event.target.value
  let name = event.target.name
  setHolidayForm(prevState => {
   return {
    ...prevState,
    [name]: value
   }
  })
 }

 const handleSubmit = event => {
  event.preventDefault();
  const saveHolidayRequest = async () => {
   const collectionRef = collection(db, "holidayRequests")
   await addDoc(collectionRef, { ...holidayForm, ...selectedDate[0] })
  }
  saveHolidayRequest()
  setIsHolidayFormSent(true)
 }

 return (
  <section className='requestHolidayForm'>
   {/* message show when request is send */}
   {isHolidayFormSent && <MessageWindow message='Holiday Request Sent' buttonFunction={handleMessageWindowComponent} />}

   <h1>Holiday Request Form</h1>
   <form onSubmit={handleSubmit}>
    {!isHolidayFormSent && <DateRange
     editableDateInputs={true}
     onChange={item => setSelectedDate([item.selection])}
     moveRangeOnFirstSelection={false}
     ranges={selectedDate}
     weekStartsOn={1}
     rangeColors={["#e5cca5", "#55553c", "#9b7e5d"]}
    />}
    <div className='requestHolidayForm-textarea'>
     <label htmlFor="comment">Comment:</label>
     <textarea
      name="comment"
      id="comment"
      cols="30"
      rows="5"
      value={holidayForm.comment}
      onChange={handleInput}
     ></textarea>
    </div>
    <Button text='Send' />
   </form>
  </section>
 )
}