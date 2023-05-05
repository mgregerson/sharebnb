import axios from "axios";
import jwt_decode from "jwt-decode";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001"; // ;

class shareBnbApi {
  static token = "";
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
  // ".eyJ1c2VybmFtZSI6IkpvaG4gU21pdGgifQ" +
  // ".t_lzxBsYc6BNfwldAFC3LWEsmqd2TI-s6dqtbJ7VNZk";
  // static token =`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIn0.EnOOQMZOPEZ2tm0Z-lhS38IqsOK-Wt_bDbHeQuQ2N7A`

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method, this.token);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${shareBnbApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.log("err:", err);
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Auth

  /** POST Register new user function */

  static async registerUser(inputData) {
    const { username, password, email, image_url, bio, location } = inputData;
    console.log(inputData, "THE INPUT DATA");
    let res = await this.request(
      "signup",
      { username, password, email, image_url, bio, location },
      "post"
    );

    console.log(res, "THE RES");

    this.token = res.token;
    return this.token;
  }

  /** POST Login user */

  static async loginUser(inputData) {
    const { username, password } = inputData;
    let res = await this.request(`login`, { username, password }, "post");
    this.token = res.token;
    return this.token;
  }

  /** GET Gets user data */

  static async getAllRentals() {
    let res = await this.request(`rentals`);
    return res.rentals;
  }

  /** GET Gets user data */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** GET All user rentals */

  static async getRentals(inputData) {
    const { username } = jwt_decode(this.token);

    let res = await this.request(`rentals/${username}`);
    console.log(res, "THE RENTALS in api");
    return res.rentals;
  }

  /** Get a rental by ID */

  static async getRental(id) {
    console.log(id, "THE ID IN GET RENTAL");
    let res = await this.request(`/rentals/${id}`);
    console.log(res, "THE RES in GET RENTAL");
    return res.rental;
  }

  /** Get All rentals of another user. */

  static async getRentalsForUser(username) {
    let res = await this.request(`rentals/${username}`);
    return res.rentals;
  }
  /** POST Add new rental */

  static async addRental(inputData) {
    const { username } = jwt_decode(this.token);

    let res = await this.request(`rentals/${username}/add`, inputData, "post");
    return res.rental;
  }
}

export default shareBnbApi;
