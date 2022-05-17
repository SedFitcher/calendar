export const handleAddEvent = (
    newEvent,
    setNewEvent,
    setAllEvents,
    allEvents,
    setActiveCreateEvent,
) => {
    if(newEvent.title === "" || newEvent.description === "" || newEvent.start === "" || newEvent.end === "") {
      setActiveCreateEvent(false)
    }else{
      // newEvent.start = new Date(Date.parse(newEvent.start))
      // newEvent.end = new Date(Date.parse(newEvent.end))
      // console.log(newEvent.start, newEvent.end, typeof(newEvent.end), typeof(newEvent.start))
      // setAllEvents([...allEvents, newEvent]);
      // console.log(allEvents)
      setActiveCreateEvent(false)
      var nev = newEvent
      // nev.start = nev.start.toISOString()
      // nev.end = nev.end.toISOString()
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
          // console.log(result)
          var ev = result
          for(var i = 0; i < ev.length; i++){
              var start = new Date(Date.parse(ev[i].start))
              var end = new Date(Date.parse(ev[i].end))
              ev[i].start = start
              ev[i].end = end

          }
          setAllEvents([...allEvents, ev]);
          setNewEvent({ title: "", description: "", start: "", end: "", id: null })
          // console.log(newEvent)
          // console.log(typeof(allEvents))
        },)
    }
}

export const createev = (e, setActiveCreateEvent, newEvent, setNewEvent, toIS) => {
    setActiveCreateEvent(true)
    // console.log(e)
    setNewEvent({ ...newEvent, start: toIS(e.dateStr) })
}

export const close_and_delete = (e, setAllEvents, allEvents, setActiveAllEvent) => {
    var url = "http://83.172.39.220:8000/events/"+e.target.id.toString()+"/"
    fetch(url, {
        method: 'DELETE',
        mode: 'cors',
    }).then(res => {
      console.log(res)
      if (res.ok ===true) {
        setAllEvents(allEvents.filter(event => event.id != e.target.id));
      }
    })
    setActiveAllEvent(false)
}

export const close_and_save = (e, setActiveAllEvent, allEvents, setAllEvents, setNewEvent) => {
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
    }).then(res => res.json())
    .then(
      (result) => {
        // console.log(result)
        var alev = allEvents
        for(var i = 0; i < alev.length; i++) {
          if(alev[i].id == result.id) {
            alev[i].title = result.title
            alev[i].description = result.description
            alev[i].start = result.start
            alev[i].end = result.end
          }
        }
        setAllEvents(alev)
      },)
      setNewEvent({ title: "", description: "", start: "", end: "", id: null })
}

export function renderEventContent(eventInfo, allEvents) {
    var time = ''
    for(var i = 0; i < allEvents.length; i++) {
      if (allEvents[i].id == eventInfo.event._def.publicId) {
        time = ISOtotime(allEvents[i].start.toISOString())
        // time += ' - '
        // time += ISOtotime(allEvents[i].end.toISOString())
      }
    }
    return (
      <div className="eventBlock">
        <b>{time}</b><br/>
        <i>Событие: {eventInfo.event.title}</i><br/>
        <i>Описание: {eventInfo.event.extendedProps.description}</i><br/>
      </div>
    )
}

export const dropEvent = (e) => {
  var url = "http://83.172.39.220:8000/events/"+e.event._def.publicId+"/"
  fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: e.event.title,
      description: e.event.extendedProps.description,
      start: e.event._instance.range.start,
      end: e.event._instance.range.end
    })
  })
}

export const ISOtotime = (isostr) => {
  var st = isostr.split('')
  for (var i = 0; i < 8; i++) {
    st.pop()
  }
  for (var i = 0; i < 11; i++) {
    st.shift()
  }
  var str = ''
  for (var i = 0; i < st.length; i++) {
    str += st[i]
  }
  return str
}