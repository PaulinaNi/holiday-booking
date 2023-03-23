import "./requestCard.style.css"

//component imports
import Button from "../button/button.component"
//db imports
import { db } from "../../firebase.config"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"

export default function ReqestCard(props) {
 const { request, employee, rerenderMangerPanel } = props

 const requestProcess = (decision) => {
  const reqestRef = doc(db, "holidayRequests", request.id)
  const employeeRef = doc(db, "employees", employee.id)

  // need to add state and lift up to reload data after processing one reqest so only not processed reqest will shown 
  //need to add deduction for days
  const accepted = async () => {
   await updateDoc(reqestRef, {
    isAccepted: true,
    isProcessed: true,
   })
   await updateDoc(employeeRef, {
    bookedDays: arrayUnion(request.id)
   })
  }
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