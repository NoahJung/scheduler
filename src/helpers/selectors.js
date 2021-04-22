export function getAppointmentsForDay(state, day) {
  const result = [];
  const filteredDay = state.days.filter(item => item.name === day);
  const getDayObj = filteredDay[0];

  if (getDayObj === undefined) {
    return result;
  }

  const getAppointments = getDayObj.appointments;
  
  for (const time of getAppointments) {
    const obj = state.appointments[time];
    result.push(obj);
  }
  
  return result;
  
}

export function getInterview(state, interview) {
  const result ={};

  if (interview === null) {
    return null;
  }

  const interviewerID = interview.interviewer // get interviewer's id

  result["student"] = interview.student;
  result["interviewer"] = state.interviewers[interviewerID];

  return result ;
}