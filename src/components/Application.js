import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";

export default function Application(props) {

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [], 
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
        const setDays = all[0].data;
        const setAppointments = all[1].data
        const setInterviewers = all[2].data
        setState(prev => ({ ...prev, days: setDays, appointments: setAppointments, interviewers: setInterviewers}))
      })
    }, []);


  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
 
    return axios.put(`/api/appointments/${id}`, { interview } )
    .then((response) => {setState({ ...state, appointments });
    })

    }
  
    const cancelInterview = (id) => {
      const appointment = { 
        ...state.appointments[id],
        interview: null
      }

      const appointments = {
        ...state.appointments,
        [id]: appointment
      }

      return axios.delete(`/api/appointments/${id}`, {} )
      .then((response) => {setState({ ...state, appointments });
      })
    }

  const displaySchedule = dailyAppointments.map(appointment => {
    const dailyinterview = getInterview(state, appointment.interview);
    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={dailyinterview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
    );
  })
  

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {displaySchedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
