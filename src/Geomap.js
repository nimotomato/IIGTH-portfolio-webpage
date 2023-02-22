import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import { scaleLinear } from "d3-scale";


// Get topoJSONdata from local folder.
import continents from './data/continents.json';


// Set color scale
// const colorScale = scaleLinear().domain([0, 100]).range(['#FFF', "#06F"])


const Geomap = (props) => {
    return (
        <ComposableMap>
          <Geographies geography={continents}>
          {({ geographies }) =>
    geographies.map((geo) => {
      return (
        <Geography
          key={geo.rsmKey}
          geography={geo}
        //   fill={colorScale()}
        />
      )
    })
  }
          </Geographies>
        </ComposableMap>
      )
    
}
 
export default Geomap;