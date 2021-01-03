import React from "react";
import { Link } from "react-router-dom";

/**
 * Component for signing in.
 * Users can pick login with existing user or sign up with new user.
 */
function SignIn() {
  return (
    <div>
      <Link to="/existinguser" className="sign-in-btn">
        Existing User
      </Link>
      <Link to="/newuser" className="sign-in-btn">
        New User
      </Link>
    </div>
  );
}

export default SignIn;
