import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import { scaleLinear } from "d3-scale";

import { useState, useEffect } from "react";


// Get topoJSONdata from local folder.
import continents from './data/continents.json';

// YOU GOTTA MAP THE ODDS FROM THE NEWS ONTO THE CORRECT FUCKINT PROPERTY OKAY?? THGEN JUST GO 


// Set color scale
// const colorScale = scaleLinear().domain([0, 100]).range(['#FFF', "#06F"])


const Geomap = ( {onFetchData} ) => {
  const [queryData, setQueryData] = useState({});

  // This gets sets query data. If called on its own it will call forever because promise fullfillment changes state.
  async function handleFetchData() {
    const queryData = await onFetchData();
    if (queryData){
      setQueryData(queryData);
    } else {
      console.log("Fetch error, data not found")
    }
  }

  // Call handleFetchData once.
  useEffect(() => {handleFetchData()}, [])

  // Get the queryData to MAP to ech region somehow. 
  // const regionData = continents.map((region) => {
  //   console.log(region.objects)
  // })

  return (
      <ComposableMap>
        <Geographies geography={continents}>
        {({ geographies }) =>
  geographies.map((geo) => {
    return (
      <Geography
        key={geo.rsmKey}
        geography={geo}
      //   fill={colorScale(geo.properties.THECORRECTFUCKINGVALUE)}
      />
    )
  })
}
        </Geographies>
      </ComposableMap>
    )
}
 
export default Geomap;