import React from "react";
import { AppState, useAppState, useAppDispatch } from "./context/context";

import Form from "./components/Form";
import TodoList from "./components/TodoList";

import "./App.css";
import useStateInLocalStorage from "./hooks/useStateInLocalStorage";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useStateInLocalStorage({
    state: useAppState(),
    name: "data",
    initializeFn: (state: AppState) =>
      dispatch({ type: "RESET", payload: state })
  });
  return (
    <div className="App">
      <Form />
      <br />
      <TodoList />
    </div>
  );
};

export default App;
