import React, { useReducer } from "react";
// import { useEffect, useRef} from 'react';
import { initialState } from "./initials/initials";
import { reducer } from "./reducers/reducers";
import { Todo } from "./types/types";
import "./App.css";

const App: React.FC = () => {
  const [AppState, dispatch] = useReducer(reducer, initialState);

  // const didRun = useRef(false);

  // useEffect(() => {
  //   if (!didRun.current) {
  //     const raw = localStorage.getItem("data");
  //     if (raw) {
  //       dispatch({ type: "RESET", payload: JSON.parse(raw) });
  //       didRun.current = true;
  //     }
  //   }
  // });

  // useEffect(() => {
  //   localStorage.setItem("data", JSON.stringify(AppState));
  // }, [AppState]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TODO",
      payload: AppState.todoForm
    });
  };

  const makeDoneTodo = (item: Todo) => {
    dispatch({ type: "MAKEDONE_TODO", payload: item });
  };

  const deleteTodo = (item: Todo) => {
    dispatch({ type: "DELETE_TODO", payload: item });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Todo-Lista</h1>
        <div>
          <span>Dodaj zadanie</span>
          <br />
          <span>Podaj opis zadania: </span>
          <input
            type="text"
            placeholder="Discription..."
            value={AppState.todoForm.discription}
            required
            onChange={e =>
              dispatch({
                type: "ADD_DISCRIPTION",
                payload: e.currentTarget.value
              })
            }
          />
        </div>
        <div>
          <span>Podaj deadline: </span>
          <input
            type="date"
            value={AppState.todoForm.deadline}
            onChange={e =>
              dispatch({
                type: "ADD_DEADLINE",
                payload: e.currentTarget.value
              })
            }
          />
        </div>
        <div>
          <span>Priorytet: </span>
          <input
            type="checkbox"
            checked={AppState.todoForm.important}
            onChange={e =>
              dispatch({
                type: "ADD_IMPORTANT",
                payload: e.currentTarget.checked
              })
            }
          />
        </div>
        <button type="submit">Dodaj</button>
      </form>
      <br />
      <p>Lista zadań do zrobienia:</p>
      <ul>
        {AppState.todoList
          .filter((x: Todo) => !x.done)
          .map((item: Todo) => (
            <li key={item.id}>
              <span>{item.discription}</span>
              <button onClick={() => makeDoneTodo(item)}>Zrobione!</button>
              <button onClick={() => deleteTodo(item)}>Usuń</button>
            </li>
          ))}
      </ul>
      <p>
        <span>Zadania zrobione:</span>
        <ul>
          {AppState.todoList
            .filter((x: Todo) => x.done)
            .map((item: Todo) => (
              <li key={item.id}>
                <span>
                  {item.discription}, wykonano: {item.doneDate}
                </span>
                <button onClick={() => deleteTodo(item)}>Usuń</button>
              </li>
            ))}
        </ul>
      </p>
    </div>
  );
};

export default App;
