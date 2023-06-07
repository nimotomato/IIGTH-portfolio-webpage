import "../css/Legend.css";
import { useState, useEffect } from "react";
import { scaleLinear } from "d3-scale";

const Legend = ({ data, theme }) => {
  // Set color scale for background color.
  const colorScale = scaleLinear(theme.scale, theme.colors);

  const [listItems, setListItems] = useState([]);

  const [sortedData, setSortedData] = useState();

  useEffect(() => {
    // Sort regionData alphabetically
    setSortedData(() => {
      return Array.from(data).sort((a, b) => {
        if (a[0] < b[0]) {
          return -1;
        }
        if (a[0] > b[0]) {
          return 1;
        }
        return 0;
      });
    });
  }, [data]);

  //Unordered list with list items for each region and data
  const handleListItems = (sortedData) => {
    const listItems = sortedData.map((item) => {
      return (
        <li
          className="legend-list-item"
          style={{ backgroundColor: colorScale(item[1]) }}
          key={item[0]}
        >
          {item[0]}:
          <br />
          {(item[1] * 100).toFixed(2) + "%"}
        </li>
      );
    });

    setListItems(listItems);
  };

  // Calls handleList on load and whenever regionData is changed.
  useEffect(() => {
    if (sortedData) {
      handleListItems(sortedData);
    }
  }, [sortedData]);

  return (
    <div className="legend-container">
      <div className="legend-wrapper">
        <ul className="legend-list">{listItems}</ul>
      </div>
    </div>
  );
};

export default Legend;
