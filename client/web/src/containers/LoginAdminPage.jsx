import React, { useState } from "react";
import { useHistory, Redirect } from 'react-router-dom'
import "../styles/loginAdmin.css";
import axios from '../services/axios'
import logo from '../assets/logo.png'

function LoginAdminPage({ children, ...rest }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    const login = (e) => {
        console.log('masuk lohon')
        e.preventDefault()

        axios
            .post('/admin/login', {
                username,
                password
            })
            .then(result => {
                let token = result.data.token
                sessionStorage.setItem('token', token)
                console.log('masuk then')
                history.push('/users')
            })
            .catch(({ response: { data } }) => {
                console.log(data)
            })
    }

    return (
        <div className="container">
            {sessionStorage.token ?
                <Redirect to={{
                    pathname: "/users",
                }} /> :
                <div className="row">
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 login-box">
                        <img src={logo} style={{ width: "150px", height: "150px" }} alt="logo-ngelocker" />
                        <div className="col-lg-12 login-title">
                            ADMIN PANEL
                        </div>
                        <div className="col-lg-12 login-form">
                            <form onSubmit={(e) => login(e)}>
                                <div className="container">
                                    <div className="row">
                                        <div className="form-group col">
                                            <label className="form-control-label">USERNAME</label>
                                            <input style={{ color: "white" }} type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col">
                                            <label className="form-control-label">PASSWORD</label>
                                            <input style={{ color: "white" }} type="password" className="form-control" autoComplete="false" onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="row" style={{ justifyContent: "flex-end" }}>
                                        <div className="login-btm login-button">
                                            <button type="submit" className="btn btn-outline-primary" style={{ marginRight: "2.5vh" }}>LOGIN</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-2"></div>
                </div>
            }
        </div>

    )
}

export default LoginAdminPage;
