import React from "react";
import { useAppState, useAppDispatch } from "../context/context";
import { Todo } from "../types/types";

const TodoList = () => {
  const AppState = useAppState();
  const dispatch = useAppDispatch();

  const makeDoneTodo = (item: Todo) => {
    dispatch({ type: "MAKEDONE_TODO", payload: item });
  };

  const deleteTodo = (item: Todo) => {
    dispatch({ type: "DELETE_TODO", payload: item });
  };

  return (
    <>
      <p>Tasks to do:</p>
      <ul>
        {AppState.todoList
          .filter(x => !x.done)
          .sort((a, b) => b.id - a.id)
          .map(item => (
            <li key={item.id}>
              <span style={item.important ? { color: "red" } : undefined}>
                {item.discription}, deadline: {item.deadline}
              </span>
              <button onClick={() => makeDoneTodo(item)}>Zrobione!</button>
              <button onClick={() => deleteTodo(item)}>Usuń</button>
            </li>
          ))}
      </ul>
      <p>Tasks completed:</p>
      {AppState.todoList.filter(x => x.done).length > 5 && (
        <em>Only the last 5 tasks are displayed</em>
      )}
      <ul>
        {AppState.todoList
          .filter(x => x.done)
          .sort(
            (a, b) =>
              new Date(b.doneDate).getTime() - new Date(a.doneDate).getTime()
          )
          .slice(0, 5)
          .map(item => (
            <li key={item.id}>
              <span>
                {item.discription}, done: {item.doneDate}
              </span>
              <button onClick={() => deleteTodo(item)}>Usuń</button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default TodoList;
