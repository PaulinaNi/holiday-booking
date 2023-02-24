import "./listOfEmployees.style.css"
import { useEffect, useState } from "react";
//firebase imports
import { db } from "../../firebase.config";
import { doc, deleteDoc, updateDoc, getDocs, collection } from "firebase/firestore";
//component imports
import Search from "../search/search.component";

export default function ListOfEmployees(props) {
  const [dbChange, setDbChange] = useState('')

  const handleDeleteButton = async (id) => {
    const employeeDocRef = doc(db, "employees", id)
    await deleteDoc(employeeDocRef)
    setDbChange(id)
  }

  const handleUpdate = async (id) => {
    // const employeeDoc = doc(db, "employees", id)
    // const updatedField = { isHR: true } updateDoc(employeeDoc, updatedField)
    await updateDoc(doc(db, "employees", id), { isHR: false })
    props.handleReRender(id)
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
      <h1>Employees</h1>
      <Search
        handleSearchInput={handleSearchInput}
        placeholderText='Search Employee'
      />
      <ol>
        {filteredEmployees && filteredEmployees.map(employee => {
          return (
            <li key={employee.id}>
              <span className="listOfEmployeesComponent-name">{employee.firstname} {employee.lastname} </span>
              {/* Make a component for Update Delete and Profile */}
              <span className="listOfEmployeesComponent-functions" onClick={() => handleUpdate(employee.id)}>Update</span>
              <span className="listOfEmployeesComponent-functions" onClick={() => handleDeleteButton(employee.id)}>Delete</span>
            </li>)
        })}
      </ol>
    </section>
  )
}