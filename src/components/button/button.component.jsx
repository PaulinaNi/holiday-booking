export default function Button(props) {
 return (
  <button onClick={props.function}>{props.text}</button>
 )
}