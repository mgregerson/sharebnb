import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";
import { FormEvent } from "react";
import { ChangeEvent } from "react";

/** Signup Form
 *
 * Props:
 *       - handleSignup: Func def passed from app.js
 *
 * State:
 *       - FormData: {username, password, email, image_url (optional), bio, location}
 *       - ApiError: {isError, errorMessage}
 *
 * App -> SignupForm
 *
 */

interface SignupFormProps {
  handleSignup: Function;
}

interface FormData {
  username: string;
  password: string;
  email: string;
  image_url: string;
  bio: string;
  location: string;
}

interface ApiError {
  isError: boolean;
  errorMessage: string;
}

const initialFormData: FormData = {
  username: "",
  password: "",
  email: "",
  image_url: "",
  bio: "",
  location: "",
};

const initialApiError: ApiError = {
  isError: false,
  errorMessage: "",
};

function SignupForm({ handleSignup }: SignupFormProps): JSX.Element {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [apiError, setApiError] = useState<ApiError>(initialApiError);

  const navigate = useNavigate();

  /** Handles keystrokes in searchbar and updates formData */
  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    const fieldName = (evt.target as HTMLInputElement).name;
    const value = (evt.target as HTMLInputElement).value;

    setFormData((currData) => ({
      ...currData,
      [fieldName]: value,
    }));
  }

  /** Navigates to signup page if successfully logged in, else shows error msg*/
  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    try {
      await handleSignup(formData);
      navigate(`/`);
    } catch (err) {
      console.log(err);
      setApiError({
        isError: true,
        errorMessage: "This username is already taken.",
      });
    }
  }

  return (
    <div className="SignupForm">
      <div className="container col-md-12 col-lg-12">
        <h1 className="SignupForm-Message text-center text-light">Sign Up</h1>
        <div className="card">
          <div className="card-body">
            <form className="SignupForm-Form" onSubmit={handleSubmit}>
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
                minLength={5}
                required
              />
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.email}
                placeholder="Email"
                aria-label="email"
                required
              />
              <label htmlFor="image_url">Image URL</label>
              <input
                id="image_url"
                name="image_url"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.image_url}
                placeholder="image_url"
                aria-label="image_url"
              />
              <label htmlFor="bio">Describe Yourself!</label>
              <input
                id="bio"
                name="bio"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.bio}
                placeholder="bio"
                aria-label="bio"
                required
              />
              <label htmlFor="location">
                What city and state do you live in?
              </label>
              <input
                id="location"
                name="location"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.location}
                placeholder="location"
                aria-label="location"
                required
              />
              <div className="SignupForm-button d-grid">
                <button className="btn search-btn btn-lg btn-primary m-2">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        {apiError.isError && (
          <h3 className="SignupForm-Error">{apiError.errorMessage}</h3>
        )}
      </div>
    </div>
  );
}

export default SignupForm;
