import React from 'react';
import styles from './CreateEventForm.module.css'
import classNames from 'classnames'

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
                    value={newEvent.title} 
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />

                <textarea 
                    type="text" 
                    placeholder="Описание" 
                    className={styles.createFormTextarea}
                    value={newEvent.description} 
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />

                <input 
                    type="datetime-local"
                    defaultValue={newEvent.start}
                    className={styles.picker}
                    // onChange={(e) => setNewEvent({ ...newEvent, start: new Date(Date.parse(e.target.value))})}
                    onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value})}
                />

                <input 
                    type="datetime-local"
                    className={styles.picker}
                    defaultValue={newEvent.end}
                    // onChange={(e) => setNewEvent({ ...newEvent, end: new Date(Date.parse(e.target.value))})}
                    onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value})}
                />

                <button 
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