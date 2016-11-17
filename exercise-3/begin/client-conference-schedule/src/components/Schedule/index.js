import React from 'react';
import { browserHistory } from 'react-router'
import './styles.css';

const BreakRow = ({
  time,
  speaker,
}) => (
  <tr className="break">
    <td className="time">{time}</td>
    <td colSpan="3">{speaker}</td>
  </tr>
);

const TalkRow = ({
  time,
  speaker,
  twitter,
  title,
}) => (
  <tr className="talk" onClick={() => browserHistory.push(`/users/${twitter}`)}>
    <td className="time">{time}</td>
    <td className="speaker">{speaker}</td>
    <td className="twitter">{twitter}</td>
    <td className="title">{title}</td>
  </tr>
);

const Schedule = ({
  items,
  selected,
}) => {
  return (
    <div className={selected ? 'schedule selected' : 'schedule'}>
      <table>
        <thead>
          <tr>
            <th className="time">Time</th>
            <th className="speaker" colSpan="2">Speaker</th>
            <th className="title">Title</th>
          </tr>
        </thead>
        <tbody>
        {
          items.map((item, index) => item.break ?
            (<BreakRow key={index} {...item} />)
            : (<TalkRow key={index} {...item} />)
          )
        }
        </tbody>
      </table>
    </div>
  )
};

export default Schedule;


