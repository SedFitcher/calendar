import React, { useState, useEffect } from "react"; // импортируем реакт и хуки
import "./App.css"; // импортируем стили
import CreateEventForm from "./components/CreateEventForm/CreateEventForm"; // импортируем форму для создания заметок
import EditAndDeleteForm from "./components/EditAndDeleteForm/EditAndDeleteForm"; // импортируем форму для редактирования и удаления заметок
import FullCalendar from '@fullcalendar/react' // импортируем модуль календаря
import dayGridPlugin from '@fullcalendar/daygrid' // импортируем плагин для отображения календаря
import interactionPlugin from '@fullcalendar/interaction' // импортируем плагин для действий с кадендарем
import timeGridPlugin from '@fullcalendar/timegrid' // импортируем плагин для отображения по дням и неделям
import ruLocale from '@fullcalendar/core/locales/ru' // импортируем плагин для локализации на русский язык
import { toIS } from "./components/EditAndDeleteForm/toISOSTR"; // импортируем функцию для приведения времени к виду "год-месяц-деньT00:00"
import { 
  handleAddEvent, // импорт функции для создания заметки
  createev, // импорт функуции дл создания заметки с заданным временем
  close_and_delete, // импорт функции удаления события
  close_and_save, // импорт функции сохранения события
  renderEventContent, // импорт функции рендеринга блока события на календаре
  dropEvent, // импорт функции drag and drop для событий
} from "./logicFunctions";


const events = []; //массив событий

function App() {
  // состояние для временного хранения нового события
    const [newEvent, setNewEvent] = useState({ title: "", description: "", start: "", end: "", id: null });
  // массив состояние для хранения всех событий
    const [allEvents, setAllEvents] = useState(events);
  // состояние для условного рендеринга модального окна создания события
    const [activeCreateEvent, setActiveCreateEvent] = useState(false)
  // состояние для условного рендеринга окна для редактирования событий 
    const [ActiveAllEvent, setActiveAllEvent] = useState(false)

    useEffect(() => {
      fetch("http://83.172.39.220:8000/events/", { // get запрос на сервер для получения событий
      })
        .then(res => res.json())
        .then(
          (result) => {
            setAllEvents(result); // изменение состояния для массива со всеми событиями
          },
        )
    }, [])

    return (
        <div className="App">
          {/* форма для создания события */}
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
                allEvents.map((ev/*обьект одного события */) => {
                  return(
                    // форма для изменения или удаления события
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
              {/* модуль календаря */}
            <FullCalendar
              customButtons={{ // добавление кнопок для создания события или просмотра всех событий
                newEventbtn: {
                    text: 'Создать событие',
                    click: ()=>setActiveCreateEvent(true)
                },
                allEventsbtn: {
                  text: 'Все события',
                  click: ()=>setActiveAllEvent(true)
                }
              }}
              plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]} // подключение плагинов
              initialView="dayGridMonth" // дефолтное значения для отображения календаря по месяцам
              headerToolbar={{ // верхний тулбар с кнопками и надписью 
                // кнопки переключения 1:на год назад 2:на месяз назад 3:на месяц вперед 4:на год вперед
                // 5:сегодняшний месяц 6:кнопка создания события 7:кнопка просмотра всех событий
                left: 'prevYear,prev,next,nextYear,today,newEventbtn,allEventsbtn', 
                center: 'title', // надпись посередине
                // кнопки для изменения отображения календаря
                // 1:по месяцам 2:по неделям 3:по дням
                right: 'dayGridMonth,timeGridWeek,timeGridDay' 
              }}
              // блок отображения события
              eventContent={(e)=>renderEventContent(e, allEvents)}
              // действие при нажатии на событие
              eventClick={e=>{setActiveAllEvent(true)}}
              // отображение времени в 24-х часовом формате
              slotLabelFormat={{
                hour: '2-digit',
                minute: '2-digit',
                meridiem: false,
                hour12: false
              }}
              // локализация на русский язык
              locale={ruLocale}
              //разрешение редактирования
              editable={true}
              droppable={true} // разрешение drag and drop
              eventDrop={e=>dropEvent(e)} // дейстиве при перетаскивании события
              selectable={true} // разрешение выбора события
              dateClick={(e) => { // действие при нажатии на дату или время
                createev(e, setActiveCreateEvent, newEvent, setNewEvent, toIS)
              }}
              events={allEvents} // передача массива состояния всех событий
            />
        </div>
    );
}

export default App;