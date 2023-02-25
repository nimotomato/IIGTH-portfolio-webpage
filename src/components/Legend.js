import '../css/Legend.css';
import { useState, useEffect } from "react";
import { scaleLinear } from "d3-scale";


const Legend = ( { data, theme }) => {
    // Set color scale for background color.
    const colorScale = scaleLinear(theme.scale, theme.colors);


    //Sort regionData alphabetically
    const sortedData = Object.entries(data).sort((a, b) =>{
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


    const [listItems, setListItems] = useState([])


    //Unordered list with list items for each region and data
    const handleListItems = (sortedData) => {
        const listItems = sortedData.map((item) => {
            return <li
                className="legend-list-item" 
                style={{backgroundColor: colorScale(item.data)}}
                key={item.region}>
                    {item.region}: {round(item.data, 2)}
                </li>
        })
        setListItems(listItems)       
    }
    
    // Calls handleList on load and whenever regionData is changed.
    useEffect(() => {handleListItems(sortedData)}, [data])

    
    return (
        <div className="legend-container">
            <div className="legend-wrapper">
                <ul className="legend-list">              
                    {listItems}
                </ul>
            </div>
        </div>
    );
}
 
export default Legend;