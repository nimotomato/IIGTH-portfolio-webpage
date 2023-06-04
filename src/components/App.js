import "../css/App.css";

import Geomap from "./Geomap";
import Monthpicker from "./Monthpicker";
import Legend from "./Legend";
import Description from "./Description";
import Loading from "./Loading";

import { useState, useEffect } from "react";
import fetchData from "../helpers/fetchData";
import { Geomath } from "../helpers/Geomath";

function App() {
  // Connect to api endpoint
  const apiUrl =
    "https://iigth-portfolio-api-git-main-nimotomato.vercel.app/api/";

  // Endpoints
  const negCount = "negCount";
  const dates = "dates";
  const news = "news";

  // Theme for map and legend
  const scaleColors = {
    scale: [0.2, 0.6],
    colors: ["linen", "coral"],
  };

  // States for the dates used in API search query
  const [chosenDates, setChosenDates] = useState();

  // State for dates used in min/max legend values
  const [minMaxDates, setMinMaxDates] = useState();

  // State for news data
  const [data, setData] = useState(new Map());

  // Get date min/max range
  async function handleFetchDates() {
    try {
      const response = await fetch(`${apiUrl}${dates}`);
      const data = await response.json();

      // Create the default days (min, max) for the query string
      const startDate = data.startDate.split("T")[0];
      const endDate = data.endDate.split("T")[0];
      setChosenDates([startDate, endDate]);
      setMinMaxDates({ startDate: startDate, endDate: endDate });
    } catch (e) {
      console.log(e);
    }
  }

  // Fetch date range on component load
  useEffect(() => {
    handleFetchDates();
  }, []);

  // Fetch new data on updated dates with the new helper
  useEffect(() => {
    fetchData(apiUrl, negCount, chosenDates)
      .then((result) => {
        if (result) {
          const ratios = Geomath.getPercentageNew(result);
          setData(ratios);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chosenDates]);

  // Handle chosen dates, used in Monthpicker component
  const handleChosenDates = (dates) => {
    let fullDateLength = 10;

    // Fix days from missing format due to month input in monthpicker
    let checkedDates = dates.map((date) => {
      if (date.length != fullDateLength) {
        date = date + "-01";
      }
      return date;
    });

    setChosenDates(checkedDates);
  };

  return (
    <div className="content-container">
      <h1 className="main-title">Is it going to hell?</h1>
      <Description />
      <Geomap data={data} theme={scaleColors} />
      {/* Make sure date picker is only loaded after dates have been fetched */}
      <div className="date-legend-container">
        {minMaxDates && (
          <Monthpicker
            chosenDates={chosenDates}
            onChose={handleChosenDates}
            minMaxDates={minMaxDates}
          />
        )}
        {data.size != 0 ? (
          <Legend data={data} theme={scaleColors} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default App;
