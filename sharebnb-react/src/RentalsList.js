import shareBnbApi from "./api";
import { useState } from "react";
import Rental from "./Rental";

function RentalsList() {
  const [rentals, setRentals] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllRentals() {
    const rentals = await shareBnbApi.getAllRentals();
    setRentals(rentals);
    setIsLoading(false);
  }

  console.log(rentals, "THE RENTALS IN RENTALSLIST");

  if (isLoading === true) {
    getAllRentals();
    return <div className="Loading">Loading Rentals...</div>;
  }

  return (
    <div className="RentalsList">
      <h1 className="text-center m-2">Check out all rentals available!</h1>
      <div className="row">
        {rentals.map((rental) => (
          <div className="col-md-6">
            <Rental key={rental.id} id={rental.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RentalsList;
