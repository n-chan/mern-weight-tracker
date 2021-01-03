export const reducer = (state, action) => {
  if (action.type === "LOGIN") {
    return {
      ...state,
      username: action.payload,
    };
  }

  if (action.type === "GET_ENTRIES") {
    return {
      ...state,
      entries: action.payload,
    };
  }

  if (action.type === "ADD_ENTRY") {
    return {
      ...state,
      entries: [action.payload, ...state.entries],
    };
  }

  if (action.type === "DELETE_ENTRY") {
    return {
      ...state,
      entries: state.entries.filter((entry) => entry.id !== action.payload),
    };
  }
  throw new Error("No matching action type");
};
