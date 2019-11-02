import { useRef, useEffect } from "react";

type useStateInLocalStorageType = <T>(params: {
  state: T;
  name: string;
  initializeFn: (state: T) => void;
}) => void;

const useStateInLocalStorage: useStateInLocalStorageType = ({
  state,
  name,
  initializeFn
}) => {
  const didRun = useRef(false);

  // if app initializes, try to get data from local storage
  useEffect(() => {
    if (!didRun.current) {
      const raw = localStorage.getItem(name);
      if (raw) {
        const loadedState = JSON.parse(raw);
        initializeFn(loadedState);
        didRun.current = true;
      }
    }
  });

  // Save state to local storage after each change
  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(state));
  }, [state, name]);
};

export default useStateInLocalStorage;
