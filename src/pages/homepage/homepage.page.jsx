import { useState, useEffect } from "react"

//components imports
import Button from "../../components/button/button.component"

//firebase imports
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase.config"

export default function Homepage() {
 //employees state
 const [employees, setEmployees] = useState([])

 //loading data for employees
 useEffect(() => {
  console.log('render')
  const loadEmployees = async () => {
   const collectionRef = collection(db, "employees")
   const data = await getDocs(collectionRef);
   const employeesList = data.docs.map(employee => { return { ...employee.data(), id: employee.id } })
   setEmployees(employeesList)
  }
  loadEmployees()
 }, [])

 //LogInData State for form
 const userLogInDataLayout = {
  firstname: '',
  lastname: '',
 }
 const [logInData, setLogInData] = useState(userLogInDataLayout)

 //Store current user
 const [currentUser, setCurrentUser] = useState()

 //Form handling
 const handleLogInSubmit = async (event) => {
  event.preventDefault()
  const user = employees.filter(employee => {
   return employee.firstname === logInData.firstname && employee.lastname === logInData.lastname
  })
  setCurrentUser(user)
  console.log(currentUser)
 }
 const handleLogInChanges = event => {
  const name = event.target.name
  const value = event.target.value
  setLogInData(prevState => { return { ...prevState, [name]: value } })
 }

 return (
  <main>
   <h1>Holiday Booking App in Your Workspace</h1>
   <p>You can log into 3 accounts to check how this app is working</p>
   <ul>
    <li>HR Account where you can add new Employees,update Employees data and check all holiday request.</li>
    <li>Manager account where you can accept holiday reqests and check when your team have a holiday</li>
    <li>Worker account where you can check when worker have booked holidays, send reqest and check if they have been accepted</li>
   </ul>
   <form onSubmit={handleLogInSubmit}>
    <div>
     <label htmlFor="firstname">First Name</label>
     <input
      type="text"
      name="firstname"
      id="firstname"
      value={logInData.firstname}
      onChange={handleLogInChanges}
     />
    </div>
    <div>
     <label htmlFor="lastname">Last Name</label>
     <input
      type="text"
      name="lastname"
      id="lastname"
      value={logInData.lastname}
      onChange={handleLogInChanges}
     />
    </div>
    <Button text='Log In' />
   </form>
   {currentUser && <h2>Welcome {currentUser[0].firstname}</h2>}
  </main>
 )
}