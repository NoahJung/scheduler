import React from "react";

import "./InterviewerListItem.scss";
const classnames = require('classnames');

export default function InterviewerListItem(props) {

  const InterviewerListClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
 });

  return (
    <li className={InterviewerListClass} onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
  );
}