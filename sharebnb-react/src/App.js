import "./App.css";
import AddRentalForm from "./AddRentalForm";
import { useState } from "react";

/**
 *
 *
 */
function App() {
  const [rentalSpaces, setRentalSpaces] = useState(null);

  console.log(rentalSpaces, "THE RENTAL SPACES IN APP.JS");
  /**  */
  function addRentalSpace(rental) {
    const { rentalData, rentalPhotos } = rental;

    console.log("rentalData IN ADD RENTAL:", rentalData);
    console.log("rentalPhotos:", rentalPhotos);

    setRentalSpaces((rentalSpaces) => ({
      ...rentalSpaces,
      ...rental,
    }));

    // TODO: need axios call to post data to back end.
  }

  return (
    <div className="App">
      <AddRentalForm addRentalSpace={addRentalSpace} />
    </div>
  );
}

export default App;
