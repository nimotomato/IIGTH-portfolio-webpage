import logo from './logo.svg';
import './App.css';
import { useState  } from 'react';

function App() {

  const apiUrl = "http://localhost:3000/api/news";
  // const [news, setNews] = useState();

//Placeholder dates
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

  console.log("well something ran")


  return (
    <div className="big-button">
      <button></button>
    </div>
  )
}

export default App;
