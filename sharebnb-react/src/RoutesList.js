import { Routes, Route } from "react-router-dom";
import AddRentalForm from "./AddRentalForm";
import UserProfile from "./UserProfile.js";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Rental from './Rental';

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
          element={<AddRentalForm addRentalSpace={addRentalSpace} user={user} />}
        />
        <Route
          path="/rentals/:username"
          element={<UserProfile user={user} rentalSpaces={rentalSpaces} />}
        />
        <Route
          path="/rentals/:username/:rental-id"
          element={<Rental user={user} rentalSpaces={rentalSpaces} />}
        />
      </Routes>
    </div>
  );
}

export default RoutesList;
