import './App.css';
import Geomap from './Geomap';

import { useState  } from 'react';


function App() {
  // The local port we run the express API on
  const apiUrl = "http://localhost:3000/api/news";


  //Placeholder dates, later converted into input values.
  const dates = {startDate: new Date('February 18, 2022').toISOString(), endDate: new Date('February 20, 2024').toISOString()}
  const queryString = new URLSearchParams(dates)


  // Fetch news from API and calculate the odds
  async function handleFetchOdds(){
    try {
      const response = await fetch(`${apiUrl}?${queryString}`);
      return response.json();
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  return (<div>
      <Geomap onFetchData={handleFetchOdds}/>
    </div>
  )
}

export default App;
