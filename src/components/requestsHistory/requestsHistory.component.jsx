import './requestsHisatory.style.css'
//react imports
import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
//db imports
import { db } from '../../firebase.config'
import { collection, getDocs } from "firebase/firestore"


export default function RequestsHisatory() {
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
   <p>Hi there</p>
  </section>
 )
}