import '../css/Datepicker.css';
import { useState, useEffect } from 'react';


const Datepicker = ( {chosenDates, onChose, minMaxDates} ) => {
    const [startDate, endDate] = chosenDates;


    return (
        <div className="datepicker-wrapper">
            <div className='datepicker-container'>
                <form className="datepicker-l">
                    <label>
                        <p className="datepicker-input-title-start">Start date</p>
                        <input 
                            type="date" 
                            className="datepicker-input"
                            name="startDate"
                            defaultValue={startDate} 
                            min={minMaxDates.startDate}
                            max={minMaxDates.endDate}
                            onChange={(e) => onChose([e.target.value, (endDate || null)])}
                        />
                    </label>
                </form>
                <form className="datepicker-r">
                    <label>
                        <p className="datepicker-input-title-end">End date</p>
                        <input 
                            type="date" 
                            className="datepicker-input"
                            name="endDate"
                            defaultValue={endDate} 
                            min={minMaxDates.startDate}
                            max={minMaxDates.endDate}
                            onChange={(e) => onChose([(startDate || null), e.target.value])}
                        />
                    </label>
                </form>
            </div>
        </div>
    );
}
 
export default Datepicker;