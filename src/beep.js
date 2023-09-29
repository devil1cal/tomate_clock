import React from "react";
import "bootstrap";
import { SvgIcon } from "@mui/material";

import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
//const sound = [{src:"https://www.myinstants.com/instant/meep-merp"}];

class Beep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: new Audio(
        "https://assets.mixkit.co/active_storage/sfx/221/221-preview.mp3"
      ),
      isPlaying: false
    };
  }

  //sound not working
  render() {
    return (
      <div>
        <p>{this.state.isPlaying ? "Song is Playing" : "Song is Paused"}</p>
        <button onClick={this.playPause}>
          <SvgIcon>
            {this.state.isPlaying ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </SvgIcon>{" "}
          <br />
          <span>play|Pause</span>
        </button>
      </div>
    );
  }
}
export default Beep;
