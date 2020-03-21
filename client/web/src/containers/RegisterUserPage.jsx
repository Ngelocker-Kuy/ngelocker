import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import "../styles/formRegister.css";
import axios from '../services/axios'

function RegisterUserPage() {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [lockerLabel, setLockerLabel] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    const proceedRegisterUser = (e) => {
        e.preventDefault()
        console.log(username, email, password, lockerLabel)

        axios
            .post('/users', {
                name,
                username,
                email,
                password,
                lockerLabel
            }, {
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                console.log(data)

                history.push('/users')
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    return (
        <div className="register">
            <div className="container">
                <div className="row justify-content-center mt-4">
                    <div className="col-5 text-center">
                        <h1>Register User!</h1>
                        <p>Fill in correctly</p>
                        <lottie-player
                            src="https://assets10.lottiefiles.com/packages/lf20_i25VGQ.json" background="transparent" speed="1" style={{ width: "300px", height: "70vh", cursor: "pointer" }} hover autoplay loop >
                        </lottie-player>
                    </div>
                    <div className="col-5">
                        <div className="user-accounts-form shadow p-5">
                            <div className="user-accounts-form-header">
                                <h2 className="title">Form</h2>
                            </div>
                            <form onSubmit={(e) => proceedRegisterUser(e)}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Locker Label</label>
                                    <input type="text" className="form-control" onChange={(e) => setLockerLabel(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn-register btn-block mt-4">Daftar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default RegisterUserPage