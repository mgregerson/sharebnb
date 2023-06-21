import shareBnbApi from "./api";
import { useState, useEffect } from "react";
import Rental from "./Rental";
import React from "react";

function RentalsList() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllRentals();
  }, []);

  async function getAllRentals() {
    try {
      const rentals = await shareBnbApi.getAllRentals();
      setRentals(rentals);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching rentals:", error);
      setIsLoading(false);
    }
  }

  if (isLoading === true) {
    return <div className="Loading">Loading Rentals...</div>;
  }

  return (
    <div className="RentalsList">
      <h1 className="text-center m-2">Check out all rentals available!</h1>
      <div className="row">
        {rentals.map((rental) => (
          <div className="col-md-6" key={rental.id}>
            <Rental id={rental.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RentalsList;
