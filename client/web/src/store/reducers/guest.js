const initialState = {
  guest: {},
}

export default function guestsReducers(state = initialState, actions) {
  switch (actions.type) {
    case 'NEWGUEST':
      return { ...state, guest: actions.payload.guest }
    default:
      return state
  }
}