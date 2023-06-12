// import { useNavigate } from "react-router-dom";
import Rental from "./Rental";
import "./UserProfile.css";
import shareBnbApi from "./api";
import userContext from "./userContext.js";
import { useState } from "react";
import { useParams } from "react-router-dom";

/** UserProfile
 *
 * Props:
 *      - User: {bio, username, location}
 *      - rentalSpaces: [{}]
 *
 *
 */
function UserProfile({}) {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [rentalSpaces, setRentalSpaces] = useState(null);
  const [profile, setProfile] = useState(null);

  async function getUserDetails(username) {
    const user = await shareBnbApi.getUser(username);
    const rentals = await shareBnbApi.getRentalsForUser(username);
    setProfile(user);
    setRentalSpaces(rentals);
    setIsLoading(false);
  }

  if (isLoading === true) {
    getUserDetails(username);
    return <div className="Loading">Loading Rentals...</div>;
  }

  console.log(profile, "USER IN USERPROFILE");
  console.log(rentalSpaces, "RENTALS IN USERPROFILE");

  return (
    <div className="UserProfile">
      <div className="UserProfile card m-5 col-6 text-center">
        <div className="card-body ">
          <h3 className="card-title m-1">Hi, I'm {profile.username}!</h3>
          <h4 className="card-subtitle m-1">Location: {profile.location}</h4>
          <h4 className="card-text m-1">About Me: {profile.bio}</h4>
        </div>
      </div>
      <div className="row">
        {rentalSpaces.map((rental) => (
          <div className="col-md-6">
            <Rental key={rental.id} id={rental.id} rentalInfo={rental} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
