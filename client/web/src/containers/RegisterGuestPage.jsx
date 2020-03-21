import React from 'react';
import "../styles/formRegister.css";

function RegisterUserPage() {
    return (
        <div className="register">
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-5 text-center">
                        <h1>Daftarkan User!</h1>
                        <p>Isi dengan benar dan lengkapi</p>
                        <lottie-player
                            src="https://assets7.lottiefiles.com/packages/lf20_rRm3Ew.json" background="transparent" speed="1" style={{ width: "120vw", height: "57vh", cursor: "pointer" }} autoplay loop >
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
                            <form>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" className="form-control" />
                                    <p className="user-input-info">Contoh: email@ngelocker.com</p>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" />
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