import "../css/Datepicker.css";
import { useState } from "react";
import { endOfMonth, startOfMonth, parseISO, format } from "date-fns";

const Monthpicker = ({ selectedDays, onChose, minMaxDates }) => {
  const [startDate, endDate] = selectedDays;

  const [startMonth, setStartMonth] = useState(startDate);

  const [endMonth, setEndMonth] = useState(endDate);

  const handleStartMonthInput = (date) => {
    date = startOfMonth(parseISO(date));
    date = format(date, "yyyy-MM-dd");

    setStartMonth(() => {
      return date;
    });

    setEndMonth((endMonth) => endMonth);

    onChose([date || null, endMonth]);
  };

  const handleEndMonthInput = (date) => {
    date = endOfMonth(parseISO(date));
    date = format(date, "yyyy-MM-dd");
    setStartMonth((startMonth) => startMonth);

    setEndMonth(() => {
      return date;
    });

    onChose([startMonth, date || null]);
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
