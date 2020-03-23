import React from 'react';
import "../styles/permission.css";
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ErrorPermission, SuccessPermission } from '.'

function PermissionPage() {
<<<<<<< HEAD
    const dummyData = false
=======
    const statusLock = useSelector(state => state.lockerReducers.status)
    const guest = useSelector(state => state.guestReducers.guest)

    const history = useHistory()

    if (Object.keys(guest).length === 0) {
        history.goBack()
    }
>>>>>>> a36904248dc73c42eb26c83024538080bccb0448

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