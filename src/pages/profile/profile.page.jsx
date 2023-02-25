import './profile.page.style.css'
//tabs npm
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
// import 'react-tabs/style/react-tabs.css'
//react
import { Link } from "react-router-dom"

export default function Profile(props) {
 const { employee } = props

 return (
  <section className='profileContainer'>
   {/* <h2>Welcome to your profile, {employee.firstname} {employee.lastname}!</h2>
   {employee.isHR && <Link to='/hr'>HR Panel</Link>} */}


   <Tabs>
    <TabList>
     <Tab><p>Profile</p></Tab>
     <Tab><p>Calendar</p></Tab>
     <Tab><p>HR Panel</p></Tab>
     <Tab><p>Manager Panel</p></Tab>
    </TabList>

    <TabPanel>
     <div className="panel-content">
      <h2>Any content 1</h2>
     </div>
    </TabPanel>
    <TabPanel>
     <div className="panel-content">
      <h2>Any content 2</h2>
     </div>
    </TabPanel>
    <TabPanel>
     <div className="panel-content">
      <h2>Any content 3</h2>
     </div>
    </TabPanel>
    <TabPanel>
     <div className="panel-content">
      <h2>Any content 4</h2>
     </div>
    </TabPanel>
    <TabPanel>
     <div className="panel-content">
      <h2>Any content 5</h2>
     </div>
    </TabPanel>
   </Tabs>

  </section>

 )
}