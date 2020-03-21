import React from "react";
import Lottie from "react-lottie";
import * as animationData from "./5081-empty-box.json";

function WaitingScreen() {
  console.log(animationData);
  return (
    <div style={{ backgroundColor: "black" }}>
      <h1>WAITING FOR PERMISSION</h1>
      <lottie-player
        src="https://assets10.lottiefiles.com/packages/lf20_5gSzGx.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px;"
        loop
        controls
        autoplay
      ></lottie-player>
    </div>
  );
}

export default WaitingScreen;
