//import react
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
//import components
import HRPanelNav from "../../components/hrPanelNav/hrPanelNav.component"
import CreateNewEmployee from "../../components/createNewEmployee/createNewEmployee.component"
import ListOfEmployees from "../../components/listOfEmployees/listOfEmployees.component"
import Error from "../error/error.page"


export default function HRPanel() {

 //state for controling which component should be loaded
 const [panelFunction, setPanelFunction] = useState('list')

 const handleHRPanelNavigation = option => {
  setPanelFunction(option)
 }
 let { state } = useLocation();

 const Container = () => {
  return (
   <section>
    <Link className="buttonContainer link" to="/" state={{ ...state }}>Homepage</Link>
    <HRPanelNav panelOption={handleHRPanelNavigation} />
    {panelFunction === 'create' && <CreateNewEmployee />}
    {panelFunction === 'list' && <ListOfEmployees />}
   </section>
  )
 }
 return (
  state ? state.isHR && <Container /> : <Error />
 )
}