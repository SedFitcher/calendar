export const handleAddEvent = (
    newEvent,
    setNewEvent,
    setAllEvents,
    allEvents,
    setActiveCreateEvent,
) => {
    newEvent.start = new Date(Date.parse(newEvent.start))
    newEvent.end = new Date(Date.parse(newEvent.end))
    console.log(newEvent.start, newEvent.end, typeof(newEvent.end), typeof(newEvent.start))
    setAllEvents([...allEvents, newEvent]);
    console.log(allEvents)
    setActiveCreateEvent(false)
    var nev = newEvent
    nev.start = nev.start.toISOString()
    nev.end = nev.end.toISOString()
    fetch("http://83.172.39.220:8000/events/", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nev)

    }).then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        var ev = result
        for(var i = 0; i < ev.length; i++){
            var start = new Date(Date.parse(ev[i].start))
            var end = new Date(Date.parse(ev[i].end))
            ev[i].start = start
            ev[i].end = end

        }
        if(allEvents == []){
          setAllEvents([...allEvents, ev])
        }else{
          setAllEvents(ev);
        }
      },)
    setNewEvent({ title: "", description: "", start: "", end: "", id: null })
}

export const createev = (e, setActiveCreateEvent, newEvent, setNewEvent, toIS) => {
    setActiveCreateEvent(true)
    console.log(e)
    setNewEvent({ ...newEvent, start: toIS(e.dateStr) })
}

export const close_and_delete = (e) => {
    var url = "http://83.172.39.220:8000/events/"+e.target.id.toString()+"/"
    fetch(url, {
        method: 'DELETE',
        mode: 'cors',
    })
}

export const close_and_save = (e, setActiveAllEvent, allEvents) => {
    setActiveAllEvent(false)
    var body = ''
    for(var i = 0; i < allEvents.length; i++) {
      if(allEvents[i].id == e.target.id) {
        body = allEvents[i]
      }
    }
    var url = "http://83.172.39.220:8000/events/"+e.target.id.toString()+"/"
    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
}

export function renderEventContent(eventInfo) {
    console.log(eventInfo.event.title, eventInfo.event._def.publicId, eventInfo.event.extendedProps)
    console.log(eventInfo.event)
    return (
      <div className="eventBlock">
        {/* <b>{eventInfo.timeText}</b><br/> */}
        <i>Событие: {eventInfo.event.title}</i><br/>
        <i>Описание: {eventInfo.event.extendedProps.description}</i><br/>
        <form>
          <button
            className="dbtn" 
            type=""
            id={eventInfo.event._def.publicId}
            onClick={e=>close_and_delete(e)}
          >
            Удалить
          </button>
        </form>
      </div>
    )
}