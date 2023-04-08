import './requestsHisatory.style.css'
//react imports
import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
//db imports
import { db } from '../../firebase.config'
import { collection, getDocs } from "firebase/firestore"


export default function RequestsHisatory() {
 //employee data passed from previous component
 const { state } = useLocation()

 const [allHolidayRequests, setAllHolidayRequests] = useState()

 useEffect(() => {
  const getAllHolidayRequests = async () => {
   const collectionRef = collection(db, "holidayRequests")
   const data = await getDocs(collectionRef)
   const holidayRequestsDb = data.docs.map(request => {
    return { ...request.data(), id: request.id }
   })
   setAllHolidayRequests(holidayRequestsDb)
  }
  getAllHolidayRequests()
 }, [])

 console.log(allHolidayRequests)

 return (
  <section>
   <Link className="buttonContainer link" to="/" state={{ ...state }}>Homepage</Link>
   {allHolidayRequests && allHolidayRequests.filter(holiday => holiday.employeeId === state.id).map(holiday => {
    return (
     <section className="requestCardContainer reqestsHistoryContainer">
      <h1 className="requestCardContainer-header">{state.firstname} {state.lastname}'s Holiday Request</h1>
      {holiday.isAccepted && <span className='acceptedLabel'>Accepted</span>}
      {holiday.isRejected && <span className='rejectedLabel'>Rejected</span>}
      <p>
       Holiday from <span className="requestCardContainer-dates">{holiday.startDate.toDate().toDateString()}</span> to <span className="requestCardContainer-dates">{holiday.endDate.toDate().toDateString()}</span>
      </p>
      <div className="requestCardContainer-commentContainer">
       <p className="requestCardContainer-commentHeader">Request Comment:</p>
       <p className="requestCardContainer-comment">{holiday.comment}</p>
      </div>
     </section>
    )
   })}
  </section>
 )
}