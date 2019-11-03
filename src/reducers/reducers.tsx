import { today, initialTodoForm } from "../initials/initials";
import { AppState } from "../context/context";

export type Todo = {
  id: number;
  description: string;
  deadline: string;
  important: boolean;
  done: boolean;
  doneDate: string;
};

export type Action =
  | { type: "RESET"; payload: AppState }
  | { type: "ADD_DESCRIPTION"; payload: string }
  | { type: "ADD_IMPORTANT"; payload: boolean }
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "ADD_DEADLINE"; payload: string }
  | { type: "DELETE_TODO"; payload: Todo }
  | { type: "MAKEDONE_TODO"; payload: Todo };

export const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "RESET":
      return action.payload;
    case "ADD_DESCRIPTION":
      return {
        ...state,
        todoForm: { ...state.todoForm, description: action.payload }
      };
    case "ADD_DEADLINE":
      if (action.payload >= today) {
        return {
          ...state,
          todoForm: { ...state.todoForm, deadline: action.payload }
        };
      } else {
        return state;
      }
    case "ADD_IMPORTANT":
      return {
        ...state,
        todoForm: { ...state.todoForm, important: action.payload }
      };
    case "ADD_TODO":
      return {
        ...state,
        todoForm: { ...initialTodoForm, id: state.todoForm.id + 1 },
        todoList: [...state.todoList, action.payload]
      };
    case "DELETE_TODO":
      return {
        ...state,
        todoList: state.todoList.filter(x => x.id !== action.payload.id)
      };
    case "MAKEDONE_TODO":
      return {
        ...state,
        todoList: state.todoList.map(x =>
          x.id === action.payload.id
            ? {
                ...x,
                done: true,
                doneDate: today
              }
            : {
                ...x
              }
        )
      };
    default:
      return state;
  }
};
