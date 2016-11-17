import { connect }  from 'react-redux';
import Details from '../../components/Details';
import { actions, selectors } from '../../domains';

const componentState = (state, ownProps) => ({
  selectedUser: selectors.selectedUser(state, ownProps),
});

const componentActions = (dispatch) => ({
  fetchSchedules: () => dispatch(actions.fetchSchedules()),
});

export default connect(componentState, componentActions)(Details);
