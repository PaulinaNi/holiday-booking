import './App.css';

import { useState, useEffect } from 'react';

//firebase imports
import { db } from './firebase.config'
import { collection, getDocs } from "firebase/firestore";

function App() {

  const [employees, setEmployees] = useState()

  useEffect(() => {
    // loading data from firebase
    const getEmployees = async () => {
      const data = await getDocs(collection(db, "employees"))
      // maping over data from firebase to get only empoyees records
      const employeesDB = data.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
      //seting employees data to state
      setEmployees(employeesDB)
    }
    //calling async function
    getEmployees()
  }, [])

  return (
    <div className="App">
      <h1>Holiday Booking in Your Workspace</h1>
      {employees && employees.map((employee) => <h2 key={employee.id}>{employee.name}</h2>)}
    </div>
  );
}

export default App;
