//component imports
import ReqestCard from "../requestCard/requestCard.component"

export default function HolidayRequestsList(props) {
 const { holidayRequests, employees } = props
 // console.log(holidayRequests, employees)

 return (
  <section>
   <h2>Holiday Requests to process</h2>
   {/* reqest are filtred to only show not processed request */}
   {holidayRequests && holidayRequests.filter(request => request.isProcessed === false).map(request => {
    return (
     <section key={request.id}>
      {employees && <ReqestCard request={request} employee={employees.filter(employee => employee.id === request.employeeId)[0]} />}
     </section>
    )
   })}
  </section>
 )
}