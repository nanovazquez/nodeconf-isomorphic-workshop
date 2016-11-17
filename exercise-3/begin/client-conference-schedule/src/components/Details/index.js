import React, { Component } from 'react';
import './styles.css';

const Details = ({
  description,
  title,
  speaker,
  time,
  twitter,
}) => {

  if (!title) {
    return <span>Loading..</span>;
  }

  return (
    <div className="details">
      <div className="profile">
        <div className="pic">
          <div className="profile-img"></div>
        </div>
        <div className="profile-text">
          <h2>{speaker}</h2>
          <a href={`https://twitter.com/${twitter}`} target="_blank">{twitter}</a>
        </div>
      </div>
      <div className="info-talk">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  )
};

class DetailsWrapper extends Component {
  componentDidMount() {
    this.props.fetchSchedules();
  }

  render() {
    return <Details {...this.props.selectedUser} />;
  }
};

export default DetailsWrapper;


