// import { useNavigate } from "react-router-dom";
import Rental from "./Rental";
import "./UserProfile.css";

/** UserProfile
 *
 * Props:
 *      - User: {bio, username, location}
 *      - rentalSpaces: [{}]
 *
 *
 */
function UserProfile({ user, rentalSpaces }) {
  // const navigate = useNavigate();
  console.log(rentalSpaces, "THE RENTALS IN USERPROF");
  const test = rentalSpaces.map((r) => r);
  console.log(user.bio, "THE DESCCCC");

  // TODO: Form says that .map doesn't work after you submit a new rental space

  return (
    <div class="UserProfile">
      <div class="UserProfile card m-5 col-12 text-center">
        <div class="card-body">
          <h3 class="card-title m-2">Hi, I'm {user.username}!</h3>
          <h4 class="card-subtitle m-2">Location: {user.location}</h4>
          <h4 class="card-text m-2">About Me: {user.bio}</h4>
        </div>
      </div>
      {rentalSpaces.map((rental) => (
        <Rental rentalInfo={rental} />
      ))}
    </div>
  );
}

export default UserProfile;
