import axios, { AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";
import { JwtPayload } from "jwt-decode";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

class ShareBnbApi {
  static token = "";

  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
  // ".eyJ1c2VybmFtZSI6IkpvaG4gU21pdGgifQ" +
  // ".t_lzxBsYc6BNfwldAFC3LWEsmqd2TI-s6dqtbJ7VNZk";
  // static token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC
  // J9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIn0.EnOOQMZOPEZ2tm0Z-lhS38IqsOK-Wt_bDbHeQuQ2N7A`

  static async request(
    endpoint: string,
    data: any = {},
    method: string = "get"
  ) {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${ShareBnbApi.token}` };
    const params = method === "get" ? data : {};

    try {
      const config: AxiosRequestConfig = { url, method, data, params, headers };
      const response = await axios(config);
      return response.data;
    } catch (err: any) {
      console.log("err:", err);
      console.error("API Error:", err.response);
      let message = err.response?.data?.error?.message;
      throw Array.isArray(message)
        ? message
        : [message || "Unknown error occurred."];
    }
  }

  static async registerUser(inputData: any) {
    const { username, password, email, image_url, bio, location } = inputData;
    let res = await this.request(
      "signup",
      { username, password, email, image_url, bio, location },
      "post"
    );

    this.token = res.token;
    return this.token;
  }

  static async loginUser(inputData: any) {
    const { username, password } = inputData;
    let res = await this.request(`login`, { username, password }, "post");
    this.token = res.token;
    return this.token;
  }

  static async getAllRentals() {
    let res = await this.request(`rentals`);
    return res.rentals;
  }

  static async getUser(username: string) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async getRentals(inputData: any) {
    const decodedToken = jwt_decode<JwtPayload>(this.token);
    const { username } = decodedToken as { username: string };
    let res = await this.request(`rentals/${username}`);
    return res.rentals;
  }

  static async getRental(id: number) {
    let res = await this.request(`/rentals/${id}`);
    return res.rental;
  }

  static async getRentalsForUser(username: string) {
    let res = await this.request(`rentals/${username}`);
    return res.rentals;
  }

  static async addRental(inputData: any) {
    const decodedToken = jwt_decode<JwtPayload>(this.token);
    const { username } = decodedToken as { username: string };
    let res = await this.request(`rentals/${username}/add`, inputData, "post");
    return res.rental;
  }
}

export default ShareBnbApi;
