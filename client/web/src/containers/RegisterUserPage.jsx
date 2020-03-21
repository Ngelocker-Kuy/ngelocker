import React, { useState } from 'react';
import "../styles/formRegister.css";
import axios from '../services/axios'

function RegisterUserPage() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const proceedRegisterUser = (e) => {
        e.preventDefault()
        console.log(username, email, password)

        axios
            .post('/users')
    }

    return (
        <div className="register">
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-5 text-center">
                        <h1>Daftarkan User!</h1>
                        <p>Isi dengan benar dan lengkapi</p>
                        <lottie-player
                            src="https://assets10.lottiefiles.com/packages/lf20_i25VGQ.json" background="transparent" speed="1" style={{ width: "300px", height: "70vh", cursor: "pointer" }} hover autoplay loop >
                        </lottie-player>
                    </div>
                    <div className="col-5">
                        <div className="user-accounts-form shadow p-5">
                            <div className="user-accounts-form-header">
                                <h2 className="title">Daftarkan Sekarang</h2>
                                <p className="text">
                                    Sudah Punya Locker?
                                    <a className="link-page"> check locker</a>
                                </p>
                            </div>
                            <form onSubmit={(e) => proceedRegisterUser(e)}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Locker Label</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                                    <p className="user-input-info">Contoh: email@ngelocker.com</p>
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