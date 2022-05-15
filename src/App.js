import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import CreateEventForm from "./components/CreateEventForm/CreateEventForm";
import EditAndDeleteForm from "./components/EditAndDeleteForm/EditAndDeleteForm";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import ruLocale from '@fullcalendar/core/locales/ru'
import { toIS } from "./components/EditAndDeleteForm/toISOSTR";
import { handleAddEvent, createev, close_and_delete, close_and_save,  renderEventContent} from "./logicFunctions";


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
        )
    }, [])

    console.log(newEvent)



    return (
        <div className="App">

            <CreateEventForm 
              activeCreateEvent={activeCreateEvent} 
              setActiveCreateEvent={setActiveCreateEvent}
              newEvent={newEvent}
              setNewEvent={setNewEvent}
              handleAddEvent={()=>{
                handleAddEvent(newEvent, setNewEvent, setAllEvents, allEvents, setActiveCreateEvent)
              }}
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
                      allEvents={allEvents}
                      setAllEvents={setAllEvents}
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

            <FullCalendar
              customButtons={{
                newEventbtn: {
                    text: 'Создать событие',
                    click: ()=>setActiveCreateEvent(true)
                },
                allEventsbtn: {
                  text: 'Все события',
                  click: ()=>setActiveAllEvent(true)
                }
              }}
              plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prevYear,prev,next,nextYear,today,newEventbtn,allEventsbtn',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              eventContent={(e)=>renderEventContent(e)}
              eventClick={e=>{console.log(e)}}
              slotLabelFormat={{
                hour: '2-digit',
                minute: '2-digit',
                meridiem: false,
                hour12: false
              }}
              locale={ruLocale}
              editable={true}
              selectable={true}
              dateClick={(e) => {
                createev(e, setActiveCreateEvent, newEvent, setNewEvent, toIS)
              }}
              events={allEvents}
              style={{width: '100vw'}}
            />
        </div>
    );
}

export default App;