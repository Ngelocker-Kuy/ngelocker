import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import guestReducer from "../reducers/guestReducers";
import loadingReducer from "../reducers/loadingReducers";
const reducers = combineReducers({
  guestReducer,
  loadingReducer
})
const Midlleware = applyMiddleware(thunk);
const store = createStore(reducers, Midlleware);

export default store;
