import './App.css'

//React imports
import { Routes, Route } from "react-router-dom"

//pages and components imports
import Homepage from './pages/homepage/homepage.page'
import HRPanel from './pages/hrPanel/hrPanel'
import ManagerPanel from './pages/managerPanel/managerPanel.page'
import Error from './pages/error/error.page'
import UpdateData from './pages/updateData/updateData.page'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/hr' element={<HRPanel />} />
        <Route path='/manager' element={<ManagerPanel />} />
        <Route path='/calendar' element={<h2>calendar</h2>} />
        <Route path='/error' element={<Error />} />
        <Route path='/update/:id' element={<UpdateData />} />
      </Routes>
    </div>
  )
}

export default App;
