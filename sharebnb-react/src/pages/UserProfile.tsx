import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Rental from "./Rental";
import "./UserProfile.css";
import shareBnbApi from "../helpers/api";

interface User {
  bio: string;
  username: string;
  location: string;
}

interface RentalSpace {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  image_url: string;
}

function UserProfile(): JSX.Element {
  const { username } = useParams<{ username: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rentalSpaces, setRentalSpaces] = useState<RentalSpace[]>([]);
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    async function getUserDetails(username: string) {
      const user = await shareBnbApi.getUser(username);
      const rentals = await shareBnbApi.getRentalsForUser(username);
      setProfile(user);
      setRentalSpaces(rentals);
      setIsLoading(false);
    }

    if (isLoading === true && username) {
      getUserDetails(username);
    }
  }, [isLoading, username]);

  if (isLoading === true) {
    return <div className="Loading">Loading Rentals...</div>;
  }

  return (
    <div className="UserProfile">
      <div className="UserProfile card m-5 col-6 text-center">
        <div className="card-body">
          <h3 className="card-title m-1">Hi, I'm {profile?.username}!</h3>
          <h4 className="card-subtitle m-1">Location: {profile?.location}</h4>
          <h4 className="card-text m-1">About Me: {profile?.bio}</h4>
        </div>
      </div>
      <div className="row">
        {rentalSpaces.map((rental) => (
          <div className="col-md-6" key={rental.id}>
            <Rental id={rental.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
