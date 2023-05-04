import { Routes, Route } from "react-router-dom";
import AddRentalForm from "./AddRentalForm";
import UserProfile from "./UserProfile.js";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

/**  */
function RoutesList({
  addRentalSpace,
  user,
  handleSignup,
  handleLogin,
  rentalSpaces,
}) {
  return (
    <div className="RoutesList">
      <Routes>
        <Route
          path="/signup"
          element={<SignupForm handleSignup={handleSignup} />}
        />
        <Route
          path="/login"
          element={<LoginForm handleLogin={handleLogin} />}
        />
        <Route
          path="/rentals/:username/add"
          element={<AddRentalForm addRentalSpace={addRentalSpace} />}
        />
        <Route
          path="/rentals/:username"
          element={<UserProfile user={user} rentalSpaces={rentalSpaces} />}
        />
      </Routes>
    </div>
  );
}

export default RoutesList;
