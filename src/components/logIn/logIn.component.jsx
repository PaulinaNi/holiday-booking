import "./logIn.style.css"
import { useState } from "react"

//import images
import top from "../../images/leavesTop.png"
import bottom from "../../images/leavesBottom.png"
//import components
import Button from "../button/button.component"

export default function LogIn(props) {

 const handleLogInChanges = event => {
  const name = event.target.name
  const value = event.target.value
  setLogInData(prevState => { return { ...prevState, [name]: value } })
 }
 const userLogInDataLayout = {
  firstname: '',
  lastname: '',
  password: ''
 }
 const [logInData, setLogInData] = useState(userLogInDataLayout)

 const handleLogInSubmitFromComponent = (event) => {
  event.preventDefault()
  props.handleLogInSubmit(logInData)
  setLogInData(userLogInDataLayout)
 }

 return (
  <section className="logInContainer">
   <img className="logInImg" src={top} alt="watercolor leaves border" />
   <form className="logInForm" onSubmit={handleLogInSubmitFromComponent}>
    <div>
     <label htmlFor="firstname">First Name</label>
     <input
      type="text"
      name="firstname"
      id="firstname"
      value={logInData.firstname}
      onChange={handleLogInChanges}
     />
    </div>
    <div>
     <label htmlFor="lastname">Last Name</label>
     <input
      type="text"
      name="lastname"
      id="lastname"
      value={logInData.lastname}
      onChange={handleLogInChanges}
     />
    </div>
    <div>
     <label htmlFor="password">Password</label>
     <input
      type="password"
      name="password"
      id="password"
      value={logInData.password}
      onChange={handleLogInChanges}
     />
    </div>
    <Button text='Log In' />
   </form>
   <img className="logInImg" src={bottom} alt="watercolor leaves border" />
  </section>
 )
}