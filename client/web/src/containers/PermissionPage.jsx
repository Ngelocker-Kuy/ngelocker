import React from 'react';
import "../styles/permission.css";
import { ErrorPermission, SuccessPermission } from '.'

function PermissionPage() {
    const dummyData = false
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