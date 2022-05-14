import React from 'react';
import DatePicker from "react-datepicker";
import classNames from 'classnames'
import styles from './EditAndDeleteForm.module.css'

const EditAndDeleteForm = ({
    ActiveAllEvent,
    newEvent,
    setNewEvent,
    close_and_save, 
    ev,
    close_and_delete,
    // setActiveAllEvent,
}) => {
    return (
        <form 
            className={
                ActiveAllEvent
                    ?classNames(styles.active, styles.allEvents)
                    :styles.allEvents
            } 
            id="allEvent"
        >
            <input type="text" 
                className={styles.FormInput}
                placeholder="Название" 
                // style={{ width: "20%", marginRight: "10px" }} 
                value={ev.title} 
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />

            <textarea type="text" 
                className={styles.FormTextarea}
                placeholder="Описание" 
                // style={{ width: "20%", marginRight: "10px" }} 
                value={ev.description} 
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />

            <DatePicker 
                className={styles.picker}
                placeholderText="начало" 
                // style={{ marginRight: "10px" }} 
                selected={ev.start} 
                showTimeSelect
                timeIntervals={1} 
                dateFormat = "PP"
                onChange={(start) => setNewEvent({ ...newEvent, start })} />

            <DatePicker 
                className={styles.picker}
                placeholderText="конец" 
                selected={ev.end} 
                showTimeSelect
                timeIntervals={1}
                dateFormat = "PP"
                onChange={(end) => setNewEvent({ ...newEvent, end })} />
            <div className={styles.btns}>
                <button 
                    className={styles.btn}
                    // stlye={{ marginTop: "10px" }} 
                    onClick={close_and_save}
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