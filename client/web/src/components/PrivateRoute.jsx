import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {
    SideBar,
} from '../containers'

export default function PrivateRoute({ children, ...rest }) {
    return (
        <>
            <SideBar />
            <Route
                {...rest}
                render={({ location }) =>
                    localStorage.token ?
                        (children) :
                        (
                            <Redirect
                                to={{
                                    pathname: "/",
                                    state: { from: location }
                                }}
                            />
                        )
                }
            />
        </>
    )
}