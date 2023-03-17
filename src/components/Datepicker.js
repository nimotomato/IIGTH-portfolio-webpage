import "../css/Datepicker.css";

const Datepicker = ({ chosenDates, onChose, minMaxDates }) => {
  const [startDate, endDate] = chosenDates;

  return (
    <div className="datepicker-container">
      <div className="datepicker-wrapper">
        <form className="datepicker-l">
          <label>
            <p className="datepicker-input-title-start">Start date</p>
            <input
              type="date"
              className="datepicker-input"
              name="startDate"
              defaultValue={startDate}
              min={minMaxDates.startDate}
              max={minMaxDates.endDate}
              onChange={(e) => onChose([e.target.value, endDate || null])}
            />
          </label>
        </form>
        <form className="datepicker-r">
          <label>
            <p className="datepicker-input-title-end">End date</p>
            <input
              type="date"
              className="datepicker-input"
              name="endDate"
              defaultValue={endDate}
              min={minMaxDates.startDate}
              max={minMaxDates.endDate}
              onChange={(e) => onChose([startDate || null, e.target.value])}
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default Datepicker;
