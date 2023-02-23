import '../css/App.css';
import Geomap from './Geomap';
import Datepicker from './Datepicker';
import Legend from './Legend';

import { useState, useEffect } from "react";
import { Geomath } from '../helpers/Geomath';
import { useForkRef } from '@mui/material';


function App() {
  // The local endpoint we run the express API on
  const apiUrl = "http://localhost:3000/api/";


  // Get date min/max range
  async function handleFetchDates() {
    try {
      const response = await fetch(`${apiUrl}dates`);
      return response.json();
    } catch (e) {
      console.log(e);
    }
  }


  // This is states for the dates used in API search query
  const [chosenDates, setChosenDates] = useState();


  // Run the fetch on component load, parse data and set chosenDates
  useEffect(() => {
    handleFetchDates().then((data) => {     
      // Create the default days (min, max) for the query string
      setChosenDates([data[0].startDate, data[0].endDate])
    })}, [])

    
  // State for the query strings to fetch news data from API
  const [queryString, setQueryString] = useState()


  // Set query string
  const handleQueryString = (chosenDates) => {
    if (chosenDates){
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
    if (queryString){
      const response = await fetch(`${queryString}`);
      return response.json();
    }
    return null;
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
  const [odds, setOdds] = useState({});


  // Calculate odds based on the query data
  const handleGetOdds = (newsData) => {
    if (newsData){
      const labelCount = Geomath.countLabels(newsData);
      const regionRatios = Geomath.getOdds(labelCount);
      setOdds(regionRatios);
    } 
  }


  // Update odds on new newsData
  useEffect(() => {handleGetOdds(newsData)}, [newsData])


  // Make sure date picker is only loaded after dates have been fetched
  const renderDatePicker = (chosenDates) => {
    if (chosenDates){
      return (<Datepicker chosenDates={chosenDates}/>)
    }
  }


  return (
    <div className="content-container">
      <h1 className="main-title">Is it going to hell?</h1>
      <div className="map-container">
        <Geomap odds={odds}/>
      </div>
      {renderDatePicker(chosenDates)}
      <Legend regionData={odds}/>
    </div>
  )
}


export default App;