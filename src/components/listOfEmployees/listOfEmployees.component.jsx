import "./listOfEmployees.style.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
//firebase imports
import { db } from "../../firebase.config"
import { doc, deleteDoc, getDocs, collection } from "firebase/firestore"
//component imports
import Search from "../search/search.component"

export default function ListOfEmployees(props) {
  // state to record change in db when employee is deleted
  const [dbChange, setDbChange] = useState('')

  const handleDeleteButton = async (id) => {
    const employeeDocRef = doc(db, "employees", id)
    await deleteDoc(employeeDocRef)
    setDbChange(id)
  }

  const [employees, setEmployees] = useState()
  const [filteredEmployees, setFilteredEmployees] = useState()

  useEffect(() => {
    const getEmployees = async () => {
      const collectionRef = collection(db, "employees");
      const data = await getDocs(collectionRef)
      const employeesDB = data.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
      setEmployees(employeesDB)
      setFilteredEmployees(employeesDB)
    }
    getEmployees()
  }, [dbChange])

  const handleSearchInput = (searchInput) => {
    const filteredEmployeesArray = employees.filter(employee => {
      const fullName = `${employee.firstname} ${employee.lastname}`
      return fullName.toLowerCase().includes(searchInput.toLowerCase())
    })
    setFilteredEmployees(filteredEmployeesArray)
  }

  return (
    <section className="listOfEmployeesComponent">
      <h1>All Employees</h1>
      <Search
        handleSearchInput={handleSearchInput}
        placeholderText='Search Employee'
      />
      <ol>
        {filteredEmployees && filteredEmployees.map(employee => {
          return (
            <li key={employee.id}>
              <p className="bolded">{employee.firstname} {employee.lastname} </p>
              <Link
                className="buttonContainer link"
                to={`/profile/${employee.id}`}
                state={{ ...employee }}
              >Profile</Link>
              <p className="buttonContainer link" onClick={() => handleDeleteButton(employee.id)}>Delete</p>
            </li>)
        })}
      </ol>
    </section >
  )
}