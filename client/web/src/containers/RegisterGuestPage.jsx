import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import axios from '../services/axios'

import { ADDNEWGUEST } from '../store/actions/guest'

function RegisterGuestPage() {
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const { UserId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const registerGuest = (e) => {
        e.preventDefault()

        axios
            .post('/guests', {
                name,
                phoneNumber,
                UserId
            })
            .then(({ data }) => {
                sessionStorage.setItem('userId', UserId)

                dispatch(ADDNEWGUEST(data.guest))

                history.push('/waiting')
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    return (
        <div className="register" style={{ fontFamily: "Fredoka One" }}>
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
                                <h2 className="title" style={{ color: "black" }}>Form Guest</h2>
                            </div>
                            <form onSubmit={(e) => { registerGuest(e) }}>
                                <div className="form-group">
                                    <label style={{ color: "black" }}>Name</label>
                                    <input type="text" className="form-control" onChange={e => setName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label style={{ color: "black" }}>Phone Number</label>
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