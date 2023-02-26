import './profile.style.css'

//react
import { Link } from "react-router-dom"

//components
import Button from '../button/button.component'
import ProfileCard from '../profileCard/profileCard.component'

export default function Profile(props) {
 const { employee } = props

 return (
  <section>
   {/* {employee.isHR && <Link to='/hr'>HR Panel</Link>} */}
   <div className='profileNavigationButtons'>
    {employee.isHR && <Button text="HR Panel" />}
    {employee.isManager && <Button text="Manager Panel" />}
    <Button text="Calendar" />
   </div>
   <ProfileCard employee={employee} />
  </section>
 )
}