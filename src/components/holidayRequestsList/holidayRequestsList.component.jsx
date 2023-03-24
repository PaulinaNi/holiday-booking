import "./holidayRequestsList.styles.css"

//component imports
import ReqestCard from "../requestCard/requestCard.component"

export default function HolidayRequestsList(props) {
  const { holidayRequests, employees, setRequestProcessStageChanged } = props

  const filteredHolidayRequests = holidayRequests.filter(request => request.isProcessed === false)

  const rerenderMangerPanel = () => {
    setRequestProcessStageChanged(prevState => !prevState)
  }

  return (
    <section className="holidayRequestsListContainer">
      {filteredHolidayRequests.length !== 0 && <h2>Holiday Requests to process</h2>}
      {filteredHolidayRequests.length === 0 && <h2>No Holiday Requests to process</h2>}

      {/* filteredHolidayRequests - reqest are filtred to only show not processed request */}
      {holidayRequests && filteredHolidayRequests.map(request => {
        return (
          <section key={request.id}>
            {employees &&
              <ReqestCard
                request={request}
                employee={employees.filter(employee => employee.id === request.employeeId)[0]}
                //rerenderMangerPanel - lift state up to ManagerPanel from RequestCard
                rerenderMangerPanel={rerenderMangerPanel}
              />}
          </section>
        )
      })}
    </section>
  )
}