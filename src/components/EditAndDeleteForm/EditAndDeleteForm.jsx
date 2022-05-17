// компонент модального окна для редактирования или удаления события
import React from 'react'; // импорт реакт
import classNames from 'classnames' // импорт библиотеки для присвоения нескольких классив
import styles from './EditAndDeleteForm.module.css' // импорт модуля со стилями
import { toISOSTR } from './toISOSTR'; // импорт функции для приведения даты и времени к виду "год-месяц-деньТчас:минута"

const EditAndDeleteForm = ({
    ActiveAllEvent, // состояние для условного рендеринга окна для редактирования событий  
    setActiveAllEvent, // функция изменения состояния для условного рендеринга окна для редактирования событий
    newEvent, // состояние для временного хранения нового события
    setNewEvent, // функция изменения состояния для временного хранения нового события
    close_and_save, // функция сохранения события
    ev, // обьект одного события
    close_and_delete, // функция удаления события
    allEvents, // массив состояние для хранения всех событий
    setAllEvents, // функция изменения массива состояния для хранения всех событий
}) => {

    const changeTitle = (title, id) => { // функция для изменения поля title в массие состоянии всех событий
        var alev = allEvents
        for(var i = 0; i < alev.length; i++) {
            if(alev[i].id == id) {
                alev[i].title = title
            }
        }
        setAllEvents(alev)
    }

    const changeDesc = (desc, id) => { // функция для изменения поля description в массие состоянии всех событий
        var alev = allEvents
        for(var i = 0; i < alev.length; i++) {
            if(alev[i].id == id) {
                alev[i].description = desc
            }
        }
        setAllEvents(alev)
    }

    const changeStart = (start, id) => { // функция для изменения поля start в массие состоянии всех событий
        var alev = allEvents
        for(var i = 0; i < alev.length; i++) {
            if(alev[i].id == id) {
                alev[i].start = start
            }
        }
        setAllEvents(alev)
    }

    const changeend = (end, id) => { // функция для изменения поля end в массие состоянии всех событий
        var alev = allEvents
        for(var i = 0; i < alev.length; i++) {
            if(alev[i].id == id) {
                alev[i].end = end
            }
        }
        setAllEvents(alev)
    }

    return (
        <div 
            className={
                ActiveAllEvent
                    ?classNames(styles.active, styles.allEvents)
                    :styles.allEvents
            } 
            id="allEvent"
            onClick={e=>{e.stopPropagation()}} // сделано чтобы при нажатии на чтото на модальном окне оно не закрывалось
        >
            <input type="text" // инпут для ввода заголовка события
                className={styles.FormInput}
                placeholder="Название" 
                id={ev.id}
                value={ev.title} 
                onChange={(e) => {
                    setNewEvent({ ...newEvent, title: e.target.value })
                    changeTitle(e.target.value, e.target.id)
                }} 
            />

            <textarea type="text" // инпут для ввода доп информауии о событии
                className={styles.FormTextarea}
                placeholder="Описание" 
                id={ev.id}
                value={ev.description} 
                onChange={(e) => {
                    setNewEvent({ ...newEvent, description: e.target.value })
                    changeDesc(e.target.value, e.target.id)
                }} 
            />

            <input // инпут для ввода даты и времени начала события
                type="datetime-local"
                className={styles.picker}
                id={ev.id}
                defaultValue={toISOSTR(ev.start)}
                onChange={(e) => {
                    setNewEvent({ ...newEvent, start: e.target.value})
                    changeStart(e.target.value, e.target.id)
                }}
            />

            <input // инпут для ввода даты и времени конца события
                type="datetime-local"
                className={styles.picker}
                id={ev.id}
                defaultValue={toISOSTR(ev.end)}
                onChange={(e) => {
                    setNewEvent({ ...newEvent, end: e.target.value})
                    changeend(e.target.value, e.target.id)
                }}
            />
            
            <div className={styles.btns}> 
                <form className={styles.blocksavebtn}> 
                {/* кнопка для сохранения события 
                (сделано внутри тега форм потому что я не смог реализовать добавление в реальном времени
                и страница перезагружается при каждом сохранении) */}
                    <button 
                        className={styles.btn}
                        id={ev.id}
                        onClick={e=>close_and_save(e, setActiveAllEvent, allEvents, setAllEvents, setNewEvent)}
                    >
                        Сохранить
                    </button>
                </form>
                <button // кнопка удаления события
                    id={ev.id}
                    className={styles.delbtn}
                    onClick={e=>{close_and_delete(e, setAllEvents, allEvents, setActiveAllEvent)}}
                >
                    Удалить
                </button>
            </div>
        </div>
    );
};

export default EditAndDeleteForm;