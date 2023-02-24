import '../css/App.css';
import Geomap from './Geomap';
import Datepicker from './Datepicker';
import Legend from './Legend';
import Description from './Description';

import { useState, useEffect, useMemo } from "react";
import { Geomath } from './Geomath';
import withFetchNews from './withFetchNews';
import { useForkRef } from '@mui/material';


function App() {
  // TO DO: Change odds into probability OR make them interchangeable
  // TO DO: Set handleFetchDates and handlequery+fetchnews to HOCs 

  // The local endpoint we run the express API on
  const apiUrl = "http://localhost:3000/api/";


  // This is states for the dates used in API search query
  const [chosenDates, setChosenDates] = useState();


  // Get date min/max range
  async function handleFetchDates() {
    try {
      const response = await fetch(`${apiUrl}dates`);
      const data = await response.json();
      // Create the default days (min, max) for the query string
      const startdate = data[0].startDate.split("T")[0]
      const endDate = data[0].endDate.split("T")[0]
      setChosenDates([startdate, endDate])
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
  const [odds, setOdds] = useState({});


  // Calculate odds based on the query data
  const handleGetOdds = (newsData) => {
    if (newsData){
      setOdds(Geomath.getPercentage(newsData));
    } 
  }


  // Update odds on new newsData
  useEffect(() => {handleGetOdds(newsData)}, [newsData])


  return (
    <div className="content-container">
      <h1 className="main-title">Is it going to hell?</h1>
      <div className="map-container">
        <Description />
        <Geomap odds={odds}/>
      </div>
      {/* Make sure date picker is only loaded after dates have been fetched */}
      {chosenDates && <Datepicker chosenDates={chosenDates} onChose={handleChosenDates}/>}      
      <Legend regionData={odds}/>
    </div>
  )
}


export default App;