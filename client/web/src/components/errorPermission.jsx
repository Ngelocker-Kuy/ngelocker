import React from 'react';
import "../styles/permission.css";

function ErrorPermission() {
    return (
        <div id="error-box">
            <div className="dot"></div>
            <div className="dot two"></div>
            <div className="wrong-qr">
                <lottie-player
                    src="https://assets3.lottiefiles.com/packages/lf20_bAslkw.json" background="transparent" speed="1" style={{ display: "flex", justifyContent: "center", height: "50vh", width: "100%" }} loop autoplay >
                </lottie-player>
            </div>
            <div className="message"><h1 className="alert">Error!</h1><p>oh no, something went wrong.</p></div>
            <button className="button-box"><h1 className="red">Oops . . .</h1></button>
        </div>
    );
}

export default ErrorPermission;
