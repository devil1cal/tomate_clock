import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./playButton";
import PauseButton from "./pauseButton";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "./settingContext.js";
import TimerSetting from "./timesetting";

const red = "#f54279";
const blue = "#006aaf";

function Timer() {
  const timeSetting = useContext(SettingsContext);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const beep = new Audio(
    "https://assets.mixkit.co/active_storage/sfx/221/221-preview.mp3"
  );

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work"
          ? timeSetting.workMinutes
          : timeSetting.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = timeSetting.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        beep.play();
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [timeSetting]);

  const totalSeconds =
    mode === "work"
      ? timeSetting.workMinutes * 60
      : timeSetting.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div className="timerBox">
      <CircularProgressbar
        id="timer-label"
        value={percentage}
        text={minutes + ":" + seconds}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: mode === "work" ? red : blue,
          tailColor: "rgba(255,255,255,.2)"
        })}
      />
      <div style={{ marginTop: "20px" }}>
        {isPaused ? (
          <PlayButton
            id="start_stop"
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            id="start_stop"
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
      <div>
        <TimerSetting />
      </div>
    </div>
  );
}

export default Timer;
