import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import guestReducer from "../reducers/guestReducers";
const Midlleware = applyMiddleware(thunk);
const store = createStore(guestReducer, Midlleware);

export default store;
