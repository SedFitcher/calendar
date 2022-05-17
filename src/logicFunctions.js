// модуль с логическими функциями

export const handleAddEvent = ( // функция создания заметки
    newEvent, // состояние для временного хранения нового события
    setNewEvent, // функция изменения состояния для временного хранения нового события
    setAllEvents, // функция изменения массива состояния для хранения всех событий
    allEvents, // массив состояние для хранения всех событий
    setActiveCreateEvent, // функция изменения состояния для условного рендеринга окна для создания событий 
) => {
    if(newEvent.title === "" || newEvent.description === "" || newEvent.start === "" || newEvent.end === "") {
      setActiveCreateEvent(false) // если хотя бы одно поле пустое то модальное окно просто закрывается
    }else{ 
      setActiveCreateEvent(false) // закрытие модального окна
      var nev = newEvent
      fetch("http://83.172.39.220:8000/events/", { // пост запрос на сервер для добавления в базе данных события
        method: 'POST',
        mode: 'cors', // защищенный режим
        headers: {
          'Content-Type': 'application/json' // тип передаваемы данных application/json
        },
        body: JSON.stringify(nev) // тело запроса

      }).then(res => res.json()) // обработка ответа сервера
      .then(
        (result) => {
          setAllEvents([...allEvents, result]); // добавление в массив состояния всех событий
          setNewEvent({ title: "", description: "", start: "", end: "", id: null }) // обнуление всех инпутов 
        },)
    }
}

export const createev = (e, setActiveCreateEvent, newEvent, setNewEvent, toIS) => {
  // функция вызова окна добавления события вызывающаяся при нажатии на ячейка в календаре
    setActiveCreateEvent(true)
    setNewEvent({ ...newEvent, start: toIS(e.dateStr) })
}

export const close_and_delete = (e, setAllEvents, allEvents, setActiveAllEvent) => {
  // функция удаления события
    var url = "http://83.172.39.220:8000/events/"+e.target.id.toString()+"/" // url адрес + id события
    fetch(url, { // delete заррос на сервер
        method: 'DELETE',
        mode: 'cors',
    }).then(res => { // обработка ответа от сервера
      console.log(res)
      if (res.ok === true) { // если ок = true то мы обновляем состояния удаляя из него событие
        setAllEvents(allEvents.filter(event => event.id != e.target.id));
      }
    })
    setActiveAllEvent(false) // закрываем модалное окно
}

export const close_and_save = (e, setActiveAllEvent, allEvents, setAllEvents, setNewEvent) => {
  // функция сохранения отредактированного события
    setActiveAllEvent(false) // закрываем модалное окно 
    var body = ''
    for(var i = 0; i < allEvents.length; i++) {
      if(allEvents[i].id == e.target.id) {
        body = allEvents[i] // сосздаем переменную для тела запроса и присваиваем ей значение нужного нам события
      }
    }
    var url = "http://83.172.39.220:8000/events/"+e.target.id.toString()+"/" // url адрес + id события
    fetch(url, { // put заррос на сервер
      method: 'PUT',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(res => res.json()) // обработка ответа
    .then(
      (result) => {
        var alev = allEvents
        for(var i = 0; i < alev.length; i++) {
          if(alev[i].id === result.id) {
            alev[i].title = result.title
            alev[i].description = result.description
            alev[i].start = result.start
            alev[i].end = result.end
          }
        }
        // в цикле находим и изменяем обьект события на тот который прислал нам сервер
        setAllEvents(alev) // изменяем массив состояние всех событий
      },)
      setNewEvent({ title: "", description: "", start: "", end: "", id: null }) // обнуляем состояние временного хранения события
}

export function renderEventContent(eventInfo, allEvents) {
  // функция рендеринга блока события на сетке календаря
    return (
      <div className="eventBlock"> 
        <i>Событие: {eventInfo.event.title}</i><br/>
        <i>Описание: {eventInfo.event.extendedProps.description}</i><br/>
      </div>
    )
}

export const dropEvent = (e) => { // функция для сохранения при перетаскивании события по сетке календаря
  var url = "http://83.172.39.220:8000/events/"+e.event._def.publicId+"/" // url адрес + id события
  fetch(url, { // put заррос на сервер
    method: 'PUT',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ // тело запроса (передаем на сервер все данные связанные с событием)
      title: e.event.title,
      description: e.event.extendedProps.description,
      start: e.event._instance.range.start,
      end: e.event._instance.range.end
    })
  })
}
