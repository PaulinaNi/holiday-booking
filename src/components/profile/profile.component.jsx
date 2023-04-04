import './profile.style.css'

//react
import { Link, useLocation } from "react-router-dom"

//components
import ProfileCard from '../profileCard/profileCard.component'

export default function Profile(props) {
 // this component is used twice in app: 
 // - to show employees their profile
 // - to show HR person specific employee profile and be able to update data

 // employee data is passed from homepage component and is used to show employees their profile
 const { employee } = props

 // state data is passed from listOfEmployees Component and is used to show HR person specific employee profile and be able to update data
 let { state } = useLocation();

 const HRPanelButton = () => {
  return (
   <Link
    className='buttonContainer link'
    to="/hr"
    state={{ ...employee }}
   >HR Panel</Link>
  )
 }

 const ManagerPanelButton = () => {
  return (
   <Link
    className='buttonContainer link'
    to="/manager"
    state={{ ...employee }}
   >Manager Panel</Link >
  )
 }

 return (
  <section>
   {employee && <div>
    <div className='profileNavigationButtons'>
     {employee.isHR && HRPanelButton()}
     {employee.isManager && ManagerPanelButton()}
     <Link
      className='buttonContainer link'
      to="/calendar"
      state={{ ...employee }}
     >Calendar</Link>
    </div>
    <ProfileCard employee={employee} isForEmployeeUse={true} />
   </div>
   }
   {state && !employee && <ProfileCard employee={state} isForEmployeeUse={false} />}
  </section>
 )
}