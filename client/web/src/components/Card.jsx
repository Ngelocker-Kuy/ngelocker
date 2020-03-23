import React from 'react';
import '../styles/card.css';

function Card(props) {

    const gambarLucu = [
        "https://robohash.org/1",
        "https://robohash.org/2",
        "https://robohash.org/3",
        "https://robohash.org/4",
        "https://robohash.org/5",
        "https://robohash.org/6",
        "https://robohash.org/7",
        "https://robohash.org/8",
        "https://robohash.org/9"
    ]

    return (
        <div className="Card">
            <div className="Card-thumb">
                <div className="Card-shadow"></div>
                <div className="Card-shadow"></div>
                <div className="Card-shadow"></div>
                <div className="Card-image" style={{ backgroundImage: `url(${gambarLucu[Math.floor(Math.random() * 8) + 1]})` }}></div>
            </div>
            <div className="Card-title"><span>{props.data.username}</span></div>
            <div className="Card-explore"><span>{props.data.lockerLabel} Locker Owner</span></div>
        </div>
    );
}

export default Card;
