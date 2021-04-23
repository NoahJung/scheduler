export function getAppointmentsForDay(state, day) {
  const result = [];
  const filteredDay = state.days.filter(item => item.name === day);
  const getDayObj = filteredDay[0];

  if (getDayObj === undefined) {
    return result;
  }

  const getAppointments = getDayObj.appointments;
  
  for (const appointment of getAppointments) {
    const obj = state.appointments[appointment];
    result.push(obj);
  }

  return result;
  
}

export function getInterview(state, interview) {
  const result = {};

  if (interview === null) {
    return null;
  }

  const interviewerID = interview.interviewer // get interviewer's id

  result["student"] = interview.student;
  result["interviewer"] = state.interviewers[interviewerID];

  return result ;
}

export function getInterviewersForDay(state, day) {
  const result = [];
  const filteredDay = state.days.filter(item => item.name === day);
  const getDayObj = filteredDay[0];

  if (getDayObj === undefined) {
    return result;
  }

  const getInterviewers = getDayObj.interviewers;
  
  for (const interviewer of getInterviewers) {

    const obj = state.interviewers[interviewer]
    if (obj !== null) {
      result.push(obj);
    }
  }
  
  return result;
  
}