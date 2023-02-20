import "./createNewEmployee.style.css"

import { useState } from "react"
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase.config'

//imports of components
import MessageWindow from "../messageWindow/messageWindow.component";
import Button from "../button/button.component";

export default function CreateNewEmployee() {
 const [createState, setCreateState] = useState('creating')

 //add unchanged data for each new employee
 const newEmployeeLayout = {
  firstname: '',
  lastname: '',
  password: '',
  department: '',
  entitlement: '',
  taken: 0,
  bookedDays: [],
  isManager: false,
  isHR: false,
 }
 //state to keep new employee data from form
 const [newEmployee, setNewEmployee] = useState(newEmployeeLayout)

 //save employee to database
 const handleSubmit = event => {
  event.preventDefault();

  const createNewEmployee = async () => {
   await addDoc(collection(db, "employees"), {
    ...newEmployee
   })
   //change value of CreateState to load massage that employee have been saved to database
   setCreateState('created')
  }
  //calling async function
  createNewEmployee()
 }

 //Handling text inputs 
 const handleChange = event => {
  setNewEmployee(prevState => {
   const name = event.target.name
   //make sure that first letter is Upper Case
   const value = `${event.target.value.charAt(0).toUpperCase()}${event.target.value.slice(1)}`
   return {
    ...prevState,
    [name]: value
   }
  })
 }

 //Handling entitlement input
 const handleEntitlementChange = event => {
  setNewEmployee(prevState => {
   const name = event.target.name
   //convert from string to number 
   const value = event.target.valueAsNumber
   return {
    ...prevState,
    [name]: value,
    remaining: value
   }
  })
 }

 //Handling checkbox input
 const handleCheckboxChange = event => {
  setNewEmployee(prevState => {
   return ({
    ...prevState,
    [event.target.name]: event.target.checked
   })
  })
 }

 //preper for next employee adding
 const handleButton = () => {
  setCreateState('creating')
  setNewEmployee(newEmployeeLayout)
 }

 return (
  <div className="createNewEmployeeContainer">
   <h1>Create New Employee</h1>
   {/* message show when new employee is created */}
   {createState === 'created' && <MessageWindow message='Employee data saved!' buttonFunction={handleButton} />}

   {/* form */}
   <form onSubmit={handleSubmit}>
    <div>
     <label htmlFor='firstname'>First Name</label>
     <input
      name='firstname'
      id='firstname'
      type='text'
      value={newEmployee.firstname}
      placeholder='input first name'
      onChange={handleChange}
      required
     />
    </div>
    <div>
     <label htmlFor='lastname'>Last Name</label>
     <input
      name='lastname'
      id='lastname'
      type='text'
      value={newEmployee.lastname}
      placeholder='input last name'
      onChange={handleChange}
      required
     />
    </div>
    <div>
     <label htmlFor='department'>Department</label>
     <input
      name='department'
      id='department'
      type='text'
      value={newEmployee.department}
      placeholder='input department'
      onChange={handleChange}
      required
     />
    </div>
    <div>
     <label htmlFor="password">Password</label>
     <input
      type="password"
      name="password"
      id="password"
      value={newEmployee.password}
      placeholder='password'
      onChange={handleChange}
      required
     />
    </div>
    <div>
     <label htmlFor='entitlement'>Holiday Entitlement</label>
     <input
      name='entitlement'
      id='entitlement'
      type='number'
      min='0'
      value={newEmployee.entitlement}
      placeholder='input how many days'
      onChange={handleEntitlementChange}
      required
     />
    </div>
    <div>
     <label htmlFor="isManager">Do you want to add Manager Panel for that profile ?</label>
     <input
      type="checkbox"
      name="isManager"
      id="isManager"
      checked={newEmployee.isManager}
      onChange={handleCheckboxChange}
     />
    </div>
    <div>
     <label htmlFor="isHR">Do you want to add HR Panel for that profile ?</label>
     <input
      type="checkbox"
      name="isHR"
      id="isHR"
      checked={newEmployee.isHR}
      onChange={handleCheckboxChange}
     />
    </div>
    <Button text='Add new employee' />
   </form>
  </div>
 )
}