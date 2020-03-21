import React from 'react';
import "../styles/permission.css";
import { ErrorPermission, SuccessPermission } from '.'

function PermissionPage() {
<<<<<<< HEAD
    const dummyData = true
=======
    const dummyData = false
>>>>>>> add functionality
    return (
        <div id="container">
            {
                dummyData ?
                    <SuccessPermission />
                    :
                    <ErrorPermission />
            }
        </div >
    )
}
export default PermissionPage