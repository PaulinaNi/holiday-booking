import './homepage.style.css'
//react
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'

//db
import { collection, getDocs } from "firebase/firestore"
import { db } from '../../firebase.config'


export default function Homepage() {
 //state to store all employees
 const [employees, setEmployees] = useState()
 const employeesData = useLoaderData()

 console.log(employeesData)

 return (
  <section>
   <h2>Welcome from Homepage</h2>
  </section>
 )
}

//loader function
export const employeesLoader = async () => {
 const collectionRef = collection(db, "employees")
 const data = await getDocs(collectionRef);
 const employeesList = data.docs.map(employee => { return { ...employee.data(), id: employee.id } })
 setEmployees(employeesList)
}