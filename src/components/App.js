import "../css/App.css";

import Geomap from "./Geomap";
import Monthpicker from "./Monthpicker";
import Legend from "./Legend";
import Description from "./Description";
import Loading from "./Loading";
import Settings from "./Settings";

import { useState, useEffect, useRef } from "react";
import fetchData from "../helpers/fetchData";
import { Geomath } from "../helpers/Geomath";

function App() {
  // Connect to api
  const apiUrl = "https://iigth-portfolio-api.vercel.app/api/";

  // Endpoints
  const negCount = "negCount";
  const dates = "dates";
  const news = "news";

  // Theme for map and legend
  const colorScales = {
    scaleCurrent: {
      scale: [0.2, 0.5],
      colors: ["linen", "coral"],
    },
    scaleTotal: {
      scale: [-0.1, 0.1],
      colors: ["linen", "cornflowerBlue"],
    },
  };

  // States for what statistical analysis to chose
  const [analysisMode, setAnalysisMode] = useState("current");

  // States for the dates used in API search query
  const [chosenDates, setChosenDates] = useState();

  // State for dates used in min/max legend values
  const [minMaxDates, setMinMaxDates] = useState();

  // State for news data to send to components
  const [data, setData] = useState(new Map());

  // Current timespan fetch
  const [currentSpanData, setCurrentSpanData] = useState(new Map());

  // Ref for original news data
  const totalPercentageRef = useRef(new Map());

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

  // Get data from specified range
  async function handleFetchDataFromSpecifiedDates(
    apiUrl,
    negCount,
    chosenDates
  ) {
    fetchData(apiUrl, negCount, chosenDates)
      .then((result) => {
        if (result) {
          const ratios = Geomath.getPercentage(result);
          setCurrentSpanData(ratios);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Get percentage of total for ref that should never change
  async function getTotalPercentage(apiUrl, negCount, minMaxDates) {
    if (minMaxDates) {
      const dates = Object.values(minMaxDates);

      fetchData(apiUrl, negCount, dates)
        .then((result) => {
          if (result) {
            const ratios = Geomath.getPercentage(result);
            totalPercentageRef.current = ratios;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // Fetch date range on component load
  useEffect(() => {
    handleFetchDates();
  }, []);

  // Get percentage of total for ref that should never change
  useEffect(() => {
    getTotalPercentage(apiUrl, negCount, minMaxDates);
  }, [minMaxDates]);

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

  const handleSetAnalysisMode = (mode) => {
    setAnalysisMode(mode);
  };

  // Update data to send to components
  useEffect(() => {
    setData(currentSpanData);
  }, [currentSpanData]);

  // Get the new percentage compared to total
  useEffect(() => {
    if (analysisMode === "mean") {
      if (currentSpanData.size != 0 && totalPercentageRef.current.size != 0) {
        // null check
        const meanData = new Map();

        // Calculate the new data for every region
        currentSpanData.forEach((value, region) => {
          console.log();
          const meanChange = Geomath.getPercentageComparedToTotal(
            totalPercentageRef.current.get(region),
            value
          );

          meanData.set(region, meanChange);
        });

        console.log(meanData);
        setData(meanData);
      }
    } else {
      handleFetchDataFromSpecifiedDates(apiUrl, negCount, chosenDates);
    }
  }, [chosenDates, analysisMode]);

  const handleColorScales = (mode, colorScales) => {
    switch (mode) {
      case "current":
        return colorScales.scaleCurrent;
      case "mean":
        return colorScales.scaleTotal;
    }
  };

  return (
    <div className="content-container">
      <h1 className="main-title">Is it going to hell?</h1>
      <Description />
      <Geomap
        data={data}
        theme={handleColorScales(analysisMode, colorScales)}
      />
      <Settings handleSetAnalysisMode={handleSetAnalysisMode} />
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
          <Legend
            data={data}
            theme={handleColorScales(analysisMode, colorScales)}
          />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default App;
