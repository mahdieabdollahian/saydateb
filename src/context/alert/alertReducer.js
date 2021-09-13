const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_SUCCESS":
      return {
        ...state,
        open: true,
        message: action.payload,
        type: "success",
      };
    case "OPEN_ERROR":
      return {
        ...state,
        open: true,
        message: action.payload,
        type: "error",
      };
    case "OPEN_INFO":
      return {
        ...state,
        open: true,
        message: action.payload,
        type: "info",
      };
    case "CLOSE":
      return {
        ...state,
        open: false,
        message: "",
      };
    default:
      return state;
  }
};

export default reducer;
