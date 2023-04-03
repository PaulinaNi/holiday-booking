import './homepage.style.css'

//react
import { useEffect, useState } from 'react'

//db
import { collection, getDocs } from "firebase/firestore"
import { db } from '../../firebase.config'

// components
import LoginInstrution from '../../components/loginInstruction/loginInstrution.component'

export default function Homepage() {
 //state to store all employees
 const [employees, setEmployees] = useState()

 useEffect(() => {
  const employeesLoader = async () => {
   const collectionRef = collection(db, "employees")
   const data = await getDocs(collectionRef);
   const employeesList = data.docs.map(employee => { return { ...employee.data(), id: employee.id } })
   setEmployees(employeesList)
  }
  employeesLoader()
 }, [])

 return (
  <section>
   <h2>Welcome from Homepage</h2>
  <LoginInstrution />

  </section>
 )
}