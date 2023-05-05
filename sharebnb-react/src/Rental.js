
/**
 *
 * @
 */
function Rental({ rentalInfo, photos }) {
  const { location, description, price } = rentalInfo;

  return (
    <div className='Rental'>
      <h1>{description}</h1>
      <h3>location: {location}</h3>
      <h3>price: {price}/day</h3>
    </div>
  );
  //TODO: map over photos
}

export default Rental;
