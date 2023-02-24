//import react
import { useState } from "react"
//import components
import HRPanelNav from "../../components/hrPanelNav/hrPanelNav.component"
import CreateNewEmployee from "../../components/createNewEmployee/createNewEmployee.component"
import ListOfEmployees from "../../components/listOfEmployees/listOfEmployees.component"



export default function HRPanel() {

 //state for controling which component should be loaded
 const [panelFunction, setPanelFunction] = useState('list')

 const handleHRPanelNavigation = option => {
  setPanelFunction(option)
 }

 return (
  <section>
   <HRPanelNav panelOption={handleHRPanelNavigation} />
   {panelFunction === 'create' && <CreateNewEmployee />}
   {panelFunction === 'list' && <ListOfEmployees />}
  </section>
 )
}