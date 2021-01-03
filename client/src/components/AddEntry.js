import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

/**
 * Component for adding a new entry.
 */
function AddEntry() {
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const { username, createEntry } = useContext(GlobalContext);

  /**
   * Clears input fields.
   */
  const clearFields = () => {
    setDate("");
    setWeight("");
  };

  /**
   * On form submit, creates new entry by POST.
   * @param {object} e event
   */
  const onSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      username: username,
      date,
      weight,
    };
    createEntry(newEntry);
    clearFields();
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <h2>{username}</h2>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="weight">Weight (lbs):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight..."
          required
        />
      </div>
      <button className="btn">Add New Entry</button>
    </form>
  );
}

export default AddEntry;
