import React, { useEffect, useState } from "react";
import "../styles/card.css";
import { Card } from ".";
import axios from "../services/axios";
import no_data from "../assets/nodata_800139.png";

function ListUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/users", {
        headers: {
          token: sessionStorage.token
        }
      })
      .then(({ data }) => {
        setUsers(data);
      })
      .catch(err => {
        console.log(err.response);
      });
  }, []);
  console.log(users.length)
  return (
    <div className="container">
      <div
        className="row"
        style={{ display: "flex", justifyContent: "center", margin: "2%" }}
      >
        <h1 style={{ fontFamily: "Fredoka One", color: "white" }}>
          List Users
        </h1>
      </div>
      {users.length === 0 ? <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <img src={no_data} alt="noData" />
        </div> : <div className="row">
          <div className="listCard">
            <section className="Grid">
              <div
                className="Grid-row"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap"
                }}
              >
                {users.map(user => {
                  return <Card data={user} key={user.id} />;
                })}
              </div>
            </section>
          </div>
        </div>}
      {/* {users.length <= 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <img src={no_data} alt="noData" />
        </div>
      ) : (
        <div className="row">
          <div className="listCard">
            <section className="Grid">
              <div
                className="Grid-row"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap"
                }}
              >
                <img src={no_data} alt="noData" />
                {users.map(user => {
                  return <Card data={user} key={user.id} />;
                })}
              </div>
            </section>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default ListUsersPage;
