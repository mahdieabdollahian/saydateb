import React, { createContext, useReducer } from "react";
import reducer from "./appStore";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const loginstore = createContext(initialState);
const { Provider } = loginstore;

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { loginstore, AuthProvider };
