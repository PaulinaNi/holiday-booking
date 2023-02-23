import "./listOfEmployees.style.css"
import { useEffect, useState } from "react";
//firebase imports
import { db } from "../../firebase.config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
//component imports
import Search from "../search/search.component";

export default function ListOfEmployees(props) {
  const employees = props
  const handleDeleteButton = async (id) => {
    // const employeeDoc = doc(db, "employees", id) deleteDoc(employeeDoc)
    await deleteDoc(doc(db, "employees", id))
    props.handleReRender(id)
  }

  const handleUpdate = async (id) => {
    // const employeeDoc = doc(db, "employees", id)
    // const updatedField = { isHR: true } updateDoc(employeeDoc, updatedField)
    await updateDoc(doc(db, "employees", id), { isHR: false })
    props.handleReRender(id)
  }

  const handleSearchInput = (searchInput) => {
    const filteredEmployeesArray = employees.filter(employee => {
      const fullName = `${employee.firstname} ${employee.lastname}`
      return fullName.toLowerCase().includes(searchInput.toLowerCase())
    })
  }



  return (
    <section className="listOfEmployeesComponent">
      <h1>Employees</h1>
      <Search handleSearchInput={handleSearchInput} />
      <ol>
        {employees && employees.map(employee => {
          return (
            <li key={employee.id}>
              <span className="listOfEmployeesComponent-name">{employee.firstname} {employee.lastname}</span>
              <span className="listOfEmployeesComponent-functions" onClick={() => handleUpdate(employee.id)}>Update</span>
              <span className="listOfEmployeesComponent-functions" onClick={() => handleDeleteButton(employee.id)}>Delete</span>
            </li>)
        })}
      </ol>
    </section>
  )
}