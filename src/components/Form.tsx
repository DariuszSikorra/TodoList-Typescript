import * as React from "react";
import { useAppState, useAppDispatch } from "../context/context";

const Form: React.FC = () => {
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
      <h1>Todo-List</h1>
      <div>
        <span>Make new todo:</span>
        <br />
        <span>Fill out the task description: </span>
        <input
          type="text"
          placeholder="description..."
          value={AppState.todoForm.description}
          required
          onChange={e =>
            dispatch({
              type: "ADD_DESCRIPTION",
              payload: e.currentTarget.value
            })
          }
        />
      </div>
      <div>
        <span>Deadline date: </span>
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
        <span>Priority: </span>
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
