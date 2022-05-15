import React from 'react';
import DatePicker from "react-datepicker";
import styles from './CreateEventForm.module.css'
import classNames from 'classnames'
// import 'react-datepicker/dist/react-datepicker.css'

const CreateEventForm = ({
    activeCreateEvent, 
    setActiveCreateEvent, 
    newEvent,
    setNewEvent,
    handleAddEvent,
}) => {
    return (
        <div 
            className={activeCreateEvent
            ?
            classNames(styles.active, styles.createEvent)
            :
            styles.createEvent} 
            id="createEvent"
            onClick={() => {setActiveCreateEvent(false)}}
        >
            <div 
                className={activeCreateEvent
                ?
                classNames(styles.active, styles.createForm)
                :
                styles.createForm} 
                onClick={e=>{e.stopPropagation()}}
            >
                <input 
                    type="text" 
                    placeholder="Название" 
                    className={styles.createFormInput}
                    // style={{ width: "20%", marginRight: "10px" }} 
                    value={newEvent.title} 
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />

                <textarea 
                    type="text" 
                    placeholder="Описание" 
                    className={styles.createFormTextarea}
                    // style={{ width: "20%", marginRight: "10px" }} 
                    value={newEvent.description} 
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />

                <DatePicker 
                    className={styles.picker}
                    placeholderText="начало" 
                    selected={newEvent.start} 
                    showTimeSelect
                    timeIntervals={1} 
                    timeFormat="HH:mm"
                    dateFormat = "PP"
                    onChange={(start) => setNewEvent({ ...newEvent, start })} />

                <DatePicker 
                    placeholderText="конец" 
                    selected={newEvent.end}
                    className={styles.picker}
                    showTimeSelect
                    timeIntervals={1}
                    timeFormat="HH:mm"
                    dateFormat = "PP"
                    onChange={(end) => setNewEvent({ ...newEvent, end })} />

                <button 
                    className={styles.createbtn}
                    // stlye={{ marginTop: "10px" }} 
                    onClick={handleAddEvent}
                >
                      Создать
                </button>
            </div>
        </div>
    );
};

export default CreateEventForm;