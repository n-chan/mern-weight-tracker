import React, { useContext, useState } from "react";

import { GlobalContext } from "../context/GlobalState";

/**
 * Component for adding a new user.
 */
function AddUser() {
  const [name, setName] = useState("");
  const { createUser } = useContext(GlobalContext);

  /**
   * On form submit, creates new user by POST.
   * If user already exists, alerts the user.
   * @param {object} e event
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    createUser(name);
  };

  return (
    <div className="sign-in">
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Username:</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength="2"
            required
          />
        </div>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}

export default AddUser;
