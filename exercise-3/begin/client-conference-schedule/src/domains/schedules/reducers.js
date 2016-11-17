import { handleActions } from 'redux-actions';
import actionTypes  from './actionTypes';

const initialState = {
  allSchedules: [],
  selectedScheduleName: null,
};

const reducers = handleActions({

  [actionTypes.LOAD_SCHEDULES]: (state = {}, action) => {
    return {
      ...state,
      allSchedules: action.payload,
      selectedScheduleName: action.payload[0].name,
    };
  },

  [actionTypes.SELECT_SCHEDULE]: (state = {}, action) => {
    return {
      ...state,
      selectedScheduleName: action.payload.name,
    };
  },

}, initialState);

export default reducers;
