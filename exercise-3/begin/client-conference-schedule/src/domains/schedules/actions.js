import { createAction } from 'redux-actions';
import actionTypes from './actionTypes';

const loadSchedules = createAction(actionTypes.LOAD_SCHEDULES);
const selectSchedule = createAction(actionTypes.SELECT_SCHEDULE);

const fetchSchedules = () => {
  return (dispatch, getState) => {
    const baseUri = 'https://wt-marianodvazquez-gmail-com-0.run.webtask.io/banode-conf?webtask_no_cache=1';
    return fetch(baseUri)
      .then(response => {
        if (response.ok) {
          response.json().then(result => dispatch(loadSchedules(result)));
        } else {
          console.error('Error!', response);
        }
      })
      .catch(console.error)
    ;
  };
};

const actions = {
  fetchSchedules,
  loadSchedules,
  selectSchedule,
};

export default actions;
