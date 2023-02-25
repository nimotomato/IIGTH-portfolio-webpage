import '../css/App.css';


import Geomap from './Geomap';
import Datepicker from './Datepicker';
import Legend from './Legend';
import Description from './Description';


import { useState, useEffect } from "react";
import { Geomath } from './Geomath';
import withFetchNews from './withFetchNews';


function App() {
  // TO DO: Set handleFetchDates and handlequery+fetchnews to HOCs 
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
    handleFetchDates()}, [])


  // Handle chosen dates, used in datepicker component
  const handleChosenDates = (dates) => {
    setChosenDates(dates);
  } 


  // State for the query strings to fetch news data from API
  const [queryString, setQueryString] = useState()


  // Set query string
  const handleQueryString = (chosenDates) => {
    if (chosenDates && chosenDates[0] && chosenDates[1]){
      const dateQuery = new URLSearchParams({startDate: chosenDates[0], endDate: chosenDates[1]});
      const searchQuery = (`${apiUrl}news?${dateQuery}`);
      setQueryString(searchQuery);
    }
  }


  // Updates querystring every time the chosen dates change
  useEffect(() => {
    handleQueryString(chosenDates);
  }, [chosenDates]);


  // Fetch query data from API 
  async function handleFetchNews(queryString) {
    const abortCont = new AbortController();
    if (queryString){
      try{
        const response = await fetch(`${queryString}`, {signal: abortCont.signal});
        return response.json();
      } catch (e) {
        console.log(e)
      }
    }
    abortCont.abort();
    console.log(abortCont.signal)
    }
  

  // State for our news data
  const [newsData, setNewsData] = useState();
  

  // Updates news every time queryString changes
  useEffect(() => {
    handleFetchNews(queryString).then((data) => {
      setNewsData(data);
    })
  }, [queryString])


  // State for news odds
  const [data, setData] = useState({});


  // Calculate data based on the query data
  const handleGetData = (newsData) => {
    if (newsData){
      setData(Geomath.getPercentage(newsData));
    } 
  }


  // Update odds on new newsData
  useEffect(() => {handleGetData(newsData)}, [newsData])


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
  )
}


export default App;