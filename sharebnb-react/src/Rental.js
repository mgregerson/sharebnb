import "./Rental.css";
import { useState } from "react";
import shareBnbApi from "./api";
import { Link } from "react-router-dom";

/**
 *
 * @
 */
function Rental({ id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [rental, setRental] = useState(null);

  async function getRental() {
    const rental = await shareBnbApi.getRental(id);
    setRental(rental);
    setIsLoading(false);
  }

  if (isLoading === true) {
    getRental();
    return <div className="Loading">Loading Rentals...</div>;
  }

  // const { location, description, price } = rentalInfo;

  return (
    <div className="Rental card m-3">
      <div className="Rental card-body text-center">
        <h5 className="Rental card-title">{rental.description}</h5>
        <Link
          to={`/rentals/${rental.owner_username}`}
          className="Rental card-owner"
        >
          <h5>Renter: {rental.owner_username}</h5>
        </Link>
        <h6 className="Rental card-subtitle mb-2 text-muted">
          Location: {rental.location}
        </h6>
        <p className="Rental card-text">Price: ${rental.price}/day</p>
        <img
          className="Rental-photo mx-auto"
          src={`https://sharebnb-mg.s3.us-east-1.amazonaws.com/${rental.url}`}
          alt={rental.url}
        />
      </div>
    </div>
  );
}

export default Rental;
