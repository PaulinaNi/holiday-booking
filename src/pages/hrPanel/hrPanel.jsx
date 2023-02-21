//import react
import { useState, useEffect } from "react"
//import components
import HRPanelNav from "../../components/hrPanelNav/hrPanelNav.component"
import CreateNewEmployee from "../../components/createNewEmployee/createNewEmployee.component"
import ListOfEmployees from "../../components/listOfEmployees/listOfEmployees.component"
//firebase imports
import { db } from '../../firebase.config'
import { collection, getDocs } from "firebase/firestore";


export default function HRPanel() {

 //lift state up change that to dofferent routes later or clean up code
 const [trigerReRender, setTrigerReRender] = useState([0])
 const handleReRender = (num) => {
  setTrigerReRender([num])
 }

 const [employees, setEmployees] = useState()
 useEffect(() => {
  // loading data from firebase
  const getEmployees = async () => {
   const data = await getDocs(collection(db, "employees"))
   // maping over data from firebase to get only empoyees records
   const employeesDB = data.docs.map(doc => {
    return { ...doc.data(), id: doc.id }
   })
   //seting employees data to state
   setEmployees(employeesDB)
  }
  //calling async function
  getEmployees()
  console.log('render')
 }, trigerReRender)


 //state for controling which component should be loaded
 const [panelFunction, setPanelFunction] = useState('list')

 const handleHRPanelNavigation = (option, num) => {
  setPanelFunction(option)
  handleReRender(num)
 }

 return (
  <section>
   <HRPanelNav panelOption={handleHRPanelNavigation} />
   {panelFunction === 'create' && <CreateNewEmployee />}
   {panelFunction === 'list' && <ListOfEmployees employees={employees} handleReRender={handleReRender} />}
  </section>
 )
}