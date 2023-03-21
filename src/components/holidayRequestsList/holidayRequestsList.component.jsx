export default function HolidayRequestsList(props) {
 const { holidayRequests, employees } = props

 return (
  <section>
   <h2>Holiday Requests to process</h2>

   {holidayRequests.map(request => {
    return <p key={request.id}>From {request.startDate.toDate().toDateString()} to {request.endDate.toDate().toDateString()}</p>
   })}
  </section>
 )
}