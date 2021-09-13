import axios from "axios";
import {
  saveData,
  cleareStorage,
  getSavedData,
} from "../services/storeService";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      saveData("token", action.payload.token);
      axios.defaults.headers.common["x-auth-token"] = getSavedData("token");

      return {
        ...state,
        isAuthenticated: true,
        data: action.payload.data,
        token: action.payload.token,
      };
    case "LOGOUT":
      cleareStorage();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case "USERDATA":
      return {
        ...state,
        isAuthenticated: true,
        data: action.payload.data,
      };
    case "UUID":
      return {
        ...state,
        isAuthenticated: false,
        data: action.payload.data,
      };

    default:
      return state;
  }
};

export default reducer;
