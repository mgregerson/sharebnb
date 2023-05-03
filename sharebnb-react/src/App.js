import "./App.css";
import AddRentalForm from "./AddRentalForm";
import { useState } from "react";
import shareBnbApi from "./api";

/**
 *
 *
 */
function App() {
  const [rentalSpaces, setRentalSpaces] = useState(null);
  const [user, setUser] = useState(null);
  /**  */
  async function addRentalSpace(rental) {
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
      <AddRentalForm addRentalSpace={addRentalSpace} />
    </div>
  );
}

export default App;
