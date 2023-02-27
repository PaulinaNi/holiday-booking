import './profile.style.css'

//react
import { Link } from "react-router-dom"

//components
import ProfileCard from '../profileCard/profileCard.component'

export default function Profile(props) {
 const { employee } = props

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
   <div className='profileNavigationButtons'>
    {employee.isHR && HRPanelButton()}
    {employee.isManager && ManagerPanelButton()}
    <Link className='buttonContainer link' to="/calendar">Calendar</Link>
   </div>
   <ProfileCard employee={employee} />
  </section>
 )
}