import React, { useContext } from "react";
import ReactSlider from "react-slider";
import SettingsContext from "./settingContext";
import "./styled.scss";

function TimerSetting() {
  const timeSetting = useContext(SettingsContext);

  return (
    <div>
      <label id="session-length-label">
        {" "}
        Work: {timeSetting.workMinutes}:00
      </label>

      <ReactSlider
        id="session-increment-decrement"
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={timeSetting.workMinutes}
        onChange={(newValue) => timeSetting.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />

      <label id="break-length-label">
        break: {timeSetting.breakMinutes}:00
      </label>
      <ReactSlider
        id="break-increment-decrement"
        className={"slider green"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={timeSetting.breakMinutes}
        onChange={(newValue) => timeSetting.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />
    </div>
  );
}
export default TimerSetting;
