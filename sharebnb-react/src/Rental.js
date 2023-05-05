import "./Rental.css";
import { useState } from "react";
import shareBnbApi from "./api";

/**
 *
 * @
 */
function Rental({ id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [rental, setRental] = useState(null);

  console.log(rental);

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
    <div className="Rental card mb-3">
      <div className="Rental card-body">
        <h5 className="Rental card-title">{rental.description}</h5>
        <h6 className="Rental card-subtitle mb-2 text-muted">
          Location: {rental.location}
        </h6>
        <p className="Rental card-text">Price: {rental.price}/day</p>
        <img
          className="Rental-photo"
          src={`https://sharebnb-mg-bj.s3.amazonaws.com/${rental.url}`} alt={rental.url}
        />
      </div>
    </div>
  );
}

export default Rental;
