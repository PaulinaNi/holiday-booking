//component imports
import Button from "../button/button.component"
//db imports
import { db } from "../../firebase.config"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"

export default function ReqestCard(props) {
 const { request, employee } = props

 const requestProcess = (decision) => {
  console.log(`${decision} clicked`)

  const reqestRef = doc(db, "holidayRequests", request.id)
  const employeeRef = doc(db, "employees", employee.id)

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
 }

 return (
  <section>
   <h1>{employee.firstname} {employee.lastname}'s Holiday Request</h1>
   <p>Holiday from {request.startDate.toDate().toDateString()} to {request.endDate.toDate().toDateString()}</p>
   <p>{request.comment}</p>
   <Button text="Accept" function={() => requestProcess('accept')} />
   <Button text="Reject" function={() => requestProcess('reject')} />
  </section>
 )
}