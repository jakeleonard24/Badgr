import {createStore, applyMiddleware} from 'redux';
import reducer from'./ducks/reducer.js';
import promiseMiddleware from 'redux-promise-middleware'

export default createStore(reducer, applyMiddleware(promiseMiddleware()))