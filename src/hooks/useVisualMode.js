import { useState } from "react"; 

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if(replace) {
      history.pop();
    }

    setMode(mode);
    history.push(mode);
  }

  function back() {
    if (history.length > 1) {
      history.pop();
    }
    const backMode = history[history.length - 1];
    setMode(backMode);

  }

  return { mode, transition, back };
}