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

    // const dataDummy = [
    //     {
    //         id: 1,
    //         name: "test name 1",
    //         email: "test email 1",
    //         LockerId: 1
    //     },
    //     {
    //         id: 2,
    //         name: "test name 2",
    //         email: "test email 2",
    //         LockerId: 2
    //     },
    //     {
    //         id: 3,
    //         name: "test name 3",
    //         email: "test email 3",
    //         LockerId: 3
    //     },
    //     {
    //         id: 4,
    //         name: "test name 3",
    //         email: "test email 3",
    //         LockerId: 3
    //     },
    //     {
    //         id: 5,
    //         name: "test name 3",
    //         email: "test email 3",
    //         LockerId: 3
    //     },
    //     {
    //         id: 6,
    //         name: "test name 3",
    //         email: "test email 3",
    //         LockerId: 3
    //     }
    // ]

    return (
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
    )
}

export default ListUsersPage