import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {

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

  return { state, setDay, bookInterview, cancelInterview }
}