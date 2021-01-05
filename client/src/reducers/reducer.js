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
      entries: action.payload.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ),
    };
  }

  if (action.type === "ADD_ENTRY") {
    return {
      ...state,
      entries: [action.payload, ...state.entries].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ),
    };
  }

  if (action.type === "DELETE_ENTRY") {
    return {
      ...state,
      entries: state.entries.filter((entry) => entry._id !== action.payload),
    };
  }
  throw new Error("No matching action type");
};
