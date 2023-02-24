import '../css/Datepicker.css';
import { useState, useEffect } from 'react';


const Datepicker = ( props ) => {
    const [startDate, endDate] = props.chosenDates;


    return (
        <div className="datepicker-wrapper">
            <div className='datepicker-container'>
                <form className="datepicker">
                    <label>
                        <p className="datepicker-input-title-start">Start date</p>
                        <input 
                            type="date" 
                            className="datepicker-input"
                            name="startDate"
                            defaultValue={startDate} 
                            //* To do: The min and max value will change on update, they need to be static from page load.
                            // min={startDate}
                            // max={endDate}
                            onChange={(e) => props.onChose([e.target.value, (endDate || null)])}
                        />
                    </label>
                </form>
                <form className="datepicker">
                    <label>
                        <p className="datepicker-input-title-end">End date</p>
                        <input 
                            type="date" 
                            className="datepicker-input"
                            name="endDate"
                            defaultValue={endDate} 
                            // min={startDate}
                            // max={endDate} 
                            onChange={(e) => props.onChose([(startDate || null), e.target.value])}
                        />
                    </label>
                </form>
            </div>
        </div>
    );
}
 
export default Datepicker;