export default function CalendarCell(props) {
 const { text, classNames, onClickHandler } = props
 return (
  <div
   className={classNames}
   onClick={onClickHandler}
  >
   {text}
  </div>
 )
}