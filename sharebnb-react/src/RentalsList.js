import shareBnbApi from "./api";
import { useState } from "react";
import Rental from "./Rental";

function RentalsList() {
  const [rentals, setRentals] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  async function getAllRentals() {
    const rentals = await shareBnbApi.getAllRentals();
    setRentals(rentals);
  }

  console.log(rentals, "THE RENTALS IN RENTALSLIST");

  if (isLoading === true) {
    getAllRentals();
    setIsLoading(false);
    return <div className="Loading">Loading Rentals...</div>;
  }

  return (
    <div className="RentalsList">
      <h1>Check out all rentals available!</h1>
      {rentals.map((rental) => (
        <Rental rentalInfo={rental} />
      ))}
    </div>
  );
}

export default RentalsList;
