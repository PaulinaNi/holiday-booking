import "./messageWindow.style.css"

import Button from "../button/button.component"

export default function MessageWindow(props) {
 return (
  <div className="messageWindowContainer">
   <p>{props.message}</p>
   <Button text='Continue' function={props.buttonFunction} />
  </div>
 )
}