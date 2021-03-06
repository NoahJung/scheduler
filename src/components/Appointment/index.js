import React from 'react';

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SUBMIT = "ERROR_SUBMIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    if (!name || !interviewer) {     // prevent saving without name or interviewer setting
      transition(ERROR_SUBMIT)
      return 
    }

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
    
  }

  function onDelete(event) {
    transition(DELETING, true)

    props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
       />
      ) }

      {mode === EDIT && (
        <Form 
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
      />
      ) }

      {mode === SAVING && (
        <Status message="Saving" />
            ) }

      {mode === DELETING && (
        <Status message="Deleting" />
            ) }
      
      {mode === CONFIRM && (
        <Confirm 
          message="Delete the appointment?"
          onConfirm={onDelete}
          onCancel={() => transition(SHOW)}
      />
      ) }

      {mode === ERROR_SAVE && (
        <Error 
          message="Oops! There was an error while saving."
          onClose={back}
      />
      ) }

      {mode === ERROR_DELETE && (
        <Error 
          message="Oops! There was an error while deleting."
          onClose={back}
      />
      ) }

      {mode === ERROR_SUBMIT && (
        <Error 
          message="Please check Your name and interviewer setting."
          onClose={() => back()}
      />
      ) }

    </article>
  );
}