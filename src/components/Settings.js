import { useState } from "react";
import "../css/Settings.css";

const Settings = ({ handleSetAnalysisMode }) => {
  const [currentButtonState, setCurrentButtonState] = useState(
    "stats-button selected"
  );
  const [changeButtonState, setChangeButtonState] = useState("stats-button");

  // Updates state in App component to be button's ID.
  const handleChangeButtonClick = (e) => {
    handleSetAnalysisMode(e.target.id);

    if (changeButtonState.includes(" selected")) {
      return;
    } else {
      setChangeButtonState(() => {
        return changeButtonState + " selected";
      });
      setCurrentButtonState(() => {
        return currentButtonState.replace(" selected", "");
      });
    }
  };

  const handleCurrentButtonClick = (e) => {
    handleSetAnalysisMode(e.target.id);

    if (currentButtonState.includes(" selected")) {
      return;
    } else {
      setCurrentButtonState(() => {
        return currentButtonState + " selected";
      });
      setChangeButtonState(() => {
        return changeButtonState.replace(" selected", "");
      });
    }
  };

  return (
    <div>
      <h4 className="settings-header">Color scaling</h4>
      <button
        id="current"
        className={currentButtonState}
        title="Change color to vary depending on current probability of bad news."
        onClick={(e) => handleCurrentButtonClick(e)}
      >
        Current
      </button>
      <button
        id="change"
        className={changeButtonState}
        title="Change color to vary depending on probability for selected period compared to total mean."
        onClick={(e) => handleChangeButtonClick(e)}
      >
        Change
      </button>
    </div>
  );
};

export default Settings;
