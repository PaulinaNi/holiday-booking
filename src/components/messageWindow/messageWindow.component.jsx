export default function MessageWindow(props) {
 return (
  <div>
   <p>{props.message}</p>
   <button onClick={props.buttonFunction}>Continue</button>
  </div>
 )
}