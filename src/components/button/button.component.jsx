import "./button.style.css"

export default function Button(props) {
 return (
  <button className="buttonContainer" onClick={props.function}>{props.text}</button>
 )
}