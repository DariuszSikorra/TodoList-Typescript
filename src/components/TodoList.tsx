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
      <p>Lista zadań do zrobienia:</p>
      <ul>
        {AppState.todoList
          .filter((x: Todo) => !x.done)
          .map((item: Todo) => (
            <li key={item.id}>
              <span style={item.important ? { color: "red" } : undefined}>
                {item.discription}{" "}
              </span>
              <button onClick={() => makeDoneTodo(item)}>Zrobione!</button>
              <button onClick={() => deleteTodo(item)}>Usuń</button>
            </li>
          ))}
      </ul>
      <p>Zadania zrobione:</p>
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
    </>
  );
};

export default TodoList;