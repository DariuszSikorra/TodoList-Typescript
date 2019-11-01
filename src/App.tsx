import React, { useEffect, useRef } from 'react';
import { useAppState, useAppDispatch } from "./context/context";

import Form from "./components/Form"
import TodoList from "./components/TodoList"

import "./App.css";

const App: React.FC = () => {
  const AppState = useAppState();
  const dispatch = useAppDispatch();

  const didRun = useRef(false);

  useEffect(() => {
    if (!didRun.current) {
      const raw = localStorage.getItem("data");
      if (raw) {
        dispatch({ type: "RESET", payload: JSON.parse(raw) });
        didRun.current = true;
      }
    }
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(AppState));
  }, [AppState]);

  return (
      <div className="App">
        <Form />
        <br />
        <TodoList />
      </div>
  );
};


export default App;
