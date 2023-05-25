import "../css/Datepicker.css";
import { useState, useEffect } from "react";

const Monthpicker = ({ chosenDates, onChose, minMaxDates }) => {
  const [startDate, endDate] = chosenDates;

  const [startMonth, setStartMonth] = useState(startDate.slice(0, 7));

  const [endMonth, setEndMonth] = useState(endDate.slice(0, 7));

  const handleStartMonthInput = (date) => {
    let input = new Date(date);
    let startMonthString = input.toISOString().split("T")[0];

    setStartMonth((startMonth) => {
      startMonth = startMonthString;
      return startMonth;
    });

    setEndMonth((endMonth) => endMonth);

    onChose([startMonthString || null, endMonth]);
  };

  const handleEndMonthInput = (date) => {
    let input = new Date(date);
    input.setMonth(input.getMonth() + 1);
    let endMonthString = input.toISOString().split("T")[0];

    setStartMonth((startMonth) => startMonth);

    setEndMonth((endMonth) => {
      endMonth = endMonthString;
      return endMonth;
    });

    onChose([startMonth, endMonthString || null]);
  };

  const formatMinMaxDates = (date) => {
    const noDays = date.slice(0, -3);
    return noDays;
  };

  return (
    <div className="datepicker-container">
      <div className="datepicker-wrapper">
        <form className="datepicker-l">
          <label>
            <p className="datepicker-input-title-start">Start month</p>
            <input
              type="month"
              className="datepicker-input"
              name="startDate"
              defaultValue={formatMinMaxDates(minMaxDates.startDate)}
              min={formatMinMaxDates(minMaxDates.startDate)}
              max={formatMinMaxDates(minMaxDates.endDate)}
              onChange={(e) => handleStartMonthInput(e.target.value)}
            />
          </label>
        </form>
        <form className="datepicker-r">
          <label>
            <p className="datepicker-input-title-end">End month</p>
            <input
              type="month"
              className="datepicker-input"
              name="endMonth"
              defaultValue={formatMinMaxDates(minMaxDates.endDate)}
              min={formatMinMaxDates(minMaxDates.startDate)}
              max={formatMinMaxDates(minMaxDates.endDate)}
              onChange={(e) => handleEndMonthInput(e.target.value)}
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default Monthpicker;
