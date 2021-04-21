import React from "react";

import "components/DayListItem.scss";
const classnames = require('classnames');

export default function DayListItem(props) {

  const dayListClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
 });

  const formatSpots = () => {
    return props.spots === 0 ? "no spots remaining"
        : (props.spots === 1 ? "1 spot remaining"
        : `${props.spots} spots remaining`)
  }

  return (
    <li className={dayListClass} onClick={() => props.setDay(props.name)}>
      <h2 className={dayListClass}>{props.name}</h2>
      <h3 className={dayListClass}>{formatSpots()}</h3>
    </li>
  );
}