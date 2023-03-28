import './calendar.style.css'
//React imports 
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

//Component imports
import CalendarCell from './calendarComponents/calendarCell.component'

//date-fns imports
import { startOfMonth, getDaysInMonth, startOfTomorrow, eachDayOfInterval } from 'date-fns'


export default function Calendar(props) {
 //state is an empolee data passed from profile component
 let { state } = useLocation();

 //calendar build
 const daysArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
 const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

 const currentDate = new Date()
 const currentYear = currentDate.getFullYear()

 const [displayMonth, setDisplayMonth] = useState(new Date().getMonth())
 const [daysInMonth, setDaysInMonth] = useState()
 const [firstDayOfMonth, setFirstDayOfMonth] = useState()

 useEffect(() => {
  const numberOfDaysInMonth = getDaysInMonth(new Date(currentYear, displayMonth))
  const daysInMonthArray = []
  for (let i = 1; i <= numberOfDaysInMonth; i++) {
   daysInMonthArray.push(i)
  }
  setDaysInMonth(daysInMonthArray)
  setFirstDayOfMonth(startOfMonth(new Date(currentYear, displayMonth)).getDay())
 }, [displayMonth])

 //create empty divs to display when is the 1st day of month
 const createFirstDayInMonth = () => {
  const emptyCellsArray = []
  if (firstDayOfMonth === 0) {
   for (let i = 1; i <= 6; i++) {
    emptyCellsArray.push('')
   }
  } else {
   for (let i = 1; i < firstDayOfMonth; i++) {
    emptyCellsArray.push('')
   }
  }
  return (
   emptyCellsArray.map((emptyCel, index) => <CalendarCell key={index} />)
  )
 }

 //handling Month Change in Callendar
 const monthChange = (choice) => {
  choice === 'prev' && setDisplayMonth(prevState => prevState - 1)
  choice === 'next' && setDisplayMonth(prevState => prevState + 1)
 }

 //display Events
 const getTempEvent = () => {
  const eventIntervalArray = eachDayOfInterval({
   start: new Date(),
   end: new Date('2023-04-06T03:24:00')
  })
  return {
   startDate: new Date(),
   endDate: startOfTomorrow(),
   eventInterval: eventIntervalArray
  }
 }
 const tempEvent = getTempEvent()

 const [events, setEvents] = useState([tempEvent])

 //pass different classNames to CallendarCell depends if that day is an event day 
 const loadMonthDay = () => {
  const eventArray = events[0].eventInterval.map(day => { return { day: day.getDate(), month: day.getMonth() } })
  return (
   daysInMonth.map((day, index) => {
    if (eventArray.some(eventDay => eventDay.month === displayMonth && eventDay.day === day)) {
     return (<CalendarCell key={index} classNames='calendarItem eventDay' text={day} />)
    } else {
     return (<CalendarCell key={index} classNames='calendarItem' text={day} />)
    }
   })
  )
 }

 return (
  <section className='calendarContainer'>
   <Link className="buttonContainer link" to="/" state={{ ...state }}>Homepage</Link>
   <h1>Calendar</h1>
   <div className='calendar'>
    <button
     className='calendarItem calendarButton'
     onClick={() => monthChange('prev')}
     disabled={displayMonth === 0}
    >
     {`<`}
    </button>

    <CalendarCell
     classNames='monthNameContainer'
     text={`${monthsArray[displayMonth]} ${currentYear}`}
    />

    <button
     className='calendarItem calendarButton'
     onClick={() => monthChange('next')}
     disabled={displayMonth === 11}
    >
     {`>`}
    </button>

    {/* Days Headers */}
    {daysArray.map((day, index) => <CalendarCell key={index} classNames='calendarItem' text={day} />)}
    {/* Cells for each calendar day in the month */}
    {firstDayOfMonth >= 0 && createFirstDayInMonth()}
    {/* {daysInMonth && daysInMonth.map((day, index) => <CalendarCell key={index} classNames='calendarItem' text={day} />)} */}
    {daysInMonth && loadMonthDay()}
   </div>
  </section>
 )
}