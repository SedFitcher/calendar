import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import CreateEventForm from "./components/CreateEventForm/CreateEventForm";
import EditAndDeleteForm from "./components/EditAndDeleteForm/EditAndDeleteForm";

const locales = {
    "ru": require("date-fns/locale/ru"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [];

function App() {
    const [newEvent, setNewEvent] = useState({ title: "", description: "", start: "", end: "", id: null });
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
                ev[i].start = start
                ev[i].end = end

            }
            setAllEvents(ev);
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
        var nev = newEvent
        // nev.id = Date.now();
        nev.start = nev.start.toISOString()
        nev.end = nev.end.toISOString()
        fetch("http://83.172.39.220:8000/events/", {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nev)

        })
        setNewEvent({ title: "", description: "", start: "", end: "", id: null })
    }

    const close_and_save = () => {
      setActiveAllEvent(false)
    }

    const close_and_delete = (e) => {
      var url = "http://83.172.39.220:8000/events/"+e.target.id.toString()+"/"
      fetch(url, {
          method: 'DELETE',
          mode: 'cors',
        })
    }

    return (
        <div className="App">

            <CreateEventForm 
              activeCreateEvent={activeCreateEvent} 
              setActiveCreateEvent={setActiveCreateEvent}
              newEvent={newEvent}
              setNewEvent={setNewEvent}
              handleAddEvent={handleAddEvent}
            />
            <div 
              className={ActiveAllEvent
              ?
              "active events"
              :
              "events"} 
              id="createEvent"
              onClick={() => {setActiveAllEvent(false)}}
            >
              {
                allEvents.map((ev) => {
                  return(
                    <EditAndDeleteForm
                      ActiveAllEvent={ActiveAllEvent}
                      newEvent={newEvent}
                      setActiveAllEvent={setActiveAllEvent}
                      setNewEvent={setNewEvent}
                      close_and_save={close_and_save}
                      close_and_delete={close_and_delete}
                      ev={ev}
                      key={ev.id}
                    />
                  )
                })
              }
            </div>

            <button 
              className={!activeCreateEvent?"":"nonactivebtn"}
              onClick={() => {setActiveCreateEvent(true)}}
            >
              Создать событие
            </button>

            <button
              onClick={() => {setActiveAllEvent(true)}}
            >
              Все события
            </button>

            <Calendar 
              localizer={localizer} 
              events={allEvents} 
              startAccessor="start" 
              endAccessor="end" 
              style={{ height: 500, margin: "50px" }}
            />
        </div>
    );
}

export default App;