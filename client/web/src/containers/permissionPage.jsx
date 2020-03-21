import React from 'react';
import "../styles/permission.css";
import ErrorPermission from '../components/errorPermission'
import SuccessPermission from '../components/successPermission'

function permissionPage() {
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
export default permissionPage