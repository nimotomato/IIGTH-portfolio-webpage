import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
} from "react-simple-maps";
import { useContext } from "react";


import topoUrl from '../data/continents.json';


const Geomap = ( {data, theme} ) => {
  // Add data to correct geographic property
  for (const query of Object.entries(data)){
    topoUrl.objects.continent.geometries.forEach((continent) => {
      if (continent.properties.continent.toLowerCase() === query[1].region){
        continent.properties.data = (query[1].data || 0)
      }
    })
  };      


  // Set color scale for displaying data
  // TO DO: Make legend and geomap share these values
  const colorScale = scaleLinear(theme.scale, theme.colors);


  return (
    <div className="map-container">
        <ComposableMap 
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 100,
          }}
          width={600}
          height={300}
          projection="geoEqualEarth" //geoAzimuthalEqualAreageoEqualEarth
        >
        <Sphere 
          id="1" 
          stroke="aliceblue" 
          strokeWidth={1.5}
          />
        <Geographies 
          geography={topoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
            <Geography 
              key={geo.rsmKey} 
              geography={geo}
              fill={geo.properties.data ? colorScale(geo.properties.data) : "#F5F4F6"}
              stroke="darkslategrey"
              strokeWidth={0.2}
              style={{
                default: {
                    outline: 'none'
                },
                hover: {
                    outline: 'none'
                },
                pressed: {
                    outline: 'none'
                }
            }}
              />
            ))
          }
        </Geographies>
        </ComposableMap>
    </div>
  );
}
 

export default Geomap;