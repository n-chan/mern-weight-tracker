import React, { createContext, useReducer } from "react";
import { reducer } from "../reducers/reducer";
import { useHistory } from "react-router-dom";

const initialState = {
  username: "",
  entries: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  //Actions...
  const createUser = async (username) => {
    try {
      const body = { username };
      const response = await fetch("http://localhost:5000/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status === 400) {
        alert("User already exists!");
      } else {
        dispatch({
          type: "LOGIN",
          payload: username,
        });
        history.push("/entries");
      }
    } catch (err) {
      console.error("Error: " + err);
    }
  };

  const login = async (username) => {
    try {
      const response = await fetch("http://localhost:5000/users/" + username);
      if (response.status === 400) {
        alert("User does not exist!");
      } else {
        dispatch({
          type: "LOGIN",
          payload: username,
        });
        history.push("/entries");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getEntries = async (username) => {
    try {
      const response = await fetch("http://localhost:5000/entries/" + username);
      const jsonData = await response.json();
      let sortedDate = jsonData.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      dispatch({
        type: "GET_ENTRIES",
        payload: sortedDate,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const createEntry = async (newEntry) => {
    try {
      const result = await fetch("http://localhost:5000/entries/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });
      const entry = await result.json();

      dispatch({
        type: "ADD_ENTRY",
        payload: entry,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateEntry = async (id, date, weight) => {
    try {
      const body = { date, weight };
      await fetch("http://localhost:5000/entries/update/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      history.push("/entries");
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await fetch(`http://localhost:5000/entries/${id}`, {
        method: "DELETE",
      });
      dispatch({
        type: "DELETE_ENTRY",
        payload: id,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        username: state.username,
        entries: state.entries,
        createUser,
        login,
        getEntries,
        createEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
