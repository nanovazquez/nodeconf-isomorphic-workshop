import { createSelector } from 'reselect';

const allSchedules = (state) => state.schedules.allSchedules || [];
const selectedScheduleName = (state) => state.schedules.selectedScheduleName;
const selectedUserTwitter = (state, ownProps) => ownProps.params.twitter;

const selectedSchedule = createSelector(
  allSchedules,
  selectedScheduleName,
  (items, selectedItemName) => items.find(item => item.name === selectedItemName),
);

const selectedUser = createSelector(
  allSchedules,
  selectedUserTwitter,
  (schedules, twitter) => {
    // Get all talks
    const talks = [].concat.apply([], schedules.map(item => item.items));

    // Find talk by twitter account
    return talks.find(item => item.twitter === twitter);
  }
);

export default {
  allSchedules,
  selectedSchedule,
  selectedUser,
};
