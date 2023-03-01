import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
//db imports
import { db } from "../../firebase.config"
import { doc, getDoc } from "firebase/firestore"


//component imports


export default function UpdateData() {

 //make sure only HR can access that route

 const [employeeSnapshot, setEmployeeSnapshot] = useState()
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
   setEmployeeSnapshot(employeeData)
  }
  getEmployees()
 }, [employeeId.id])

 const updateEmployeeData = (event) => {
  const value = event.target.value
  const name = event.target.name
  setEmployeeSnapshot(prevState => {
   return {
    ...prevState,
    [name]: value
   }
  })
  console.log(employeeSnapshot)
 }

 return (
  <section>
   hi {employeeSnapshot && employeeSnapshot.firstname}

   <form>
    <div>
     <label htmlFor="update-firstname">First name</label>
     <input
      id="update-firstname"
      type="text"
      name='firstname'
      value={employeeSnapshot.firstname}
      onChange={updateEmployeeData}
     />
    </div>
    <div>
     <label htmlFor="update-lastname">Last name</label>
     <input
      id="update-lastname"
      type="text"
      name='lastname'
      value={employeeSnapshot.lastname}
      onChange={updateEmployeeData}
     />
    </div>
    <div>
     <label htmlFor="update-lastname">Last name</label>
     <input
      id="update-lastname"
      type="text"
      name='lastname'
      value={employeeSnapshot.lastname}
      onChange={updateEmployeeData}
     />
    </div>

   </form>
  </section>
 )
}