// import { useNavigate } from "react-router-dom";
import Rental from "./Rental";

/** UserProfile
 *
 */
function UserProfile({ user, rentalSpaces }) {
  // const navigate = useNavigate();

  console.log(rentalSpaces, "THE RENTALS IN USERPROF");

  // function handleClick() {
  //   navigate(`/rentals/john_doe/add`);
  // }

  return (
    <div className="UserProfile">
      {/* <img src={`${user.image_url}`} /> */}
      <h1>{user.username}</h1>
      <h3>{user.description}</h3>
      <h4>{user.location}</h4>
      {rentalSpaces.map((rental) => (
        <Rental rentalInfo={rental} />
      ))}
    </div>
  );
}

export default UserProfile;



