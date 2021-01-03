import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

/**
 * Component for existing user log-in.
 */
function Login() {
  const [username, setUsername] = useState("");
  const { login } = useContext(GlobalContext);

  /**
   * On form submit, check if inputted user exists.
   * @param {object} e event
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    await login(username);
    //history.push("/entries");
  };

  return (
    <div className="sign-in">
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
        </div>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}

export default Login;
