import './App.css';
import { useState  } from 'react';

function App() {
  // The local port we run the express API on
  const apiUrl = "http://localhost:3000/api/news";


  //Placeholder dates, later converted into input values.
  const dates = {startDate: new Date('February 18, 2022').toISOString(), endDate: new Date('February 20, 2024').toISOString()}
  const queryString = new URLSearchParams(dates)


  let newsData;

  // Fetch news from API
  fetch(`${apiUrl}?${queryString}`)
    .then(response => {
    // Check response
      if (!response.ok) {
        throw new Error('Network response not 200');
      }
      return response.json();
    })
    // Count labels grouped by region.
    .then((data) => {
      const labelCount = Geomath.countLabels(data);
      const regionRatios = Geomath.getOdds(labelCount);
      console.log(regionRatios);
    }
    )
    .catch((error) => {
      console.error('Error:', error);
    });
  



  return (
    <Geomap newsdata={newsData}/>
  )
}

export default App;
