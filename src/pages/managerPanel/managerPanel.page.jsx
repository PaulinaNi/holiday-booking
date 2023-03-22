//react imports
import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react";
//db imports
import { db } from "../../firebase.config"
import { collection, getDocs } from "firebase/firestore";

//components
import Error from "../error/error.page";
import HolidayRequestsList from "../../components/holidayRequestsList/holidayRequestsList.component";

export default function ManagerPanel() {
  let { state } = useLocation();

  const [allHolidayRequests, setAllHolidayRequests] = useState()
  const [employees, setEmployees] = useState()

  useEffect(() => {
    const getAllHolidayRequests = async () => {
      const collectionRef = collection(db, "holidayRequests")
      const data = await getDocs(collectionRef)
      const holidayRequestsDb = data.docs.map(request => {
        return { ...request.data(), id: request.id }
      })
      setAllHolidayRequests(holidayRequestsDb)
    }
    const loadEmployees = async () => {
      const collectionRef = collection(db, "employees")
      const data = await getDocs(collectionRef);
      const employeesList = data.docs.map(employee => { return { ...employee.data(), id: employee.id } })
      setEmployees(employeesList)
    }
    getAllHolidayRequests()
    loadEmployees()
  }, [])

  return (
    // only load manager panel if logged user have permissions otherwise load no permission a
    state ? state.isHR &&
      //menagers loading component
      <section>
        <Link className="buttonContainer link" to="/" state={{ ...state }}>Homepage</Link>
        <h1>Manager Panel</h1>
        {allHolidayRequests && <HolidayRequestsList user={state} holidayRequests={allHolidayRequests} employees={employees} />}
      </section>
      //error page for not logged users or users without permission
      : <Error />
  )
}