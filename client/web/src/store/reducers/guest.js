const initialState = {
  guest: {},
}

export default function guestsReducers(state = initialState, actions) {
  switch (actions.type) {
    case 'NEWGUEST':
      console.log(actions.payload, 'di reducer')
      return { ...state, guest: actions.payload.guest }
    default:
      return state
  }
}