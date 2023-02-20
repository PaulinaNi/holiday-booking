import "./hrPanelNav.style.css"

export default function HRPanelNav(props) {
 const { panelOption } = props
 return (
  <nav className='hrPanelNavContainer'>
   <span>HR Panel</span>
   <ul>
    {/* when styled add cursor pointer */}
    <li onClick={() => panelOption('create', 1)}>Add New Employee</li>
    <li onClick={() => panelOption('list', 2)}>List of Employees</li>
   </ul>
  </nav>
 )
}