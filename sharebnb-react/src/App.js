import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import shareBnbApi from "./api";
import RoutesList from "./RoutesList";

/**
 *
 *
 */
function App() {
  const [rentalSpaces, setRentalSpaces] = useState(null);
  const [user, setUser] = useState(null);
  /**  */
  async function addRentalSpace(rental) {
    console.log('rental:', rental);
    const newRental = await shareBnbApi.addRental(rental);
    console.log(newRental);

    setRentalSpaces((rentalSpaces) => ({
      ...rentalSpaces,
      ...rental,
    }));

    // TODO: need axios call to post data to back end.
  }

  console.log(rentalSpaces, "THE RENTAL SPACES");

  return (
    <div className="App">
      <BrowserRouter>
        <RoutesList addRentalSpace={addRentalSpace} />
      </BrowserRouter>
    </div>
  );
}

export default App;
