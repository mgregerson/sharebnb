// import { useNavigate } from "react-router-dom";
import Rental from "./Rental";
import userContext from "./userContext.js";
import { useContext } from "react";

/** UserProfile
 *
 */
function UserProfile({ user, rentalSpaces }) {
  // const navigate = useNavigate();
  console.log(rentalSpaces, "THE RENTALS IN USERPROF");
  const test = rentalSpaces.map((r) => r);
  console.log(test);
  console.log(user.bio, "THE DESCCCC");

  return (
    <div class="UserProfile">
      <div class="card m-5 col-12 text-center">
        <div class="card-body">
          <h3 class="card-title m-2">Hi, I'm {user.username}!</h3>
          <h4 class="card-subtitle m-2 text-muted">
            Location: {user.location}
          </h4>
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
