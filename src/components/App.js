import '../css/App.css';
import Geomap from './Geomap';

import { useState, useEffect } from "react";
import { Geomath } from '../helpers/Geomath';


function App() {
  // The local port we run the express API on
  const apiUrl = "http://localhost:3000/api/news";


  //Placeholder dates, later converted into input values.
  const dates = {startDate: new Date('February 18, 2022').toISOString(), endDate: new Date('February 20, 2024').toISOString()}
  // Turn the dates into URL serach params used to fetch labels within a time span.
  const queryString = new URLSearchParams(dates)


  // Fetch query data from API 
  async function handleFetchData() {
    try {
      const response = await fetch(`${apiUrl}?${queryString}`);
      return response.json();
    } catch (e) {
      console.log(e);
    }
    return null;
    }


  // This hook updates odds on change. If only this is called it will call indefinetly as the promise updates the state on fullfillment.
  const [odds, setOdds] = useState({});


  // Calculate odds based on the query data
  async function handleGetOdds() {
    const queryData = await handleFetchData();
    if (queryData){
      const labelCount = await Geomath.countLabels(queryData);
      const regionRatios = await Geomath.getOdds(labelCount);
      setOdds(regionRatios);
    } else {
      console.log("Fetch error, data not found")
    }
  }


  // Call handleFetchData once on load and on update.
  useEffect(() => {handleGetOdds()}, [])


  return (
    <div>
      <Geomap odds={odds}/>
    </div>
  )
}

export default App;
