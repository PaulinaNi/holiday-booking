import './root.style.css'
import { Outlet } from "react-router-dom";

export default function Root() {
 return (
  <main className='rootComponent'>
   <header>
    <h1>I'm a header</h1>
   </header>
   <Outlet />
  </main>
 )
}