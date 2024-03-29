import "./profileCard.style.css"
import userAvatar from "../../images/userAvatar.svg"

//react imports
import { Link } from "react-router-dom"

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
        {!isForEmployeeUse &&
          <Link
            className="buttonContainer link"
            to={`/update/${employee.id}`}
          >Update</Link>}
      </div>
      {/* only show for employee */}
      {isForEmployeeUse &&
        <Link
          className="userCardButtons buttonContainer link"
          to={`/request/${employee.id}`}
          state={{ ...employee }}
        >Request holiday</Link>
      }
      {isForEmployeeUse && <Link
        className="userCardButtons buttonContainer link"
        to={`requestshistory`}
        state={{ ...employee }}
      >Holiday requests history</Link>}
    </section>
  )
}