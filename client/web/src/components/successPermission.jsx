import React from 'react';
import "../styles/permission.css";

function SuccessPermission() {
    return (
        <div id="success-box">
            <div className="dot"></div>
            <div className="dot two"></div>
            <div className="success-qr">
                <lottie-player
                    src="https://assets10.lottiefiles.com/packages/lf20_JBmeXo.json" background="transparent" speed="1" style={{ display: "flex", justifyContent: "center", height: "50vh", width: "100%" }} loop autoplay >
                </lottie-player>
            </div>
            <div className="message"><h1 className="alert">Success!</h1><p>yay, everything is working.</p></div>
            <button className="button-box"><h1 className="green">Yey Success</h1></button>
        </div>
    );
}

export default SuccessPermission;
