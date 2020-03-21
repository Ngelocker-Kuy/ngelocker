import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import axios from '../services/axios'

function RegisterGuestPage() {
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const { UserId } = useParams()
    const history = useHistory()

    const registerGuest = (e) => {
        e.preventDefault()

        axios
            .post('/guests', {
                name,
                phoneNumber,
                UserId
            })
            .then(result => {
                history.push('/waiting')
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    return (
        <div className="register">
            <div className="container">
                <lottie-player
                    src="https://assets7.lottiefiles.com/packages/lf20_rRm3Ew.json"
                    background="transparent"
                    speed="1"
                    style={{ width: "120vw", height: "57vh", cursor: "pointer" }}
                    autoplay loop >
                </lottie-player>
                <div className="row justify-content-center mt-5" style={{ marginTop: "8rem!important", flexDirection: "column" }}>
                    <div className="col">
                        <div className="user-accounts-form shadow p-5">
                            <div className="user-accounts-form-header">
                                <h2 className="title">Isi Data Diri</h2>
                            </div>
                            <form onSubmit={(e) => { registerGuest(e) }}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" onChange={e => setName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="text" className="form-control" onChange={e => setPhoneNumber(e.target.value)} />
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