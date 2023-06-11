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

  // Theme for map and legend
  const colorScales = {
    scaleCurrent: {
      scale: [0.2, 0.5],
      colors: ["linen", "coral"],
    },
    scaleTotal: {
      scale: [0, 0.1],
      colors: ["linen", "cornflowerBlue"],
    },
  };

  // IMPLEMENT
  // States for what color to depend scale on
  const [analysisMode, setAnalysisMode] = useState("current");

  // States for the dates used in API search query
  const [selectedDates, setSelectedDates] = useState([]);

  // Ref for dates used in min/max legend values
  const minMaxDatesRef = useRef([]);

  // State for mean of selected dates
  const [selectedDatesMean, setSelectedDatesMean] = useState(new Map());

  // State for a total mean, used when calculating change
  const [meanTotal, setMeanTotal] = useState(new Map());

  // State for change selectedDatesMean/totalMean
  const [changeFromTotal, setChangeFromTotal] = useState(new Map());

  // Updates chosen dates, used in Monthpicker component
  const handleSelectedDates = (dates) => {
    setSelectedDates(() => {
      return dates;
    });
  };

  // Get date min/max range
  async function handleFetchMinMaxDates() {
    try {
      const response = await fetch(`${apiUrl}${dates}`);

      const data = await response.json();

      // Create the default days (min, max) for the query string
      const startDate = data.startDate.split("T")[0];

      const endDate = data.endDate.split("T")[0];

      // Update minimum and maximum dates
      minMaxDatesRef.current = { startDate: startDate, endDate: endDate };

      // Update the selected dates, changed later in monthpicker component.
      setSelectedDates(() => {
        return [startDate, endDate];
      });
    } catch (e) {
      console.log(e);
    }
  }

  const handleSetAnalysisMode = (mode) => {
    setAnalysisMode(mode);
  };

  // Get mean between min and max dates
  async function handleFetchTotalMean(apiUrl, negCount, chosenDates) {
    const dates = Object.values(chosenDates);

    fetchData(apiUrl, negCount, dates)
      .then((result) => {
        if (result) {
          const ratios = Geomath.getPercentage(result);
          setMeanTotal(() => {
            return ratios;
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Calculate mean between selectedDatesMean and totalMean
  const getChangeFromTotal = (selectedDatesMean, meanTotal) => {
    if (minMaxDatesRef.current.length != 0) {
      const changesFromTotal = new Map();
      const subPercentage = Geomath.getPercentage(selectedDatesMean);

      // Calculate the new data for every region
      subPercentage.forEach((percentage, region) => {
        const changeFromTotal = Geomath.getPercentageComparedToTotal(
          percentage,
          meanTotal.get(region)
        );

        changesFromTotal.set(region, changeFromTotal);
      });

      setChangeFromTotal(() => {
        return changesFromTotal;
      });
    }
  };

  // Get mean between selected dates and changeFromTotal
  async function handleFetchData(apiUrl, negCount, chosenDates, meanTotal) {
    await fetchData(apiUrl, negCount, chosenDates)
      .then((result) => {
        if (result) {
          const ratios = Geomath.getPercentage(result);

          setSelectedDatesMean(() => {
            return ratios;
          });

          if (meanTotal) {
            // changeFromTotal will not update
            getChangeFromTotal(result, meanTotal);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Setup 1
  // Set minMax date range on component load only
  useEffect(() => {
    handleFetchMinMaxDates();
  }, []);

  // Setup 2
  // Trigger function to get mean of total news as soon as we have minMaxDates
  useEffect(() => {
    handleFetchTotalMean(apiUrl, negCount, minMaxDatesRef.current);
  }, [minMaxDatesRef.current]);

  // Active stage 1
  // Update selectedDatesMaan and totalMean
  useEffect(() => {
    // Reset state when this is called to allow loading circles to come through.
    setSelectedDatesMean(() => {
      new Map();
    });

    handleFetchData(apiUrl, negCount, selectedDates, meanTotal);
  }, [selectedDates, meanTotal]);

  const handleColorScales = (mode, colorScales) => {
    switch (mode) {
      case "current":
        return colorScales.scaleCurrent;
      case "change":
        return colorScales.scaleTotal;
    }
  };

  return (
    <div className="content-container">
      <h1 className="main-title">Is it going to hell?</h1>
      <Description />
      <Geomap
        selectedMean={selectedDatesMean}
        changeFromTotal={changeFromTotal}
        theme={handleColorScales(analysisMode, colorScales)}
        analysisMode={analysisMode}
      />
      <Settings handleSetAnalysisMode={handleSetAnalysisMode} />
      {/* Make sure date picker is only loaded after dates have been fetched */}
      <div className="date-legend-container">
        {minMaxDatesRef.current.length != 0 && (
          <Monthpicker
            selectedDays={selectedDates}
            onChose={handleSelectedDates}
            minMaxDates={minMaxDatesRef.current}
          />
        )}
        {selectedDatesMean && selectedDatesMean.size != 0 ? (
          <Legend
            selectedDatesMean={selectedDatesMean}
            theme={handleColorScales(analysisMode, colorScales)}
            changeFromTotal={changeFromTotal}
            analysisMode={analysisMode}
          />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default App;
