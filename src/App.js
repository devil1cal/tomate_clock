import "./styled.scss";
import React, { useState } from "react";

import Timer from "./time.js";
//import TimerSetting from "./timesetting.js";
import SettingsContext from "./settingContext.js";

//import Beep from "./beep.js";

export default function App() {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  return (
    <div id="session-length" className="pomBox">
      <main id="timer-label" className="pomoBox">
        <h1>pomopo</h1>
        <SettingsContext.Provider
          id="timer-label"
          value={{
            workMinutes,
            breakMinutes,
            setWorkMinutes,
            setBreakMinutes
          }}
        >
          <Timer id="start_stop" />
        </SettingsContext.Provider>
      </main>
    </div>
  );
}
