import "./updateData.style.css"
//react imports
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
//db imports
import { db } from "../../firebase.config"
import { doc, getDoc, updateDoc } from "firebase/firestore"


//component imports
import Button from "../../components/button/button.component"

export default function UpdateData() {

 //make sure only HR can access that route

 const [employeeSnapshot, setEmployeeSnapshot] = useState()
 const employeeId = useParams()



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

 const updateEmployeeTextData = (event) => {
  const value = `${event.target.value.charAt(0).toUpperCase()}${event.target.value.slice(1)}`
  const name = event.target.name
  setEmployeeSnapshot(prevState => {
   return {
    ...prevState,
    [name]: value
   }
  })
 }

 const updateEmployeeEntitlement = event => {
  setEmployeeSnapshot(prevState => {
   const name = event.target.name
   //convert from string to number 
   const value = event.target.valueAsNumber
   // const ramainingHoliday = value - prevState.taken
   return {
    ...prevState,
    [name]: value,
    remaining: value - prevState.taken
   }
  })
 }

 const updateEmployeeCheckbox = event => {
  setEmployeeSnapshot(prevState => {
   return ({
    ...prevState,
    [event.target.name]: event.target.checked
   })
  })
 }

 const handleUpdate = (event) => {
  event.preventDefault()
  const employeeDoc = doc(db, "employees", employeeId.id)
  const updatedField = { firstname: 'Mario' }
  updateDoc(employeeDoc, { ...employeeSnapshot })
 }

 return (
  <section className="updateDataContainer">
   {employeeSnapshot &&
    <form onSubmit={handleUpdate}>
     <div>
      <label htmlFor="update-firstname">First name</label>
      <input
       id="update-firstname"
       type="text"
       name='firstname'
       value={employeeSnapshot.firstname}
       onChange={updateEmployeeTextData}
      />
     </div>
     <div>
      <label htmlFor="update-lastname">Last name</label>
      <input
       id="update-lastname"
       type="text"
       name='lastname'
       value={employeeSnapshot.lastname}
       onChange={updateEmployeeTextData}
      />
     </div>
     <div>
      <label htmlFor="update-department">Department</label>
      <input
       id="update-department"
       type="text"
       name='department'
       value={employeeSnapshot.department}
       onChange={updateEmployeeTextData}
      />
     </div>
     <div>
      <label htmlFor="update-entitlement">Holiday Entitlement</label>
      <input
       id="update-entitlement"
       type="number"
       name='entitlement'
       value={employeeSnapshot.entitlement}
       onChange={updateEmployeeEntitlement}
      />
     </div>
     <div>
      <label htmlFor="update-isManager">Do you want to add Manager Panel for that profile ?</label>
      <input
       type="checkbox"
       name="isManager"
       id="update-isManager"
       checked={employeeSnapshot.isManager}
       onChange={updateEmployeeCheckbox}
      />
     </div>
     <div>
      <label htmlFor="update-isHR">Do you want to add HR Panel for that profile ?</label>
      <input
       type="checkbox"
       name="isHR"
       id="update-isHR"
       checked={employeeSnapshot.isHR}
       onChange={updateEmployeeCheckbox}
      />
     </div>
     <Button text="Update" />
    </form>
   }
  </section>
 )
}