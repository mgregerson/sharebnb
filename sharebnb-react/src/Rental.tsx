import "./Rental.css";
import { useState, useEffect } from "react";
import shareBnbApi from "./api";
import { Link } from "react-router-dom";
import React from "react";

interface RentalProps {
  id: number;
}

interface RentalData {
  location: string;
  description: string;
  price: number;
  owner_username: string;
  url: string;
}

function Rental({ id }: RentalProps): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rental, setRental] = useState<RentalData | null>(null);

  useEffect(() => {
    async function getRental() {
      const rentalData = await shareBnbApi.getRental(id);
      setRental(rentalData);
      setIsLoading(false);
    }

    getRental();
  }, [id]);

  if (isLoading) {
    return <div className="Loading">Loading Rentals...</div>;
  }

  return (
    <div className="Rental card m-3">
      <div className="Rental card-body text-center">
        <h5 className="Rental card-title">{rental?.description}</h5>
        <Link
          to={`/rentals/${rental?.owner_username}`}
          className="Rental card-owner"
        >
          <h5>Renter: {rental?.owner_username}</h5>
        </Link>
        <h6 className="Rental card-subtitle mb-2 text-muted">
          Location: {rental?.location}
        </h6>
        <p className="Rental card-text">Price: ${rental?.price}/day</p>
        <img
          className="Rental-photo mx-auto"
          src={`https://sharebnb-mg.s3.us-east-1.amazonaws.com/${rental?.url}`}
          alt={rental?.url}
        />
      </div>
    </div>
  );
}

export default Rental;
