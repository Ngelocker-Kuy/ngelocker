import React, { useState } from "react";
import { useHistory, Redirect } from 'react-router-dom'
import "../styles/loginAdmin.css";
import axios from '../services/axios'

function LoginAdminPage({ children, ...rest }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    const login = (e) => {
        e.preventDefault()

        axios
            .post('/admin/login', {
                username,
                password
            })
            .then(result => {
                let token = result.data.token
                localStorage.setItem('token', token)

                history.push('/users')
            })
            .catch(({ response: { data } }) => {
                console.log(data)
            })
    }

    return (

        <div className="container">
            {localStorage.token ?
                <Redirect to={{
                    pathname: "/users",
                }} /> :
                <div className="row">
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 login-box">
                        <div className="col-lg-12 login-key" style={{ padding: '10px' }}>
                            LOGIN
                </div>
                        <div className="col-lg-12 login-title">
                            ADMIN PANEL
                </div>
                        <div className="col-lg-12 login-form">
                            <form onSubmit={(e) => login(e)}>
                                <div className="form-group">
                                    <label className="form-control-label">USERNAME</label>
                                    <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">PASSWORD</label>
                                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
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
            }
        </div>

    )
}

export default LoginAdminPage;
