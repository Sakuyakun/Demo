import { ActionTypes } from "../actions/about";
import clone from 'clone';

const initialState = {
  day: "2017/01/01"
};

const actionType = {
  [ActionTypes.SET_DAY]: (state, action) => {
    return {
      ...state,
      day: action.day
    }
  }
};

const IndexReducers = (state = initialState, action) => {
  return action.type in actionType
    ? actionType[action.type](clone(state), action)
    : state;
};

export default IndexReducers;
