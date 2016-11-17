import React from 'react';
import './styles.css';


const Tab = ({
  title,
  selected,
  onSelect,
}) => {
  return (
    <div className={selected ? 'tab active' : 'tab'} onClick={onSelect}>
      <div className="tab-header">
        <span>{title}</span>
      </div>
       <div className="pointer"></div>
    </div>
  )
};

export default Tab;


