import React, { useEffect, useState } from 'react';
import '../styles/card.css';
import { Card } from '.'
import axios from '../services/axios'

function ListUsersPage() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios
            .get('/users', {
                headers: {
                    token: sessionStorage.token
                }
            })
            .then(({ data }) => {
                setUsers(data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    return (
        <div className="container">
            <div className="row" style={{ display: "flex", justifyContent: "center", margin: "2%" }}>
                <h1 style={{ fontFamily: "Fredoka One" }}>List Users</h1>
            </div>
            <div className="row">
                <div className="listCard">
                    <section className="Grid">
                        <div className="Grid-row" style={{
                            display: "flex", flexDirection: "row", flexWrap: "wrap",
                        }}>
                            {
                                users.map(user => {
                                    return (
                                        <Card data={user} key={user.id} />
                                    )
                                })
                            }
                        </div>
                    </section >
                </div>
            </div>
        </div>
    )
}

export default ListUsersPage