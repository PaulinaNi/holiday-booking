import "./homepage.page.style.css"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

//components imports
import LogIn from "../../components/logIn/logIn.component"
import Profile from "../../components/profile/profile.component"
import Instruction from "../../components/instruction/instruction.component"

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

  //use it to load currentUser back when back from HR Panel, Manager Panel and Calendar
  let { state } = useLocation();
  useEffect(() => {
    if (state) {
      setCurrentUser([state])
    }
  }, [])


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
    <main className="homepageContiner">
      {/* refine that */}
      {/* When user is not logged in */}
      {!currentUser && <Instruction />}
      {!currentUser && <LogIn
        handleLogInSubmit={handleLogInSubmit}
        employees={employees}
      />}
      {/* When user is logged in */}
      {currentUser && <Profile employee={currentUser[0]} />}
    </main>
  )
}