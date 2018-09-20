import {
  FETCH_BOXES_REQUEST,
  FETCH_BOXES_SUCCESS,
  FETCH_BOXES_FAILURE,
  REGISTER_BOX_REQUEST,
  REGISTER_BOX_SUCCESS,
  REGISTER_BOX_FAILURE,
} from '../constants/actionTypes';

import {
  DESTINATIONS
} from '../constants/fieldTypes';

const box = (state = {}, action) => {
  switch(action.type) {
    case FETCH_BOXES_REQUEST:
      return {
        ...state,
        fetchInProgress: true
      }
    case FETCH_BOXES_SUCCESS:
      return {
        ...state,
        // fetchInProgress: false,
        boxes: action.payload
      }
    case FETCH_BOXES_FAILURE:
      return {
        ...state,
        fetchInProgress: false,
        error: action.payload
      }
    case REGISTER_BOX_REQUEST:
      return {
        ...state,
        postInProgress: true
      };
    case REGISTER_BOX_SUCCESS:
      return {
        ...state,
        postInProgress: false
      };
    case REGISTER_BOX_FAILURE:
      return {
        ...state,
        error: action.payload,
        postInProgress: false
      };
    default:
      return state;
  }
}

export default box;
