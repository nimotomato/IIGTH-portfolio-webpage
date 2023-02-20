import './App.css';
import { useState  } from 'react';

function App() {
  // The local port we run the express API on
  const apiUrl = "http://localhost:3000/api/news";


  //Placeholder dates, later converted into input values.
  const dates = {startDate: new Date('February 18, 2022').toISOString(), endDate: new Date('February 20, 2024').toISOString()}
  const queryString = new URLSearchParams(dates)

  // Fetch news from API
  fetch(`${apiUrl}?${queryString}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response not 200');
      }
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });


  return (
    <div className="big-button">
      <button></button>
    </div>
  )
}

export default App;
