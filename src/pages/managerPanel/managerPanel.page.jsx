import { useLocation } from "react-router-dom"

//components
import Error from "../error/error.page";

export default function ManagerPanel() {
 let { state } = useLocation();
 return (
  // only load manager panel if logged user have permissions otherwise load no permission a
  state ? state.isHR && <section>yes</section> : <Error />
 )
}