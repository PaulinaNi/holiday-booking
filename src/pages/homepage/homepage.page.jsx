import { useState, useEffect } from "react"

//components imports
import LogIn from "../../components/logIn/logIn.component"
import HRPanel from "../hrPanel/hrPanel"

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

  //Store current user
  const [currentUser, setCurrentUser] = useState()

  //Form handling
  const handleLogInSubmit = async (logInData) => {
    const user = employees.filter(employee => {
      return employee.firstname === logInData.firstname
        && employee.lastname === logInData.lastname
        && employee.password === logInData.password
    })
    if (user.length === 1) {
      setCurrentUser(user)
    } else if (user.length === 0) {
      //add component which will tell that login data is wrong
      console.log('wrong password')
    }
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
      {!currentUser && <LogIn
        handleLogInSubmit={handleLogInSubmit}
        employees={employees}
      />}

      {currentUser && <h2>Welcome {currentUser[0].firstname}</h2>}
      {currentUser && currentUser[0].isHR && <HRPanel />}
    </main>
  )
}