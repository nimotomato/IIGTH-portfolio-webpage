import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
} from "react-simple-maps";

import topoUrl from '../data/continents.json';


const Geomap = ( {odds} ) => {
  // Add odds to correct geographic property
  for (const query of Object.entries(odds)){
    topoUrl.objects.continent.geometries.forEach((continent) => {
      if (continent.properties.continent.toLowerCase() === query[1].region){
        continent.properties.odds = (query[1].odds || 0)
      }
    })
  };      

  // Set color scale for displaying odds
  // TO DO: Make legend and geomap share these values
  const colorScale = scaleLinear([0.2, 0.7], ["antiquewhite", "coral"]);


  return (
    <div>
      <ComposableMap 
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 120,
        }}
        width={800}
        height={400}
        projection="geoEqualEarth" //geoAzimuthalEqualArea
      >
      <Sphere 
        id="1" 
        stroke="darkslategrey" 
        strokeWidth={0.5}
        />
      <Geographies 
        geography={topoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
          <Geography 
            key={geo.rsmKey} 
            geography={geo}
            fill={geo.properties.odds ? colorScale(geo.properties.odds) : "#F5F4F6"}
            stroke="darkslategrey"
            strokeWidth={0.1}
             />
          ))
        }
      </Geographies>
    </ComposableMap>
  </div>
  )
}
 

export default Geomap;