import React from 'react';
import "../styles/permission.css";
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ErrorPermission, SuccessPermission } from '.'

function PermissionPage() {
    // const statusLock = useSelector(state => state.lockerReducers.status  )
    const guest = useSelector(state => state.guestReducers.guest)
    const statusLock = false
    const history = useHistory()

    // if (Object.keys(guest).length === 0) {
    //     history.goBack()
    // }

    return (
        <div id="container" style={{ marginTop: '7vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', height: '100%', overflow: 'hidden' }}>
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