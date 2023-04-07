import './App.css'

//React imports
import { Routes, Route } from "react-router-dom"

//pages and components imports
import Homepage from './pages/homepage/homepage.page'
import HRPanel from './pages/hrPanel/hrPanel'
import ManagerPanel from './pages/managerPanel/managerPanel.page'
import Error from './pages/error/error.page'
import UpdateData from './pages/updateData/updateData.page'
import Profile from './components/profile/profile.component'
import RequestHoliday from './pages/requestHoliday/requestHoliday.page'
import Calendar from './components/calendar/calendar.component'
import RequestsHisatory from './components/requestsHistory/requestsHistory.component'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/hr' element={<HRPanel />} />
        <Route path='/manager' element={<ManagerPanel />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/error' element={<Error />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/update/:id' element={<UpdateData />} />
        <Route path='/request/:id' element={<RequestHoliday />} />
        <Route path='/requestshistory' element={<RequestsHisatory />} />
      </Routes>
    </div>
  )
}

export default App;
