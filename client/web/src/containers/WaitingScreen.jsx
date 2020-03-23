import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import socket from '../services/socket'

import { changeLockStatus } from '../store/actions/locker'

function WaitingScreen() {
  const UserId = sessionStorage.userId

  const history = useHistory()
  const dispatch = useDispatch()

  const guest = useSelector(state => state.guestReducers.guest)

  socket.on(`permission-${UserId}`, (status) => {
    dispatch(changeLockStatus(status))

    sessionStorage.removeItem('userId')

    history.push('/permission')
  })

  if (Object.keys(guest).length === 0) {
    history.goBack()
  }

  useEffect(() => {
    socket.emit('newGuest', UserId)
  }, [UserId])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20vh 5vh' }}>
      <h1 style={{ textAlign: 'center', color: 'white', fontFamily: "Fredoka One" }}>WAITING FOR PERMISSION</h1>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <lottie-player
          src="https://assets7.lottiefiles.com/packages/lf20_4gycw9.json"
          background="transparent"
          speed="1"
          style={{ width: '100%', height: '100%', alignSelf: 'center' }}
          loop
          autoplay
        ></lottie-player>
      </div>
      <div>
        <lottie-player
          src="https://assets3.lottiefiles.com/datafiles/cb81834f3b75c3d2aba9d8a58ad1f408/AE_JSON/loader1.json"
          background="transparent"
          speed="1"
          style={{ width: '100%', height: '100%', alignSelf: 'center', marginTop: '30vh' }}
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
  );
}

export default WaitingScreen;
