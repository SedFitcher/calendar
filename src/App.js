import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import moment from "react-big-calendar/lib/localizers/moment";
import 'react-big-calendar/lib/localizers/date-fns'
import 'date-fns/locale/ru'
import 'date-fns/locale/ru/_lib/localize'



const locales = {
    "ru": require("date-fns/locale/ru/_lib/localize"),
};
const localizer = dateFnsLocalizer({
    moment,
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [];

function App() {
    const [newEvent, setNewEvent] = useState({ title: "", description: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);
    const [activeCreateEvent, setActiveCreateEvent] = useState(false)
    const [ActiveAllEvent, setActiveAllEvent] = useState(false)

    useEffect(() => {
      fetch("http://83.172.39.220:8000/events/", {
      })
        .then(res => res.json())
        .then(
          (result) => {
            var ev = result
            for(var i = 0; i < ev.length; i++){
                var start = new Date(Date.parse(ev[i].start))
                var end = new Date(Date.parse(ev[i].end))
                console.log(start, end)
                ev[i].start = start
                ev[i].end = end

            }
            setAllEvents(ev);
            console.log(ev)
            
          },
          // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
          // чтобы не перехватывать исключения из ошибок в самих компонентах.
          (error) => {
          }
        )
    }, [])

    console.log(newEvent)

  const handleAddEvent = () => {
        setAllEvents([...allEvents, newEvent]);
        setActiveCreateEvent(false)
        setActiveAllEvent(false)
        var nev = newEvent
        nev.start = nev.start.toISOString()
        nev.end = nev.end.toISOString()
        console.log(nev)
        fetch("http://83.172.39.220:8000/events/", {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nev)

        })
        setNewEvent({ title: "", description: "", start: "", end: "" })
    }





    return (
        <div className="App">
            <div 
              className={activeCreateEvent
                        ?
                        "active create-event"
                        :
                        "create-event"} 
              id="createEvent"
              >
                <input type="text" 
                  placeholder="Название" 
                  style={{ width: "20%", marginRight: "10px" }} 
                  value={newEvent.title} 
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />

                <textarea type="text" 
                  placeholder="Описание" 
                  style={{ width: "20%", marginRight: "10px" }} 
                  value={newEvent.description} 
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />

                <DatePicker 
                  // locale='ru'
                  placeholderText="начало" 
                  style={{ marginRight: "10px" }} 
                  selected={newEvent.start} 
                  showTimeSelect
                  timeIntervals={1} 
                  timeFormat="HH:mm"
                  dateFormat = "dd/MM/yyyy hh:mm"
                  onChange={(start) => setNewEvent({ ...newEvent, start })} />

                <DatePicker 
                  // locale='ru'
                  placeholderText="конец" 
                  selected={newEvent.end} 
                  showTimeSelect
                  timeIntervals={1}
                  timeFormat="HH:mm"
                  dateFormat = "dd/MM/yyyy hh:mm"
                  onChange={(end) => setNewEvent({ ...newEvent, end })} />

                <button 
                  stlye={{ marginTop: "10px" }} 
                  onClick={handleAddEvent}>
                    Создать
                </button>
            </div>



            <div 
              className={ActiveAllEvent
                        ?
                        "active all-event"
                        :
                        "all-event"} 
              id="allEvent"
              >
                <input type="text" 
                  placeholder="Название" 
                  style={{ width: "20%", marginRight: "10px" }} 
                  value={newEvent.title} 
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />

                <textarea type="text" 
                  placeholder="Описание" 
                  style={{ width: "20%", marginRight: "10px" }} 
                  value={newEvent.description} 
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />

                <DatePicker 
                  placeholderText="начало" 
                  style={{ marginRight: "10px" }} 
                  selected={newEvent.start} 
                  showTimeSelect
                  timeIntervals={1} 
                  dateFormat = "PP"
                  onChange={(start) => setNewEvent({ ...newEvent, start })} />

                <DatePicker 
                  placeholderText="конец" 
                  selected={newEvent.end} 
                  showTimeSelect
                  timeIntervals={1}
                  dateFormat = "PP"
                  onChange={(end) => setNewEvent({ ...newEvent, end })} />

                <button 
                  stlye={{ marginTop: "10px" }} 
                  onClick={handleAddEvent}>
                    Создать
                </button>
            </div>


                <button 
                  className={!activeCreateEvent
                            ?
                            ""
                            :
                            "nonactivebtn"}
                  onClick={(e) => {
                    setActiveCreateEvent(true)
                  }}>
                  Создать событие
                </button>

                <button
                  onClick={(e) => {
                    setActiveAllEvent(true)
                  }}
                >
                  Все события
                </button>

            <Calendar 
              localizer={localizer} 
              locale='ru'
              // culture = 'ru'
              events={allEvents} 
              startAccessor="start" 
              endAccessor="end" 
              style={{ height: 500, margin: "50px" }}/>
        </div>
    );
}

export default App;