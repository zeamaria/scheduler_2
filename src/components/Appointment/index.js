import React, { useState } from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import "components/Appointment/styles.scss";
import {useVisualMode} from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const [message, setMessage] = useState("");

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    setMessage("Saving...");
    transition(STATUS);

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode === CREATE && (
      <Form 
        name={props.name}
        interviewers={props.interviewers}
        value={props.value}
        onSave={save}
        onCancel={() => back()}
      />
    )}
    {mode === STATUS && (
      <Status
        message={message}
      />
    )
    }
    </article>
    )
};
