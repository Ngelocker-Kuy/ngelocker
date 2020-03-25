import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import "../styles/loginAdmin.css";
import axios from "../services/axios";
import logo from "../assets/logo.png";
import Swal from "sweetalert2";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import LoadingOverlay from "react-loading-overlay";

function LoginAdminPage({ children, ...rest }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const history = useHistory();

  const login = e => {
    console.log("masuk lohon");
    setLoading(true);
    e.preventDefault();

    axios
      .post("/admin/login", {
        username,
        password
      })
      .then(result => {
        setLoading(false);
        let token = result.data.token;
        sessionStorage.setItem("token", token);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: toast => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          }
        });

        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        });
        history.push("/users");
      })
      .catch(({ response: { data } }) => {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Incorrect Username / Password`,
          showConfirmButton: false,
          timer: 1500
        });
      });
  };

  const toggleVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <div className="container">
      {sessionStorage.token ? (
        <Redirect
          to={{
            pathname: "/users"
          }}
        />
      ) : (
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 login-box">
            <img
              src={logo}
              style={{ width: "150px", height: "150px" }}
              alt="logo-ngelocker"
            />
            <div className="col-lg-12 login-title">ADMIN PANEL</div>
            {loading ? (
              <LoadingOverlay
                active={loading}
                spinner
                text="Loading your content..."
              />
            ) : (
              <div></div>
            )}
            <div className="col-lg-12 login-form">
              <form onSubmit={e => login(e)}>
                <div className="container">
                  <div className="row">
                    <div className="form-group col">
                      <label className="form-control-label">USERNAME</label>
                      <input
                        style={{ color: "white" }}
                        type="text"
                        className="form-control"
                        onChange={e => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col">
                      <label className="form-control-label">PASSWORD</label>
                      <InputGroup className="mb-3">
                        <FormControl
                          autoComplete="false"
                          className="form-control"
                          style={{ borderRight: "none", color: "white" }}
                          type={passwordVisibility ? "text" : "password"}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                        <InputGroup.Append>
                          <Button
                            style={{
                              borderLeft: "none",
                              backgroundColor: "#1A2226",
                              paddingTop: "0",
                              paddingBottom: "0",
                              borderTopColor: "#1A2226",
                              borderBottom: "#0DB8DE 2px solid",
                              borderRadius: "13px",
                              outline: "none !important",
                              marginRight: "0 !important"
                            }}
                            onClick={() => toggleVisibility()}
                          >
                            {passwordVisibility ? (
                              <BsEyeFill />
                            ) : (
                              <BsEyeSlashFill />
                            )}
                          </Button>
                        </InputGroup.Append>
                      </InputGroup>
                    </div>
                  </div>
                  <div className="row" style={{ justifyContent: "flex-end" }}>
                    <div className="login-btm login-button">
                      <button
                        type="submit"
                        className="btn btn-outline-primary"
                        style={{ marginRight: "2.5vh" }}
                      >
                        LOGIN
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-3 col-md-2"></div>
        </div>
      )}
    </div>
  );
}

export default LoginAdminPage;
