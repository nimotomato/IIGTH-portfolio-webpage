import '../css/Datepicker.css';
import { useState, useEffect } from 'react';


const Datepicker = ( props ) => {
    const [startDate, endDate] = props.chosenDates;


    return (
        <div>
            <form>
                <label>
                    Start date:
                    <input 
                        type="date" 
                        name="startDate"
                        defaultValue={startDate} 
                        //* To do: The min and max value will change on update, they need to be static from page load.
                        // min={startDate}
                        // max={endDate}
                        onChange={(e) => props.onChose([e.target.value, (endDate || null)])}
                    />
                </label>
                <label>
                    End date:
                    <input 
                        type="date" 
                        name="endDate"
                        defaultValue={endDate} 
                        // min={startDate}
                        // max={endDate} 
                        onChange={(e) => props.onChose([(startDate || null), e.target.value])}
                    />
                </label>
            </form>
        </div>
    );
}
 
export default Datepicker;