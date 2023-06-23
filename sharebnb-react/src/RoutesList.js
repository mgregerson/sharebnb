import { Routes, Route } from "react-router-dom";
import userContext from "./userContext.js";
import { useContext } from "react";
import AddRentalForm from "./components/forms/AddRentalForm";
import UserProfile from "./pages/UserProfile.tsx";
import SignupForm from "./components/forms/SignupForm";
import LoginForm from "./components/forms/LoginForm";
import Homepage from "./pages/Homepage";
import RentalsList from "./pages/RentalsList.tsx";
import NotFound from "./components/shared/NotFound.js";

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
