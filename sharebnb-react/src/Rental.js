/**
 *
 * @
 */
function Rental({ rentalInfo, photos }) {
  const { location, description, price } = rentalInfo;

  return (
    <div className="Rental card mb-3">
      <div className="Rental card-body">
        <h5 className="Rental card-title">{description}</h5>
        <h6 className="Rental card-subtitle mb-2 text-muted">
          Location: {location}
        </h6>
        <p className="Rental card-text">Price: {price}/day</p>
      </div>
    </div>
  );
}

export default Rental;
