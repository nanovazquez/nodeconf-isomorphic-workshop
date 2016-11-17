import { connect }  from 'react-redux';
import Home from '../../components/Home';
import { actions, selectors } from '../../domains';

const componentState = (state) => ({
  allSchedules: selectors.allSchedules(state),
  selectedSchedule: selectors.selectedSchedule(state),
});

const componentActions = (dispatch) => ({
  selectSchedule: (payload) => dispatch(actions.selectSchedule(payload)),
  fetchSchedules: () => dispatch(actions.fetchSchedules()),
});

export default connect(componentState, componentActions)(Home);
