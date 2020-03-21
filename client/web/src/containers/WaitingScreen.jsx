import React from "react";

function WaitingScreen() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '50px'}}>
      <h1 style={{textAlign: 'center', color: 'black'}}>WAITING FOR PERMISSION</h1>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <lottie-player
        src="https://assets7.lottiefiles.com/packages/lf20_4gycw9.json"
        background="transparent"
        speed="1"
        style={{width: '100%', height: '100%', alignSelf: 'center', position: 'absolute', marginTop: '20vh'}}
        loop
        autoplay
      ></lottie-player>
      
      </div>
      <div>
      <lottie-player
        src="https://assets3.lottiefiles.com/datafiles/cb81834f3b75c3d2aba9d8a58ad1f408/AE_JSON/loader1.json"
        background="transparent"
        speed="1"
        style={{width: '100%', height: '100%', alignSelf: 'center', marginTop: '30vh'}}
        loop
        autoplay
      ></lottie-player>
      </div>
    </div>
  );
}

export default WaitingScreen;
