import * as React from "react";
import { initialState } from "../initials/initials";
import { reducer } from "../reducers/reducers";
import { AppState, Dispatch, AppProviderProps } from "../types/types";

const AppStateContext = React.createContext<AppState | undefined>(undefined);
const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const AppProvider: React.SFC<AppProviderProps> = ({ children }: AppProviderProps) => {
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
