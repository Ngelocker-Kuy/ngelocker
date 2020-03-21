import React from 'react';
import "../styles/permission.css";
import { ErrorPermission, SuccessPermission } from '.'
import { useSelector } from 'react-redux'

function PermissionPage() {
    const statusLock = useSelector(state => state.lockerReducers.status)

    return (
        <div id="container">
            {
                statusLock ?
                    <SuccessPermission />
                    :
                    <ErrorPermission />
            }
        </div >
    )
}
export default PermissionPage