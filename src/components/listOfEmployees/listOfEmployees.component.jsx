import "./listOfEmployees.style.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
//firebase imports
import { db } from "../../firebase.config"
import { doc, deleteDoc, updateDoc, getDocs, collection } from "firebase/firestore"
//component imports
import Search from "../search/search.component"

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
              {/* Make a component for Update Delete and Profile */}
              <div className="listOfEmployeesComponent-functions">
                <Link
                  className="buttonContainer link"
                  onClick={() => handleUpdate(employee.id)}
                  to={`/update/${employee.id}`}
                >Update</Link>
                <p className="buttonContainer link" onClick={() => console.log('checked')}>Check</p>
                <p className="buttonContainer link" onClick={() => handleDeleteButton(employee.id)}>Delete</p></div>
            </li>)
        })}
      </ol>
    </section>
  )
}