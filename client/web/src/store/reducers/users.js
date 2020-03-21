const initialState = {
  users: []
}

export default function usersReducers(state = initialState, actions) {
  switch (actions.type) {
    case 'TEST':
      return state
    default:
      return state
  }
}