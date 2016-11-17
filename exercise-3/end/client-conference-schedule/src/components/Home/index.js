import React, { Component } from 'react';
import Schedule from '../Schedule';
import Tab from '../Tab';
import Chart from '../Chart';
import './styles.css';

const Home = ({
  allSchedules,
  selectedSchedule,
  selectSchedule,
  fetchSchedules,
}) => {
  return (
    <div className="home">
      <div className="chart">
        <h1 className="header">Visitors</h1>
        <Chart />
      </div>
      <h1 className="header">Schedule</h1>
      <div className="schedules">
        <div className="tabs">
          {
            (allSchedules || []).map((schedule, index) => (
              <Tab
                key={index}
                title={schedule.name}
                selected={selectedSchedule.name === schedule.name}
                onSelect={() => selectSchedule(schedule)}
              />
            ))
          }
        </div>
        { selectedSchedule ? <Schedule items={selectedSchedule.items} /> : <span>Loading..</span> }
      </div>
    </div>
  );
};

class HomeWrapper extends Component {
  componentDidMount() {
    this.props.fetchSchedules();
  }

  render() {
    return <Home {...this.props} />;
  }
};

export default HomeWrapper;


