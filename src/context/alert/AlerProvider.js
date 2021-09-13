import React, { createContext, useReducer } from "react";
import reducer from "./alertReducer";

const initialState = {
  open: false,
  message: "",
  type: "success",
};

const store = createContext(initialState);
const { Provider } = store;

const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, AlertProvider };
