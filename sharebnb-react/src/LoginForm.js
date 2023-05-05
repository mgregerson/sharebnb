import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/** Signup Form
 *
 * Props:
 *       - handleLogin: Func def passed from app.js
 *
 * State:
 *       - FormData: {username, password}
 *       - ApiError: {isError, errorMessage}
 *
 * App -> SignupForm
 *
 */
function LoginForm({ handleLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [apiError, setApiError] = useState({
    isError: false,
    errorMessage: "",
  });

  const navigate = useNavigate();

  /** Handles keystrokes in searchbar and updates formData */
  function handleChange(evt) {
    const fieldName = evt.target.name;
    const value = evt.target.value;

    setFormData((currData) => {
      currData[fieldName] = value;
      return { ...currData };
    });
  }

  /** Navigates to signup page if successfully logged in, else shows error msg*/
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await handleLogin(formData);
      navigate(`/rentals/${formData.username}`);
    } catch (err) {
      console.log(err);
      setApiError({
        isError: true,
        errorMessage: err,
      });
    }
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h1 className="SignupForm-Message">Sign Up</h1>
        <div className="card">
          <div className="card-body">
            <form className="LoginForm-Form" onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.username}
                aria-label="username"
                placeholder="username"
                required
              />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.password}
                aria-label="password"
                type="password"
                placeholder="password"
                minLength="5"
                required
              />
              <div className="LoginForm-button d-grid">
                <button className="btn search-btn btn-lg btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        {apiError.isError && <p>{apiError.errorMessage}</p>}
      </div>
    </div>
  );
}

export default LoginForm;
