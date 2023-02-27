import "./hrPanelNav.style.css"

export default function HRPanelNav(props) {
 const { panelOption } = props
 return (
  <nav className='hrPanelNavContainer'>
   <span>HR Panel</span>
   <section>
    <p className="buttonContainer link" onClick={() => panelOption('create', 1)}>Add New Employee</p>
    <p className="buttonContainer link" onClick={() => panelOption('list', 2)}>List of Employees</p>
   </section>
  </nav>
 )
}