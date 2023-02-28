import "./profileCard.style.css"
import userAvatar from "../../images/userAvatar.svg"

//components

export default function ProfileCard(props) {
 //there are 2 variants of that component - for employees to view their profile (isForEmployeeUse=true) and for HR to see employee profile and be able to update employee data (not passing isForEmployeeUse as props or set to false)
 const { employee, isForEmployeeUse } = props

 //function to input plural or singular of day need to be included or none
 const chooseVersion = (data) => {
  if (data > 1) {
   return `${data} days`
  } else if (data === 1) {
   return `1 day`
  } else if (data === 0) {
   return 'none'
  }
 }
 return (
  <section className="userCard">
   <img className="userAvatar" src={userAvatar} alt="unisex user avatar" />
   <div className="userInformation">
    <p className="userName">{employee.firstname} {employee.lastname}</p>
    <p>Holiday entitlement: {`${employee.entitlement} days`}</p>
    <p>Holiday taken: {chooseVersion(employee.taken)}</p>
    <p>Holiday remaining: {chooseVersion(employee.remaining)}</p>
    {/* only show for HR */}
    {!isForEmployeeUse && <p className="userCardButtons buttonContainer">Update</p>}
   </div>
   {/* only show for employee */}
   {isForEmployeeUse && <p className="userCardButtons buttonContainer">Request holiday</p>}
   {isForEmployeeUse && <p className="userCardButtons buttonContainer">Holiday requests history</p>}
  </section>
 )
}