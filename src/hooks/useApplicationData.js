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

  const findDayObj = (id) => {
    let theDay = {}
    const days = [...state.days];
    for (const day of days) {
      for (const appointment of day.appointments) {
        if (appointment === id) {
          theDay = day;
        }
      }
    }
    return theDay;
  }

  
  const bookInterview = (id, interview) => {

    const interviewStatus = {...state.appointments}[id].interview

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayObj = findDayObj(id);
    
    const newSpots = interviewStatus === null ? dayObj.spots - 1 : dayObj.spots   

    const day = {
      ...state.days[dayObj.id - 1],
      spots: newSpots 
    };

    const days = [...state.days].map(d => d.name === dayObj.name ? day : d);


    return axios.put(`/api/appointments/${id}`, { interview } )
    .then((response) => {setState({ ...state, appointments, days});
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

    const dayObj = findDayObj(id);
    const newSpots = dayObj.spots + 1;   
    
    const day = {
      ...state.days[dayObj.id - 1],
      spots: newSpots 
    };

    const days = [...state.days].map(d => d.name === dayObj.name ? day : d);

    return axios.delete(`/api/appointments/${id}`, {} )
    .then((response) => {setState({ ...state, appointments, days });
    })
  }

  return { state, setDay, bookInterview, cancelInterview }
}