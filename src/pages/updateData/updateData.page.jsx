import { useState, useEffect } from "react"

//db imports
import { db } from "../../firebase.config"
import { doc, getDoc } from "firebase/firestore"
import { useParams } from "react-router-dom"

//component imports
import ProfileCard from "../../components/profileCard/profileCard.component"

export default function UpdateData() {
 const [employee, setEmployee] = useState()
 const employeeId = useParams()
 // const employeeDoc = doc(db, "employees", id)
 // const updatedField = { isHR: true } updateDoc(employeeDoc, updatedField)
 // await updateDoc(doc(db, "employees", id), { isHR: false })
 useEffect(() => {
  //pull results only for specific employee
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
   {employee && <ProfileCard employee={employee} />}
  </section>
 )
}