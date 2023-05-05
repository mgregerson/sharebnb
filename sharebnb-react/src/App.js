import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import shareBnbApi from "./api";
import RoutesList from "./RoutesList";
import jwt_decode from "jwt-decode";

/**
 *
 *
 */
function App() {
  const initialUser = {
    username: "",
    bio: "",
    image_url: "",
    location: "",
  };

  const [rentalSpaces, setRentalSpaces] = useState([]);
  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(localStorage.getItem("token"));

  console.log(user, "THE USER");
  console.log(token, "THE TOKEN IN APP");
  console.log(rentalSpaces, "THE RENTAL SPACES");



  /**  */
  async function addRentalSpace(rental) {
    console.log("rental:", rental);
    const newRental = await shareBnbApi.addRental(rental);
    console.log(newRental);

    setRentalSpaces((rentalSpaces) => ({
      ...rentalSpaces,
      newRental,
    }));
  }

  useEffect(
    function fetchUserOnTokenChange() {
      async function getUserAndRentals(username) {
        try {
          const user = await shareBnbApi.getUser(username);
          const rentals = await shareBnbApi.getRentals(username);
          console.log('rentals:', rentals);
          setUser(user);
          setRentalSpaces(rentals);
        } catch (err) {
          return;
        }
      }
      if (token) {
        const { username } = jwt_decode(token);

        shareBnbApi.token = token;
        getUserAndRentals(username);
        localStorage.setItem("token", token);
      }
    },
    [token]
  );

  async function handleSignup(formData) {
    const token = await shareBnbApi.registerUser(formData);
    setToken(token);
  }

  async function handleLogin(formData) {
    const token = await shareBnbApi.loginUser(formData);
    console.log('TOKEN:', token);
    setToken(token);
  }

  console.log(rentalSpaces, "THE RENTAL SPACES");


  return (
    <div className="App">
      <BrowserRouter>
        <RoutesList
          addRentalSpace={addRentalSpace}
          rentalSpaces={rentalSpaces}
          user={user}
          handleSignup={handleSignup}
          handleLogin={handleLogin}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
