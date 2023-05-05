import { Routes, Route } from "react-router-dom";
import userContext from "./userContext.js";
import { useContext } from "react";
import AddRentalForm from "./AddRentalForm";
import UserProfile from "./UserProfile.js";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Rental from "./Rental";
import Homepage from "./Homepage";
import RentalsList from "./RentalsList.js";

/**  */
function RoutesList({
  addRentalSpace,
  handleSignup,
  handleLogin,
  rentalSpaces,
}) {
  const { user } = useContext(userContext);
  return (
    <div className="RoutesList">
      <Routes>
        <Route path="/" element={<Homepage user={user} />} />
        <Route
          path="/signup"
          element={<SignupForm handleSignup={handleSignup} />}
        />
        <Route
          path="/login"
          element={<LoginForm handleLogin={handleLogin} />}
        />
        <Route path="/rentals" element={<RentalsList />} />
        <Route
          path="/rentals/:username/add"
          element={
            <AddRentalForm addRentalSpace={addRentalSpace} user={user} />
          }
        />
        <Route
          path="/rentals/:username"
          element={<UserProfile user={user} rentalSpaces={rentalSpaces} />}
        />
        {/* <Route
          path="/rentals/:username/:rental-id"
          element={<Rental user={user} rentalSpaces={rentalSpaces} />}
        /> */}
      </Routes>
    </div>
  );
}

export default RoutesList;
