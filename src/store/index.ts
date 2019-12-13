import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
// modules & settings
import thunk from 'redux-thunk'
import reducer from '../reducers/index'

const enhancer = process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)

export const store = createStore(reducer, enhancer)
