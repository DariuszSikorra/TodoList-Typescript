import { AppState, Action } from "../types/types";
import { today, initialTodoForm } from "../initials/initials";

export const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "RESET":
      return action.payload
    case "ADD_DISCRIPTION":
      return {
        ...state,
        todoForm: { ...state.todoForm, discription: action.payload }
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
}
