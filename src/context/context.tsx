import * as React from "react";
import { initialState } from "../initials/initials";
import { reducer, Todo, Action } from "../reducers/reducers";
import { Dispatch } from "react";

export type AppState = {
  todoForm: Todo;
  todoList: Array<Todo>;
};

const AppStateContext = React.createContext<AppState | undefined>(undefined);
const AppDispatchContext = React.createContext<Dispatch<Action> | undefined>(
  undefined
);

export type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider: React.SFC<AppProviderProps> = ({
  children
}: AppProviderProps) => {
  const [AppState, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AppStateContext.Provider value={AppState}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within AppProvider");
  }
  return context;
};

const useAppDispatch = () => {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useDispatchState must be used within AppProvider");
  }
  return context;
};

export { AppProvider, useAppState, useAppDispatch };
