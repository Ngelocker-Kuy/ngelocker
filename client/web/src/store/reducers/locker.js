const initialState = {
    status: false
}

export default function lockerReducers(state = initialState, actions) {
    switch (actions.type) {
        case 'CHANGELOCK':
            return { ...state, status: actions.payload.status }
        default:
            return state
    }
}