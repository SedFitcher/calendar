// компонент модального окна создания заметки
import React from 'react'; // импорт реакт
import styles from './CreateEventForm.module.css' // импорт модуля со стилями
import classNames from 'classnames' // импорт библиотеки для присвоения нескольких классов

const CreateEventForm = ({
    activeCreateEvent, // состояние для условного рендеринга окна для создания событий  
    setActiveCreateEvent, // функция изменения состояния для условного рендеринга окна для создания событий  
    newEvent, // состояние для временного хранения нового события
    setNewEvent, // функция изменения состояния для временного хранения нового события
    handleAddEvent, // функция для добавления события
}) => {
    return (
        <div // див для размытия заднего фона
            className={activeCreateEvent
            ?
            classNames(styles.active, styles.createEvent)
            :
            styles.createEvent} 
            id="createEvent"
            onClick={() => {setActiveCreateEvent(false)}}
        >
            <div // само модальное окно
                className={activeCreateEvent
                ?
                classNames(styles.active, styles.createForm)
                :
                styles.createForm} 
                onClick={e=>{e.stopPropagation()}} // сделано чтобы при нажатии на чтото на модальном окне оно не закрывалось
            >
                <input // инпут для ввода заголовка события
                    type="text" 
                    placeholder="Название" 
                    className={styles.createFormInput}
                    value={newEvent.title} 
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />

                <textarea // инпут для ввода доп информауии о событии
                    type="text" 
                    placeholder="Описание" 
                    className={styles.createFormTextarea}
                    value={newEvent.description} 
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />

                <input // инпут для ввода даты и времени начала события
                    type="datetime-local"
                    defaultValue={newEvent.start}
                    className={styles.picker}
                    onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value})}
                />

                <input // инпут для ввода даты и времени конца события
                    type="datetime-local"
                    className={styles.picker}
                    defaultValue={newEvent.end}
                    onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value})}
                />

                <button // кнопка создания события
                    className={styles.createbtn}
                    onClick={handleAddEvent}
                >
                      Создать
                </button>
            </div>
        </div>
    );
};

export default CreateEventForm;