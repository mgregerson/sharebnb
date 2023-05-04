import { Routes, Route, Navigate } from "react-router-dom";
import AddRentalForm from "./AddRentalForm";


/**  */
function RoutesList({ addRentalSpace }) {

  return (
    <div className="RoutesList">
      <Routes>
        <Route
          path='/rentals/:username/add'
          element={<AddRentalForm
          addRentalSpace={addRentalSpace}
        />}
      />
      </Routes>
    </div>
  );
}

export default RoutesList;