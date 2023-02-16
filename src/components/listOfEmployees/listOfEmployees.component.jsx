//firebase imports
import { db } from "../../firebase.config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
//component imports
import Button from "../button/button.component"

export default function ListOfEmployees(props) {


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

  return (
    <section>
      <ol>
        {props.employees && props.employees.map(employee => {
          return (
            <li key={employee.id}>
              {employee.firstname} {employee.lastname}
              <Button text='Update' function={() => handleUpdate(employee.id)} />
              <Button text='Delete' function={() => handleDeleteButton(employee.id)} />
            </li>)
        })}
      </ol>
    </section>
  )
}