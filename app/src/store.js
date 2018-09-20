import axios from 'axios';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducer';
import { applyMiddleware, createStore } from 'redux';

export const store = createStore(reducer, applyMiddleware(thunk, logger));
console.log(store.getState());
