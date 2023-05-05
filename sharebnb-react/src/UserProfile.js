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

  // TODO: Form says that .map doesn't work after you submit a new rental space

  return (
    <div className="UserProfile">
      <div className="UserProfile card m-5 col-12 text-center">
        <div className="card-body">
          <h3 className="card-title m-2">Hi, I'm {user.username}!</h3>
          <h4 className="card-subtitle m-2">Location: {user.location}</h4>
          <h4 className="card-text m-2">About Me: {user.bio}</h4>
        </div>
      </div>
      {rentalSpaces.map((rental) => (
        <Rental key={rental.id} id={rental.id} rentalInfo={rental} />
      ))}
    </div>
  );
}

export default UserProfile;
