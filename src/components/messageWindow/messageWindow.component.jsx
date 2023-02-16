import Button from "../button/button.component"

export default function MessageWindow(props) {
 return (
  <div>
   <p>{props.message}</p>
   <Button text='Continue' function={props.buttonFunction} />
  </div>
 )
}