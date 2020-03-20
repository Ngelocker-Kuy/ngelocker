import React, { useState } from "react";
import "../styles/loginAdmin.css";

function LoginAdminPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = () => {
    
  }

  return (
    <div className="container">
        <div className="row">
            <div className="col-lg-3 col-md-2"></div>
            <div className="col-lg-6 col-md-8 login-box">
                <div className="col-lg-12 login-key" style={{padding: '10px'}}>
                  LOGIN
                </div>
                <div className="col-lg-12 login-title">
                    ADMIN PANEL
                </div>

                <div className="col-lg-12 login-form">
                    <div className="col-lg-12 login-form">
                        <form onSubmit={}>
                            <div className="form-group">
                                <label className="form-control-label">USERNAME</label>
                                <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">PASSWORD</label>
                                <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                            </div>

                            <div className="col-lg-12 loginbttm">
                                <div className="col-lg-6 login-btm login-text">
                                </div>
                                <div className="login-btm login-button">
                                    <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-3 col-md-2"></div>
            </div>
        </div>
        </div>
  );
}

export default LoginAdminPage;
