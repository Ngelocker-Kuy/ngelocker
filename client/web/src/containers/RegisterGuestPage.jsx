import React from 'react';

function RegisterGuestPage() {
    return (
        <div className="register">
            <div className="container">
                <div className="row justify-content-center mt-5" style={{ marginTop: "8rem!important", flexDirection: "column" }}>
                    <lottie-player
                        src="https://assets7.lottiefiles.com/packages/lf20_rRm3Ew.json"
                        background="transparent"
                        speed="1"
                        style={{ width: "100vw", height: "70vh", cursor: "pointer" }}
                        autoplay loop >
                    </lottie-player>
                    <div className="col" style={{ position: "absolute", zIndex: 99, width: "90%" }}>
                        <div className="user-accounts-form shadow p-5">
                            <div className="user-accounts-form-header">
                                <h2 className="title">Form Guest</h2>
                            </div>
                            <form>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <button type="submit" className="btn-register btn-block mt-4">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default RegisterGuestPage