import React from 'react';
import classNames from 'classnames'
import styles from './EditAndDeleteForm.module.css'
import { toISOSTR } from './toISOSTR';

const EditAndDeleteForm = ({
    ActiveAllEvent,
    setActiveAllEvent,
    newEvent,
    setNewEvent,
    close_and_save, 
    ev,
    close_and_delete,
    allEvents,
    setAllEvents,
}) => {

    const changeTitle = (title, id) => {
        var alev = allEvents
        for(var i = 0; i < alev.length; i++) {
            if(alev[i].id == id) {
                alev[i].title = title
            }
        }
        setAllEvents(alev)
    }

    const changeDesc = (desc, id) => {
        var alev = allEvents
        for(var i = 0; i < alev.length; i++) {
            if(alev[i].id == id) {
                alev[i].description = desc
            }
        }
        setAllEvents(alev)
    }

    const changeStart = (start, id) => {
        var alev = allEvents
        for(var i = 0; i < alev.length; i++) {
            if(alev[i].id == id) {
                alev[i].start = start
            }
        }
        setAllEvents(alev)
    }

    const changeend = (end, id) => {
        var alev = allEvents
        for(var i = 0; i < alev.length; i++) {
            if(alev[i].id == id) {
                alev[i].end = end
            }
        }
        setAllEvents(alev)
    }

    return (
        <form 
            className={
                ActiveAllEvent
                    ?classNames(styles.active, styles.allEvents)
                    :styles.allEvents
            } 
            id="allEvent"
            onClick={e=>{e.stopPropagation()}}
        >
            <input type="text" 
                className={styles.FormInput}
                placeholder="Название" 
                id={ev.id}
                // style={{ width: "20%", marginRight: "10px" }} 
                value={ev.title} 
                onChange={(e) => {
                    setNewEvent({ ...newEvent, title: e.target.value })
                    changeTitle(e.target.value, e.target.id)
                }} 
            />

            <textarea type="text" 
                className={styles.FormTextarea}
                placeholder="Описание" 
                id={ev.id}
                // style={{ width: "20%", marginRight: "10px" }} 
                value={ev.description} 
                onChange={(e) => {
                    setNewEvent({ ...newEvent, description: e.target.value })
                    changeDesc(e.target.value, e.target.id)
                }} 
            />

            <input 
                type="datetime-local"
                className={styles.picker}
                id={ev.id}
                defaultValue={toISOSTR(ev.start)}
                onChange={(e) => {
                    setNewEvent({ ...newEvent, start: e.target.value})
                    changeStart(e.target.value, e.target.id)
                }}
            />

            <input 
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
                <button 
                    className={styles.btn}
                    id={ev.id}
                    // stlye={{ marginTop: "10px" }} 
                    onClick={e=>close_and_save(e, setActiveAllEvent, allEvents)}
                >
                    Сохранить
                </button>
                <button 
                    id={ev.id}
                    className={styles.delbtn}
                    // stlye={{ marginTop: "10px" }} 
                    onClick={e=>{close_and_delete(e)}}
                >
                    Удалить
                </button>
            </div>
        </form>
    );
};

export default EditAndDeleteForm;