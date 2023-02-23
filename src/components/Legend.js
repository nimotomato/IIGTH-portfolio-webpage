import '../css/Legend.css';
import { useState, useEffect } from "react";
import { scaleLinear } from "d3-scale";


const Legend = (regionData) => {
    //Sort regionData alphabetically
    const sortedData = Object.entries(regionData.regionData).sort((a, b) =>{
        if (a[1].region < b[1].region){
            return -1;
        }
        if (a[1].region > b[1].region){
            return 1;
        }
        return 0;
    }).map((x) => x[1])


    function round(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

    // Set color scale for background color.
    const colorScale = scaleLinear([0, 1], ["white", "coral"]);


    const [listItems, setListItems] = useState([])


    //Unordered list with list items for each region and odds
    const handleListItems = (sortedData) => {
        const listItems = sortedData.map((item) => {
            return <li
                className="legend-list-item" 
                style={{backgroundColor: colorScale(item.odds)}}
                key={item.region}>
                    {item.region}: {round(item.odds, 2)}
                </li>
        })
        setListItems(listItems)       
    }
    
    // Calls handleList on load and whenever regionData is changed.
    useEffect(() => {handleListItems(sortedData)}, [regionData])

    
    return (
        <div className="legend-container">
           <ul className="legend-list">
                {listItems}
           </ul>
        </div>
    );
}
 
export default Legend;