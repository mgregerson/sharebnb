import "./Homepage.css";
import React from "react";

/** Homepage
 *
 * Props: user {username, firstName, lastName, email, applications: []}
 * State: None
 *
 * App -> Homepage
 */

interface user {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  applications: [];
}

function Homepage({ user }: { user: user }): JSX.Element {
  return (
    <div className="Homepage">
      <div className="container text-center my-auto">
        <h1 className="mb-4 fw-bold">ShareBnB</h1>
        {user?.username ? (
          <div className="Homepage-login">
            <h1>Welcome, {user.username}!</h1>
            <br></br>
            <br></br>
            <br></br>
            <h3>Got a beautiful outdoor space? Let's make you some $$$!</h3>
            <br></br>
            <h3>If not, take a look at some others and get outside!</h3>
          </div>
        ) : (
          <p className="lead">Let's Get You Outside!</p>
        )}
      </div>
    </div>
  );
}

export default Homepage;
