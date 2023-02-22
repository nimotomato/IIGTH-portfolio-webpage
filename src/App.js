import './App.css';
import Geomap from './Geomap';

import { useState  } from 'react';
import { Geomath } from './helpers/Geomath'


function App() {
  // The local port we run the express API on
  const apiUrl = "http://localhost:3000/api/news";


  //Placeholder dates, later converted into input values.
  const dates = {startDate: new Date('February 18, 2022').toISOString(), endDate: new Date('February 20, 2024').toISOString()}
  const queryString = new URLSearchParams(dates)


  let newsData;

  // Fetch news from API and calculate the odds
  async function handleFetchOdds(){
    try {
      const response = await fetch(`${apiUrl}?${queryString}`).json();
      const labelCount = await Geomath.countLabels(response);
      const regionRatios = await Geomath.getOdds(labelCount);
      return regionRatios;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  return (
    <Geomap onFetchData={handleFetchOdds}/>
  )
}

export default App;
