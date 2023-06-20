import { Routes, Route } from "react-router-dom";
import userContext from "./userContext.js";
import { useContext } from "react";
import AddRentalForm from "./AddRentalForm";
import UserProfile from "./UserProfile.tsx";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Rental from "./Rental.tsx";
import Homepage from "./Homepage";
import RentalsList from "./RentalsList.js";
import NotFound from "./NotFound.js";

/**  */
function RoutesList({
  addRentalSpace,
  handleSignup,
  handleLogin,
  rentalSpaces,
}) {
  const { user } = useContext(userContext);

  if (user) {
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
            element={<UserProfile rentalSpaces={rentalSpaces} />}
          />
          {/* <Route
            path="/rentals/:rentalId"
            element={<Rental user={user} rentalSpaces={rentalSpaces} />}
          /> */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    );
  }

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
          path="/rentals/:username"
          element={<UserProfile user={user} rentalSpaces={rentalSpaces} />}
        />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default RoutesList;
