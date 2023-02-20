import './App.css'

//React imports
// import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"

//pages and components imports
import Homepage from './pages/homepage/homepage.page'
import HRPanel from './pages/hrPanel/hrPanel'

//firebase imports
// import { db } from './firebase.config'
// import { collection, getDocs } from "firebase/firestore"

function App() {

  // const [employees, setEmployees] = useState()

  // useEffect(() => {
  //   // loading data from firebase
  //   const getEmployees = async () => {
  //     const data = await getDocs(collection(db, "employees"))
  //     // maping over data from firebase to get only empoyees records
  //     const employeesDB = data.docs.map(doc => {
  //       return { ...doc.data(), id: doc.id }
  //     })
  //     //seting employees data to state
  //     setEmployees(employeesDB)
  //   }
  //   //calling async function
  //   getEmployees()
  // }, [])

  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/hr' element={<HRPanel />} />
        <Route path='/manager' element={<h2>Manager</h2>} />
      </Routes>

    </div>
  );
}

export default App;
