import {
  actions as schedulesActions,
  selectors as schedulesSelectors,
  reducers  as schedulesReducers,
} from './schedules';

const actions = {
  ...schedulesActions,
};

const selectors = {
  ...schedulesSelectors,
};

const reducers = {
  schedules: schedulesReducers,
};

export {
  actions,
  selectors,
  reducers,
};
