import axios from 'axios';

import {
  FETCH_BOXES_SUCCESS,
  FETCH_BOXES_FAILURE,
  REGISTER_BOX_SUCCESS,
  REGISTER_BOX_FAILURE
} from '../constants/actionTypes';

import { DESTINATIONS } from '../constants/fieldTypes';

const API_ROOT = 'http://localhost:8080';

const shippingCost = (weight, multiplier) => (weight*multiplier);
const multiplier = (destination) => (DESTINATIONS.find(el => el.id === destination).multiplier)

export function register(name, weight, color, destination) {
  const cost = shippingCost(weight, multiplier(destination));
  const data = {
    name: name,
    weight: weight,
    color: color,
    destination: destination,
    cost: cost
  }

  console.log("COST IS: " + cost);

  return dispatch => {
    axios({
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
    axios({
      method: 'GET',
      url: API_ROOT + '/boxes'
    }).then(response => {
      dispatch({type: FETCH_BOXES_SUCCESS, payload: response.data});
    }).catch(error => {
      dispatch({type: FETCH_BOXES_FAILURE, payload: error});
    });
  }
}
