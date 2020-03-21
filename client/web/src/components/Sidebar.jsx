import React from "react";
import '../styles/sidebar.css'

function Sidebar() {
  return (
    <section className="menu menu--circle">
      <input type="checkbox" id="menu__active" />
      <label htmlFor="menu__active" className="menu__active">
        <div className="menu__toggle">
          <div className="icon">
            <div className="hamburger"></div>
          </div>
        </div>
        <input type="radio" name="arrow--up" id="degree--up-0" />
        <input type="radio" name="arrow--up" id="degree--up-1" />
        <input type="radio" name="arrow--up" id="degree--up-2" />
        <div className="menu__listings">
          <ul className="circle">
            <li>
              <div className="placeholder">
                <div className="upside">
                  <a href="https://codepen.io/logrithumn" className="button"><i className="fa fa-user"></i></a>
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
                  <a href="#" className="button"><i className="fa fa-cog"></i></a>
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
                  <a href="#">&nbsp</a>
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
                  <a href="#" className="button"><i className="fa fa-commenting"></i></a>
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
                  <a href="#" className="button"><i className="fa fa-trash"></i></a>
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
                  <a href="#" className="button"><i className="fa fa-battery-4"></i></a>
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
                  <a href="#" className="button"><i className="fa fa-calendar"></i></a>
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
                  <a href="#" className="button"><i className="fa fa-cloud"></i></a>
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
                  <a href="#" className="button"><i className="fa fa-wifi"></i></a>
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
                  <a href="#" className="button"><i className="fa fa-envelope-o"></i></a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="menu__arrow menu__arrow--top">
          <ul>
            <li>
              <label htmlFor="degree--up-0">
                <div className="arrow"></div>
              </label>
              <label htmlFor="degree--up-1">
                <div className="arrow"></div>
              </label>
              <label htmlFor="degree--up-2">
                <div className="arrow"></div>
              </label>
            </li>
          </ul>
        </div>
      </label>
    </section>
  );
}

export default Sidebar;
