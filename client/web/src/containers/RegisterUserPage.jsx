import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import "../styles/formRegister.css";
import axios from '../services/axios'
import { InputGroup, Button, FormControl } from 'react-bootstrap'
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';

function RegisterUserPage() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [lockerLabel, setLockerLabel] = useState('')
    const [password, setPassword] = useState('')

    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const history = useHistory()

    const proceedRegisterUser = (e) => {
        e.preventDefault()

        axios
            .post('/users', {
                username,
                email,
                password,
                lockerLabel
            }, {
                headers: {
                    token: sessionStorage.token
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

    const toggleVisibility = () => {
        setPasswordVisibility(!passwordVisibility)
    }

    useEffect(() => {
        axios
            .get('/users', {
                headers: {
                    token: sessionStorage.token
                }
            })
            .then(({ data }) => {
                setLockerLabel(`locker-${data.length + 1}`)
                setPassword(`locker-${data.length + 1}`)
            })
            .catch(err => {
                console.log(err.response)
            })
    })

    return (
        <div className="register mt-5" style={{ fontFamily: "Fredoka One" }}>
            < div className="container" >
                <div className="row justify-content-center mt-4">
                    <div className="col-5 text-center">
                        <h1 style={{ color: 'white' }}>Register User!</h1>
                        <p style={{ color: 'white' }}>Fill in correctly</p>
                        <lottie-player
                            src="https://assets10.lottiefiles.com/packages/lf20_i25VGQ.json" background="transparent" speed="1" style={{ marginLeft: "7vh", display: "flex", justifyContent: "center", width: "100%", height: "66vh", cursor: "pointer" }} autoplay loop >
                        </lottie-player>
                    </div>
                    <div className="col-5">
                        <div className="user-accounts-form p-5">
                            <div className="user-accounts-form-header">
                                <h2 className="title">Form User</h2>
                            </div>
                            <form onSubmit={(e) => proceedRegisterUser(e)}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input style={{ color: "white" }} type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Locker Label</label>
                                    <input style={{ color: "white", background: '#1A2226' }} editable="false" type="text" className="form-control" value={lockerLabel} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input style={{ color: "white" }} type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <label>Password</label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        autoComplete="false"
                                        className="form-control"
                                        style={{ borderRight: 'none' }}
                                        type={passwordVisibility ? "text" : "password"}
                                        defaultValue={lockerLabel}
                                    />
                                    <InputGroup.Append >
                                        <Button style={{
                                            borderLeft: 'none',
                                            backgroundColor: "#1A2226",
                                            paddingTop: '0',
                                            paddingBottom: '0',
                                            borderTopColor: '#1A2226',
                                            borderBottom: '#0DB8DE 2px solid',
                                            borderRadius: '13px',
                                            outline: "none !important",
                                            marginRight: '0 !important'
                                        }}
                                            onClick={() => toggleVisibility()}
                                        >
                                            {passwordVisibility ?
                                                <BsEyeFill /> :
                                                <BsEyeSlashFill />
                                            }
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <button type="submit" className="btn-register btn-block mt-4" style={{ outline: "none" }}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default RegisterUserPage