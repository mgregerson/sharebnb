import { Routes, Route } from "react-router-dom";
import AddRentalForm from "./AddRentalForm";
import UserProfile from './UserProfile.js';

/**  */
function RoutesList({ addRentalSpace, user }) {

  return (
    <div className="RoutesList">
      <Routes>
        <Route
          path='/rentals/:username/add'
          element={<AddRentalForm addRentalSpace={addRentalSpace} />}
        />
        <Route
          path='/rentals/:username'
          element={<UserProfile user={user} />}
        />
      </Routes>
    </div>
  );
}

export default RoutesList;