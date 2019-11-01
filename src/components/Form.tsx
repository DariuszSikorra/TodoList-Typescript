import * as React from "react";
import {useAppState, useAppDispatch} from "../context/context"

const Form = () => {
  const AppState = useAppState();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TODO",
      payload: AppState.todoForm
    });
  };

  return (
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
  );
};

export default Form
