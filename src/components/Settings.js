import "../css/Button.css";

const Settings = ({ handleSetAnalysisMode }) => {
  // Updates state in App component to be button's ID.
  const handleClick = (e) => {
    handleSetAnalysisMode(e.target.id);
  };

  return (
    <div>
      <button
        id="current"
        className="stats-button"
        title="Change color to vary depending on current probability of bad news."
        onClick={(e) => handleClick(e)}
      >
        Current
      </button>
      <button
        id="mean"
        className="stats-button"
        title="Change color to vary depending on probability for selected period compared to total mean."
        onClick={(e) => handleClick(e)}
      >
        Change
      </button>
    </div>
  );
};

export default Settings;
