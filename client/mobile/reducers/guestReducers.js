const initialState = {
  guests: []
};

const guestReducer = (state = initialState, action) => {
  switch (action.type) {
    case "fetchGuest":
      return { ...state, guests: action.payload.guests };
    default:
      return state;
  }
};

export default guestReducer;
