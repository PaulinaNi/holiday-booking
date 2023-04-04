import top from "../../images/leavesTop.png"
import bottom from "../../images/leavesBottom.png"
import { Link } from "react-router-dom"

export default function Error() {
 return (
  <main className="center">
   <img className="logInImg" src={top} alt="watercolor leaves border" />
   <h1>You don't have permissions to access this page</h1>
   <p>Go back to Homepage and Log In to get access </p>
   <Link className='buttonContainer link' to="/">Homepage</Link>
   <img className="logInImg" src={bottom} alt="watercolor leaves border" />
  </main>
 )
}