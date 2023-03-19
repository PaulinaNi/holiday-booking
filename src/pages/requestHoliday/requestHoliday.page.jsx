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

export default function RequestHoliday() {
 let { state } = useLocation();

 const holidayFormSnap = {
  employeeId: state.id,
  startDate: '',
  endDate: '',
  comment: '',
 }
 const [holidayForm, setHolidayForm] = useState(holidayFormSnap)

 const [isHolidayFormSent, setIsHolidayFormSent] = useState(false)

 const handleMessageWindowComponent = () => {
  setIsHolidayFormSent(false)
  setHolidayForm(holidayFormSnap)
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
   await addDoc(collectionRef, { ...holidayForm })
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
    <div>
     <label htmlFor="startDate">From:</label>
     <input
      type="date"
      name="startDate"
      id="startDate"
      value={holidayForm.startDate}
      onChange={handleInput}
      required
     />
    </div>
    <div>
     <label htmlFor="endDate">To:</label>
     <input
      type="date"
      name="endDate"
      id="endDate"
      value={holidayForm.endDate}
      onChange={handleInput}
      required
     />
    </div>
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