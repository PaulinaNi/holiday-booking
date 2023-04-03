import './loginInstrution.style.css'
import { useState } from 'react'

export default function LoginInstrution() {
 const [displayInformation, setDisplayInformation] = useState(true)
 const handleDisplayInformationChange = () => {
  setDisplayInformation(prevState => !prevState)
 }

 return (
  <div>
   {displayInformation &&
    <section className="instructionContainer">
     <h1>Holiday Booking App in Your Workspace</h1>
     <p>You can log into 3 accounts to check how this app is working</p>
     <ul>
      <li>HR Account where you can add new Employees,update Employees data and check all holiday request.</li>
      <li>Manager account where you can accept holiday reqests and check when your team have a holiday</li>
      <li>Worker account where you can check when worker have booked holidays, send reqest and check if they have been accepted</li>
     </ul>

     <button onClick={handleDisplayInformationChange}>Hide above information</button>
    </section>}
  </div>
 )
}