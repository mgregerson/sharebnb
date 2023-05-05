import { NavLink } from "react-router-dom";
import "./Nav.css";
import userContext from "./userContext.js";
import { useContext } from "react";

function Nav({ logOut }) {
  const { user } = useContext(userContext);

  console.log(user, "THE USER IN NAV");
  return (
    <nav className="Navigation navbar navbar-expand-md navbar-expand-lg">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" end>
          ShareBnB
        </NavLink>

        {user?.username ? (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-4">
              <NavLink className="nav-link" to="/rentals" end>
                Check Out All Rentals!
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink
                className="nav-link"
                to={`/rentals/${user.username}/add`}
                end
              >
                Rent Out Your Space
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink
                className="nav-link"
                to={`/rentals/${user.username}`}
                end
              >
                Your Profile
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink className="nav-link" to="/" onClick={logOut} end>
                Log out {user?.username}
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-4">
              <NavLink className="nav-link" to="/login" end>
                Login
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink className="nav-link" to="/signup" end>
                Sign Up
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Nav;
