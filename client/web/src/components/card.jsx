import React from 'react';
import '../styles/card.css';

function Card() {
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
        <div>
            <section className="Grid">
                <div className="Grid-row" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    <a className="Card col">
                        <div className="Card-thumb">
                            <div className="Card-shadow"></div>
                            <div className="Card-shadow"></div>
                            <div className="Card-shadow"></div>
                            <div className="Card-image" style={{ backgroundImage: `url(${gambarLucu[Math.floor(Math.random() * 8) + 1]})` }}></div>
                        </div>
                        <div className="Card-title"><span>Super interesting card</span></div>
                        <div className="Card-explore"><span> ID 2 Locker Owner</span></div>
                    </a>
                </div>
            </section>
        </div>
    );
}

export default Card;
