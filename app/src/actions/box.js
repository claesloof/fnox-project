import axios from 'axios';

import {
  FETCH_BOXES_REQUEST,
  FETCH_BOXES_SUCCESS,
  FETCH_BOXES_FAILURE,
  REGISTER_BOX_REQUEST,
  REGISTER_BOX_SUCCESS,
  REGISTER_BOX_FAILURE
} from '../constants/actionTypes';

const API_ROOT = 'http://localhost:8080';

export function register(name, weight, color, destination, multiplier) {
  const cost = weight * multiplier;
  const data = {
    name: name,
    weight: weight,
    color: color,
    destination: destination,
    cost: cost
  }

  return dispatch => {
    dispatch({type: REGISTER_BOX_REQUEST});
    return axios({
      method: 'POST',
      url: API_ROOT + '/boxes',
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      dispatch({type: REGISTER_BOX_SUCCESS, payload: response.data});
    }).catch(error => {
      dispatch({type: REGISTER_BOX_FAILURE, payload: error});
    });
  }
}

export function fetch() {
  return dispatch => {
    dispatch({type: FETCH_BOXES_REQUEST});
    return axios({
      method: 'GET',
      url: API_ROOT + '/boxes'
    }).then(response => {
      dispatch({type: FETCH_BOXES_SUCCESS, payload: response.data});
    }).catch(error => {
      dispatch({type: FETCH_BOXES_FAILURE, payload: error});
    });
  }
}
