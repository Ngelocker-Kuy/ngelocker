const initialState = {
  isLoading: false
}

export default function loadingReducers(state = initialState, actions) {
  switch (actions.type) {
    case 'SET_TRUE':
      return { ...state, isLoading: true }
    case 'SET_FALSE':
      return { ...state, isLoading: false }
    default:
      return state
  }
}