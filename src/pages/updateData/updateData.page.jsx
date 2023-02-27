import { useState, useEffect } from "react"

//db imports
import { db } from "../../firebase.config"
import { doc, getDoc } from "firebase/firestore"
import { useParams } from "react-router-dom"


export default function UpdateData() {
 const [employee, setEmployee] = useState()
 const employeeId = useParams()

 useEffect(() => {
  const getEmployees = async () => {
   const docRef = doc(db, "employees", employeeId.id)
   const data = await getDoc(docRef)
   const employeeData = { ...data.data(), id: data.id }
   setEmployee(employeeData)
  }
  getEmployees()
 }, [])

 return (
  <section>
   update
  </section>
 )
}