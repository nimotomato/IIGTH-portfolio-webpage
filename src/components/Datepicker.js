import '../css/Datepicker.css';


import { useState, useEffect } from 'react';

const Datepicker = ( props ) => {
    const [startDate, endDate] = Object.values(props.chosenDates).map((date) => date.split("T")[0]);

    const [chosenStart, setChosenStart] = useState();
    const [chosenEnd, setChosenEnd] = useState();

    // Somehow move this data back to the fucking App.js

    return (
        <div>
            <form>
                <label>
                    Start date:
                    <input 
                    type="date" 
                    name="startDate"
                    defaultValue={startDate} 
                    min={startDate}
                    max={endDate}
                    onChange={(e) => setChosenStart(e.target.value)}
                />
                </label>
                <label>
                    End date:
                    <input 
                        type="date" 
                        name="endDate"
                        defaultValue={endDate} 
                        min={startDate}
                        max={endDate} 
                        onChange={(e) => setChosenEnd(e.target.value)}
                />
                </label>
            </form>
        </div>
    );
}
 
export default Datepicker;