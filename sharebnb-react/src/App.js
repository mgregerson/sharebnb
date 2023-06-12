import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import shareBnbApi from "./api";
import RoutesList from "./RoutesList";
import jwt_decode from "jwt-decode";
import Nav from "./Nav";
import userContext from "./userContext.js";
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

  /**  */
  async function addRentalSpace(rental) {
    const newRental = await shareBnbApi.addRental(rental);

    setRentalSpaces((rentalSpaces) => [...rentalSpaces, newRental]);
  }

  useEffect(
    function fetchUserOnTokenChange() {
      async function getUserAndRentals(username) {
        try {
          const user = await shareBnbApi.getUser(username);
          const rentals = await shareBnbApi.getRentals(username);
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

  function logOut(formData) {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }

  async function handleSignup(formData) {
    const token = await shareBnbApi.registerUser(formData);
    setToken(token);
  }

  async function handleLogin(formData) {
    const token = await shareBnbApi.loginUser(formData);
    console.log("TOKEN:", token);
    setToken(token);
  }

  return (
    <div className="App">
      <userContext.Provider value={{ user }}>
        <BrowserRouter>
          <Nav logOut={logOut} />
          <RoutesList
            addRentalSpace={addRentalSpace}
            rentalSpaces={rentalSpaces}
            handleSignup={handleSignup}
            handleLogin={handleLogin}
          />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
