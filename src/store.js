import { createStore } from "redux";

import throttle from 'lodash/throttle'

import rootReducer from "./reducers";

let initState = {}
const persistedState = localStorage.getItem("sudoku-state")

if(persistedState) {
  initState = JSON.parse(persistedState)
}

const store = createStore(rootReducer, 
  initState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(throttle(() => {
  localStorage.setItem("sudoku-state", JSON.stringify(store.getState()))
}, 1000))

export default store