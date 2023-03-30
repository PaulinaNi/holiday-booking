import "./requestCard.style.css"

//component imports
import Button from "../button/button.component"
//db imports
import { db } from "../../firebase.config"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"

//data-fns imports
import { eachDayOfInterval } from 'date-fns'

export default function ReqestCard(props) {
 const { request, employee, rerenderMangerPanel } = props

 const holidayInterval = eachDayOfInterval({
  start: request.startDate.toDate(),
  end: request.endDate.toDate()
 })

 const numberOfWorkingDaysInHolidayInterval = holidayInterval.filter(day => !day.toDateString().includes('Sat') && !day.toDateString().includes('Sun')).length

 //function which process reqest depending on the decision made
 const requestProcess = (decision) => {
  const reqestRef = doc(db, "holidayRequests", request.id)
  const employeeRef = doc(db, "employees", employee.id)
  //need to add deduction for days
  //processing accepted reqest
  const accepted = async () => {
   await updateDoc(reqestRef, {
    isAccepted: true,
    isProcessed: true,
    workingDaysInHolidayInterval: numberOfWorkingDaysInHolidayInterval
   })
   //adding each day of holiday to holidayInterval
   holidayInterval.forEach(async (day) => {
    await updateDoc(reqestRef, {
     holidayInterval: arrayUnion(day)
    })
   })

   await updateDoc(employeeRef, {
    //need to reload eployee list to get correct days to deduct from
    remaining: employee.remaining - numberOfWorkingDaysInHolidayInterval,
    taken: employee.taken + numberOfWorkingDaysInHolidayInterval,
    bookedDays: arrayUnion(request.id)
   })
  }

  // processing rejected reqest
  const rejected = async () => {
   await updateDoc(reqestRef, {
    isRejected: true,
    isProcessed: true,
   })
  }

  decision === 'accept' && accepted()
  decision === 'reject' && rejected()
  //rerenderMangerPanel - lift state up to ManagerPanel from RequestCard
  rerenderMangerPanel()
 }

 return (
  <section className="requestCardContainer">
   <h1 className="requestCardContainer-header">{employee.firstname} {employee.lastname}'s Holiday Request</h1>
   <p>
    Holiday from <span className="requestCardContainer-dates">{request.startDate.toDate().toDateString()}</span> to <span className="requestCardContainer-dates">{request.endDate.toDate().toDateString()}</span>
   </p>
   <div className="requestCardContainer-commentContainer">
    <p className="requestCardContainer-commentHeader">Request Comment:</p>
    <p className="requestCardContainer-comment">{request.comment}</p>
   </div>
   <Button text="Accept" function={() => requestProcess("accept")} />
   <Button text="Reject" function={() => requestProcess("reject")} />
  </section>
 )
}