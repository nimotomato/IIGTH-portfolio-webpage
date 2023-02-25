import '../css/App.css';


import Geomap from './Geomap';
import Datepicker from './Datepicker';
import Legend from './Legend';
import Description from './Description';


import { useState, useEffect } from "react";
import { Geomath } from '../helpers/Geomath';
import fetchData from '../helpers/fetchData';


function App() {
  // The local endpoint we run the express API on
  const apiUrl = "http://localhost:3000/api/";


  const scaleColors = {
    scale: [0.2, 0.7],
    colors: ["linen", "coral"]
  };
  

  // This is states for the dates used in API search query
  const [chosenDates, setChosenDates] = useState();

  // These are dates for min/max legend values
  const [minMaxDates, setMinMaxDates] = useState();


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

  // Run the fetch on component load
  useEffect(() => {
    handleFetchDates()}, []);


  // Handle chosen dates, used in datepicker component
  const handleChosenDates = (dates) => {
    setChosenDates(dates);
  } 


  // State for news data
  const [data, setData] = useState({});

  
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


  return (
    <div className="content-container">
      <h1 className="main-title">Is it going to hell?</h1>
      <Description />
      <div className="map-container">
        <Geomap data={data} theme={scaleColors}/>
      </div>
      {/* Make sure date picker is only loaded after dates have been fetched */}
      {chosenDates && <Datepicker chosenDates={chosenDates} onChose={handleChosenDates} minMaxDates={minMaxDates}/>}      
      <Legend data={data} theme={scaleColors}/>
    </div>
  );
}


export default App;