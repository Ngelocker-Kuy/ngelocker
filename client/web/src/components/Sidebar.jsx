import React from "react";
import { Link, useHistory } from "react-router-dom"
import '../styles/sidebar.css'

function Sidebar() {
  const history = useHistory()

  const logout = () => {
    sessionStorage.removeItem('token')
    history.push('/')
  }

  const userPage = () => {
    history.push('/users')
  }


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
                <div className="upside clicked">
                  {/* <Link to="/users" className="button"> */}
                  <button onClick={() => userPage()} className="button"><i className="fas fa-users"></i></button>

                  {/* </Link> */}
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
                  <button onClick={() => logout()} className="button"><i className="fas fa-sign-out-alt"></i></button>
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
                  <Link to="/register/user" className="button"><i className="fas fa-user-plus"></i></Link>
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
                </div>
              </div>
            </li>
            <li>
              <div className="placeholder">
                <div className="upside">
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
