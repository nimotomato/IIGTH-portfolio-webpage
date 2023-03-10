import '../css/App.css';


import Geomap from './Geomap';
import Datepicker from './Datepicker';
import Legend from './Legend';
import Description from './Description';


import { useState, useEffect } from "react";
import fetchData from '../helpers/fetchData';


function App() {
  // The local endpoint we run the express API on
  const apiUrl = "https://73hflv8mr2.execute-api.eu-north-1.amazonaws.com/default/api";


  // Theme for map and legend
  const scaleColors = {
    scale: [0.2, 0.6],
    colors: ["linen", "coral"]
  };
  

  // States for the dates used in API search query
  const [chosenDates, setChosenDates] = useState();


  // State for dates used in min/max legend values
  const [minMaxDates, setMinMaxDates] = useState();


  // State for news data
  const [data, setData] = useState({});


  // Get date min/max range
  async function handleFetchDates() {
    try {
      const response = await fetch(`${apiUrl}dates`);
      const data = await response.json();
      // Create the default days (min, max) for the query string
      const startDate = data[0].startDate.split("T")[0];
      const endDate = data[0].endDate.split("T")[0];
      setChosenDates([startDate, endDate]);
      setMinMaxDates({startDate: startDate, endDate: endDate});
    } catch (e) {
      console.log(e);
    }
  }

  // Fetch date range on component load
  useEffect(() => {
    handleFetchDates()}, []);

  
  // Fetch new data on updated dates
  useEffect(() => {
    fetchData(apiUrl, chosenDates)
      .then(result => {
        if(result){
          setData(result);
        }
      })
      .catch(error => {
        console.log(error);
      });
    }, [chosenDates]);


  // Handle chosen dates, used in DATEPICKER component
  const handleChosenDates = (dates) => {
    setChosenDates(dates);
  } 


  return (
    <div className="content-container">
      <h1 className="main-title">Is it going to hell?</h1>
      <Description />
        <Geomap 
          data={data} 
          theme={scaleColors}/>
      {/* Make sure date picker is only loaded after dates have been fetched */}
      <div className="date-legend-container">
        {chosenDates && <Datepicker 
          chosenDates={chosenDates} 
          onChose={handleChosenDates} 
          minMaxDates={minMaxDates}/>}      
        <Legend 
          data={data} 
          theme={scaleColors}/>
        </div>
    </div>
  );
}


export default App;